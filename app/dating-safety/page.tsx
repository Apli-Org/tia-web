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

function DatingSafetyContent() {
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
              Charte de Sécurité des Rencontres
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
                TIA est conçu pour faciliter des mises en relation entre personnes majeures. Aucun service de
                rencontres ne peut cependant garantir la sincérité, l'identité, les intentions ou le comportement
                futur de chaque personne. Cette Charte explique les précautions recommandées avant, pendant et après
                une interaction.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                1. Une vérification n'est pas une garantie de sécurité
              </h2>
              <p className="text-gray-600 mb-4">
                Un badge, un selfie vérifié, une validation de téléphone ou un contrôle d'identité signifie
                uniquement qu'un processus technique a été satisfait. Cela ne signifie pas que TIA garantit :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>la moralité de la personne ;</Bullet>
                <Bullet>l'absence d'antécédents ;</Bullet>
                <Bullet>son état civil ;</Bullet>
                <Bullet>ses intentions ;</Bullet>
                <Bullet>sa santé ;</Bullet>
                <Bullet>son comportement futur.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic">Restez prudent même avec un profil vérifié.</p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                2. Prenez le temps d'échanger
              </h2>
              <p className="text-gray-600 mb-4">Avant une rencontre physique :</p>
              <ul className="space-y-2">
                <Bullet>échangez suffisamment pour détecter les incohérences ;</Bullet>
                <Bullet>méfiez-vous des déclarations d'amour ou d'urgence financière très rapides ;</Bullet>
                <Bullet>utilisez si possible un appel audio ou vidéo avant de vous déplacer ;</Bullet>
                <Bullet>ne donnez pas immédiatement votre adresse personnelle, lieu de travail précis ou informations financières.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                3. N'envoyez jamais d'argent à une personne rencontrée sur TIA
              </h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-800 font-semibold mb-0">
                  Les demandes d'argent, investissements, prêts, achats de billets, urgences familiales ou demandes
                  de codes de paiement sont des signaux de risque.
                </p>
              </div>
              <p className="text-gray-600">
                TIA ne garantit aucune transaction entre Utilisateurs et ne vous demandera pas de payer un autre
                Utilisateur pour débloquer un Match ou conserver un Compte. Signalez toute sollicitation suspecte.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                4. Protégez vos informations personnelles
              </h2>
              <p className="text-gray-600 mb-4">Évitez de transmettre trop tôt :</p>
              <ul className="space-y-2 mb-4">
                <Bullet>adresse personnelle ;</Bullet>
                <Bullet>numéro de pièce d'identité ;</Bullet>
                <Bullet>mots de passe ou codes OTP ;</Bullet>
                <Bullet>informations bancaires ;</Bullet>
                <Bullet>localisation en temps réel ;</Bullet>
                <Bullet>documents privés ;</Bullet>
                <Bullet>photos intimes permettant de vous identifier.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Un destinataire peut enregistrer ou copier ce que vous lui envoyez, même si cela est interdit par
                les CGU.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                5. Première rencontre : privilégiez un lieu public
              </h2>
              <p className="text-gray-600 mb-4">Pour une première rencontre :</p>
              <ul className="space-y-2">
                <Bullet>choisissez un lieu fréquenté ;</Bullet>
                <Bullet>évitez un domicile privé ou une zone isolée ;</Bullet>
                <Bullet>informez un proche de votre rendez-vous ;</Bullet>
                <Bullet>conservez votre propre moyen de transport ;</Bullet>
                <Bullet>gardez votre téléphone chargé ;</Bullet>
                <Bullet>prévoyez une manière simple de partir à tout moment.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                6. Alcool et substances
              </h2>
              <p className="text-gray-600 mb-4">
                Une consommation importante d'alcool ou de substances peut réduire la capacité à évaluer une
                situation et à consentir librement. Ne laissez pas une personne inconnue contrôler vos boissons,
                médicaments, transport ou moyens de communication.
              </p>
              <p className="text-gray-600">
                Si vous vous sentez désorienté, menacé ou physiquement mal, quittez la situation lorsque cela est
                possible et contactez une personne de confiance ou les services locaux compétents.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                7. Consentement
              </h2>
              <p className="text-gray-600 mb-4">
                Le consentement doit être libre, clair et peut être retiré à tout moment. Un Match, une conversation,
                une photo, un flirt, un rendez-vous ou une relation antérieure ne constitue jamais un consentement
                permanent à une activité sexuelle ou physique.
              </p>
              <p className="text-gray-600">
                Toute pression, menace ou acte sexuel non consenti doit être pris au sérieux.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                8. Si quelque chose semble anormal
              </h2>
              <p className="text-gray-600 mb-4">Interrompez une interaction si une personne :</p>
              <ul className="space-y-2 mb-4">
                <Bullet>refuse systématiquement toute vérification raisonnable ;</Bullet>
                <Bullet>change fréquemment d'identité ou d'histoire ;</Bullet>
                <Bullet>vous menace ou vous fait culpabiliser ;</Bullet>
                <Bullet>demande de l'argent ;</Bullet>
                <Bullet>tente de vous isoler ;</Bullet>
                <Bullet>insiste pour obtenir des photos intimes ;</Bullet>
                <Bullet>prétend avoir moins de 18 ans ;</Bullet>
                <Bullet>vous demande de garder secrète une situation dangereuse.</Bullet>
              </ul>
              <p className="text-gray-600 font-medium">Utilisez les fonctions Bloquer et Signaler.</p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                9. Mineurs
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-yellow-800 mb-0">
                  TIA est strictement réservé aux personnes âgées de 18 ans et plus. Si une personne indique ou
                  laisse raisonnablement penser qu'elle est mineure, interrompez immédiatement toute interaction
                  romantique ou sexuelle et signalez le Compte.
                </p>
              </div>
              <p className="text-gray-600">
                Ne demandez jamais à une personne potentiellement mineure d'envoyer des images intimes afin de «
                prouver » son âge.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                10. Communications hors TIA
              </h2>
              <p className="text-gray-600">
                Lorsque vous quittez TIA pour WhatsApp, téléphone, email ou un réseau social, TIA ne contrôle plus
                l'environnement technique de la conversation. Le fait qu'un Match ait commencé sur TIA ne signifie
                pas que TIA approuve ou supervise les échanges effectués ailleurs.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                11. Signaler un incident
              </h2>
              <p className="text-gray-600 mb-4">
                Vous pouvez signaler un profil ou une conversation dans l'Application lorsque la fonctionnalité est
                disponible, ou écrire à{" "}
                <a href="mailto:info@tia-meet.com" className="text-primary hover:underline font-medium">
                  info@tia-meet.com
                </a>
                . TIA peut suspendre un Compte, préserver des éléments et coopérer avec les autorités lorsque la
                situation le justifie.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-800 mb-0">
                  Pour une urgence immédiate, contactez directement les services d'urgence ou les autorités locales.
                  TIA n'est pas un service d'urgence et ne peut intervenir physiquement sur le lieu d'un incident.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                12. Responsabilité personnelle
              </h2>
              <p className="text-gray-600">
                Chaque Utilisateur reste responsable de ses décisions, déplacements et interactions. Les outils de
                sécurité de TIA sont destinés à réduire certains risques ; ils ne peuvent éliminer tous les risques
                liés à des personnes malintentionnées.
              </p>
            </section>
          </article>
        </div>
      </main>
      {!isEmbed && <Footer />}
    </div>
  );
}

export default function DatingSafetyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <DatingSafetyContent />
    </Suspense>
  );
}
