"use client";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TermsContent() {
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
              Termes et Conditions d&apos;utilisations des services de APLI
              SARLU
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
              <span>Dernière mise à jour : Décembre 2025</span>
            </div>
          </div>

          <article className="px-8 py-10 prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <p className="text-gray-700 leading-relaxed mb-0">
                En accédant à la plateforme ou en utilisant les services de APLI
                SARLU, l&apos;Utilisateur certifie avoir au moins 18 ans révolu
                et avoir les capacités légales pour conclure un contrat.
                L&apos;Utilisateur déclare être de bonne moralité et confirme
                avoir lu et compris Termes et Conditions d&apos;Utilisation des
                Services (les « T&amp;C ») qui lui est opposable dans toutes ses
                dispositions – sans que la signature de l&apos;Utilisateur ne
                soit requise.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                1. Définitions
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Contrat :</strong> tout document liant
                    l&apos;Utilisateur et APLI SARLU, incluant notamment les
                    T&amp;C.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Données personnelles :</strong> toute information
                    relative à une personne physique identifiée ou permettant de
                    l&apos;identifier directement ou indirectement incluant les
                    aspects physiques, physiologiques, psychiques, économiques,
                    culturels ou sociaux.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Loi :</strong> toute règlementation applicable sur
                    le territoire de Madagascar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Utilisateur :</strong> toute personne qui utilise ou
                    exploite les services de APLI SARLU.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Service :</strong> la mise à disposition par APLI
                    SARLU d&apos;une plateforme d&apos;échange (l&apos;«{" "}
                    <strong>Outil</strong> ») pour les Utilisateurs.
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                2. Objet
              </h2>
              <p className="text-gray-600">
                Les présentes T&amp;C ont pour objectif de définir les modalités
                d&apos;utilisation du Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                3. Durée et date d&apos;effet
              </h2>
              <p className="text-gray-600 mb-4">
                Le Contrat est conclu pour une durée déterminée selon la formule
                d&apos;abonnement choisie par l&apos;Utilisateur. Une fois
                arrivée à l&apos;échéance, la durée sera renouvelée par tacite
                reconduction pour la durée initiale, sauf demande de résiliation
                intervenue avant l&apos;échéance.
              </p>
              <p className="text-gray-600">
                La souscription au service de APLI SARLU prend effet à compter
                de la création du profil de l&apos;utilisateur.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                4. Obligations et Responsabilité de APLI SARLU
              </h2>
              <p className="text-gray-600 mb-4">
                APLI SARLU met à disposition aux Utilisateurs l&apos;accès à
                l&apos;Outil. En utilisant l&apos;Outil, l&apos;Utilisateur
                reconnait et consent à adhérer à l&apos;intégralité des T&amp;C
                et consent expressément au traitement et à l&apos;exploitation
                par APLI SARLU de toutes les données communiquées par
                l&apos;Utilisateur.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">
                  L&apos;obligation de APLI SARLU est une{" "}
                  <strong>obligation de moyen</strong>, soit la mise à
                  disposition aux Utilisateurs d&apos;une plateforme pour
                  rencontrer l&apos;élue de son cœur.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                5. Limitation de Responsabilité de APLI SARLU
              </h2>
              <p className="text-gray-600 mb-4">
                APLI SARLU ne garantit pas la fiabilité et l&apos;authenticité
                des informations communiquées par les Utilisateurs. Par
                ailleurs, APLI SARLU n&apos;intervient pas dans les échanges
                privés.
              </p>
              <p className="text-gray-600 mb-4">
                La responsabilité de APLI SARLU est limitée à mettre à
                disposition des Utilisateurs l&apos;accès à l&apos;Outil.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>
                  La responsabilité de APLI SARLU ne peut pas être engagée :
                </strong>
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    En cas d&apos;utilisation inappropriée de l&apos;Outil par
                    un/les Utilisateurs et/ou un usurpateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    En cas d&apos;usage frauduleux d&apos;un élément du
                    profil/du profil Utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    En cas d&apos;utilisation de l&apos;Outil contraire aux
                    bonnes mœurs (prostitution, escorting, traite humaine et
                    trafic illégal sous toutes ses formes) et de toute pratique
                    sanctionnée par la Loi
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 mb-4">
                De manière générale, APLI SARLU n&apos;est pas responsable du
                contenu publié par les Utilisateurs ou les publicités qui
                peuvent s&apos;afficher sur la plateforme.
              </p>
              <p className="text-gray-600 mb-4">
                La responsabilité de APLI SARLU ne peut pas être recherchée dans
                le cas où les attentes de l&apos;Utilisateur ne se concrétisent
                pas.
              </p>
              <p className="text-gray-600 text-sm italic">
                L&apos;Utilisateur reconnaît et accepte que le Service peut ne
                pas être accessible dans certaines zones géographiques.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                6. Obligations et Responsabilité de l&apos;Utilisateur
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>L&apos;Utilisateur s&apos;engage à :</strong>
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Utiliser l&apos;Outil exclusivement à des fins de rencontres
                    sérieuses aboutissant à une union durable et sincère
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Garantir la fiabilité des Données Personnelles le concernant
                    ou permettant de l&apos;identifier, communiquées lors de la
                    création de son profil d&apos;Utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Adopter un comportement respectueux dans tout échange sur la
                    plateforme et/ou avec un autre Utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Ne pas divulguer/partager/transférer/capturer/capter et
                    généralement, exploiter directement ou indirectement toute
                    information/donnée dont il pourrait avoir accès
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    S&apos;interdire de partager des photos/image intimes,
                    pornographiques, pédopornographiques, racistes ou obscènes
                    en public ou en privé
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    S&apos;interdire de partager toute information sensible,
                    secrète ou confidentielle le concernant ou non, directement
                    sur la plateforme et/ou sur tout autre moyen de
                    communication avec un autre Utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    S&apos;interdire d&apos;effectuer toute forme de transaction
                    financière avec un autre Utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Examiner avec précaution l&apos;opportunité et la pertinence
                    d&apos;une rencontre physique
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Prendre toute mesure de prudence et de sécurité nécessaire
                    pour toute information partagée et généralement à faire
                    preuve de discernement
                  </span>
                </li>
              </ul>

              <p className="text-gray-600 mb-4">
                <strong>L&apos;Utilisateur est seul responsable :</strong>
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    De la confidentialité et de la sécurité de ses identifiants
                    qu&apos;il s&apos;engage à ne pas communiquer à des tiers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Des informations ou du contenu qu&apos;il affiche, partage,
                    communique via l&apos;Outil et par extension en tout lieu
                    physique et/ou virtuelle avec un autre Utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    De toute suite d&apos;un échange qui a pris naissance sur
                    l&apos;outil. L&apos;Utilisateur est averti que APLI SARLU
                    n&apos;intervient pas dans les échanges privés en tout lieu,
                    physique ou réelle
                  </span>
                </li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-800 mb-2">
                  <strong>
                    Pour tout manquement à l&apos;une quelconque des
                    dispositions mentionnées dans les T&amp;C,
                    l&apos;Utilisateur exonère APLI SARLU de toute responsabilité
                    et s&apos;expose :
                  </strong>
                </p>
                <ul className="space-y-1 text-yellow-800">
                  <li>• Au bannissement de tout service de APLI SARLU</li>
                  <li>
                    • À toute poursuite et aux conséquences légales de tout
                    manquement à une obligation et à toute violation d&apos;une
                    disposition légale et règlementaires applicable à Madagascar
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                7. Tarifs et Modalités de Règlement
              </h2>
              <p className="text-gray-600 mb-4">
                Les tarifs applicables sont ceux communiqués aux Utilisateurs
                sur tout support. APLI SARLU se réserve de modifier ses tarifs
                sans information préalable.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">
                  Le règlement des services payants s&apos;effectue au 1er jour
                  de l&apos;accès au service et/ou au 1er jour de tout
                  renouvellement d&apos;accès au service, par{" "}
                  <strong>transaction bancaire</strong> ou{" "}
                  <strong>transfert de mobile money</strong>.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                8. Données Personnelles
              </h2>
              <p className="text-gray-600 mb-4">
                APLI SARLU traite les Données Personnelles des Utilisateurs pour
                les besoins du Service. En utilisant le Service fournit par APLI
                SARLU, l&apos;Utilisateur autorise expressément APLI SARLU à
                collecter, et de manière générale à traiter et à conserver les
                Données Personnelles.
              </p>
              <p className="text-gray-600 mb-4">
                Dans le cadre de l&apos;exécution du Service, cette autorisation
                est également accordée aux prestataires et partenaires de APLI
                SARLU.
              </p>
              <p className="text-gray-600 mb-4">
                L&apos;Utilisateur bénéficie des droits d&apos;accès, de
                rectification ainsi que des droits mentionnés dans la Loi sur
                les Données Personnelles, en adressant un mail avec accusé de
                réception à{" "}
                <a
                  href="mailto:info@tia-meet.com"
                  className="text-primary hover:underline font-medium"
                >
                  info@tia-meet.com
                </a>
                .
              </p>
              <div className="bg-purple-50 rounded-lg p-6">
                <p className="text-gray-700">
                  Les données des Utilisateurs sont conservées pendant une durée
                  d&apos;un (01) an après la résiliation et pendant toute la
                  durée du service utilisé par l&apos;Utilisateur. Après
                  l&apos;issue de la période d&apos;un (01) an les données
                  personnelles de l&apos;Utilisateur sont supprimées ou sont
                  rendues anonymes selon le cas.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                9. Suspension et Résiliation du Contrat
              </h2>
              <p className="text-gray-600 mb-4">
                Tout comportement/contenu inapproprié par l&apos;Utilisateur
                peut entraîner le blocage du compte personnel de
                l&apos;Utilisateur, ou la suppression du compte
                d&apos;utilisateur, à la discrétion de APLI SARLU et aux torts
                de l&apos;utilisateur.
              </p>
              <p className="text-gray-600 mb-4">
                APLI SARLU se réserve de mettre en place des outils de
                vérification et d&apos;effectuer des vérifications des
                informations disponibles sur la plateforme.
              </p>
              <p className="text-gray-600 mb-4">
                Le défaut de paiement à son échéance d&apos;un service premium
                résilie tout avantage premium accordé à un Utilisateur.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-800 font-semibold">
                  Les paiements effectués ne donnent pas lieu à un
                  remboursement.
                </p>
              </div>
              <p className="text-gray-600">
                L&apos;Utilisateur peut mettre fin à tout moment, à son adhésion
                au Service par mail avec accusé de réception à{" "}
                <a
                  href="mailto:info@tia-meet.com"
                  className="text-primary hover:underline font-medium"
                >
                  info@tia-meet.com
                </a>
                . APLI SARLU lui communiquera toutes les informations
                nécessaires sur les modalités de la résiliation.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                10. Inactivité
              </h2>
              <p className="text-gray-600">
                APLI SARLU se réserve le droit de suspendre voire de supprimer
                tout profil Utilisateur ayant souscrit à un service gratuit qui
                est resté inactif après trente (30) jours.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                11. Loi et différend
              </h2>
              <p className="text-gray-600 mb-4">
                La Loi Malgache est applicable.
              </p>
              <p className="text-gray-600">
                Tout différend doit être préalablement signalé à APLI SARLU.
                Après épuisement des voies de recours amiable, le dossier est
                rapporté devant le{" "}
                <strong>Tribunal de Commerce d&apos;Antananarivo, Madagascar</strong>{" "}
                par la Partie la plus diligente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                12. Modification
              </h2>
              <p className="text-gray-600">
                APLI SARLU se réserve de modifier tout ou partie des T&amp;C, à
                tout moment.
              </p>
            </section>
          </article>
        </div>
      </main>
      {!isEmbed && <Footer />}
    </div>
  );
}

export default function TermsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <TermsContent />
    </Suspense>
  );
}
