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
              Conditions Générales d'Utilisation et de Vente des services de APLI SARLU
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
                Les présentes Conditions Générales d'Utilisation (« CGU ») régissent l'accès et l'utilisation de
                l'application mobile TIA, de ses sites, interfaces, fonctionnalités, contenus et services associés
                (ensemble, le « Service »), édités par APLI SARLU. En créant un Compte, en cochant la case
                d'acceptation ou en utilisant le Service, l'Utilisateur reconnaît avoir lu, compris et accepté sans
                réserve les présentes CGU, la Politique de Confidentialité, la Politique de Protection des Mineurs
                et les Règles de la Communauté TIA. Si l'Utilisateur n'accepte pas ces documents, il ne doit pas
                créer de Compte ni utiliser le Service.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                1. Identification de l'éditeur
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Éditeur / exploitant :</strong> APLI SARLU, société à responsabilité limitée
                  unipersonnelle de droit malgache
                </p>
                <p className="text-gray-700">
                  <strong>Siège social :</strong> LOGT 51, Cité Ampefiloha, Antananarivo, Madagascar
                </p>
                <p className="text-gray-700">
                  <strong>RCS :</strong> RCS Antananarivo 2025 B 00769
                </p>
                <p className="text-gray-700">
                  <strong>NIF :</strong> 4019287505
                </p>
                <p className="text-gray-700">
                  <strong>STAT :</strong> 62011 11 2025 0 10781
                </p>
                <p className="text-gray-700">
                  <strong>Représentant légal / Directeur de publication :</strong> Ali Pirbay
                </p>
                <p className="text-gray-700">
                  <strong>Email général :</strong>{" "}
                  <a href="mailto:info@tia-meet.com" className="text-primary hover:underline">
                    info@tia-meet.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Contact sécurité / signalements :</strong>{" "}
                  <a href="mailto:info@tia-meet.com" className="text-primary hover:underline">
                    info@tia-meet.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Contact vie privée :</strong>{" "}
                  <a href="mailto:info@tia-meet.com" className="text-primary hover:underline">
                    info@tia-meet.com
                  </a>
                </p>
              </div>
              <p className="text-gray-600 text-sm italic mt-4">
                Dans les présentes CGU, « TIA », « APLI », « la Société », « nous », « notre » ou « nos » désignent
                APLI SARLU selon le contexte.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                2. Définitions
              </h2>
              <ul className="space-y-4">
                <Bullet>
                  <strong>Application :</strong> l'application mobile TIA et, le cas échéant, toute interface web
                  associée.
                </Bullet>
                <Bullet>
                  <strong>Compte :</strong> l'espace personnel créé par un Utilisateur afin d'accéder au Service.
                </Bullet>
                <Bullet>
                  <strong>Contenu :</strong> tout texte, photo, image, vidéo, audio, donnée, message, information,
                  lien ou autre élément transmis, publié, envoyé ou rendu accessible via le Service.
                </Bullet>
                <Bullet>
                  <strong>Contenu Utilisateur :</strong> tout Contenu fourni par un Utilisateur.
                </Bullet>
                <Bullet>
                  <strong>Match / Mise en relation :</strong> toute fonctionnalité permettant à deux Utilisateurs
                  d'entrer en contact, selon les règles du Service.
                </Bullet>
                <Bullet>
                  <strong>Service :</strong> l'ensemble des fonctionnalités fournies par TIA, gratuites ou payantes,
                  y compris les outils de découverte, de suggestion, de communication, de modération, de
                  vérification et les fonctionnalités assistées par algorithme ou intelligence artificielle.
                </Bullet>
                <Bullet>
                  <strong>Utilisateur :</strong> toute personne physique majeure utilisant le Service.
                </Bullet>
                <Bullet>
                  <strong>Services Premium :</strong> les abonnements, options ou fonctionnalités payantes proposées
                  dans l'Application.
                </Bullet>
                <Bullet>
                  <strong>Partenaire technique :</strong> tout prestataire intervenant pour le compte de TIA,
                  notamment en matière d'hébergement, authentification, paiement, messagerie, notifications,
                  analyse, sécurité, modération ou support.
                </Bullet>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                3. Objet et nature du Service
              </h2>
              <p className="text-gray-600 mb-4">
                TIA fournit une plateforme technologique permettant à des personnes majeures de découvrir d'autres
                Utilisateurs, d'exprimer un intérêt réciproque et, lorsque les fonctionnalités le permettent, de
                communiquer.
              </p>
              <p className="text-gray-600 mb-4">
                TIA n'est pas une agence matrimoniale, un service de conseil sentimental, un service de vérification
                d'antécédents, un service de sécurité privée, un assureur, un garant de moralité, un mandataire d'un
                Utilisateur, ni une partie à une relation, une rencontre ou une transaction pouvant intervenir entre
                Utilisateurs.
              </p>
              <p className="text-gray-600 mb-4">
                TIA n'organise pas, ne supervise pas et ne contrôle pas les rencontres physiques entre Utilisateurs.
                Toute décision de poursuivre une conversation, de communiquer hors de l'Application ou de rencontrer
                une personne dans le monde réel est prise indépendamment par les personnes concernées.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-0">
                  L'obligation de TIA est une obligation de moyens consistant notamment à mettre à disposition le
                  Service conformément aux fonctionnalités proposées, sous réserve de la disponibilité technique, de
                  la maintenance, des règles de modération et des limites prévues par les présentes CGU.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                4. Conditions d'éligibilité — Service strictement réservé aux majeurs
              </h2>
              <p className="text-gray-600 mb-4">
                Le Service est strictement réservé aux personnes âgées de <strong>18 ans ou plus</strong>.
              </p>
              <p className="text-gray-600 mb-4">
                En créant un Compte, l'Utilisateur déclare et garantit :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>avoir au moins 18 ans révolus ;</Bullet>
                <Bullet>avoir la capacité juridique de conclure les présentes CGU ;</Bullet>
                <Bullet>fournir des informations exactes, sincères et à jour ;</Bullet>
                <Bullet>
                  utiliser son propre numéro, email, identité, photos et moyens d'authentification, sauf
                  fonctionnalité expressément prévue autrement ;
                </Bullet>
                <Bullet>ne pas avoir été définitivement banni de TIA, sauf autorisation écrite préalable de TIA ;</Bullet>
                <Bullet>
                  ne pas être légalement empêché d'utiliser un service de rencontres ou de communiquer avec d'autres
                  personnes ;
                </Bullet>
                <Bullet>
                  ne pas utiliser le Service dans un objectif contraire à la loi, à la sécurité d'autrui ou aux
                  présentes CGU.
                </Bullet>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-800 mb-0">
                  Toute fausse déclaration d'âge, usurpation d'identité, utilisation de documents falsifiés ou
                  contournement d'une mesure de sécurité constitue une violation grave des CGU et peut entraîner la
                  suspension ou la suppression immédiate du Compte.
                </p>
              </div>
              <p className="text-gray-600">
                TIA peut demander des éléments complémentaires afin de vérifier l'âge, l'identité ou la conformité
                d'un Compte lorsque cela paraît raisonnablement nécessaire.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                5. Création et sécurité du Compte
              </h2>
              <p className="text-gray-600 mb-4">
                Le Compte est personnel, individuel, non cessible et non transférable. Sauf fonctionnalité contraire
                expressément autorisée par TIA, chaque Utilisateur ne peut détenir qu'un seul Compte actif.
              </p>
              <p className="text-gray-600 mb-4">
                L'Utilisateur est responsable de la confidentialité de ses identifiants, codes et appareils. Il doit
                informer TIA sans délai de tout accès non autorisé, perte d'un appareil, compromission
                d'identifiants ou utilisation suspecte du Compte.
              </p>
              <p className="text-gray-600 mb-4">
                TIA peut bloquer temporairement un Compte lorsqu'une compromission, une fraude, une usurpation ou un
                risque de sécurité est suspecté.
              </p>
              <p className="text-gray-600">
                Le fait qu'une action soit effectuée depuis un Compte ne prive pas l'Utilisateur de la possibilité de
                démontrer une compromission, mais TIA pourra raisonnablement considérer les activités réalisées avec
                des identifiants valides comme provenant du titulaire tant qu'aucune anomalie n'a été signalée.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                6. Vérifications, badges et absence de garantie d'identité ou d'antécédents
              </h2>
              <p className="text-gray-600 mb-4">
                TIA peut proposer ou imposer certaines vérifications, notamment par téléphone, email, selfie, photo,
                document d'identité ou mécanisme automatisé, selon les fonctionnalités disponibles et la
                réglementation applicable.
              </p>
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-3">
                  <strong>Toute vérification, tout badge ou toute validation a une portée limitée.</strong> Une
                  vérification réussie signifie uniquement que les éléments contrôlés ont satisfait au processus
                  utilisé au moment du contrôle. Elle ne constitue jamais :
                </p>
                <ul className="space-y-2 mb-0">
                  <Bullet>une certification de moralité ;</Bullet>
                  <Bullet>une enquête de police ou de sécurité ;</Bullet>
                  <Bullet>une vérification exhaustive des antécédents civils ou pénaux ;</Bullet>
                  <Bullet>une garantie de l'identité absolue d'un Utilisateur ;</Bullet>
                  <Bullet>
                    une garantie de son âge réel en cas de fraude sophistiquée ou de document falsifié ;
                  </Bullet>
                  <Bullet>
                    une garantie de ses intentions, de son comportement futur, de sa santé, de sa situation
                    personnelle ou de sa sécurité.
                  </Bullet>
                </ul>
              </div>
              <p className="text-gray-600 mb-4">
                TIA ne réalise pas de contrôle systématique des casiers judiciaires, registres de délinquants sexuels
                ou antécédents de chaque Utilisateur, sauf si une fonctionnalité ou une obligation légale
                particulière est expressément mise en place et annoncée.
              </p>
              <p className="text-gray-600">
                L'Utilisateur reconnaît que tout mécanisme de vérification peut être contourné, trompé ou affecté par
                une erreur technique ou humaine.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                7. Fonctionnalités algorithmiques et intelligence artificielle
              </h2>
              <p className="text-gray-600 mb-4">
                Le Service peut utiliser des systèmes algorithmiques ou des fonctionnalités d'intelligence
                artificielle afin notamment de classer des profils, personnaliser des suggestions, détecter des
                comportements anormaux, faciliter certaines conversations ou améliorer l'expérience utilisateur.
              </p>
              <p className="text-gray-600 mb-4">
                Ces systèmes produisent des estimations ou recommandations. Ils ne garantissent aucune compatibilité,
                sincérité, sécurité, attraction réciproque, rencontre ou résultat particulier.
              </p>
              <p className="text-gray-600 mb-4">
                Une suggestion de profil, un score, un ordre d'affichage ou un contenu généré par une fonctionnalité
                d'IA ne constitue ni une approbation, ni une recommandation personnelle, ni une garantie de TIA
                concernant l'Utilisateur concerné.
              </p>
              <p className="text-gray-600">
                Sauf obligation légale contraire, l'Utilisateur demeure seul responsable de toute décision prise à
                partir d'une suggestion ou d'un contenu généré par le Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                8. Règles de conduite générales
              </h2>
              <p className="text-gray-600 mb-4">
                L'Utilisateur s'engage à respecter les autres personnes et à utiliser le Service de bonne foi. Il est
                notamment interdit de :
              </p>
              <ul className="space-y-2">
                <Bullet>harceler, menacer, intimider, traquer, humilier ou exercer une pression sur une autre personne ;</Bullet>
                <Bullet>tenir des propos haineux, discriminatoires, violents ou déshumanisants ;</Bullet>
                <Bullet>usurper l'identité d'un tiers ou créer un faux profil ;</Bullet>
                <Bullet>
                  mentir de manière substantielle sur son âge, son identité ou ses intentions lorsque cette tromperie
                  est susceptible de mettre autrui en danger ;
                </Bullet>
                <Bullet>publier ou transmettre du contenu sexuel non sollicité ;</Bullet>
                <Bullet>diffuser, menacer de diffuser ou solliciter des images intimes sans consentement ;</Bullet>
                <Bullet>partager du contenu représentant ou sexualisant une personne mineure ;</Bullet>
                <Bullet>
                  rechercher, contacter, solliciter ou tenter de rencontrer une personne mineure à des fins sexuelles
                  ou inappropriées ;
                </Bullet>
                <Bullet>
                  organiser ou faciliter prostitution, exploitation sexuelle, traite des êtres humains, trafic ou
                  activité criminelle ;
                </Bullet>
                <Bullet>
                  demander de l'argent, organiser une escroquerie, un investissement, un prêt, un transfert de fonds
                  ou une opération financière trompeuse ;
                </Bullet>
                <Bullet>
                  promouvoir un produit, service, recrutement, activité commerciale, vente pyramidale ou sollicitation
                  sans autorisation écrite de TIA ;
                </Bullet>
                <Bullet>
                  collecter, copier, aspirer ou réutiliser les données d'autres Utilisateurs par scraping, robot,
                  script ou autre automatisation non autorisée ;
                </Bullet>
                <Bullet>contourner les mesures de sécurité, les limitations du Service ou une sanction de Compte ;</Bullet>
                <Bullet>
                  introduire un virus, code malveillant, charge nuisible ou tenter d'accéder sans autorisation aux
                  systèmes de TIA ;
                </Bullet>
                <Bullet>
                  publier les coordonnées privées, documents d'identité ou informations confidentielles d'autrui sans
                  autorisation ;
                </Bullet>
                <Bullet>utiliser le Service pour inciter à la violence, à un crime ou à un comportement dangereux ;</Bullet>
                <Bullet>enfreindre les droits de propriété intellectuelle, la vie privée ou les droits d'un tiers.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic mt-4">
                Les Règles de la Communauté TIA font partie intégrante des présentes CGU et peuvent détailler ces
                interdictions.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                9. Contenu Utilisateur
              </h2>
              <p className="text-gray-600 mb-4">
                L'Utilisateur demeure propriétaire des droits qu'il détient sur son Contenu Utilisateur.
              </p>
              <p className="text-gray-600 mb-4">
                En transmettant du Contenu à TIA, il accorde à TIA, pour la durée nécessaire au fonctionnement du
                Service et sous réserve de la réglementation applicable, une licence non exclusive, mondiale,
                gratuite et techniquement sous-licenciable à ses prestataires, permettant d'héberger, stocker,
                reproduire, adapter au format, afficher, transmettre, modérer, analyser et traiter ce Contenu
                uniquement dans la mesure nécessaire pour :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>fournir les fonctionnalités demandées ;</Bullet>
                <Bullet>afficher le profil et les communications aux destinataires prévus ;</Bullet>
                <Bullet>assurer la sécurité, la prévention des abus et la modération ;</Bullet>
                <Bullet>résoudre un incident ou une réclamation ;</Bullet>
                <Bullet>respecter une obligation légale ;</Bullet>
                <Bullet>améliorer techniquement le Service selon les bases légales applicables.</Bullet>
              </ul>
              <p className="text-gray-600 mb-4">
                L'utilisation d'un Contenu identifiable à des fins publicitaires externes ou de témoignage
                nécessitera, lorsque la loi l'exige, une autorisation distincte.
              </p>
              <p className="text-gray-600">
                L'Utilisateur garantit qu'il dispose des droits et autorisations nécessaires sur tout Contenu qu'il
                fournit et que ce Contenu ne viole ni la loi ni les droits d'un tiers.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                10. Modération, signalement et blocage
              </h2>
              <p className="text-gray-600 mb-4">
                TIA peut utiliser une combinaison de signalements, contrôles humains, règles automatisées et outils
                algorithmiques afin de détecter des violations des CGU ou des risques de sécurité.
              </p>
              <p className="text-gray-600 mb-4">
                L'Utilisateur peut signaler un profil, un message ou un comportement via les mécanismes disponibles
                dans l'Application et peut bloquer un autre Utilisateur lorsque la fonctionnalité est disponible.
              </p>
              <p className="text-gray-600 mb-4">
                TIA peut, sans que cela constitue une obligation générale de surveillance préalable de chaque
                communication :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>examiner un Compte, un signalement ou un Contenu ;</Bullet>
                <Bullet>restreindre temporairement certaines fonctionnalités ;</Bullet>
                <Bullet>masquer ou supprimer du Contenu ;</Bullet>
                <Bullet>suspendre, bannir ou supprimer un Compte ;</Bullet>
                <Bullet>empêcher la recréation de Comptes ;</Bullet>
                <Bullet>
                  conserver les éléments nécessaires à la sécurité, à la prévention de récidive, à la défense de ses
                  droits ou à la coopération avec les autorités ;
                </Bullet>
                <Bullet>transmettre des informations aux autorités lorsque la loi l'exige ou l'autorise.</Bullet>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-800 mb-2">
                  Une mesure de sécurité, de modération ou de vérification ne garantit pas que tout comportement
                  dangereux, frauduleux, illégal ou contraire aux CGU sera détecté avant qu'un autre Utilisateur n'y
                  soit exposé.
                </p>
                <p className="text-yellow-800 mb-0">
                  <strong>
                    Le fait pour TIA de mettre en place volontairement des outils de sécurité ou de modération ne
                    crée pas une garantie générale de sécurité ni une obligation de contrôler en temps réel
                    l'ensemble des interactions.
                  </strong>
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                11. Rencontres physiques et interactions hors plateforme
              </h2>
              <p className="text-gray-600 mb-4">
                Les rencontres physiques sont décidées et organisées{" "}
                <strong>indépendamment de TIA, sous la responsabilité des Utilisateurs concernés</strong>. TIA n'est
                pas présent lors des rencontres et ne contrôle ni le lieu, ni l'identité réelle, ni les intentions,
                ni le comportement des personnes rencontrées.
              </p>
              <p className="text-gray-600 mb-4">
                L'Utilisateur reconnaît que les rencontres avec des personnes connues en ligne comportent des
                risques, y compris des risques de tromperie, fraude, vol, harcèlement, violence, agression physique
                ou sexuelle et autres comportements illégaux.
              </p>
              <p className="text-gray-600 mb-4">
                Il appartient à chaque Utilisateur d'apprécier ces risques et de prendre les précautions
                raisonnables, notamment :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>privilégier un lieu public pour une première rencontre ;</Bullet>
                <Bullet>informer un proche de l'heure et du lieu du rendez-vous ;</Bullet>
                <Bullet>conserver son propre moyen de transport ou de retour ;</Bullet>
                <Bullet>éviter de communiquer trop rapidement son adresse personnelle ou des informations financières ;</Bullet>
                <Bullet>interrompre immédiatement une interaction lorsqu'un comportement paraît menaçant ou anormal ;</Bullet>
                <Bullet>utiliser les fonctions de blocage et de signalement disponibles.</Bullet>
              </ul>
              <p className="text-gray-600">
                Toute communication poursuivie par téléphone, WhatsApp, email, réseau social ou autre service tiers
                se déroule hors du contrôle de TIA.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                12. Transactions, argent, cadeaux et arnaques
              </h2>
              <p className="text-gray-600 mb-4">
                TIA n'est partie à aucune transaction financière entre Utilisateurs et ne garantit aucun paiement,
                prêt, investissement, vente, cadeau ou transfert de fonds entre eux.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-800 font-semibold mb-0">
                  TIA recommande de ne jamais envoyer d'argent ou de données bancaires à une personne rencontrée via
                  le Service.
                </p>
              </div>
              <p className="text-gray-600">
                L'Utilisateur qui décide néanmoins d'effectuer une transaction avec un autre Utilisateur le fait à
                ses propres risques et sous sa seule responsabilité, sans recours contre TIA fondé uniquement sur le
                fait que les personnes se sont connues via le Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                13. Services Premium, abonnements et paiements
              </h2>
              <p className="text-gray-600 mb-4">
                TIA peut proposer des abonnements et achats intégrés donnant accès à des fonctionnalités
                supplémentaires. Les prix, durées, avantages, modalités de renouvellement et éventuelles périodes
                promotionnelles sont ceux affichés au moment de l'achat.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-0">
                  Lorsque le paiement est effectué via l'App Store d'Apple ou Google Play, la facturation, le
                  renouvellement, l'annulation et le remboursement sont également soumis aux règles et outils de la
                  plateforme concernée. La suppression de l'Application ou du Compte ne résilie pas automatiquement
                  un abonnement géré par Apple ou Google. L'Utilisateur doit utiliser les paramètres de gestion
                  d'abonnement de la plateforme concernée.
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                Sauf règle impérative contraire ou politique obligatoire de la plateforme de paiement, les paiements
                effectués pour une période déjà commencée ne sont pas remboursables.
              </p>
              <p className="text-gray-600">
                TIA peut modifier les tarifs pour les périodes futures. Lorsqu'une réglementation ou une plateforme
                l'exige, l'Utilisateur sera informé avant l'entrée en vigueur du nouveau tarif.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                14. Suspension et résiliation
              </h2>
              <p className="text-gray-600 mb-4">
                L'Utilisateur peut cesser d'utiliser le Service et demander la suppression de son Compte à tout
                moment selon les modalités disponibles dans l'Application ou indiquées dans la Politique de
                Confidentialité.
              </p>
              <p className="text-gray-600 mb-4">TIA peut suspendre, limiter ou supprimer un Compte notamment en cas de :</p>
              <ul className="space-y-2 mb-4">
                <Bullet>violation des présentes CGU ;</Bullet>
                <Bullet>suspicion raisonnable de fraude, usurpation ou activité dangereuse ;</Bullet>
                <Bullet>signalement crédible impliquant la sécurité d'une personne ;</Bullet>
                <Bullet>suspicion qu'un Utilisateur soit mineur ;</Bullet>
                <Bullet>risque pour la sécurité ou l'intégrité du Service ;</Bullet>
                <Bullet>obligation légale ou demande d'une autorité compétente ;</Bullet>
                <Bullet>tentative de contournement d'une sanction ;</Bullet>
                <Bullet>défaut de paiement d'un Service Premium.</Bullet>
              </ul>
              <p className="text-gray-600 mb-4">
                TIA peut prendre une mesure conservatoire avant d'avoir terminé son analyse lorsqu'un risque de
                sécurité le justifie raisonnablement.
              </p>
              <p className="text-gray-600">
                Lorsqu'une notification ou une procédure de contestation est imposée par une loi applicable, TIA la
                met en œuvre dans les conditions requises.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                15. Inactivité
              </h2>
              <p className="text-gray-600 mb-4">
                TIA peut désactiver ou supprimer des Comptes durablement inactifs, sous réserve des durées de
                conservation nécessaires à la sécurité, à la prévention des abus, aux obligations légales ou à
                l'exercice de droits.
              </p>
              <p className="text-gray-600">
                Lorsque cette suppression concerne un Compte encore associé à un abonnement payant géré par une
                plateforme tierce, l'Utilisateur demeure responsable de la gestion de son abonnement auprès de cette
                plateforme.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                16. Services et contenus de tiers
              </h2>
              <p className="text-gray-600 mb-4">
                Le Service peut intégrer ou renvoyer vers des services, liens, cartes, systèmes d'authentification,
                plateformes de paiement, outils de communication ou contenus fournis par des tiers.
              </p>
              <p className="text-gray-600 mb-4">
                TIA ne contrôle pas les services tiers et ne garantit ni leur disponibilité, ni leur contenu, ni
                leurs pratiques. Leur utilisation peut être soumise à leurs propres conditions et politiques de
                confidentialité.
              </p>
              <p className="text-gray-600">
                Dans toute la mesure permise par la loi, TIA n'est pas responsable d'un dommage résultant
                exclusivement d'un service tiers indépendant de TIA.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                17. Disponibilité du Service et absence de garantie de résultat
              </h2>
              <p className="text-gray-600 mb-4">
                Le Service est fourni « <strong>en l'état</strong> » et « <strong>selon disponibilité</strong> »,
                dans toute la mesure permise par la loi. TIA ne garantit notamment pas :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>une disponibilité permanente ou sans interruption ;</Bullet>
                <Bullet>l'absence totale d'erreur, bug, incident ou perte de données ;</Bullet>
                <Bullet>la compatibilité avec tous les appareils, réseaux ou systèmes ;</Bullet>
                <Bullet>qu'un Utilisateur obtiendra un Match, une réponse, une rencontre ou une relation ;</Bullet>
                <Bullet>l'exactitude de toutes les informations publiées par les Utilisateurs ;</Bullet>
                <Bullet>la sécurité absolue de toute interaction ;</Bullet>
                <Bullet>l'absence de faux profil ou de comportement malveillant malgré les mesures de sécurité mises en place.</Bullet>
              </ul>
              <p className="text-gray-600">
                TIA peut modifier, suspendre ou faire évoluer certaines fonctionnalités pour des raisons techniques,
                de sécurité, juridiques ou commerciales.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                18. Clause essentielle — responsabilité individuelle des Utilisateurs
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-yellow-800 mb-0">
                  <strong>
                    Chaque Utilisateur est seul responsable de ses propres actes, déclarations, communications,
                    choix, déplacements, rencontres et transactions.
                  </strong>
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                Dans toute la mesure permise par la loi applicable, TIA ne répond pas des actes, omissions ou
                comportements d'un Utilisateur ou d'un tiers, sur ou hors du Service, notamment :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>mensonge, faux profil ou usurpation d'identité ;</Bullet>
                <Bullet>harcèlement, stalking, menaces ou intimidation ;</Bullet>
                <Bullet>vol, escroquerie, fraude, extorsion ou chantage ;</Bullet>
                <Bullet>discrimination ou atteinte à la réputation ;</Bullet>
                <Bullet>diffusion non consentie d'un contenu privé ou intime ;</Bullet>
                <Bullet>agression, violence, séquestration ou atteinte aux biens ;</Bullet>
                <Bullet>agression ou violence sexuelle ;</Bullet>
                <Bullet>prostitution, exploitation sexuelle ou traite ;</Bullet>
                <Bullet>acte criminel ou délictueux de toute nature ;</Bullet>
                <Bullet>dommage corporel, moral, matériel ou financier causé par un autre Utilisateur ou un tiers.</Bullet>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Le simple fait que deux personnes aient été mises en relation, aient communiqué ou se soient
                découvertes au moyen de TIA ne transfère pas à TIA la responsabilité des actes ultérieurs de l'une de
                ces personnes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                19. Renonciation et acceptation des risques liés aux interactions
              </h2>
              <p className="text-gray-600 mb-4">
                Dans toute la mesure permise par la loi applicable, l'Utilisateur reconnaît accepter les risques
                ordinaires et raisonnablement prévisibles inhérents à l'utilisation d'un service de rencontres et
                aux interactions avec des personnes inconnues.
              </p>
              <p className="text-gray-600 mb-4">
                Sous réserve des responsabilités légalement non excluables, l'Utilisateur renonce à diriger contre
                TIA une réclamation fondée exclusivement sur le comportement d'un autre Utilisateur ou d'un tiers
                lorsque TIA n'a pas elle-même commis de faute susceptible d'engager sa responsabilité en vertu de la
                loi applicable.
              </p>
              <p className="text-gray-600">
                Aucune stipulation des présentes ne vise à exonérer l'auteur d'un acte illicite de sa propre
                responsabilité.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                20. Limitation de responsabilité de TIA
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>Dans toute la mesure maximale autorisée par la loi applicable</strong>, TIA, APLI SARLU, ses
                dirigeants, salariés, représentants, prestataires et partenaires ne pourront être tenus responsables
                des dommages indirects, consécutifs, accessoires, spéciaux ou immatériels résultant de l'accès au
                Service ou de son utilisation, notamment perte de profit, perte d'opportunité, perte de données,
                préjudice commercial ou dommage résultant d'un acte d'un Utilisateur ou d'un tiers.
              </p>
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-0">
                  Sous réserve des cas dans lesquels un plafond de responsabilité est interdit par une règle
                  impérative, la responsabilité cumulée de TIA, tous faits générateurs et fondements confondus, au
                  titre d'un événement lié au Service, est limitée au montant effectivement payé par l'Utilisateur à
                  TIA au cours des douze (12) mois précédant directement le fait générateur. Pour un Utilisateur
                  n'ayant versé aucun montant à TIA au cours de cette période, cette clause ne crée aucune garantie
                  financière et s'applique dans toute la mesure autorisée par la loi.
                </p>
              </div>
              <p className="text-gray-600 text-sm italic">
                Les limitations du présent article constituent un élément essentiel de l'équilibre contractuel et
                s'appliquent quelle que soit la qualification juridique de la demande, sous réserve des règles
                impératives contraires.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                21. Responsabilités qui ne peuvent être exclues
              </h2>
              <p className="text-gray-600 mb-4">
                Aucune stipulation des présentes CGU n'exclut ou ne limite une responsabilité lorsque son exclusion
                ou sa limitation est interdite par une disposition légale impérative.
              </p>
              <p className="text-gray-600 mb-4">
                En particulier, les présentes CGU ne peuvent priver une personne d'un droit impératif résultant,
                lorsqu'il est applicable, d'une fraude ou d'un dol de TIA, d'une faute lourde lorsque la loi interdit
                son exclusion, d'une atteinte imputable à TIA que la loi impose d'indemniser, ni des droits
                impératifs attachés à la protection des données personnelles ou à la protection du consommateur.
              </p>
              <p className="text-gray-600">
                Toute clause de limitation doit être interprétée de manière à produire l'effet protecteur maximal
                légalement autorisé sans entraîner la nullité des autres stipulations.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                22. Indemnisation de TIA par l'Utilisateur
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-3">
                  Dans toute la mesure permise par la loi, l'Utilisateur s'engage à indemniser, défendre et tenir
                  indemnes TIA, APLI SARLU, leurs dirigeants, salariés, représentants, prestataires et partenaires
                  contre toute réclamation, procédure, condamnation, perte, dommage, coût ou frais raisonnable de
                  défense résultant directement :
                </p>
                <ul className="space-y-2 mb-0">
                  <Bullet>de la violation des présentes CGU par l'Utilisateur ;</Bullet>
                  <Bullet>d'un Contenu qu'il publie ou transmet ;</Bullet>
                  <Bullet>de la violation des droits d'un tiers ;</Bullet>
                  <Bullet>d'un comportement illicite, frauduleux, violent, abusif ou dangereux de sa part ;</Bullet>
                  <Bullet>d'une transaction ou d'un différend qu'il provoque avec un autre Utilisateur ou un tiers.</Bullet>
                </ul>
              </div>
              <p className="text-gray-600 text-sm italic">
                Cette obligation ne couvre pas la part d'un dommage directement causée par une faute propre de TIA
                dont la responsabilité ne peut être exclue par la loi.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                23. Coopération avec les autorités et conservation des preuves
              </h2>
              <p className="text-gray-600 mb-4">
                TIA peut préserver et communiquer des informations lorsqu'elle estime de bonne foi que cela est
                nécessaire pour :
              </p>
              <ul className="space-y-2 mb-4">
                <Bullet>répondre à une réquisition, décision judiciaire ou demande légalement valable ;</Bullet>
                <Bullet>protéger les droits ou la sécurité d'une personne ;</Bullet>
                <Bullet>
                  prévenir ou enquêter sur une fraude, une exploitation sexuelle, un risque impliquant un mineur ou
                  une infraction grave ;
                </Bullet>
                <Bullet>exercer ou défendre les droits de TIA.</Bullet>
              </ul>
              <p className="text-gray-600">
                Toute communication de données personnelles est effectuée conformément à la réglementation
                applicable et à la Politique de Confidentialité.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                24. Propriété intellectuelle de TIA
              </h2>
              <p className="text-gray-600 mb-4">
                L'Application, la marque TIA, les logiciels, bases de données, interfaces, éléments graphiques,
                textes, logos, fonctionnalités, modèles, systèmes et contenus appartenant à TIA ou à ses concédants
                sont protégés par les droits de propriété intellectuelle applicables.
              </p>
              <p className="text-gray-600 mb-4">
                TIA accorde à l'Utilisateur un droit personnel, limité, révocable, non exclusif et non transférable
                d'utiliser le Service pour un usage privé conformément aux présentes CGU.
              </p>
              <p className="text-gray-600">
                Sauf autorisation écrite, il est interdit de copier, modifier, distribuer, désassembler,
                rétroconcevoir, revendre, exploiter commercialement ou créer un service dérivé à partir de TIA, dans
                la mesure où une telle interdiction est légalement permise.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                25. Données personnelles
              </h2>
              <p className="text-gray-600">
                Le traitement des données personnelles est régi par la{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">
                  Politique de Confidentialité TIA
                </Link>
                , qui fait partie intégrante du cadre contractuel applicable au Service. L'Utilisateur doit également
                consulter les informations et consentements présentés au moment où certaines données sensibles,
                données de localisation ou données de vérification sont collectées.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                26. Force majeure et événements hors contrôle raisonnable
              </h2>
              <p className="text-gray-600">
                TIA ne pourra être tenue responsable d'un retard, d'une interruption ou d'une inexécution résultant
                d'un événement hors de son contrôle raisonnable, notamment catastrophe naturelle, panne majeure
                d'infrastructure, coupure d'électricité ou de télécommunication, cyberattaque externe malgré des
                mesures raisonnables, conflit, acte d'autorité, grève externe, défaillance généralisée d'un
                fournisseur critique ou autre cas de force majeure reconnu par la loi applicable.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                27. Modification du Service et des CGU
              </h2>
              <p className="text-gray-600 mb-4">
                TIA peut modifier les présentes CGU afin notamment de tenir compte d'une évolution du Service, de la
                sécurité, de la réglementation ou des pratiques techniques.
              </p>
              <p className="text-gray-600 mb-4">
                Toute modification substantielle sera portée à la connaissance des Utilisateurs par un moyen approprié
                avant son entrée en vigueur lorsque la loi l'exige.
              </p>
              <p className="text-gray-600">
                Lorsque l'acceptation expresse d'une nouvelle version est légalement nécessaire, TIA pourra demander
                une nouvelle validation avant de permettre la poursuite de l'utilisation du Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                28. Cession
              </h2>
              <p className="text-gray-600 mb-4">
                TIA peut transférer tout ou partie de ses droits et obligations dans le cadre d'une restructuration,
                fusion, acquisition, cession d'activité ou opération comparable, sous réserve des droits impératifs
                des Utilisateurs et des règles applicables à la protection des données.
              </p>
              <p className="text-gray-600">
                L'Utilisateur ne peut céder son Compte ou ses droits d'accès au Service sans l'accord écrit de TIA.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                29. Divisibilité
              </h2>
              <p className="text-gray-600">
                Si une stipulation des présentes CGU est déclarée nulle, illicite ou inapplicable, les autres
                stipulations demeurent en vigueur. La stipulation concernée sera interprétée ou remplacée, dans la
                mesure permise par la loi, de manière à se rapprocher le plus possible de l'objectif licite initial.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                30. Non-renonciation
              </h2>
              <p className="text-gray-600">
                Le fait pour TIA de ne pas exercer immédiatement un droit ne constitue pas une renonciation à ce
                droit.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                31. Intégralité de l'accord
              </h2>
              <p className="text-gray-600">
                Les présentes CGU, la Politique de Confidentialité, la Politique de Protection des Mineurs, la Charte
                de Sécurité et les Règles de la Communauté constituent, avec les informations spécifiques affichées
                lors d'un achat ou d'une fonctionnalité, l'ensemble des règles contractuelles applicables à
                l'utilisation de TIA.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                32. Survie
              </h2>
              <p className="text-gray-600">
                Les clauses qui, par leur nature, doivent continuer à produire effet après la fermeture d'un Compte
                demeurent applicables, notamment celles relatives à la propriété intellectuelle, à la responsabilité,
                à l'indemnisation, à la preuve, à la coopération avec les autorités, aux litiges et à la protection
                des données conservées légalement.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                33. Droit applicable et règlement des différends
              </h2>
              <p className="text-gray-600 mb-4">
                Sous réserve des règles impératives éventuellement applicables au consommateur dans son pays de
                résidence, les présentes CGU sont régies par le droit malgache.
              </p>
              <p className="text-gray-600 mb-4">
                Avant toute procédure, l'Utilisateur est invité à adresser une réclamation écrite à{" "}
                <a href="mailto:info@tia-meet.com" className="text-primary hover:underline font-medium">
                  info@tia-meet.com
                </a>{" "}
                afin de permettre une tentative de règlement amiable pendant trente (30) jours.
              </p>
              <p className="text-gray-600">
                À défaut d'accord amiable, les juridictions compétentes d'
                <strong>Antananarivo, Madagascar</strong>, pourront être saisies, sans préjudice de toute règle
                impérative de compétence juridictionnelle ou de protection du consommateur qui serait légalement
                applicable à l'Utilisateur.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                34. Langue
              </h2>
              <p className="text-gray-600">
                La version française des présentes CGU constitue la version de référence, sauf lorsqu'une règle
                impérative impose la primauté d'une autre version linguistique pour un Utilisateur déterminé.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                35. Contact
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
