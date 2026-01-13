import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface NewsletterEmailProps {
  subject: string;
  htmlContent: string;
}

export const NewsletterEmail = ({
  subject,
  htmlContent,
}: NewsletterEmailProps) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with gradient */}
        <Section style={header}>
          <Text style={logo}>TIA</Text>
        </Section>

        {/* Main content - rendered from rich text editor */}
        <Section style={content}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Cet email a été envoyé automatiquement, merci de ne pas y répondre.
          </Text>
          <Text style={footerText}>
            © 2025 TIA - L'application de rencontre nouvelle génération
          </Text>
          <Text style={footerLinks}>
            <Link href="https://www.tia-meet.com/" style={link}>
              Site Web
            </Link>{' '}
            •{' '}
            <Link href="https://www.tia-meet.com/privacy" style={link}>
              Confidentialité
            </Link>{' '}
            •{' '}
            <Link href="https://www.tia-meet.com/child-safety" style={link}>
              CGU
            </Link>
          </Text>
          <Text style={footerText}>
            Vous recevez cet email car vous êtes inscrit à notre newsletter.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

NewsletterEmail.PreviewProps = {
  subject: 'Newsletter TIA',
  htmlContent: '<p>Ceci est un exemple de contenu de newsletter.</p>',
} as NewsletterEmailProps;

export default NewsletterEmail;

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  margin: '0',
  padding: '0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '0',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
};

const header = {
  background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)',
  padding: '30px',
  textAlign: 'center' as const,
  color: '#ffffff',
};

const logo = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
  letterSpacing: '2px',
};

const content = {
  padding: '40px 30px',
  color: '#333333',
  fontSize: '16px',
  lineHeight: '1.8',
};

const footer = {
  backgroundColor: '#f8f9fa',
  padding: '30px',
  textAlign: 'center' as const,
  borderTop: '1px solid #eeeeee',
};

const footerText = {
  color: '#666666',
  fontSize: '13px',
  lineHeight: '1.5',
  marginTop: '0',
  marginBottom: '5px',
  textAlign: 'center' as const,
};

const footerLinks = {
  margin: '15px 0 5px 0',
};

const link = {
  color: '#FF6B9D',
  textDecoration: 'none',
};
