"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Check, Mail, Phone, Sparkles, User } from "lucide-react";
import { subscribeToNewsletter } from "@/actions/newsletter.action";
import type { NewsletterContent } from "@/lib/types/landing.types";

// Default content
const defaultContent = {
  badgeText: "",
  headline: "Il y a un moment parfait pour commencer. C'est maintenant.",
  subheadline: "En vous pré-inscrivant dès maintenant, vous rejoignez les tout premiers utilisateurs de Tia. Accès anticipé, informations prioritaires et surprises réservées aux early users le jour J. Le bon moment, c'est maintenant.",
  inputLabel: "Adresse email",
  inputPlaceholder: "votre@email.com",
  submitButtonText: "Je choisis Tia",
  submittingText: "Inscription en cours...",
  successTitle: "Merci de votre inscription !",
  successMessage: "Vous recevrez bientôt des nouvelles exclusives sur TIA",
  disclaimer: "En vous inscrivant, vous acceptez de recevoir nos actualités. Vous pourrez vous désinscrire à tout moment.",
};

interface NewsletterProps {
  content?: NewsletterContent | null;
}

export function Newsletter({ content }: NewsletterProps) {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [prenom, setPrenom] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const badgeText = content?.badgeText || defaultContent.badgeText;
  const headline = content?.headline || defaultContent.headline;
  const subheadline = content?.subheadline || defaultContent.subheadline;
  const inputLabel = content?.inputLabel || defaultContent.inputLabel;
  const inputPlaceholder = content?.inputPlaceholder || defaultContent.inputPlaceholder;
  const submitButtonText = content?.submitButtonText || defaultContent.submitButtonText;
  const submittingText = content?.submittingText || defaultContent.submittingText;
  const successTitle = content?.successTitle || defaultContent.successTitle;
  const successMessage = content?.successMessage || defaultContent.successMessage;
  const disclaimer = content?.disclaimer || defaultContent.disclaimer;

  const isEmailValid = email.includes("@");
  const isNumeroValid = numero.trim().length >= 8;
  const isFormValid = isEmailValid && isNumeroValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setError("");

    try {
      const result = await subscribeToNewsletter(email, numero, prenom || undefined);

      if (!result.success) {
        setError(result.error || "Une erreur est survenue. Veuillez réessayer.");
        return;
      }

      setIsSuccess(true);
      setEmail("");
      setNumero("");
      setPrenom("");

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="pre-inscription"
      ref={sectionRef}
      className="py-24 md:py-32 bg-linear-to-br from-primary/5 via-white to-pink-50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            {badgeText}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Il y a un moment parfait pour commencer.<br />C'est maintenant.
          </h2>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
            {subheadline}
          </p>
        </div>

        <div
          className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {isSuccess ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-3xl p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                {successTitle}
              </h3>
              <p className="text-green-700">
                {successMessage}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="prenom"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <User className="w-4 h-4 text-primary" />
                    Prénom (optionnel)
                  </label>
                  <Input
                    id="prenom"
                    type="text"
                    placeholder="Votre prénom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="h-14 text-base"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    {inputLabel}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={inputPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 text-base"
                    disabled={isSubmitting}
                    aria-invalid={email && !isEmailValid ? true : undefined}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="numero"
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    Numéro de téléphone
                  </label>
                  <Input
                    id="numero"
                    type="tel"
                    placeholder="034 00 000 00"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="h-14 text-base"
                    disabled={isSubmitting}
                    aria-invalid={numero && !isNumeroValid ? true : undefined}
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive text-center">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full h-14 text-base font-semibold bg-linear-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 transition-all shadow-lg hover:shadow-xl"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? submittingText : submitButtonText}
                </Button>

                <p className="text-xs text-center text-gray-500 leading-relaxed">
                  {disclaimer}
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
