'use server';

import { createClient } from '@/lib/supabase/client';
import { sendWelcomeEmail } from '@/lib/email/resend';

export interface SubscribeResult {
  success: boolean;
  error?: string;
  emailSent?: boolean;
}

export async function subscribeToNewsletter(
  email: string
): Promise<SubscribeResult> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return {
        success: false,
        error: 'Adresse email invalide',
      };
    }

    const supabase = createClient();

    // Insert email into newsletter_subscribers table
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, subscribed_at: new Date().toISOString() }]);

    if (insertError) {
      // Handle duplicate email error
      if (insertError.code === '23505') {
        return {
          success: false,
          error: 'Cet email est déjà inscrit à notre newsletter',
        };
      }

      console.error('Failed to insert newsletter subscriber:', insertError);
      return {
        success: false,
        error: 'Une erreur est survenue. Veuillez réessayer.',
      };
    }

    // Send welcome email (don't fail if email fails)
    const emailResult = await sendWelcomeEmail(email);

    if (!emailResult.success) {
      console.error('Failed to send welcome email, but subscription succeeded');
    }

    return {
      success: true,
      emailSent: emailResult.success,
    };
  } catch (error) {
    console.error('Unexpected error in subscribeToNewsletter:', error);
    return {
      success: false,
      error: 'Une erreur est survenue. Veuillez réessayer.',
    };
  }
}
