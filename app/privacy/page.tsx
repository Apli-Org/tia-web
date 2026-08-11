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

function PrivacyContent() {
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
              Politique de Confidentialité
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
              <span>Version 2.0 — Dernière mise à jour : 11 août 2026</span>
            </div>
          </div>

          <article className="px-8 py-10 prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <p className="text-gray-700 leading-relaxed mb-0">
                La présente Politique de Confidentialité explique comment APLI SARLU, exploitant de TIA, collecte,
                utilise, partage, conserve et protège les données personnelles liées à l'utilisation de
                l'application TIA et de ses services associés.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-10">
              Elle doit être lue avec les{" "}
              <Link href="/terms" className="text-primary hover:underline font-medium">
                Conditions Générales d'Utilisation
              </Link>
              , la{" "}
              <Link href="/child-safety" className="text-primary hover:underline font-medium">
                Politique de Protection des Mineurs
              </Link>{" "}
              et, lorsque pertinent, les informations spécifiques affichées au moment de la collecte de certaines
              données.
            </p>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                1. Responsable du traitement
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Responsable du traitement :</strong> APLI SARLU — TIA
                </p>
                <p className="text-gray-700">
                  <strong>Adresse :</strong> LOGT 51, Cité Ampefiloha, Antananarivo, Madagascar
                </p>
                <p className="text-gray-700">
                  <strong>RCS / NIF / STAT :</strong> à compléter
                </p>
                <p className="text-gray-700">
                  <strong>Contact vie privée :</strong>{" "}
                  <a href="mailto:info@tia-meet.com" className="text-primary hover:underline">
                    info@tia-meet.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Délégué à la protection des données :</strong> à désigner / compléter conformément à la
                  loi malgache
                </p>
              </div>
              <p className="text-gray-600 text-sm italic mt-4">
                Lorsque la réglementation d'un autre pays impose la désignation d'un représentant local, les
                coordonnées correspondantes seront publiées dans cette Politique ou mises à disposition des
                personnes concernées.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                2. Champ d'application
              </h2>
              <p className="text-gray-600 mb-4">
                Cette Politique s'applique aux traitements de données personnelles réalisés par TIA dans le cadre :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>de la création et gestion d'un Compte ;</Bullet>
                <Bullet>de l'utilisation des fonctions de découverte et de mise en relation ;</Bullet>
                <Bullet>de la messagerie et des interactions entre Utilisateurs ;</Bullet>
                <Bullet>des outils de modération, signalement, sécurité et prévention de la fraude ;</Bullet>
                <Bullet>des Services Premium ;</Bullet>
                <Bullet>du support utilisateur ;</Bullet>
                <Bullet>des sites ou pages web de TIA auxquels la présente Politique renvoie.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Les services tiers indépendants restent soumis à leurs propres politiques de confidentialité.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                3. Principes généraux
              </h2>
              <p className="text-gray-600">
                TIA traite les données selon les principes de licéité, loyauté, transparence, finalité déterminée,
                proportionnalité, exactitude, limitation de conservation et sécurité prévus par la réglementation
                applicable. Nous cherchons à ne collecter que les données nécessaires aux finalités décrites
                ci-dessous.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                4. Données que nous collectons
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                4.1 Données de Compte obligatoires ou nécessaires
              </h3>
              <p className="text-gray-600 mb-3">Selon le mode d'inscription utilisé, TIA peut collecter :</p>
              <ul className="space-y-2 mb-3">
                <Bullet>prénom, nom ou pseudonyme affiché ;</Bullet>
                <Bullet>adresse email ;</Bullet>
                <Bullet>numéro de téléphone ;</Bullet>
                <Bullet>date de naissance et âge calculé ;</Bullet>
                <Bullet>identifiants de connexion ou jetons d'authentification ;</Bullet>
                <Bullet>pays ou région ;</Bullet>
                <Bullet>acceptation des CGU et consentements associés.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic mb-6">
                Certaines informations sont obligatoires pour créer ou sécuriser un Compte. Si l'Utilisateur refuse
                de fournir une donnée nécessaire, certaines fonctionnalités peuvent ne pas être accessibles.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">4.2 Données de profil</h3>
              <p className="text-gray-600 mb-3">
                TIA peut collecter les données que l'Utilisateur choisit d'ajouter à son profil, notamment :
              </p>
              <ul className="space-y-2 mb-6">
                <Bullet>genre ;</Bullet>
                <Bullet>photos ;</Bullet>
                <Bullet>biographie ;</Bullet>
                <Bullet>centres d'intérêt ;</Bullet>
                <Bullet>préférences de rencontre ;</Bullet>
                <Bullet>tranche d'âge recherchée ;</Bullet>
                <Bullet>distance ou zone recherchée ;</Bullet>
                <Bullet>informations facultatives sur le mode de vie, les goûts ou attentes relationnelles.</Bullet>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                4.3 Données sensibles liées à un service de rencontres
              </h3>
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 mb-0">
                  Compte tenu de la nature du Service, certaines informations fournies par l'Utilisateur peuvent
                  constituer des <strong>données sensibles</strong>, notamment lorsqu'elles révèlent ou permettent
                  raisonnablement d'inférer des informations relatives à la vie sexuelle, aux préférences de
                  rencontre, à l'orientation sexuelle, à la santé, aux convictions religieuses ou à d'autres
                  catégories protégées par la loi. Lorsque le traitement d'une donnée sensible repose sur le
                  consentement exprès, TIA recueille un consentement spécifique, libre et informé conformément à la
                  réglementation applicable. L'Utilisateur peut retirer ce consentement lorsqu'il constitue la base
                  du traitement ; le retrait n'affecte pas la licéité du traitement effectué avant le retrait, mais
                  peut rendre certaines fonctionnalités indisponibles.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">4.4 Localisation</h3>
              <p className="text-gray-600 mb-3">
                Si l'Utilisateur autorise la permission correspondante, TIA peut collecter une localisation précise
                ou approximative fournie par l'appareil afin notamment :
              </p>
              <ul className="space-y-2 mb-3">
                <Bullet>d'afficher des profils pertinents selon la distance ;</Bullet>
                <Bullet>de permettre les fonctions de recherche géographique ;</Bullet>
                <Bullet>de détecter certains comportements frauduleux ou incohérents ;</Bullet>
                <Bullet>d'assurer la sécurité du Compte.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic mb-6">
                La localisation exacte n'a pas vocation à être affichée publiquement. TIA peut afficher une distance
                approximative ou une zone selon les paramètres du Service. L'Utilisateur peut modifier les
                autorisations de localisation dans les réglages de son appareil, sous réserve de l'impact sur
                certaines fonctionnalités.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">4.5 Messages et interactions</h3>
              <p className="text-gray-600 mb-3">
                TIA traite les informations nécessaires au fonctionnement des interactions, notamment :
              </p>
              <ul className="space-y-2 mb-3">
                <Bullet>likes, matchs, refus ou autres signaux d'intérêt ;</Bullet>
                <Bullet>messages et pièces jointes envoyés dans l'Application ;</Bullet>
                <Bullet>date et heure des échanges ;</Bullet>
                <Bullet>statut de lecture lorsqu'une telle fonction existe ;</Bullet>
                <Bullet>blocages et signalements.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic mb-6">
                Les messages peuvent être analysés par des systèmes automatisés et/ou examinés par une personne
                autorisée lorsqu'il existe un signalement, un risque de sécurité, une obligation légale ou un motif
                légitime de modération conformément à la réglementation applicable.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                4.6 Données de vérification d'identité ou de photo
              </h3>
              <p className="text-gray-600 mb-3">
                TIA peut proposer ou demander une vérification de photo, de selfie, d'âge ou d'identité. Selon le
                mécanisme utilisé, les données peuvent inclure :
              </p>
              <ul className="space-y-2 mb-3">
                <Bullet>selfie ou courte séquence vidéo ;</Bullet>
                <Bullet>photographie d'un document d'identité ;</Bullet>
                <Bullet>informations figurant sur le document strictement nécessaires au contrôle ;</Bullet>
                <Bullet>résultats d'une comparaison automatisée ;</Bullet>
                <Bullet>données techniques relatives à la vérification ;</Bullet>
                <Bullet>
                  lorsque la technologie utilisée l'implique, <strong>données biométriques ou géométrie faciale</strong>.
                </Bullet>
              </ul>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 mb-0">
                  Les données biométriques sont considérées comme sensibles par la loi malgache. Lorsqu'un tel
                  traitement est mis en œuvre, TIA applique les formalités, garanties et bases légales requises et
                  recueille un consentement exprès lorsqu'il constitue le fondement légal applicable. TIA n'utilise
                  pas une vérification comme une certification de moralité ou d'absence d'antécédents.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">4.7 Données techniques et d'utilisation</h3>
              <p className="text-gray-600 mb-3">TIA peut collecter automatiquement :</p>
              <ul className="space-y-2 mb-6">
                <Bullet>adresse IP ;</Bullet>
                <Bullet>modèle d'appareil ;</Bullet>
                <Bullet>système d'exploitation ;</Bullet>
                <Bullet>version de l'Application ;</Bullet>
                <Bullet>identifiants techniques et identifiants mobiles autorisés ;</Bullet>
                <Bullet>langue, fuseau horaire, pays ;</Bullet>
                <Bullet>logs de connexion ;</Bullet>
                <Bullet>événements d'utilisation et interactions avec l'interface ;</Bullet>
                <Bullet>diagnostics, erreurs et crashs ;</Bullet>
                <Bullet>informations nécessaires à la prévention de fraude et à la sécurité.</Bullet>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">4.8 Données de paiement et d'abonnement</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-3">
                <p className="text-gray-700 mb-0">
                  Lorsque l'achat est traité par Apple, Google ou un autre prestataire de paiement, ce prestataire
                  collecte les données de paiement conformément à sa propre politique. TIA ne conserve pas le numéro
                  complet de carte bancaire lorsque celui-ci est traité exclusivement par un prestataire tiers.
                </p>
              </div>
              <p className="text-gray-600 mb-3">TIA peut toutefois recevoir et conserver :</p>
              <ul className="space-y-2 mb-6">
                <Bullet>identifiant de transaction ;</Bullet>
                <Bullet>produit acheté ;</Bullet>
                <Bullet>date et montant ;</Bullet>
                <Bullet>statut de paiement ;</Bullet>
                <Bullet>historique d'abonnement ;</Bullet>
                <Bullet>informations nécessaires au support, à la comptabilité ou à la lutte contre la fraude.</Bullet>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">4.9 Support, réclamations et signalements</h3>
              <p className="text-gray-600 mb-3">
                Lorsque l'Utilisateur contacte TIA ou signale un autre Compte, nous pouvons collecter :
              </p>
              <ul className="space-y-2 mb-6">
                <Bullet>coordonnées ;</Bullet>
                <Bullet>contenu de la demande ;</Bullet>
                <Bullet>pièces jointes ;</Bullet>
                <Bullet>Compte ou Utilisateur concerné ;</Bullet>
                <Bullet>messages, captures ou preuves communiquées ;</Bullet>
                <Bullet>historique de traitement du signalement ;</Bullet>
                <Bullet>mesures de modération prises.</Bullet>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">4.10 Données provenant de tiers</h3>
              <p className="text-gray-600">
                Lorsque l'Utilisateur choisit une connexion via Apple, Google ou un autre fournisseur d'identité,
                TIA peut recevoir les données que ce fournisseur autorise à transmettre, par exemple nom, adresse
                email, identifiant ou jeton d'authentification. TIA peut également recevoir des informations de
                prestataires de sécurité, d'anti-fraude, de paiement ou de support nécessaires à la fourniture du
                Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                5. Finalités et bases légales
              </h2>
              <p className="text-gray-600 mb-6">
                TIA traite les données pour les finalités suivantes, selon la base légale applicable au traitement
                concerné :
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">5.1 Exécution du contrat</h3>
              <ul className="space-y-2 mb-6">
                <Bullet>créer, authentifier et administrer le Compte ;</Bullet>
                <Bullet>afficher et gérer le profil ;</Bullet>
                <Bullet>fournir les fonctionnalités de découverte, Match et messagerie ;</Bullet>
                <Bullet>gérer les préférences et fonctionnalités choisies ;</Bullet>
                <Bullet>gérer les Services Premium et droits associés ;</Bullet>
                <Bullet>fournir le support utilisateur ;</Bullet>
                <Bullet>assurer les notifications nécessaires au fonctionnement du Service.</Bullet>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">5.2 Consentement</h3>
              <p className="text-gray-600 mb-3">Lorsque requis, le consentement peut être utilisé notamment pour :</p>
              <ul className="space-y-2 mb-6">
                <Bullet>certaines données sensibles ;</Bullet>
                <Bullet>certaines données biométriques ;</Bullet>
                <Bullet>géolocalisation lorsque la permission de l'appareil l'exige ;</Bullet>
                <Bullet>notifications non essentielles ;</Bullet>
                <Bullet>cookies, SDKs ou outils de mesure/marketing non strictement nécessaires ;</Bullet>
                <Bullet>communications promotionnelles facultatives.</Bullet>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">5.3 Intérêt légitime</h3>
              <p className="text-gray-600 mb-3">
                Sous réserve des droits et libertés des Utilisateurs, TIA peut traiter certaines données pour :
              </p>
              <ul className="space-y-2 mb-6">
                <Bullet>prévenir fraude, usurpation, spam et abus ;</Bullet>
                <Bullet>protéger la sécurité du Service et des Utilisateurs ;</Bullet>
                <Bullet>détecter les tentatives de contournement d'un bannissement ;</Bullet>
                <Bullet>modérer le Service et enquêter sur un signalement ;</Bullet>
                <Bullet>assurer la sécurité informatique ;</Bullet>
                <Bullet>établir des statistiques agrégées et améliorer les performances ;</Bullet>
                <Bullet>défendre les droits de TIA ou répondre à un litige.</Bullet>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                5.4 Obligation légale ou sauvegarde de la vie / sécurité
              </h3>
              <p className="text-gray-600 mb-3">TIA peut traiter ou communiquer des données lorsque cela est nécessaire pour :</p>
              <ul className="space-y-2">
                <Bullet>respecter une réquisition ou obligation légale ;</Bullet>
                <Bullet>répondre à une autorité compétente ;</Bullet>
                <Bullet>protéger la vie ou l'intégrité d'une personne dans une situation grave ;</Bullet>
                <Bullet>
                  coopérer à une enquête relative notamment à l'exploitation sexuelle d'un mineur, à une violence
                  grave ou à une fraude ;
                </Bullet>
                <Bullet>respecter les obligations comptables, fiscales ou de conservation applicables.</Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                6. Recommandations, algorithmes et traitements automatisés
              </h2>
              <p className="text-gray-600 mb-4">
                TIA peut utiliser des systèmes algorithmiques afin de classer les profils, personnaliser les
                suggestions, limiter le spam et identifier des comportements anormaux. Ces traitements peuvent
                utiliser notamment l'âge et les préférences, la distance, l'activité récente, l'historique
                d'interactions, des signaux de sécurité ou de fraude et les paramètres du profil.
              </p>
              <p className="text-gray-600 mb-4">
                Les recommandations ont pour objectif de rendre le Service plus pertinent. Elles ne constituent pas
                une garantie concernant un autre Utilisateur.
              </p>
              <p className="text-gray-600">
                Sauf disposition contraire expressément annoncée, TIA n'utilise pas un traitement entièrement
                automatisé produisant à lui seul des effets juridiques ou des effets significatifs comparables sur
                l'Utilisateur sans mettre en place les garanties requises par la loi applicable.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                7. Données visibles par les autres Utilisateurs
              </h2>
              <p className="text-gray-600 mb-4">
                Le fonctionnement d'un service de rencontres implique que certaines informations du profil soient
                visibles par d'autres Utilisateurs. Selon les réglages et fonctionnalités, peuvent notamment être
                visibles :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>prénom ou pseudonyme ;</Bullet>
                <Bullet>âge ;</Bullet>
                <Bullet>genre ;</Bullet>
                <Bullet>photos ;</Bullet>
                <Bullet>biographie ;</Bullet>
                <Bullet>centres d'intérêt ;</Bullet>
                <Bullet>distance approximative ;</Bullet>
                <Bullet>informations de profil choisies par l'Utilisateur ;</Bullet>
                <Bullet>statut de vérification éventuel.</Bullet>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-800 mb-0">
                  Les messages sont visibles par leurs destinataires. TIA ne peut empêcher un destinataire de
                  copier, enregistrer, photographier ou retransmettre illicitement une information qu'il a reçue,
                  bien qu'un tel comportement puisse violer les CGU ou la loi. L'Utilisateur doit donc éviter de
                  transmettre des informations particulièrement sensibles avant d'avoir évalué la personne avec
                  laquelle il échange.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                8. Destinataires et partage des données
              </h2>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-800 font-semibold mb-0">TIA ne vend pas les données personnelles des Utilisateurs.</p>
              </div>
              <p className="text-gray-600 mb-4">
                Les données peuvent être communiquées, dans la mesure nécessaire, aux catégories suivantes :
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.1 Autres Utilisateurs</h3>
              <p className="text-gray-600 mb-6">
                Pour permettre les fonctionnalités du Service, les données de profil et communications sont rendues
                accessibles aux personnes auxquelles elles sont destinées.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.2 Prestataires techniques</h3>
              <p className="text-gray-600 mb-3">TIA peut faire appel à des prestataires pour :</p>
              <ul className="space-y-2 mb-6">
                <Bullet>hébergement et infrastructure cloud ;</Bullet>
                <Bullet>base de données et stockage ;</Bullet>
                <Bullet>authentification ;</Bullet>
                <Bullet>notifications push ;</Bullet>
                <Bullet>envoi d'emails ou SMS ;</Bullet>
                <Bullet>gestion d'abonnement et paiement ;</Bullet>
                <Bullet>analytics et mesure de performance ;</Bullet>
                <Bullet>modération et sécurité ;</Bullet>
                <Bullet>prévention de fraude ;</Bullet>
                <Bullet>support client ;</Bullet>
                <Bullet>vérification de photo ou d'identité.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic mb-6">
                Ces prestataires doivent traiter les données selon les instructions contractuelles applicables et
                mettre en œuvre des garanties de confidentialité et de sécurité appropriées.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.3 Apple, Google et fournisseurs de plateformes</h3>
              <p className="text-gray-600 mb-6">
                Certaines données sont échangées avec Apple, Google ou d'autres plateformes lorsque cela est
                nécessaire à l'authentification, au paiement, aux notifications, à la distribution de l'Application
                ou au respect de leurs politiques.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.4 Autorités et procédures légales</h3>
              <p className="text-gray-600 mb-6">
                TIA peut transmettre des données à une autorité, un tribunal ou un organisme compétent lorsqu'une
                telle communication est légalement requise ou autorisée, notamment dans le cadre d'une enquête, d'un
                risque grave pour la sécurité d'une personne ou de la protection des mineurs.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.5 Restructuration d'entreprise</h3>
              <p className="text-gray-600">
                En cas de fusion, acquisition, financement, cession d'activité ou restructuration, certaines données
                peuvent être transférées à l'entité concernée, sous réserve des garanties applicables et des droits
                des personnes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                9. Transferts internationaux
              </h2>
              <p className="text-gray-600 mb-4">
                Les prestataires de TIA peuvent être établis à Madagascar ou dans d'autres pays.
              </p>
              <p className="text-gray-600 mb-4">
                Conformément à la loi malgache, TIA veille à ce qu'un transfert vers l'étranger repose sur un niveau
                de protection similaire ou, lorsque ce niveau n'est pas établi, sur les garanties et autorisations
                requises, notamment les mécanismes contractuels appropriés et, lorsque nécessaire, l'autorisation de
                la Commission Malagasy de l'Informatique et des Libertés (« CMIL »).
              </p>
              <p className="text-gray-600">
                Lorsque le RGPD ou une autre réglementation internationale est applicable, TIA met en place les
                mécanismes de transfert requis par cette réglementation en complément des obligations malgaches.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                10. Durées de conservation
              </h2>
              <p className="text-gray-600 mb-6">
                TIA conserve les données uniquement pendant la durée nécessaire à la finalité concernée, puis les
                supprime, anonymise ou archive lorsqu'une obligation légale, une nécessité de sécurité ou la défense
                d'un droit impose une conservation supplémentaire. Les principes suivants s'appliquent :
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.1 Compte actif</h3>
              <p className="text-gray-600 mb-6">
                Les données nécessaires au fonctionnement du Compte sont conservées pendant la durée d'utilisation
                du Service.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.2 Suppression volontaire du Compte</h3>
              <p className="text-gray-600 mb-3">Lorsque l'Utilisateur demande la suppression :</p>
              <ul className="space-y-2 mb-6">
                <Bullet>le profil est rendu inaccessible aux autres Utilisateurs dans un délai raisonnable ;</Bullet>
                <Bullet>
                  les données actives destinées au fonctionnement courant sont supprimées ou dissociées du Compte
                  dans un délai cible maximal de trente (30) jours, sauf exception justifiée ;
                </Bullet>
                <Bullet>
                  des copies résiduelles peuvent subsister temporairement dans les sauvegardes jusqu'à leur rotation
                  normale, généralement pour une période supplémentaire pouvant aller jusqu'à quatre-vingt-dix (90)
                  jours ;
                </Bullet>
                <Bullet>
                  certaines informations peuvent être conservées séparément lorsqu'une obligation légale, une
                  enquête, la sécurité, la prévention de fraude, la preuve d'un droit ou la protection d'une personne
                  le justifie.
                </Bullet>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.3 Comptes bannis ou comportements dangereux</h3>
              <p className="text-gray-600 mb-6">
                TIA peut conserver pendant une durée proportionnée les informations strictement nécessaires
                permettant d'identifier un Compte banni, prévenir une réinscription frauduleuse, conserver la preuve
                d'un incident ou défendre ses droits. La durée est déterminée selon la gravité du comportement, les
                risques de récidive, les délais de prescription et les obligations légales applicables.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.4 Signalements et sécurité</h3>
              <p className="text-gray-600 mb-6">
                Les dossiers de signalement, preuves, décisions de modération et informations associées peuvent être
                conservés au-delà de la fermeture d'un Compte lorsqu'ils sont nécessaires à la protection des
                Utilisateurs, à une procédure, à une enquête, à une obligation légale ou à la défense de TIA.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.5 Données de paiement</h3>
              <p className="text-gray-600 mb-6">
                Les informations transactionnelles et comptables peuvent être conservées pendant la durée imposée
                par les obligations fiscales, comptables ou de preuve applicables.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.6 Données de vérification</h3>
              <p className="text-gray-600">
                Les selfies, documents et éventuelles données biométriques sont conservés pendant la durée annoncée
                au moment de la vérification et strictement nécessaire aux finalités de sécurité ou de vérification,
                sous réserve des exigences légales applicables. La durée exacte dépend du mécanisme de vérification
                utilisé et peut être précisée au moment de la collecte ou dans un avis spécifique.
              </p>
            </section>

            <section id="delete-data" className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                11. Suppression du Compte et des données
              </h2>
              <p className="text-gray-600 mb-4">L'Utilisateur peut demander la suppression de son Compte :</p>
              <ul className="space-y-2 mb-4">
                <Bullet>depuis les paramètres de l'Application lorsque la fonctionnalité est disponible ; et/ou</Bullet>
                <Bullet>
                  en écrivant à{" "}
                  <a href="mailto:info@tia-meet.com" className="text-primary hover:underline font-medium">
                    info@tia-meet.com
                  </a>{" "}
                  avec l'objet « Demande de suppression de compte » et les informations permettant d'identifier le
                  Compte.
                </Bullet>
              </ul>
              <p className="text-gray-600 mb-4">
                TIA peut demander une vérification raisonnable de l'identité du demandeur afin d'éviter la
                suppression frauduleuse du Compte d'un tiers. La suppression du Compte n'annule pas automatiquement
                un abonnement géré par Apple ou Google.
              </p>
              <p className="text-gray-600 mb-4">
                La suppression ne peut pas être utilisée pour exiger la destruction immédiate d'informations que TIA
                est légalement tenue ou légitimement autorisée à conserver, par exemple pour une enquête, un litige,
                une obligation comptable ou un dossier de sécurité.
              </p>
              <p className="text-gray-600">
                La procédure détaillée de suppression est décrite sur la page{" "}
                <Link href="/account-deletion" className="text-primary hover:underline font-medium">
                  Suppression du Compte et des Données
                </Link>
                .
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                12. Droits des personnes au titre de la loi malgache
              </h2>
              <p className="text-gray-600 mb-4">
                Sous réserve des conditions et exceptions prévues par la réglementation applicable, l'Utilisateur
                peut notamment :
              </p>
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <ul className="space-y-3 mb-0">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">demander si TIA traite des données le concernant ;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">accéder aux catégories de données, finalités et destinataires ;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">
                      demander la rectification, mise à jour, verrouillage ou effacement de données inexactes ou
                      traitées illicitement ;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">s'opposer à certains traitements pour motif légitime ;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">s'opposer à la prospection ;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">
                      obtenir les informations relatives aux transferts internationaux lorsque la loi le prévoit.
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-600">
                Les demandes peuvent être adressées à{" "}
                <a href="mailto:info@tia-meet.com" className="text-primary hover:underline font-medium">
                  info@tia-meet.com
                </a>
                . TIA peut demander une preuve raisonnable d'identité et peut refuser ou limiter une demande
                manifestement abusive ou lorsque la loi prévoit une exception.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                13. Droits supplémentaires lorsque le RGPD s'applique
              </h2>
              <p className="text-gray-600 mb-4">
                Lorsque le Règlement général sur la protection des données de l'Union européenne (« RGPD »)
                s'applique au traitement concerné, l'Utilisateur peut disposer, selon les conditions légales, de
                droits supplémentaires, notamment :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>droit à l'effacement ;</Bullet>
                <Bullet>droit à la limitation ;</Bullet>
                <Bullet>droit à la portabilité ;</Bullet>
                <Bullet>droit d'opposition à certains traitements fondés sur l'intérêt légitime ;</Bullet>
                <Bullet>droit de retirer un consentement ;</Bullet>
                <Bullet>droits liés à certaines décisions automatisées ;</Bullet>
                <Bullet>droit d'introduire une réclamation auprès de l'autorité de contrôle compétente.</Bullet>
              </ul>
              <p className="text-gray-600 mb-4">
                Certaines données relatives à la vie sexuelle, à l'orientation sexuelle ou données biométriques
                peuvent constituer des catégories particulières au sens du RGPD et nécessiter une condition
                spécifique de traitement, notamment le consentement explicite lorsqu'il est utilisé comme fondement.
              </p>
              <p className="text-gray-600">
                Lorsque le RGPD impose la désignation d'un représentant dans l'Union européenne ou d'un délégué à la
                protection des données, TIA met en place cette désignation avant de réaliser les traitements qui
                l'exigent et publie les coordonnées correspondantes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                14. Cookies, SDKs et technologies similaires
              </h2>
              <p className="text-gray-600 mb-4">TIA peut utiliser des cookies, SDKs, identifiants ou technologies similaires. Ils peuvent être classés notamment comme :</p>
              <ul className="space-y-2 mb-4">
                <Bullet>strictement nécessaires au fonctionnement ou à la sécurité ;</Bullet>
                <Bullet>mesure d'audience et diagnostic ;</Bullet>
                <Bullet>personnalisation ;</Bullet>
                <Bullet>marketing ou publicité, si ces fonctions sont utilisées.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm">
                Lorsqu'un consentement est requis pour une technologie non essentielle, TIA le recueille avant son
                activation et permet son retrait selon les mécanismes disponibles. Les préférences peuvent également
                être gérées via les paramètres de l'appareil ou du système d'exploitation lorsque pertinent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                15. Sécurité
              </h2>
              <p className="text-gray-600 mb-4">
                TIA met en œuvre des mesures techniques et organisationnelles proportionnées à la nature des données
                et aux risques, notamment selon les systèmes utilisés :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>contrôle des accès ;</Bullet>
                <Bullet>limitation des privilèges internes ;</Bullet>
                <Bullet>chiffrement des communications en transit ;</Bullet>
                <Bullet>mécanismes d'authentification ;</Bullet>
                <Bullet>journalisation de sécurité ;</Bullet>
                <Bullet>sauvegardes et mesures de résilience ;</Bullet>
                <Bullet>procédures de gestion des incidents ;</Bullet>
                <Bullet>obligations contractuelles de sécurité imposées aux sous-traitants.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Aucun système informatique n'offre une sécurité absolue. TIA ne peut donc garantir qu'un incident ne
                surviendra jamais malgré des mesures raisonnables. L'Utilisateur contribue à la sécurité en
                protégeant ses identifiants, son appareil et les informations qu'il choisit de partager.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                16. Violations de données
              </h2>
              <p className="text-gray-600">
                En cas de violation de données personnelles, TIA évalue la nature de l'incident, les données
                concernées et le risque pour les personnes. TIA prend les mesures de confinement et de remédiation
                appropriées et effectue les notifications aux personnes et/ou autorités compétentes lorsque la
                réglementation applicable l'exige.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                17. Mineurs
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-yellow-800 font-semibold mb-0">
                  TIA est strictement réservé aux personnes âgées de 18 ans et plus.
                </p>
              </div>
              <p className="text-gray-600">
                TIA ne cherche pas à collecter intentionnellement les données d'une personne mineure. Lorsqu'un
                Compte est raisonnablement suspecté d'appartenir à une personne mineure, TIA peut le suspendre
                immédiatement, demander une vérification d'âge et supprimer les données lorsque la situation est
                confirmée, sous réserve de la conservation strictement nécessaire à la sécurité, à une preuve ou à
                un signalement légal. Pour plus de détails, consulter la{" "}
                <Link href="/child-safety" className="text-primary hover:underline font-medium">
                  Politique de Protection des Mineurs TIA
                </Link>
                .
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                18. Confidentialité des signalements
              </h2>
              <p className="text-gray-600">
                TIA traite les signalements avec un niveau de confidentialité approprié. La personne signalée n'est
                pas automatiquement informée de l'identité du signalant. Toutefois, des informations peuvent être
                communiquées lorsqu'une procédure contradictoire, une obligation légale ou l'exercice de droits
                l'exige.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                19. Traitements automatisés et intelligence artificielle
              </h2>
              <p className="text-gray-600">
                TIA utilise des traitements algorithmiques et des fonctionnalités d'intelligence artificielle pour
                proposer des suggestions de mise en relation et améliorer l'expérience utilisateur. Ces traitements
                ne produisent pas de décision entièrement automatisée ayant des effets juridiques ou des effets
                significatifs similaires sur l'Utilisateur sans les garanties requises par la loi applicable.
                L'Utilisateur peut à tout moment demander des informations sur leur logique en écrivant à{" "}
                <a href="mailto:info@tia-meet.com" className="text-primary hover:underline font-medium">
                  info@tia-meet.com
                </a>
                .
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                20. Modifications de la Politique
              </h2>
              <p className="text-gray-600 mb-4">
                TIA peut modifier cette Politique afin de refléter une évolution du Service, de la réglementation ou
                de ses pratiques.
              </p>
              <p className="text-gray-600">
                En cas de modification substantielle, TIA en informe les Utilisateurs par un moyen approprié avant
                l'entrée en vigueur lorsque la loi l'exige. La date de dernière mise à jour figure en tête du
                document.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                21. Réclamations, autorité de contrôle et contact
              </h2>
              <p className="text-gray-600 mb-6">
                Pour toute question ou réclamation relative aux données personnelles, vous pouvez nous contacter à :
              </p>
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
                  <p className="text-sm text-gray-600 mb-1">Email de contact</p>
                  <a
                    href="mailto:info@tia-meet.com"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    info@tia-meet.com
                  </a>
                </div>
              </div>
              <p className="text-gray-500 text-sm italic">
                Sous réserve de sa compétence et de son fonctionnement institutionnel applicable, l'Utilisateur peut
                également saisir la <strong>Commission Malagasy de l'Informatique et des Libertés (CMIL)</strong> ou
                toute autorité de contrôle compétente selon la réglementation qui lui est applicable. Les personnes
                bénéficiant du RGPD peuvent également saisir l'autorité de protection des données compétente dans
                l'Espace économique européen lorsque le RGPD leur confère ce droit.
              </p>
            </section>
          </article>
        </div>
      </main>
      {!isEmbed && <Footer />}
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <PrivacyContent />
    </Suspense>
  );
}
