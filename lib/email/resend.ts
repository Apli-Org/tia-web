import { Resend } from 'resend';
import { render } from '@react-email/render';
import WelcomeNewsletterEmail from '@/emails/welcome-newsletter';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

export async function sendWelcomeEmail(
  email: string
): Promise<SendEmailResult> {
  const maxRetries = 3;
  const retryDelay = 1000; // 1 seconde

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const emailHtml = await render(WelcomeNewsletterEmail({ email }));

      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'TIA <newsletter@send.tia-meet.com>',
        to: [email],
        subject: 'Bienvenue dans la communauté TIA ! 🎉',
        html: emailHtml,
      });

      if (error) {
        // Si c'est une erreur réseau et qu'il reste des tentatives
        if (
          error.name === 'application_error' &&
          attempt < maxRetries
        ) {
          console.warn(
            `Email send attempt ${attempt}/${maxRetries} failed, retrying...`
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          continue;
        }

        console.error('Failed to send welcome email:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      console.log(
        `Welcome email sent successfully to ${email} (attempt ${attempt}):`,
        data?.id
      );
      return {
        success: true,
      };
    } catch (error) {
      if (attempt < maxRetries) {
        console.warn(
          `Email send attempt ${attempt}/${maxRetries} threw error, retrying...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        continue;
      }

      console.error('Unexpected error sending welcome email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  return {
    success: false,
    error: 'Failed to send email after multiple attempts',
  };
}

export { resend };
