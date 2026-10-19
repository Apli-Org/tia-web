"use client";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-primary mt-1">•</span>
      <span className="text-gray-700">{children}</span>
    </li>
  );
}

function AccountDeletionContent() {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get("embed") === "true";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
          <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-pink-50 px-8 py-12 border-b border-gray-100">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Suppression du Compte et des Données
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Version 1.0 — Dernière mise à jour : 11 août 2026</span>
            </div>
          </div>

          <article className="px-8 py-10 prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <p className="text-gray-700 leading-relaxed mb-0">
                Cette page explique comment demander la suppression d'un Compte Tia et des données personnelles
                associées.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                1. Supprimer son Compte depuis l'Application
              </h2>
              <p className="text-gray-600 mb-4">
                Lorsque cette fonctionnalité est disponible dans votre version de Tia :
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <ol className="space-y-2 list-decimal list-inside text-gray-700">
                  <li>ouvrez <strong>Tia</strong> ;</li>
                  <li>accédez à <strong>Paramètres</strong> ;</li>
                  <li>ouvrez <strong>Compte</strong> ;</li>
                  <li>choisissez <strong>Supprimer mon compte</strong> ;</li>
                  <li>confirmez la demande selon les étapes affichées.</li>
                </ol>
              </div>
              <p className="text-gray-600 text-sm italic mt-4">
                Le parcours et les intitulés exacts peuvent varier légèrement selon la version de l'Application. Les
                options affichées dans l'Application font foi.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                2. Demander la suppression sans accès à l'Application
              </h2>
              <p className="text-gray-600 mb-4">Vous pouvez également envoyer une demande à :</p>
              <div className="bg-gradient-to-r from-primary/10 to-purple-50 rounded-lg p-6 flex items-center gap-4 mb-4">
                <div className="bg-white rounded-full p-3">
                  <svg
                    className="w-6 h-6 text-primary"
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
                  <p className="text-sm text-gray-600 mb-1">Objet recommandé : « Demande de suppression de compte »</p>
                  <a
                    href="mailto:info@tia-meet.com"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    info@tia-meet.com
                  </a>
                </div>
              </div>
              <p className="text-gray-600">
                Indiquez l'adresse email ou le numéro de téléphone utilisé pour votre Compte afin que nous puissions
                identifier votre demande. Tia peut demander une vérification raisonnable afin d'éviter qu'un tiers
                tente de supprimer frauduleusement votre Compte.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                3. Ce qui se passe après la demande
              </h2>
              <p className="text-gray-600 mb-4">Lorsque la demande est validée :</p>
              <ul className="space-y-2 mb-4">
                <Bullet>votre profil est rendu inaccessible aux autres Utilisateurs dans un délai raisonnable ;</Bullet>
                <Bullet>
                  les données utilisées pour le fonctionnement courant du Compte sont supprimées ou dissociées dans
                  un délai cible maximal de trente (30) jours, sauf exception justifiée ;
                </Bullet>
                <Bullet>
                  certaines copies techniques peuvent rester temporairement dans les sauvegardes jusqu'à leur
                  rotation normale, généralement pour une période supplémentaire pouvant aller jusqu'à
                  quatre-vingt-dix (90) jours ;
                </Bullet>
                <Bullet>
                  certaines informations peuvent être conservées séparément lorsqu'une obligation légale, une
                  procédure, un dossier de sécurité, la prévention de fraude, la protection d'une personne ou la
                  défense d'un droit le justifie.
                </Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Les données conservées après suppression ne sont pas utilisées pour réactiver le profil ou
                poursuivre l'usage ordinaire du Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                4. Signalements, bannissements et sécurité
              </h2>
              <p className="text-gray-600 mb-4">
                Une demande de suppression ne permet pas d'exiger la destruction immédiate de preuves nécessaires à :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>un signalement de harcèlement, violence, fraude ou exploitation ;</Bullet>
                <Bullet>une enquête impliquant potentiellement une personne mineure ;</Bullet>
                <Bullet>la prévention d'une réinscription après un bannissement grave ;</Bullet>
                <Bullet>une demande légalement valable d'une autorité ;</Bullet>
                <Bullet>l'établissement, l'exercice ou la défense d'un droit en justice.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Ces informations sont conservées uniquement pendant la durée raisonnablement nécessaire à la
                finalité concernée et conformément à la réglementation applicable.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                5. Abonnements Apple et Google
              </h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-800 font-semibold mb-0">
                  La suppression du Compte Tia ne résilie pas automatiquement un abonnement géré par l'App Store ou
                  Google Play.
                </p>
              </div>
              <p className="text-gray-600">
                Si vous avez un abonnement actif, vous devez également l'annuler dans les paramètres d'abonnement de
                la plateforme par laquelle vous avez souscrit.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                6. Données déjà partagées avec d'autres personnes
              </h2>
              <p className="text-gray-600">
                La suppression de votre Compte retire votre profil du Service, mais Tia ne peut pas garantir la
                suppression d'une copie qu'un autre Utilisateur aurait déjà enregistrée, copiée ou reçue, par
                exemple une capture d'écran ou un message sauvegardé hors de Tia. Une utilisation illicite de telles
                informations peut toutefois être signalée et peut engager la responsabilité de son auteur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                7. Contact
              </h2>
              <p className="text-gray-600 mb-6">
                Pour toute demande relative à la suppression d'un Compte ou de données :
              </p>
              <div className="bg-gradient-to-r from-primary/10 to-purple-50 rounded-lg p-6 flex items-center gap-4">
                <div className="bg-white rounded-full p-3">
                  <svg
                    className="w-6 h-6 text-primary"
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
                  <p className="text-sm text-gray-600 mb-1">APLI SARLU — Tia · LOGT 51, Cité Ampefiloha, Antananarivo, Madagascar</p>
                  <a
                    href="mailto:info@tia-meet.com"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    info@tia-meet.com
                  </a>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>
      {!isEmbed && <Footer />}
    </div>
  );
}

export default function AccountDeletionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <AccountDeletionContent />
    </Suspense>
  );
}
