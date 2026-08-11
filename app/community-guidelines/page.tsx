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

function CommunityGuidelinesContent() {
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
              Règles de la Communauté TIA
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
                TIA veut offrir un environnement de rencontre respectueux entre adultes. L'accès au Service implique
                le respect des présentes règles. Une violation peut entraîner avertissement, restriction, suspension
                ou bannissement définitif, selon la gravité et le risque.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                1. Réservé aux 18 ans et plus
              </h2>
              <p className="text-gray-600 mb-4">Vous devez avoir au moins 18 ans. Il est interdit de :</p>
              <ul className="space-y-2">
                <Bullet>créer un Compte si vous êtes mineur ;</Bullet>
                <Bullet>permettre à un mineur d'utiliser votre Compte ;</Bullet>
                <Bullet>créer un profil au nom d'un mineur ;</Bullet>
                <Bullet>publier du contenu sexualisant un mineur ;</Bullet>
                <Bullet>contacter un mineur à des fins romantiques ou sexuelles.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                2. Soyez authentique
              </h2>
              <p className="text-gray-600 mb-4">Utilisez vos propres informations et photos. Sont interdits :</p>
              <ul className="space-y-2">
                <Bullet>faux profils ;</Bullet>
                <Bullet>usurpation d'identité ;</Bullet>
                <Bullet>utilisation de photos volées ;</Bullet>
                <Bullet>identité fictive utilisée pour tromper ou nuire ;</Bullet>
                <Bullet>falsification d'âge ;</Bullet>
                <Bullet>comptes multiples destinés à contourner une sanction.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                3. Respect et consentement
              </h2>
              <p className="text-gray-600 mb-4">
                Ne harcelez pas une personne qui ne souhaite pas poursuivre une conversation. Sont interdits :
              </p>
              <ul className="space-y-2">
                <Bullet>menaces ;</Bullet>
                <Bullet>intimidation ;</Bullet>
                <Bullet>insultes répétées ;</Bullet>
                <Bullet>stalking ;</Bullet>
                <Bullet>coercition sexuelle ;</Bullet>
                <Bullet>pression pour obtenir une rencontre, un numéro ou une photo intime ;</Bullet>
                <Bullet>sexualisation non sollicitée ;</Bullet>
                <Bullet>contenu sexuel envoyé sans consentement.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                4. Aucun contenu sexuel impliquant des mineurs
              </h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-800 mb-0">
                  TIA applique une tolérance zéro au CSAM, au grooming et à toute exploitation sexuelle d'enfant.
                  Tout comportement de ce type peut entraîner un bannissement immédiat, la préservation des preuves
                  et une coopération avec les autorités selon la loi.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                5. Pas de haine ni de discrimination abusive
              </h2>
              <p className="text-gray-600 mb-4">
                Sont interdits les contenus ou comportements qui attaquent, menacent, déshumanisent ou appellent à
                la violence contre une personne ou un groupe en raison notamment d'une caractéristique protégée par
                la loi applicable.
              </p>
              <p className="text-gray-600">
                Les préférences personnelles de rencontre peuvent être exprimées dans les limites des
                fonctionnalités prévues, mais elles ne justifient pas l'humiliation, l'insulte ou l'incitation à la
                haine.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                6. Pas de violence ni de menace
              </h2>
              <p className="text-gray-600 mb-4">Il est interdit :</p>
              <ul className="space-y-2 mb-4">
                <Bullet>de menacer de blesser ou tuer une personne ;</Bullet>
                <Bullet>de glorifier une agression réelle contre un Utilisateur ;</Bullet>
                <Bullet>de publier une menace crédible ;</Bullet>
                <Bullet>d'utiliser TIA pour planifier une agression, un enlèvement, une extorsion ou un crime.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic">
                TIA peut suspendre immédiatement un Compte lorsqu'un risque grave est suspecté.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                7. Pas d'escroquerie ni de sollicitation financière
              </h2>
              <p className="text-gray-600 mb-4">Sont interdits :</p>
              <ul className="space-y-2">
                <Bullet>demandes d'argent trompeuses ;</Bullet>
                <Bullet>faux investissements ;</Bullet>
                <Bullet>prêts entre inconnus proposés comme condition d'une relation ;</Bullet>
                <Bullet>fraude au paiement ;</Bullet>
                <Bullet>phishing ;</Bullet>
                <Bullet>vol d'identifiants ;</Bullet>
                <Bullet>arnaques sentimentales ;</Bullet>
                <Bullet>chantage ou sextortion.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                8. Pas de prostitution, exploitation ou traite
              </h2>
              <p className="text-gray-600 mb-4">
                TIA ne peut pas être utilisé pour organiser, promouvoir ou faciliter :
              </p>
              <ul className="space-y-2">
                <Bullet>prostitution ou escorting ;</Bullet>
                <Bullet>exploitation sexuelle ;</Bullet>
                <Bullet>traite des êtres humains ;</Bullet>
                <Bullet>recrutement coercitif ;</Bullet>
                <Bullet>trafic illicite.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                9. Respectez la vie privée
              </h2>
              <p className="text-gray-600 mb-4">Il est interdit de :</p>
              <ul className="space-y-2">
                <Bullet>publier l'adresse privée d'une personne sans autorisation ;</Bullet>
                <Bullet>partager un document d'identité tiers ;</Bullet>
                <Bullet>diffuser un numéro privé ou des données financières pour nuire ;</Bullet>
                <Bullet>publier des images intimes sans consentement ;</Bullet>
                <Bullet>menacer de révéler une conversation ou un contenu privé afin d'obtenir un avantage.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                10. Contenus intimes et pornographiques
              </h2>
              <p className="text-gray-600">
                TIA peut limiter ou interdire les contenus explicitement pornographiques selon les fonctionnalités
                et politiques applicables. Les images intimes non consenties, les menaces de diffusion et tout
                contenu impliquant une personne mineure sont strictement interdits.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                11. Pas de spam ou d'usage commercial non autorisé
              </h2>
              <p className="text-gray-600 mb-4">Sont interdits sans autorisation de TIA :</p>
              <ul className="space-y-2">
                <Bullet>publicité répétitive ;</Bullet>
                <Bullet>recrutement commercial ;</Bullet>
                <Bullet>vente de produits ou services ;</Bullet>
                <Bullet>liens d'affiliation ;</Bullet>
                <Bullet>systèmes pyramidaux ;</Bullet>
                <Bullet>collecte de prospects ;</Bullet>
                <Bullet>sollicitation politique ou commerciale automatisée.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                12. Pas de manipulation technique
              </h2>
              <p className="text-gray-600 mb-4">Il est interdit de :</p>
              <ul className="space-y-2">
                <Bullet>scraper les profils ;</Bullet>
                <Bullet>utiliser bots ou scripts non autorisés ;</Bullet>
                <Bullet>contourner les limitations ;</Bullet>
                <Bullet>tester ou exploiter une faille sans autorisation ;</Bullet>
                <Bullet>introduire un logiciel malveillant ;</Bullet>
                <Bullet>tenter d'accéder au Compte d'autrui ;</Bullet>
                <Bullet>falsifier des données techniques pour contourner une sanction.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                13. Signalez les comportements dangereux
              </h2>
              <p className="text-gray-600 mb-4">Signalez immédiatement :</p>
              <ul className="space-y-2 mb-4">
                <Bullet>un Compte paraissant mineur ;</Bullet>
                <Bullet>une menace ;</Bullet>
                <Bullet>une escroquerie ;</Bullet>
                <Bullet>un harcèlement ;</Bullet>
                <Bullet>une agression ;</Bullet>
                <Bullet>un faux profil ;</Bullet>
                <Bullet>un contenu sexuel non consenti ;</Bullet>
                <Bullet>tout comportement contraire à ces règles.</Bullet>
              </ul>
              <p className="text-gray-600">
                Le signalement peut être fait dans l'Application ou à{" "}
                <a href="mailto:info@tia-meet.com" className="text-primary hover:underline font-medium">
                  info@tia-meet.com
                </a>
                .
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                14. Modération et sanctions
              </h2>
              <p className="text-gray-600 mb-4">TIA peut prendre notamment les mesures suivantes :</p>
              <ul className="space-y-2 mb-4">
                <Bullet>avertissement ;</Bullet>
                <Bullet>suppression de contenu ;</Bullet>
                <Bullet>limitation d'une fonctionnalité ;</Bullet>
                <Bullet>suspension ;</Bullet>
                <Bullet>vérification supplémentaire ;</Bullet>
                <Bullet>bannissement définitif ;</Bullet>
                <Bullet>prévention de réinscription ;</Bullet>
                <Bullet>coopération avec les autorités lorsque la loi l'exige ou l'autorise.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic">
                La sanction dépend notamment de la gravité, de la répétition, du contexte, de la crédibilité du
                signalement et du risque pour autrui. TIA n'est pas tenue de révéler l'intégralité de ses méthodes
                de détection ou de sécurité lorsqu'une telle divulgation pourrait faciliter leur contournement.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                15. Sécurité hors plateforme
              </h2>
              <p className="text-gray-600">
                Un comportement dangereux commis après qu'une conversation a quitté TIA peut conduire à une sanction
                du Compte lorsqu'il est suffisamment lié à l'utilisation du Service et qu'il démontre un risque pour
                la communauté. Le fait de déplacer une conversation vers un autre service n'autorise pas un
                comportement interdit par les présentes règles.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                16. Contestation d'une mesure
              </h2>
              <p className="text-gray-600">
                Lorsque TIA met à disposition une procédure d'appel ou lorsque la loi l'exige, l'Utilisateur peut
                demander le réexamen d'une décision de modération. La demande doit être faite de bonne foi et ne
                suspend pas automatiquement une mesure prise pour protéger la sécurité d'autrui.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                17. Règle générale
              </h2>
              <p className="text-gray-600">
                Si un comportement n'est pas expressément cité mais qu'il est manifestement frauduleux, dangereux,
                abusif, illégal ou contraire à l'objectif d'un service de rencontres entre adultes, TIA peut prendre
                les mesures raisonnablement nécessaires pour protéger le Service et ses Utilisateurs.
              </p>
            </section>
          </article>
        </div>
      </main>
      {!isEmbed && <Footer />}
    </div>
  );
}

export default function CommunityGuidelinesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <CommunityGuidelinesContent />
    </Suspense>
  );
}
