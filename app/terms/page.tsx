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
              Conditions Générales d&apos;Utilisation des services de APLI
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
              <span>Dernière mise à jour : Août 2026</span>
            </div>
          </div>

          <article className="px-8 py-10 prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <p className="text-gray-700 leading-relaxed mb-0">
                En accédant à la plateforme ou en utilisant les services de
                APLI SARLU (ci-après « TIA », « la Société », « nous »),
                l&apos;Utilisateur certifie avoir au moins 18 ans révolus et
                disposer de la pleine capacité juridique de contracter. Il
                déclare agir de bonne foi et confirme avoir lu et compris les
                présentes Conditions Générales d&apos;Utilisation (les «
                CGU » ou « T&amp;C »), qui lui sont opposables dans toutes
                leurs dispositions, sans que sa signature manuscrite ne soit
                requise. L&apos;acceptation intervient par tout mécanisme de
                consentement exprès proposé dans l&apos;Application (case à
                cocher ou action équivalente lors de l&apos;inscription).
                Toute personne ne remplissant pas ces conditions doit
                s&apos;abstenir d&apos;utiliser l&apos;Application.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                1. Identification de l&apos;éditeur (mentions légales)
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Éditeur :</strong> APLI SARLU — Société à
                  Responsabilité Limitée Unipersonnelle de droit malgache
                </p>
                <p className="text-gray-700">
                  <strong>Siège social :</strong> LOGT 51, Cité Ampefiloha,
                  Antananarivo, Madagascar
                </p>
                <p className="text-gray-700">
                  <strong>Numéro d&apos;immatriculation (RCS / NIF / STAT) :</strong>{" "}
                  à compléter
                </p>
                <p className="text-gray-700">
                  <strong>Directeur de la publication :</strong> à compléter
                </p>
                <p className="text-gray-700">
                  <strong>Email de contact :</strong>{" "}
                  <a
                    href="mailto:info@tia-meet.com"
                    className="text-primary hover:underline"
                  >
                    info@tia-meet.com
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                2. Définitions
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Contrat :</strong> tout document liant
                    l&apos;Utilisateur et TIA, incluant notamment les
                    présentes CGU.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Données personnelles :</strong> toute information
                    relative à une personne physique identifiée ou permettant
                    de l&apos;identifier directement ou indirectement.
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
                    <strong>Utilisateur :</strong> toute personne qui crée un
                    Compte, utilise ou exploite les services de TIA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Service / Outil :</strong> la plateforme
                    d&apos;échange mise à disposition par TIA, y compris ses
                    fonctionnalités assistées par intelligence artificielle.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Contenu :</strong> toute donnée, texte, image ou
                    information publiée ou transmise par un Utilisateur via
                    l&apos;Application.
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                3. Objet
              </h2>
              <p className="text-gray-600">
                Les présentes CGU ont pour objectif de définir les modalités
                d&apos;utilisation du Service ainsi que les droits et
                obligations réciproques des parties.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                4. Acceptation, capacité et éligibilité
              </h2>
              <p className="text-gray-600">
                En s&apos;inscrivant, l&apos;Utilisateur déclare et garantit
                qu&apos;il est âgé de 18 ans révolus, qu&apos;il dispose de la
                capacité juridique de contracter, que les informations
                qu&apos;il fournit sont exactes et à jour, et qu&apos;il
                n&apos;a pas été précédemment banni ou suspendu de
                l&apos;Application pour quelque motif que ce soit. TIA se
                réserve le droit de refuser, suspendre ou résilier
                l&apos;accès au Service à toute personne ne satisfaisant pas
                à ces conditions, sans préavis ni indemnité.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                5. Durée, abonnement et renouvellement
              </h2>
              <p className="text-gray-600 mb-4">
                Le Contrat prend effet à la création du Compte. Les formules
                payantes sont souscrites pour la durée choisie par
                l&apos;Utilisateur et se renouvellent par tacite reconduction
                pour une durée identique, sauf résiliation effectuée avant
                l&apos;échéance selon les modalités propres à la plateforme
                de paiement utilisée.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">
                  Les achats intégrés effectués via l&apos;App Store
                  d&apos;Apple ou Google Play demeurent en outre soumis aux
                  conditions générales de ces plateformes.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                6. Description du Service et absence de garantie de résultat
              </h2>
              <p className="text-gray-600 mb-4">
                Le Service, y compris ses fonctionnalités assistées par
                intelligence artificielle (suggestions, scores de
                compatibilité, aide à la conversation), est fourni «{" "}
                <strong>en l&apos;état</strong> » et «{" "}
                <strong>selon disponibilité</strong> », sans garantie
                d&apos;aucune sorte, expresse ou implicite, notamment quant à
                sa disponibilité continue, son absence d&apos;erreur, son
                adéquation à un usage particulier, l&apos;exactitude des
                suggestions générées par l&apos;intelligence artificielle, ou
                le résultat obtenu par l&apos;Utilisateur.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">
                  TIA ne garantit ni la survenance d&apos;une rencontre, ni la
                  qualité, la sincérité ou l&apos;issue d&apos;une relation
                  nouée via le Service.{" "}
                  <strong>L&apos;obligation de TIA est une obligation de moyen</strong>,
                  soit la mise à disposition aux Utilisateurs d&apos;une
                  plateforme pour rencontrer l&apos;élue de son cœur.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                7. Limitation de Responsabilité de TIA
              </h2>
              <p className="text-gray-600 mb-4">
                Dans toute la mesure permise par la loi applicable, la
                responsabilité de TIA ne peut pas être engagée :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Au titre de l&apos;exactitude, de la fiabilité ou de
                    l&apos;authenticité des informations, photographies ou
                    déclarations communiquées par les Utilisateurs, y compris
                    leur identité, âge, situation personnelle ou intentions.
                    TIA ne procède à aucune vérification exhaustive
                    d&apos;antécédents et ne garantit pas l&apos;absence
                    d&apos;usurpation d&apos;identité.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Au titre des suites données à un échange né sur
                    l&apos;Outil, qu&apos;il se poursuive en ligne ou lors
                    d&apos;une rencontre physique, y compris tout préjudice
                    corporel, moral, financier ou matériel en résultant. TIA
                    n&apos;intervient pas dans les échanges privés.
                  </span>
                </li>
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
                    profil/du profil Utilisateur, ou de perte financière
                    résultant d&apos;une sollicitation d&apos;argent par un
                    tiers. TIA rappelle qu&apos;elle ne sollicite jamais de
                    paiement en dehors des canaux officiels de
                    l&apos;Application.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    En cas d&apos;utilisation de l&apos;Outil contraire aux
                    bonnes mœurs (prostitution, escorting, traite humaine et
                    trafic illégal sous toutes ses formes) et de toute
                    pratique sanctionnée par la Loi
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Au titre du Contenu publié par les Utilisateurs ou des
                    publicités affichées sur la plateforme, TIA agissant en
                    qualité de prestataire technique d&apos;hébergement, sans
                    obligation générale de surveillance préalable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Au titre de l&apos;interruption, de la suspension, de
                    l&apos;indisponibilité, des dysfonctionnements techniques
                    ou de la perte de données du Service, ni des défaillances
                    de ses prestataires tiers (hébergement, paiement,
                    notifications).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Au titre des suggestions ou contenus générés par les
                    fonctionnalités d&apos;intelligence artificielle, fournis
                    à titre purement indicatif et ne pouvant engager la
                    responsabilité de TIA en cas d&apos;inexactitude ou de
                    résultat non conforme aux attentes de l&apos;Utilisateur.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Du seul fait que les attentes de l&apos;Utilisateur ne se
                    concrétisent pas.
                  </span>
                </li>
              </ul>
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-0">
                  Dans les limites permises par la loi applicable, la
                  responsabilité totale de TIA, tous fondements confondus, ne
                  pourra excéder le montant versé par l&apos;Utilisateur au
                  titre du Service au cours des douze (12) mois précédant le
                  fait générateur ; TIA ne pourra être tenue des dommages
                  indirects, immatériels ou consécutifs (perte de profit,
                  perte de chance, perte de données, préjudice moral).
                </p>
              </div>
              <p className="text-gray-600 text-sm italic mb-2">
                Aucune stipulation du présent article n&apos;exclut la
                responsabilité de TIA en cas de faute lourde, de dol, ou dans
                les cas où la loi applicable interdit une telle exclusion.
              </p>
              <p className="text-gray-600 text-sm italic">
                L&apos;Utilisateur reconnaît et accepte que le Service peut ne
                pas être accessible dans certaines zones géographiques.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                8. Obligations et Responsabilité de l&apos;Utilisateur
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>L&apos;Utilisateur s&apos;engage à :</strong>
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Utiliser l&apos;Outil exclusivement à des fins de
                    rencontres sincères entre personnes majeures
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Garantir la fiabilité des Données Personnelles le
                    concernant, communiquées lors de la création de son profil
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Adopter un comportement respectueux et loyal dans tout
                    échange sur la plateforme et/ou avec un autre Utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Ne pas harceler, menacer, injurier, discriminer ou tenir
                    des propos haineux envers un autre Utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Ne pas usurper l&apos;identité d&apos;un tiers ni créer de
                    faux profil
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Ne pas divulguer/partager/transférer/capturer/capter et
                    généralement exploiter directement ou indirectement toute
                    information/donnée dont il pourrait avoir accès
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    S&apos;interdire de partager des photos/images intimes,
                    pornographiques, pédopornographiques, racistes ou obscènes
                    en public ou en privé
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Ne pas collecter, capturer ou exploiter par des moyens
                    automatisés les données d&apos;autres Utilisateurs ou de
                    l&apos;Application (« scraping »), ni recourir à des
                    robots, scripts ou comptes multiples
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Ne pas utiliser l&apos;Application à des fins commerciales
                    ou de sollicitation non autorisées
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    S&apos;interdire toute forme de transaction financière
                    avec un autre Utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    S&apos;interdire de partager toute information sensible,
                    secrète ou confidentielle le concernant ou non
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Signaler tout comportement suspect, notamment toute
                    suspicion qu&apos;un Utilisateur soit mineur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Examiner avec précaution l&apos;opportunité et la
                    pertinence d&apos;une rencontre physique, et prendre toute
                    mesure de prudence utile (lieu public, information
                    préalable d&apos;un proche, appel vidéo avant toute
                    rencontre)
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
                    De la confidentialité et de la sécurité de ses
                    identifiants, qu&apos;il s&apos;engage à ne pas
                    communiquer à des tiers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Des informations ou du contenu qu&apos;il affiche,
                    partage ou communique via l&apos;Outil et, par extension,
                    en tout lieu physique ou virtuel avec un autre Utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    De toute suite d&apos;un échange né sur l&apos;Outil.
                    L&apos;Utilisateur est averti que TIA n&apos;intervient
                    pas dans les échanges privés, en tout lieu, physique ou
                    virtuel
                  </span>
                </li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-800 mb-2">
                  <strong>
                    Pour tout manquement à l&apos;une quelconque des
                    dispositions des présentes CGU, l&apos;Utilisateur
                    exonère TIA de toute responsabilité et s&apos;expose :
                  </strong>
                </p>
                <ul className="space-y-1 text-yellow-800">
                  <li>• Au bannissement de tout service de TIA</li>
                  <li>
                    • À toute poursuite et aux conséquences légales de tout
                    manquement à une obligation et à toute violation
                    d&apos;une disposition légale ou règlementaire applicable
                    à Madagascar, sans préjudice du droit de TIA de coopérer
                    avec les autorités compétentes
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                9. Indemnisation
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-0">
                  L&apos;Utilisateur s&apos;engage à indemniser, défendre et
                  tenir indemne TIA, ses dirigeants, salariés, prestataires et
                  partenaires, de toute réclamation, action, dommage, perte,
                  coût ou dépense (y compris les frais de défense
                  raisonnablement engagés) résultant (i) de la violation des
                  présentes CGU par l&apos;Utilisateur, (ii) de son
                  utilisation du Service, (iii) de tout Contenu qu&apos;il
                  publie, ou (iv) de tout différend avec un autre Utilisateur
                  ou un tiers, dans la mesure permise par la loi applicable.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                10. Propriété intellectuelle
              </h2>
              <p className="text-gray-600 mb-4">
                L&apos;Application, sa technologie, sa marque et ses éléments
                graphiques sont la propriété exclusive de TIA ou de ses
                concédants. Aucune disposition des CGU ne confère à
                l&apos;Utilisateur un droit sur ces éléments, en dehors
                d&apos;un droit d&apos;usage personnel, non exclusif et non
                cessible de l&apos;Application.
              </p>
              <p className="text-gray-600">
                L&apos;Utilisateur conserve la propriété du Contenu qu&apos;il
                publie, mais concède à TIA une licence mondiale, non
                exclusive, gratuite et transférable d&apos;hébergement, de
                reproduction, d&apos;adaptation et de représentation de ce
                Contenu, dans la stricte mesure nécessaire au fonctionnement,
                à la sécurisation et à la promotion du Service. L&apos;Utilisateur
                garantit détenir tous les droits nécessaires sur le Contenu
                publié et que celui-ci ne porte pas atteinte aux droits de
                tiers.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                11. Modération
              </h2>
              <p className="text-gray-600">
                TIA se réserve le droit, à sa seule discrétion et sans
                préavis, de revoir, retirer ou restreindre l&apos;accès à
                tout Contenu ou Compte qu&apos;elle estime de bonne foi
                contraire aux présentes CGU ou à la loi applicable. Cette
                faculté ne constitue pas une obligation générale de
                surveillance et n&apos;engage pas la responsabilité de TIA au
                titre du Contenu qu&apos;elle n&apos;aurait pas retiré.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                12. Tarifs et Modalités de Règlement
              </h2>
              <p className="text-gray-600 mb-4">
                Les tarifs applicables sont ceux communiqués aux Utilisateurs
                sur tout support. TIA se réserve le droit de les modifier, les
                modifications ne s&apos;appliquant qu&apos;aux abonnements
                souscrits postérieurement à leur entrée en vigueur ou lors du
                renouvellement.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700">
                  Le règlement des services payants s&apos;effectue au 1er
                  jour de l&apos;accès au service et/ou au 1er jour de tout
                  renouvellement, par{" "}
                  <strong>transaction bancaire</strong>,{" "}
                  <strong>transfert de mobile money</strong>, ou via les
                  achats intégrés Apple/Google.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                13. Suspension et Résiliation du Contrat
              </h2>
              <p className="text-gray-600 mb-4">
                TIA peut suspendre ou résilier, à tout moment, avec ou sans
                préavis, l&apos;accès d&apos;un Utilisateur au Service,
                notamment en cas de violation des CGU, de comportement
                frauduleux, de risque pour la sécurité d&apos;autres
                Utilisateurs, ou à sa seule discrétion.
              </p>
              <p className="text-gray-600 mb-4">
                TIA se réserve de mettre en place des outils de vérification
                et d&apos;effectuer des vérifications des informations
                disponibles sur la plateforme.
              </p>
              <p className="text-gray-600 mb-4">
                Le défaut de paiement à son échéance d&apos;un service premium
                résilie tout avantage premium accordé à un Utilisateur.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-800 font-semibold">
                  Les paiements effectués ne donnent lieu à aucun
                  remboursement, sauf disposition légale impérative contraire
                  ou politique spécifique de la plateforme de paiement.
                </p>
              </div>
              <p className="text-gray-600">
                L&apos;Utilisateur peut résilier son Compte à tout moment par
                mail avec accusé de réception à{" "}
                <a
                  href="mailto:info@tia-meet.com"
                  className="text-primary hover:underline font-medium"
                >
                  info@tia-meet.com
                </a>
                . Les articles 7 (Limitation de responsabilité), 9
                (Indemnisation), 21 (Loi applicable) et tout article dont la
                nature implique qu&apos;il survive à la résiliation
                demeurent applicables après celle-ci.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                14. Inactivité
              </h2>
              <p className="text-gray-600">
                TIA se réserve le droit de suspendre voire de supprimer tout
                profil Utilisateur ayant souscrit à un service gratuit resté
                inactif après trente (30) jours.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                15. Données personnelles
              </h2>
              <p className="text-gray-600">
                Le traitement des données personnelles des Utilisateurs est
                régi par la{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">
                  Politique de Confidentialité
                </Link>{" "}
                de TIA, incorporée aux présentes CGU par référence et en
                faisant partie intégrante.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                16. Force majeure
              </h2>
              <p className="text-gray-600">
                TIA ne pourra être tenue responsable de tout retard ou
                manquement à ses obligations résultant d&apos;un cas de force
                majeure au sens du droit malgache, incluant notamment
                catastrophes naturelles, pannes d&apos;infrastructures
                d&apos;Internet ou de télécommunication, actes des autorités
                publiques, ou défaillance d&apos;un prestataire tiers
                indépendant de sa volonté.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                17. Divisibilité
              </h2>
              <p className="text-gray-600">
                Si l&apos;une des stipulations des présentes CGU est jugée
                nulle, illicite ou inapplicable, les autres stipulations
                conservent leur pleine force et effet. La stipulation
                concernée sera remplacée par une stipulation valide se
                rapprochant le plus possible de l&apos;intention initiale des
                parties.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                18. Non-renonciation
              </h2>
              <p className="text-gray-600">
                Le fait pour TIA de ne pas se prévaloir, à un moment donné,
                d&apos;une stipulation des présentes CGU ne saurait valoir
                renonciation à s&apos;en prévaloir ultérieurement.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                19. Cession
              </h2>
              <p className="text-gray-600">
                TIA peut céder ou transférer le présent contrat, notamment
                dans le cadre d&apos;une fusion, acquisition ou cession
                d&apos;actifs, sans que le consentement préalable de
                l&apos;Utilisateur soit requis. L&apos;Utilisateur ne peut
                céder ses droits et obligations sans l&apos;accord écrit
                préalable de TIA.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                20. Intégralité de l&apos;accord
              </h2>
              <p className="text-gray-600">
                Les présentes CGU, la Politique de Confidentialité et la
                Politique de Protection des Mineurs constituent
                l&apos;intégralité de l&apos;accord entre l&apos;Utilisateur
                et TIA relatif à l&apos;utilisation du Service, et se
                substituent à tout accord antérieur portant sur le même
                objet.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                21. Loi et différend
              </h2>
              <p className="text-gray-600 mb-4">
                La Loi Malgache est applicable.
              </p>
              <p className="text-gray-600">
                Tout différend doit préalablement faire l&apos;objet
                d&apos;une notification écrite à TIA (
                <a
                  href="mailto:info@tia-meet.com"
                  className="text-primary hover:underline font-medium"
                >
                  info@tia-meet.com
                </a>
                ) et d&apos;une tentative de règlement amiable dans un délai
                de trente (30) jours. À défaut d&apos;accord amiable, le
                dossier est rapporté devant le{" "}
                <strong>Tribunal de Commerce d&apos;Antananarivo, Madagascar</strong>{" "}
                par la Partie la plus diligente, sans préjudice des
                dispositions d&apos;ordre public éventuellement applicables à
                un Utilisateur consommateur en vertu de la loi de son pays de
                résidence, dans la mesure où celles-ci s&apos;imposeraient
                impérativement.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                22. Modification
              </h2>
              <p className="text-gray-600">
                TIA se réserve le droit de modifier tout ou partie des CGU, à
                tout moment. Toute modification substantielle sera notifiée
                aux Utilisateurs via l&apos;Application ou par email, au
                moins quinze (15) jours avant son entrée en vigueur. La
                poursuite de l&apos;utilisation du Service après cette date
                vaut acceptation des CGU modifiées.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                23. Contact
              </h2>
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
                  <p className="text-sm text-gray-600 mb-1">
                    Pour toute question relative aux présentes CGU
                  </p>
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

export default function TermsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <TermsContent />
    </Suspense>
  );
}
