"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentRedirectContent() {
  const searchParams = useSearchParams();
  const [deepLink, setDeepLink] = useState("");
  const [status, setStatus] = useState<"success" | "failed">("failed");
  const [showManualButton, setShowManualButton] = useState(false);

  useEffect(() => {
    const success = searchParams.get("success") === "true";
    const panier = searchParams.get("panier") || "";

    setStatus(success ? "success" : "failed");

    const link = success
      ? `tiaapp://payment/success?panier=${encodeURIComponent(panier)}`
      : `tiaapp://payment/failed?panier=${encodeURIComponent(panier)}`;

    setDeepLink(link);

    window.location.href = link;

    const timeout = setTimeout(() => {
      setShowManualButton(true);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 p-5 font-sans">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl shadow-primary/15">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
            status === "success"
              ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
              : "bg-gradient-to-br from-red-500 to-red-600"
          }`}
        >
          <span className="text-4xl text-white">
            {status === "success" ? "✓" : "✕"}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {status === "success" ? "Paiement réussi !" : "Paiement échoué"}
        </h1>

        <p className="text-base text-gray-500 mb-8 leading-relaxed">
          {status === "success"
            ? "Votre paiement a été traité avec succès. Votre abonnement est maintenant actif !"
            : "Une erreur est survenue lors du paiement. Veuillez réessayer."}
        </p>

        {!showManualButton && (
          <div className="mb-6">
            <div className="w-6 h-6 border-3 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-400">
              Redirection vers l&apos;application...
            </p>
          </div>
        )}

        {showManualButton && (
          <a
            href={deepLink}
            className="inline-block bg-gradient-to-r from-primary to-orange-500 text-white text-base font-semibold py-4 px-8 rounded-xl no-underline hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
          >
            {status === "success" ? "Ouvrir TIA" : "Retourner à TIA"}
          </a>
        )}

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
