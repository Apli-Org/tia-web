# Implementation de la Page de Redirection Paiement

## Objectif

Créer une page sur `https://www.tia-meet.com` qui redirige les utilisateurs vers l'app TIA après un paiement Vanilla Pay.

## URL Finale

```
https://www.tia-meet.com/payment/redirect
```

## Fichier à Créer

Créez le fichier suivant dans votre repo du site web :

### Option A : Si vous utilisez Next.js

**Fichier** : `app/payment/redirect/page.tsx` (ou `pages/payment/redirect.tsx`)

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymentRedirect() {
  const searchParams = useSearchParams();
  const [deepLink, setDeepLink] = useState('');
  const [status, setStatus] = useState<'success' | 'failed'>('failed');

  useEffect(() => {
    const success = searchParams.get('success') === 'true';
    const panier = searchParams.get('panier') || '';

    setStatus(success ? 'success' : 'failed');

    const link = success
      ? `tiaapp://payment/success?panier=${panier}`
      : `tiaapp://payment/failed?panier=${panier}`;

    setDeepLink(link);

    // Tentative de redirection automatique
    window.location.href = link;
  }, [searchParams]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 50%, #FBCFE8 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(233, 64, 87, 0.15)',
      }}>
        {/* Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          background: status === 'success'
            ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
            : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
        }}>
          <span style={{ fontSize: '40px', color: '#fff' }}>
            {status === 'success' ? '✓' : '✕'}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#1F2937',
          marginBottom: '12px',
        }}>
          {status === 'success' ? 'Paiement réussi !' : 'Paiement échoué'}
        </h1>

        {/* Message */}
        <p style={{
          fontSize: '16px',
          color: '#6B7280',
          marginBottom: '32px',
          lineHeight: 1.5,
        }}>
          {status === 'success'
            ? 'Votre paiement a été traité avec succès. Votre abonnement est maintenant actif !'
            : 'Une erreur est survenue lors du paiement. Veuillez réessayer.'}
        </p>

        {/* Spinner */}
        <div style={{
          width: '24px',
          height: '24px',
          border: '3px solid #E5E7EB',
          borderTopColor: '#E94057',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px',
        }} />

        <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '24px' }}>
          Redirection vers l'application...
        </p>

        {/* Manual Button */}
        <a
          href={deepLink}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #E94057 0%, #F27121 100%)',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 600,
            padding: '16px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
          }}
        >
          {status === 'success' ? 'Ouvrir TIA' : 'Retourner à TIA'}
        </a>

        {/* Footer */}
        <div style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid #F3F4F6',
        }}>
          <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
            TIA Dating
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
```

---

### Option B : Si vous utilisez HTML statique

**Fichier** : `payment/redirect/index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TIA - Redirection Paiement</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 50%, #FBCFE8 100%);
      padding: 20px;
    }

    .container {
      background: #fff;
      border-radius: 24px;
      padding: 40px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(233, 64, 87, 0.15);
    }

    .icon-wrapper {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }

    .icon-wrapper.success {
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    }

    .icon-wrapper.failed {
      background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    }

    .icon {
      font-size: 40px;
      color: #fff;
    }

    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #1F2937;
      margin-bottom: 12px;
    }

    .message {
      font-size: 16px;
      color: #6B7280;
      margin-bottom: 32px;
      line-height: 1.5;
    }

    .spinner {
      width: 24px;
      height: 24px;
      border: 3px solid #E5E7EB;
      border-top-color: #E94057;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .redirect-text {
      font-size: 14px;
      color: #9CA3AF;
      margin-bottom: 24px;
    }

    .button {
      display: inline-block;
      background: linear-gradient(135deg, #E94057 0%, #F27121 100%);
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      padding: 16px 32px;
      border-radius: 12px;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(233, 64, 87, 0.3);
    }

    .footer {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #F3F4F6;
    }

    .footer-text {
      font-size: 12px;
      color: #9CA3AF;
    }

    #manual-section {
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon-wrapper" id="icon-wrapper">
      <span class="icon" id="icon"></span>
    </div>

    <h1 id="title"></h1>
    <p class="message" id="message"></p>

    <div id="redirect-section">
      <div class="spinner"></div>
      <p class="redirect-text">Redirection vers l'application...</p>
    </div>

    <div id="manual-section">
      <a href="#" class="button" id="manual-button"></a>
    </div>

    <div class="footer">
      <p class="footer-text">TIA Dating</p>
    </div>
  </div>

  <script>
    // Lire les paramètres URL
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success') === 'true';
    const panier = params.get('panier') || '';

    // Construire le deep link
    const deepLink = success
      ? 'tiaapp://payment/success?panier=' + encodeURIComponent(panier)
      : 'tiaapp://payment/failed?panier=' + encodeURIComponent(panier);

    // Mettre à jour l'UI
    const iconWrapper = document.getElementById('icon-wrapper');
    const icon = document.getElementById('icon');
    const title = document.getElementById('title');
    const message = document.getElementById('message');
    const manualButton = document.getElementById('manual-button');

    if (success) {
      iconWrapper.classList.add('success');
      icon.textContent = '✓';
      title.textContent = 'Paiement réussi !';
      message.textContent = 'Votre paiement a été traité avec succès. Votre abonnement est maintenant actif !';
      manualButton.textContent = 'Ouvrir TIA';
    } else {
      iconWrapper.classList.add('failed');
      icon.textContent = '✕';
      title.textContent = 'Paiement échoué';
      message.textContent = 'Une erreur est survenue lors du paiement. Veuillez réessayer.';
      manualButton.textContent = 'Retourner à TIA';
    }

    manualButton.href = deepLink;

    // Tentative de redirection automatique
    window.location.href = deepLink;

    // Si la redirection ne fonctionne pas après 2.5s, afficher le bouton manuel
    setTimeout(function() {
      document.getElementById('redirect-section').style.display = 'none';
      document.getElementById('manual-section').style.display = 'block';
    }, 2500);
  </script>
</body>
</html>
```

---

## Configuration Vanilla Pay

Une fois la page déployée, mettez à jour la configuration dans le dashboard Vanilla Pay :

### URL de Redirection

```
https://www.tia-meet.com/payment/redirect
```

### L'edge function enverra ces paramètres

Vanilla Pay redirigera vers :
```
https://www.tia-meet.com/payment/redirect?success=true&panier=xxxxx
```
ou
```
https://www.tia-meet.com/payment/redirect?success=false&panier=xxxxx
```

---

## Modification de l'Edge Function

Après avoir déployé la page sur tia-meet.com, modifiez l'edge function pour rediriger vers votre site :

```typescript
async function handleRedirect(req: Request) {
  const url = new URL(req.url);

  // Récupérer les paramètres de Vanilla Pay
  const panier = url.searchParams.get('panier') || '';
  const etat = url.searchParams.get('etat') || '';

  // Déterminer si succès ou échec
  const success = etat === 'SUCCESS' || url.searchParams.get('success') === 'true';

  // Rediriger vers la page sur tia-meet.com
  const redirectUrl = `https://www.tia-meet.com/payment/redirect?success=${success}&panier=${encodeURIComponent(panier)}`;

  return new Response(null, {
    status: 302,
    headers: {
      'Location': redirectUrl,
    },
  });
}
```

---

## Flux Complet

```
1. Utilisateur paie sur Vanilla Pay
                ↓
2. Vanilla Pay redirige vers:
   https://ibxifmqovisdyrzpemyv.supabase.co/functions/v1/vanilla-pay-v2?success=true&panier=xxx
                ↓
3. Edge Function fait un redirect 302 vers:
   https://www.tia-meet.com/payment/redirect?success=true&panier=xxx
                ↓
4. La page tia-meet.com s'affiche correctement (car c'est un vrai site web)
                ↓
5. JavaScript redirige automatiquement vers:
   tiaapp://payment/success?panier=xxx
                ↓
6. L'app TIA s'ouvre et affiche la page de succès
```

---

## Checklist de Déploiement

- [ ] Créer le fichier `payment/redirect/index.html` ou la page Next.js
- [ ] Déployer sur tia-meet.com
- [ ] Tester l'URL : `https://www.tia-meet.com/payment/redirect?success=true&panier=test`
- [ ] Vérifier que le deep link fonctionne
- [ ] Mettre à jour l'edge function vanilla-pay-v2
- [ ] Mettre à jour la config Vanilla Pay (si nécessaire)
- [ ] Faire un paiement test complet

---

## Test Manuel

Testez ces URLs dans votre navigateur :

```
https://www.tia-meet.com/payment/redirect?success=true&panier=test123
https://www.tia-meet.com/payment/redirect?success=false&panier=test123
```

La page devrait s'afficher correctement et tenter de rediriger vers l'app.
