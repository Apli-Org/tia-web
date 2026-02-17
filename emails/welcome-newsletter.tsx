import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeNewsletterEmailProps {
  email: string;
}

export const WelcomeNewsletterEmail = ({
  email,
}: WelcomeNewsletterEmailProps) => (
  <Html>
    <Head />
    <Preview>Bienvenue dans la communauté TIA ! 🎉</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with gradient */}
        <Section style={header}>
          <Text style={emoji}>💝</Text>
          <Heading style={h1}>Bienvenue sur TIA !</Heading>
        </Section>

        {/* Main content */}
        <Section style={content}>
          <Text style={welcome}>Merci de vous être inscrit(e) ! 🎉</Text>

          <Text style={paragraph}>
            Nous sommes ravis de vous compter parmi les premiers à rejoindre la
            communauté TIA. Vous serez désormais les premiers informés de :
          </Text>

          <ul style={list}>
            <li style={listItem}>
              <strong>✨ Nos nouveautés</strong> - Découvrez en avant-première
              nos dernières fonctionnalités
            </li>
            <li style={listItem}>
              <strong>🚀 Le lancement officiel</strong> - Soyez alertés dès que
              TIA sera disponible
            </li>
            <li style={listItem}>
              <strong>💡 Conseils exclusifs</strong> - Des astuces et
              actualités réservées à notre communauté
            </li>
          </ul>

          <Section style={infoBox}>
            <Text style={infoBoxText}>
              💡 <strong>En attendant le lancement</strong>
              <br />
              Visitez notre site pour en savoir plus sur TIA et découvrir comment
              nous réinventons les rencontres en ligne.
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href="https://www.tia-meet.com/">
              Découvrir TIA
            </Button>
          </Section>

          <Text style={paragraph}>
            À très bientôt sur TIA,
            <br />
            <strong>L'équipe TIA 💘</strong>
          </Text>

          <Text style={smallText}>
            Si vous n'avez pas demandé à recevoir cette newsletter, ignorez
            simplement cet email.
          </Text>
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
            <Link href="https://www.tia-meet.com/terms" style={link}>
              CGU
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

WelcomeNewsletterEmail.PreviewProps = {
  email: 'exemple@email.com',
} as WelcomeNewsletterEmailProps;

export default WelcomeNewsletterEmail;

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
  padding: '40px 30px',
  textAlign: 'center' as const,
  color: '#ffffff',
};

const emoji = {
  fontSize: '48px',
  display: 'block',
  marginBottom: '15px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '600',
  margin: '0',
};

const content = {
  padding: '40px 30px',
};

const welcome = {
  fontSize: '18px',
  fontWeight: '500',
  color: '#FF6B9D',
  marginBottom: '20px',
};

const paragraph = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '1.8',
  marginTop: '0',
  marginBottom: '15px',
};

const list = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '25px 0',
  paddingLeft: '20px',
};

const listItem = {
  marginBottom: '12px',
};

const infoBox = {
  background: '#f8f9fa',
  borderLeft: '4px solid #FF6B9D',
  padding: '15px',
  margin: '25px 0',
  borderRadius: '4px',
};

const infoBoxText = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '1.8',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#FF6B9D',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 30px',
};

const smallText = {
  fontSize: '14px',
  color: '#666666',
  marginTop: '30px',
  lineHeight: '1.5',
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
