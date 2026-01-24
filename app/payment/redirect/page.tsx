"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function getIsIOS() {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

function PaymentRedirectContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success") === "true";
    const panier = searchParams.get("panier") || "";
    const isIOS = getIsIOS();

    // iOS: Universal Link (HTTPS) - configuré dans apple-app-site-association
    // Android: Custom scheme tiaapp://
    const iosUniversalLink = success
      ? `https://www.tia-meet.com/payment/redirect?success=true&panier=${encodeURIComponent(panier)}`
      : `https://www.tia-meet.com/payment/redirect?success=false&panier=${encodeURIComponent(panier)}`;

    const androidDeepLink = success
      ? `tiaapp://payment/success?panier=${encodeURIComponent(panier)}`
      : `tiaapp://payment/failed?panier=${encodeURIComponent(panier)}`;

    const link = isIOS ? iosUniversalLink : androidDeepLink;

    // Tentative de redirection automatique
    window.location.href = link;
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 p-5 font-sans">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl shadow-primary/15">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-primary to-orange-500">
          <span className="text-4xl text-white">📱</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Vérifiez votre achat
        </h1>

        <p className="text-base text-gray-500 mb-6 leading-relaxed">
          Retournez dans l&apos;application pour vérifier votre achat dans votre
          compte.
        </p>

        <p className="text-sm text-gray-400 mb-8">
          En cas de problème, contactez le support&nbsp;:
          <br />
          <a
            href="mailto:ali@tia-meet.com"
            className="text-primary hover:underline font-medium"
          >
            ali@tia-meet.com
          </a>
        </p>


        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">TIA Dating</p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentRedirect() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentRedirectContent />
    </Suspense>
  );
}
