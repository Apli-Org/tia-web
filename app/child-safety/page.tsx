"use client";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ChildSafetyContent() {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get("embed") === "true";

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {!isEmbed && <Header />}
      <main className={`container mx-auto max-w-5xl px-4 ${isEmbed ? "py-4" : "py-12"}`}>
        {!isEmbed && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour
          </Link>
        )}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-linear-to-r from-blue-500/10 via-indigo-50 to-purple-50 px-8 py-12 border-b border-gray-100">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Protection des Enfants
            </h1>
            <p className="text-lg text-gray-600">
              Notre engagement pour la sécurité des mineurs
            </p>
          </div>

          <article className="px-8 py-10 prose prose-lg max-w-none">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <p className="text-red-800 leading-relaxed mb-0 font-semibold">
                TIA applique une politique de tolérance zéro envers toute forme
                d&apos;exploitation, d&apos;abus ou de mise en danger des
                enfants.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500/20">
                1. Engagement contre l&apos;exploitation des enfants
              </h2>
              <p className="text-gray-600 mb-4">
                TIA s&apos;engage fermement à lutter contre toute forme
                d&apos;exploitation, d&apos;abus et de mise en danger des
                enfants. Nous interdisons strictement tout contenu, comportement
                ou interaction impliquant des mineurs à des fins sexuelles,
                abusives ou inappropriées.
              </p>
              <p className="text-gray-600 mb-4">
                Toute violation de ces règles entraîne :
              </p>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">●</span>
                  <span className="text-gray-700">
                    Suppression immédiate du compte
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">●</span>
                  <span className="text-gray-700">
                    Conservation des preuves
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">●</span>
                  <span className="text-gray-700">
                    Signalement aux autorités compétentes
                  </span>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-red-500/20">
                2. Interdiction du contenu illégal (CSAE & CSAM)
              </h2>
              <p className="text-gray-600 mb-4">
                TIA applique une politique de tolérance zéro concernant :
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">
                    Le contenu d&apos;abus sexuel d&apos;enfants (CSAM)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">
                    Les tentatives de contact inapproprié avec des mineurs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">
                    La sollicitation, le chantage ou l&apos;exploitation
                  </span>
                </li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 mb-0">
                  Nous utilisons des systèmes de modération humains et
                  automatisés pour détecter et supprimer ces contenus.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-amber-500/20">
                3. Accès réservé aux utilisateurs majeurs
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
                <p className="text-yellow-800 font-semibold mb-0">
                  L&apos;utilisation de TIA est strictement réservée aux
                  personnes âgées de 18 ans et plus.
                </p>
              </div>
              <p className="text-gray-600 mb-4">Mesures mises en place :</p>
              <div className="grid md:grid-cols-1 gap-3">
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    Déclaration obligatoire de l&apos;âge lors de
                    l&apos;inscription
                  </span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    Suspension immédiate des comptes suspectés d&apos;appartenir
                    à un mineur
                  </span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">
                    Vérification supplémentaire en cas de doute
                  </span>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-green-500/20">
                4. Système de signalement dans l&apos;application
              </h2>
              <p className="text-gray-600 mb-4">
                Les utilisateurs peuvent signaler :
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Un comportement suspect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Un contenu inapproprié</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Toute situation mettant un enfant en danger
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 mb-4">Fonctionnalités :</p>
              <div className="bg-green-50 rounded-lg p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">
                    Bouton &quot;Signaler&quot; sur chaque profil et
                    conversation
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">
                    Formulaire de plainte accessible dans l&apos;application
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">
                    Traitement prioritaire par notre équipe de sécurité
                  </span>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-purple-500/20">
                5. Conformité aux lois sur la protection de l&apos;enfance
              </h2>
              <p className="text-gray-600 mb-4">
                TIA respecte toutes les lois applicables relatives à la
                protection des enfants, y compris :
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Les législations nationales et internationales sur la
                    protection des mineurs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Les obligations de signalement aux autorités en cas de
                    découverte de contenu illicite
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500/20">
                6. Point de contact dédié à la sécurité des enfants
              </h2>
              <p className="text-gray-600 mb-4">
                Un point de contact spécifique est mis à disposition pour toute
                question ou alerte liée à la sécurité des mineurs :
              </p>
              <div className="bg-linear-to-r from-cyan-50 to-blue-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-full p-3 shadow-sm">
                    <svg
                      className="w-6 h-6 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href="mailto:child-safety@tia-meet.com"
                      className="text-lg font-semibold text-cyan-600 hover:underline"
                    >
                      info@tia-meet.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-full p-3 shadow-sm">
                    <svg
                      className="w-6 h-6 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Responsable</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Équipe Sécurité TIA
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-full p-3 shadow-sm">
                    <svg
                      className="w-6 h-6 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Temps de réponse moyen
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      24 heures
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-500/20">
                7. Engagement continu
              </h2>
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
                <p className="text-indigo-800 mb-0">
                  Nous révisons régulièrement nos systèmes, nos politiques et
                  nos outils de modération afin d&apos;améliorer la protection
                  des utilisateurs et prévenir toute exploitation des enfants
                  sur notre plateforme.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
      {!isEmbed && <Footer />}
    </div>
  );
}

export default function ChildSafetyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ChildSafetyContent />
    </Suspense>
  );
}
