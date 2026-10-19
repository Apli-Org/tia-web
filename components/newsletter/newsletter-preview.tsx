'use client'

interface NewsletterPreviewProps {
  subject: string
  content: string
}

export function NewsletterPreview({ subject, content }: NewsletterPreviewProps) {
  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
        padding: '40px 20px',
        minHeight: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          margin: '0 auto',
          padding: '0',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
        }}
      >
        {/* Header with gradient */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)',
            padding: '30px',
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: '700',
              margin: '0',
              letterSpacing: '2px',
            }}
          >
            Tia
          </div>
        </div>

        {/* Preview tag (like in real email) */}
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '12px 30px',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
            Aperçu de l'email:
          </div>
          <div style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>
            {subject}
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            padding: '40px 30px',
            color: '#333333',
            fontSize: '16px',
            lineHeight: '1.8',
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
              color: '#333333',
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '30px',
            textAlign: 'center',
            borderTop: '1px solid #eeeeee',
          }}
        >
          <div
            style={{
              color: '#666666',
              fontSize: '13px',
              lineHeight: '1.5',
              marginTop: '0',
              marginBottom: '5px',
            }}
          >
            Cet email a été envoyé automatiquement, merci de ne pas y répondre.
          </div>
          <div
            style={{
              color: '#666666',
              fontSize: '13px',
              lineHeight: '1.5',
              marginTop: '0',
              marginBottom: '5px',
            }}
          >
            © 2025 Tia - L'application de rencontre nouvelle génération
          </div>
          <div style={{ margin: '15px 0 5px 0' }}>
            <a
              href="https://www.tia-meet.com/"
              style={{ color: '#FF6B9D', textDecoration: 'none' }}
            >
              Site Web
            </a>
            <span style={{ color: '#666666', margin: '0 8px' }}>•</span>
            <a
              href="https://www.tia-meet.com/privacy"
              style={{ color: '#FF6B9D', textDecoration: 'none' }}
            >
              Confidentialité
            </a>
            <span style={{ color: '#666666', margin: '0 8px' }}>•</span>
            <a
              href="https://www.tia-meet.com/terms"
              style={{ color: '#FF6B9D', textDecoration: 'none' }}
            >
              CGU
            </a>
          </div>
          <div
            style={{
              color: '#666666',
              fontSize: '13px',
              lineHeight: '1.5',
              marginTop: '10px',
            }}
          >
            Vous recevez cet email car vous êtes inscrit à notre newsletter.
          </div>
        </div>
      </div>
    </div>
  )
}
