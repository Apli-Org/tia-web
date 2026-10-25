import type { Metadata } from "next";
import { LegalCallout } from "@/components/legal/legal-callout";
import { LegalCard } from "@/components/legal/legal-card";
import { LegalContact } from "@/components/legal/legal-contact";
import { LegalItem } from "@/components/legal/legal-item";
import { LegalLink } from "@/components/legal/legal-link";
import { LegalList } from "@/components/legal/legal-list";
import { LegalNote } from "@/components/legal/legal-note";
import { LegalPage, type LegalPageSearchParams } from "@/components/legal/legal-page";
import { LegalSection } from "@/components/legal/legal-section";
import { LegalSubheading } from "@/components/legal/legal-subheading";
import { getLegalMetadata } from "@/lib/legal-metadata";

export const metadata: Metadata = getLegalMetadata(
  "Politique de confidentialité",
  "Comment APLI SARLU collecte, utilise, partage, conserve et protège les données personnelles des membres de Tia.",
);

type PrivacyPageProps = {
  searchParams: LegalPageSearchParams;
};

export default function PrivacyPage({ searchParams }: PrivacyPageProps) {
  return (
    <LegalPage
      title="Politique de Confidentialité"
      version="2.1"
      updatedAt="19 octobre 2026"
      searchParams={searchParams}
    >
      <LegalCallout>
        <p>
          La présente Politique de Confidentialité explique comment APLI SARLU, exploitant de Tia, collecte,
          utilise, partage, conserve et protège les données personnelles liées à l'utilisation de
          l'application Tia et de ses services associés.
        </p>
      </LegalCallout>

      <p>
        Elle doit être lue avec les{" "}
        <LegalLink href="/terms">
          Conditions Générales d'Utilisation
        </LegalLink>
        , la{" "}
        <LegalLink href="/child-safety">
          Politique de Protection des Mineurs
        </LegalLink>{" "}
        et, lorsque pertinent, les informations spécifiques affichées au moment de la collecte de certaines
        données.
      </p>

      <LegalSection title="1. Responsable du traitement">
        <LegalCard>
          <p>
            <strong>Responsable du traitement :</strong> APLI SARLU — Tia
          </p>
          <p>
            <strong>Adresse :</strong> LOGT 51, Cité Ampefiloha, Antananarivo, Madagascar
          </p>
          <p>
            <strong>RCS :</strong> RCS Antananarivo 2025 B 00769
          </p>
          <p>
            <strong>NIF :</strong> 4019287505
          </p>
          <p>
            <strong>STAT :</strong> 62011 11 2025 0 10781
          </p>
          <p>
            <strong>Contact vie privée :</strong>{" "}
            <LegalLink href="mailto:info@tia-meet.com">
              info@tia-meet.com
            </LegalLink>
          </p>
          <p>
            <strong>Délégué à la protection des données :</strong> à désigner / compléter conformément à la
            loi malgache
          </p>
        </LegalCard>
        <LegalNote>
          Lorsque la réglementation d'un autre pays impose la désignation d'un représentant local, les
          coordonnées correspondantes seront publiées dans cette Politique ou mises à disposition des
          personnes concernées.
        </LegalNote>
      </LegalSection>

      <LegalSection title="2. Champ d'application">
        <p>
          Cette Politique s'applique aux traitements de données personnelles réalisés par Tia dans le cadre :
        </p>
        <LegalList>
          <LegalItem>de la création et gestion d'un Compte ;</LegalItem>
          <LegalItem>de l'utilisation des fonctions de découverte et de mise en relation ;</LegalItem>
          <LegalItem>de la messagerie et des interactions entre Utilisateurs ;</LegalItem>
          <LegalItem>des outils de modération, signalement, sécurité et prévention de la fraude ;</LegalItem>
          <LegalItem>des Services Premium ;</LegalItem>
          <LegalItem>du support utilisateur ;</LegalItem>
          <LegalItem>des sites ou pages web de Tia auxquels la présente Politique renvoie.</LegalItem>
        </LegalList>
        <LegalNote>
          Les services tiers indépendants restent soumis à leurs propres politiques de confidentialité.
        </LegalNote>
      </LegalSection>

      <LegalSection title="3. Principes généraux">
        <p>
          Tia traite les données selon les principes de licéité, loyauté, transparence, finalité déterminée,
          proportionnalité, exactitude, limitation de conservation et sécurité prévus par la réglementation
          applicable. Nous cherchons à ne collecter que les données nécessaires aux finalités décrites
          ci-dessous.
        </p>
      </LegalSection>

      <LegalSection title="4. Données que nous collectons">
        <LegalSubheading>
          4.1 Données de Compte obligatoires ou nécessaires
        </LegalSubheading>
        <p>Selon le mode d'inscription utilisé, Tia peut collecter :</p>
        <LegalList>
          <LegalItem>prénom, nom ou pseudonyme affiché ;</LegalItem>
          <LegalItem>adresse email ;</LegalItem>
          <LegalItem>numéro de téléphone ;</LegalItem>
          <LegalItem>date de naissance et âge calculé ;</LegalItem>
          <LegalItem>identifiants de connexion ou jetons d'authentification ;</LegalItem>
          <LegalItem>pays ou région ;</LegalItem>
          <LegalItem>acceptation des CGU et consentements associés.</LegalItem>
        </LegalList>
        <LegalNote>
          Certaines informations sont obligatoires pour créer ou sécuriser un Compte. Si l'Utilisateur refuse
          de fournir une donnée nécessaire, certaines fonctionnalités peuvent ne pas être accessibles.
        </LegalNote>

        <LegalSubheading>4.2 Données de profil</LegalSubheading>
        <p>
          Tia peut collecter les données que l'Utilisateur choisit d'ajouter à son profil, notamment :
        </p>
        <LegalList>
          <LegalItem>genre ;</LegalItem>
          <LegalItem>photos ;</LegalItem>
          <LegalItem>biographie ;</LegalItem>
          <LegalItem>centres d'intérêt ;</LegalItem>
          <LegalItem>préférences de rencontre ;</LegalItem>
          <LegalItem>tranche d'âge recherchée ;</LegalItem>
          <LegalItem>distance ou zone recherchée ;</LegalItem>
          <LegalItem>informations facultatives sur le mode de vie, les goûts ou attentes relationnelles.</LegalItem>
        </LegalList>

        <LegalSubheading>
          4.3 Données sensibles liées à un service de rencontres
        </LegalSubheading>
        <LegalCard>
          <p>
            Compte tenu de la nature du Service, certaines informations fournies par l'Utilisateur peuvent
            constituer des <strong>données sensibles</strong>, notamment lorsqu'elles révèlent ou permettent
            raisonnablement d'inférer des informations relatives à la vie sexuelle, aux préférences de
            rencontre, à l'orientation sexuelle, à la santé, aux convictions religieuses ou à d'autres
            catégories protégées par la loi. Lorsque le traitement d'une donnée sensible repose sur le
            consentement exprès, Tia recueille un consentement spécifique, libre et informé conformément à la
            réglementation applicable. L'Utilisateur peut retirer ce consentement lorsqu'il constitue la base
            du traitement ; le retrait n'affecte pas la licéité du traitement effectué avant le retrait, mais
            peut rendre certaines fonctionnalités indisponibles.
          </p>
        </LegalCard>

        <LegalSubheading>4.4 Localisation</LegalSubheading>
        <p>
          Si l'Utilisateur autorise la permission correspondante, Tia peut collecter une localisation précise
          ou approximative fournie par l'appareil afin notamment :
        </p>
        <LegalList>
          <LegalItem>d'afficher des profils pertinents selon la distance ;</LegalItem>
          <LegalItem>de permettre les fonctions de recherche géographique ;</LegalItem>
          <LegalItem>de détecter certains comportements frauduleux ou incohérents ;</LegalItem>
          <LegalItem>d'assurer la sécurité du Compte.</LegalItem>
        </LegalList>
        <LegalNote>
          La localisation exacte n'a pas vocation à être affichée publiquement. Tia peut afficher une distance
          approximative ou une zone selon les paramètres du Service. L'Utilisateur peut modifier les
          autorisations de localisation dans les réglages de son appareil, sous réserve de l'impact sur
          certaines fonctionnalités.
        </LegalNote>

        <LegalSubheading>4.5 Messages et interactions</LegalSubheading>
        <p>
          Tia traite les informations nécessaires au fonctionnement des interactions, notamment :
        </p>
        <LegalList>
          <LegalItem>likes, matchs, refus ou autres signaux d'intérêt ;</LegalItem>
          <LegalItem>messages et pièces jointes envoyés dans l'Application ;</LegalItem>
          <LegalItem>date et heure des échanges ;</LegalItem>
          <LegalItem>statut de lecture lorsqu'une telle fonction existe ;</LegalItem>
          <LegalItem>blocages et signalements.</LegalItem>
        </LegalList>
        <LegalNote>
          Les messages peuvent être analysés par des systèmes automatisés et/ou examinés par une personne
          autorisée lorsqu'il existe un signalement, un risque de sécurité, une obligation légale ou un motif
          légitime de modération conformément à la réglementation applicable.
        </LegalNote>

        <LegalSubheading>
          4.6 Données de vérification d'identité ou de photo
        </LegalSubheading>
        <p>
          Tia peut proposer ou demander une vérification de photo, de selfie, d'âge ou d'identité. Selon le
          mécanisme utilisé, les données peuvent inclure :
        </p>
        <LegalList>
          <LegalItem>selfie ou courte séquence vidéo ;</LegalItem>
          <LegalItem>photographie d'un document d'identité ;</LegalItem>
          <LegalItem>informations figurant sur le document strictement nécessaires au contrôle ;</LegalItem>
          <LegalItem>résultats d'une comparaison automatisée ;</LegalItem>
          <LegalItem>données techniques relatives à la vérification ;</LegalItem>
          <LegalItem>
            lorsque la technologie utilisée l'implique, <strong>données biométriques ou géométrie faciale</strong>.
          </LegalItem>
        </LegalList>
        <LegalCard>
          <p>
            Les données biométriques sont considérées comme sensibles par la loi malgache. Lorsqu'un tel
            traitement est mis en œuvre, Tia applique les formalités, garanties et bases légales requises et
            recueille un consentement exprès lorsqu'il constitue le fondement légal applicable. Tia n'utilise
            pas une vérification comme une certification de moralité ou d'absence d'antécédents.
          </p>
        </LegalCard>

        <LegalSubheading>4.7 Données techniques et d'utilisation</LegalSubheading>
        <p>Tia peut collecter automatiquement :</p>
        <LegalList>
          <LegalItem>adresse IP ;</LegalItem>
          <LegalItem>modèle d'appareil ;</LegalItem>
          <LegalItem>système d'exploitation ;</LegalItem>
          <LegalItem>version de l'Application ;</LegalItem>
          <LegalItem>identifiants techniques et identifiants mobiles autorisés ;</LegalItem>
          <LegalItem>langue, fuseau horaire, pays ;</LegalItem>
          <LegalItem>logs de connexion ;</LegalItem>
          <LegalItem>événements d'utilisation et interactions avec l'interface ;</LegalItem>
          <LegalItem>diagnostics, erreurs et crashs ;</LegalItem>
          <LegalItem>informations nécessaires à la prévention de fraude et à la sécurité.</LegalItem>
        </LegalList>

        <LegalSubheading>4.8 Données de paiement et d'abonnement</LegalSubheading>
        <LegalCard>
          <p>
            Lorsque l'achat est traité par Apple, Google ou un autre prestataire de paiement, ce prestataire
            collecte les données de paiement conformément à sa propre politique. Tia ne conserve pas le numéro
            complet de carte bancaire lorsque celui-ci est traité exclusivement par un prestataire tiers.
          </p>
        </LegalCard>
        <p>Tia peut toutefois recevoir et conserver :</p>
        <LegalList>
          <LegalItem>identifiant de transaction ;</LegalItem>
          <LegalItem>produit acheté ;</LegalItem>
          <LegalItem>date et montant ;</LegalItem>
          <LegalItem>statut de paiement ;</LegalItem>
          <LegalItem>historique d'abonnement ;</LegalItem>
          <LegalItem>informations nécessaires au support, à la comptabilité ou à la lutte contre la fraude.</LegalItem>
        </LegalList>

        <LegalSubheading>4.9 Support, réclamations et signalements</LegalSubheading>
        <p>
          Lorsque l'Utilisateur contacte Tia ou signale un autre Compte, nous pouvons collecter :
        </p>
        <LegalList>
          <LegalItem>coordonnées ;</LegalItem>
          <LegalItem>contenu de la demande ;</LegalItem>
          <LegalItem>pièces jointes ;</LegalItem>
          <LegalItem>Compte ou Utilisateur concerné ;</LegalItem>
          <LegalItem>messages, captures ou preuves communiquées ;</LegalItem>
          <LegalItem>historique de traitement du signalement ;</LegalItem>
          <LegalItem>mesures de modération prises.</LegalItem>
        </LegalList>

        <LegalSubheading>4.10 Données provenant de tiers</LegalSubheading>
        <p>
          Lorsque l'Utilisateur choisit une connexion via Apple, Google ou un autre fournisseur d'identité,
          Tia peut recevoir les données que ce fournisseur autorise à transmettre, par exemple nom, adresse
          email, identifiant ou jeton d'authentification. Tia peut également recevoir des informations de
          prestataires de sécurité, d'anti-fraude, de paiement ou de support nécessaires à la fourniture du
          Service.
        </p>
      </LegalSection>

      <LegalSection title="5. Finalités et bases légales">
        <p>
          Tia traite les données pour les finalités suivantes, selon la base légale applicable au traitement
          concerné :
        </p>

        <LegalSubheading>5.1 Exécution du contrat</LegalSubheading>
        <LegalList>
          <LegalItem>créer, authentifier et administrer le Compte ;</LegalItem>
          <LegalItem>afficher et gérer le profil ;</LegalItem>
          <LegalItem>fournir les fonctionnalités de découverte, Match et messagerie ;</LegalItem>
          <LegalItem>gérer les préférences et fonctionnalités choisies ;</LegalItem>
          <LegalItem>gérer les Services Premium et droits associés ;</LegalItem>
          <LegalItem>fournir le support utilisateur ;</LegalItem>
          <LegalItem>assurer les notifications nécessaires au fonctionnement du Service.</LegalItem>
        </LegalList>

        <LegalSubheading>5.2 Consentement</LegalSubheading>
        <p>Lorsque requis, le consentement peut être utilisé notamment pour :</p>
        <LegalList>
          <LegalItem>certaines données sensibles ;</LegalItem>
          <LegalItem>certaines données biométriques ;</LegalItem>
          <LegalItem>géolocalisation lorsque la permission de l'appareil l'exige ;</LegalItem>
          <LegalItem>notifications non essentielles ;</LegalItem>
          <LegalItem>cookies, SDKs ou outils de mesure/marketing non strictement nécessaires ;</LegalItem>
          <LegalItem>communications promotionnelles facultatives.</LegalItem>
        </LegalList>

        <LegalSubheading>5.3 Intérêt légitime</LegalSubheading>
        <p>
          Sous réserve des droits et libertés des Utilisateurs, Tia peut traiter certaines données pour :
        </p>
        <LegalList>
          <LegalItem>prévenir fraude, usurpation, spam et abus ;</LegalItem>
          <LegalItem>protéger la sécurité du Service et des Utilisateurs ;</LegalItem>
          <LegalItem>détecter les tentatives de contournement d'un bannissement ;</LegalItem>
          <LegalItem>modérer le Service et enquêter sur un signalement ;</LegalItem>
          <LegalItem>assurer la sécurité informatique ;</LegalItem>
          <LegalItem>établir des statistiques agrégées et améliorer les performances ;</LegalItem>
          <LegalItem>défendre les droits de Tia ou répondre à un litige.</LegalItem>
        </LegalList>

        <LegalSubheading>
          5.4 Obligation légale ou sauvegarde de la vie / sécurité
        </LegalSubheading>
        <p>Tia peut traiter ou communiquer des données lorsque cela est nécessaire pour :</p>
        <LegalList>
          <LegalItem>respecter une réquisition ou obligation légale ;</LegalItem>
          <LegalItem>répondre à une autorité compétente ;</LegalItem>
          <LegalItem>protéger la vie ou l'intégrité d'une personne dans une situation grave ;</LegalItem>
          <LegalItem>
            coopérer à une enquête relative notamment à l'exploitation sexuelle d'un mineur, à une violence
            grave ou à une fraude ;
          </LegalItem>
          <LegalItem>respecter les obligations comptables, fiscales ou de conservation applicables.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="6. Recommandations, algorithmes et traitements automatisés">
        <p>
          Tia peut utiliser des systèmes algorithmiques afin de classer les profils, personnaliser les
          suggestions, limiter le spam et identifier des comportements anormaux. Ces traitements peuvent
          utiliser notamment l'âge et les préférences, la distance, l'activité récente, l'historique
          d'interactions, des signaux de sécurité ou de fraude et les paramètres du profil.
        </p>
        <p>
          Les recommandations ont pour objectif de rendre le Service plus pertinent. Elles ne constituent pas
          une garantie concernant un autre Utilisateur.
        </p>
        <p>
          Sauf disposition contraire expressément annoncée, Tia n'utilise pas un traitement entièrement
          automatisé produisant à lui seul des effets juridiques ou des effets significatifs comparables sur
          l'Utilisateur sans mettre en place les garanties requises par la loi applicable.
        </p>
      </LegalSection>

      <LegalSection title="7. Données visibles par les autres Utilisateurs">
        <p>
          Le fonctionnement d'un service de rencontres implique que certaines informations du profil soient
          visibles par d'autres Utilisateurs. Selon les réglages et fonctionnalités, peuvent notamment être
          visibles :
        </p>
        <LegalList>
          <LegalItem>prénom ou pseudonyme ;</LegalItem>
          <LegalItem>âge ;</LegalItem>
          <LegalItem>genre ;</LegalItem>
          <LegalItem>photos ;</LegalItem>
          <LegalItem>biographie ;</LegalItem>
          <LegalItem>centres d'intérêt ;</LegalItem>
          <LegalItem>distance approximative ;</LegalItem>
          <LegalItem>informations de profil choisies par l'Utilisateur ;</LegalItem>
          <LegalItem>statut de vérification éventuel.</LegalItem>
        </LegalList>
        <LegalCallout tone="alert">
          <p>
            Les messages sont visibles par leurs destinataires. Tia ne peut empêcher un destinataire de
            copier, enregistrer, photographier ou retransmettre illicitement une information qu'il a reçue,
            bien qu'un tel comportement puisse violer les CGU ou la loi. L'Utilisateur doit donc éviter de
            transmettre des informations particulièrement sensibles avant d'avoir évalué la personne avec
            laquelle il échange.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection title="8. Destinataires et partage des données">
        <LegalCallout>
          <p className="font-semibold">Tia ne vend pas les données personnelles des Utilisateurs.</p>
        </LegalCallout>
        <p>
          Les données peuvent être communiquées, dans la mesure nécessaire, aux catégories suivantes :
        </p>

        <LegalSubheading>8.1 Autres Utilisateurs</LegalSubheading>
        <p>
          Pour permettre les fonctionnalités du Service, les données de profil et communications sont rendues
          accessibles aux personnes auxquelles elles sont destinées.
        </p>

        <LegalSubheading>8.2 Prestataires techniques</LegalSubheading>
        <p>Tia peut faire appel à des prestataires pour :</p>
        <LegalList>
          <LegalItem>hébergement et infrastructure cloud ;</LegalItem>
          <LegalItem>base de données et stockage ;</LegalItem>
          <LegalItem>authentification ;</LegalItem>
          <LegalItem>notifications push ;</LegalItem>
          <LegalItem>envoi d'emails ou SMS ;</LegalItem>
          <LegalItem>gestion d'abonnement et paiement ;</LegalItem>
          <LegalItem>analytics et mesure de performance ;</LegalItem>
          <LegalItem>modération et sécurité ;</LegalItem>
          <LegalItem>prévention de fraude ;</LegalItem>
          <LegalItem>support client ;</LegalItem>
          <LegalItem>vérification de photo ou d'identité.</LegalItem>
        </LegalList>
        <LegalNote>
          Ces prestataires doivent traiter les données selon les instructions contractuelles applicables et
          mettre en œuvre des garanties de confidentialité et de sécurité appropriées.
        </LegalNote>

        <LegalSubheading>8.3 Apple, Google et fournisseurs de plateformes</LegalSubheading>
        <p>
          Certaines données sont échangées avec Apple, Google ou d'autres plateformes lorsque cela est
          nécessaire à l'authentification, au paiement, aux notifications, à la distribution de l'Application
          ou au respect de leurs politiques.
        </p>

        <LegalSubheading>8.4 Autorités et procédures légales</LegalSubheading>
        <p>
          Tia peut transmettre des données à une autorité, un tribunal ou un organisme compétent lorsqu'une
          telle communication est légalement requise ou autorisée, notamment dans le cadre d'une enquête, d'un
          risque grave pour la sécurité d'une personne ou de la protection des mineurs.
        </p>

        <LegalSubheading>8.5 Restructuration d'entreprise</LegalSubheading>
        <p>
          En cas de fusion, acquisition, financement, cession d'activité ou restructuration, certaines données
          peuvent être transférées à l'entité concernée, sous réserve des garanties applicables et des droits
          des personnes.
        </p>
      </LegalSection>

      <LegalSection title="9. Transferts internationaux">
        <p>
          Les prestataires de Tia peuvent être établis à Madagascar ou dans d'autres pays.
        </p>
        <p>
          Conformément à la loi malgache, Tia veille à ce qu'un transfert vers l'étranger repose sur un niveau
          de protection similaire ou, lorsque ce niveau n'est pas établi, sur les garanties et autorisations
          requises, notamment les mécanismes contractuels appropriés et, lorsque nécessaire, l'autorisation de
          la Commission Malagasy de l'Informatique et des Libertés (« CMIL »).
        </p>
        <p>
          Lorsque le RGPD ou une autre réglementation internationale est applicable, Tia met en place les
          mécanismes de transfert requis par cette réglementation en complément des obligations malgaches.
        </p>
      </LegalSection>

      <LegalSection title="10. Durées de conservation">
        <p>
          Tia conserve les données uniquement pendant la durée nécessaire à la finalité concernée, puis les
          supprime, anonymise ou archive lorsqu'une obligation légale, une nécessité de sécurité ou la défense
          d'un droit impose une conservation supplémentaire. Les principes suivants s'appliquent :
        </p>

        <LegalSubheading>10.1 Compte actif</LegalSubheading>
        <p>
          Les données nécessaires au fonctionnement du Compte sont conservées pendant la durée d'utilisation
          du Service.
        </p>

        <LegalSubheading>10.2 Suppression volontaire du Compte</LegalSubheading>
        <p>Lorsque l'Utilisateur demande la suppression :</p>
        <LegalList>
          <LegalItem>le profil est rendu inaccessible aux autres Utilisateurs dans un délai raisonnable ;</LegalItem>
          <LegalItem>
            les données actives destinées au fonctionnement courant sont supprimées ou dissociées du Compte
            dans un délai cible maximal de trente (30) jours, sauf exception justifiée ;
          </LegalItem>
          <LegalItem>
            des copies résiduelles peuvent subsister temporairement dans les sauvegardes jusqu'à leur rotation
            normale, généralement pour une période supplémentaire pouvant aller jusqu'à quatre-vingt-dix (90)
            jours ;
          </LegalItem>
          <LegalItem>
            certaines informations peuvent être conservées séparément lorsqu'une obligation légale, une
            enquête, la sécurité, la prévention de fraude, la preuve d'un droit ou la protection d'une personne
            le justifie.
          </LegalItem>
        </LegalList>

        <LegalSubheading>10.3 Comptes bannis ou comportements dangereux</LegalSubheading>
        <p>
          Tia peut conserver pendant une durée proportionnée les informations strictement nécessaires
          permettant d'identifier un Compte banni, prévenir une réinscription frauduleuse, conserver la preuve
          d'un incident ou défendre ses droits. La durée est déterminée selon la gravité du comportement, les
          risques de récidive, les délais de prescription et les obligations légales applicables.
        </p>

        <LegalSubheading>10.4 Signalements et sécurité</LegalSubheading>
        <p>
          Les dossiers de signalement, preuves, décisions de modération et informations associées peuvent être
          conservés au-delà de la fermeture d'un Compte lorsqu'ils sont nécessaires à la protection des
          Utilisateurs, à une procédure, à une enquête, à une obligation légale ou à la défense de Tia.
        </p>

        <LegalSubheading>10.5 Données de paiement</LegalSubheading>
        <p>
          Les informations transactionnelles et comptables peuvent être conservées pendant la durée imposée
          par les obligations fiscales, comptables ou de preuve applicables.
        </p>

        <LegalSubheading>10.6 Données de vérification</LegalSubheading>
        <p>
          Les selfies, documents et éventuelles données biométriques sont conservés pendant la durée annoncée
          au moment de la vérification et strictement nécessaire aux finalités de sécurité ou de vérification,
          sous réserve des exigences légales applicables. La durée exacte dépend du mécanisme de vérification
          utilisé et peut être précisée au moment de la collecte ou dans un avis spécifique.
        </p>
      </LegalSection>

      <LegalSection id="delete-data" title="11. Suppression du Compte et des données">
        <p>L'Utilisateur peut demander la suppression de son Compte :</p>
        <LegalList>
          <LegalItem>depuis les paramètres de l'Application lorsque la fonctionnalité est disponible ; et/ou</LegalItem>
          <LegalItem>
            en écrivant à{" "}
            <LegalLink href="mailto:info@tia-meet.com">
              info@tia-meet.com
            </LegalLink>{" "}
            avec l'objet « Demande de suppression de compte » et les informations permettant d'identifier le
            Compte.
          </LegalItem>
        </LegalList>
        <p>
          Tia peut demander une vérification raisonnable de l'identité du demandeur afin d'éviter la
          suppression frauduleuse du Compte d'un tiers. La suppression du Compte n'annule pas automatiquement
          un abonnement géré par Apple ou Google.
        </p>
        <p>
          La suppression ne peut pas être utilisée pour exiger la destruction immédiate d'informations que Tia
          est légalement tenue ou légitimement autorisée à conserver, par exemple pour une enquête, un litige,
          une obligation comptable ou un dossier de sécurité.
        </p>
        <p>
          La procédure détaillée de suppression est décrite sur la page{" "}
          <LegalLink href="/account-deletion">
            Suppression du Compte et des Données
          </LegalLink>
          .
        </p>
      </LegalSection>

      <LegalSection title="12. Droits des personnes au titre de la loi malgache">
        <p>
          Sous réserve des conditions et exceptions prévues par la réglementation applicable, l'Utilisateur
          peut notamment :
        </p>
        <LegalCard>
          <LegalList>
            <LegalItem marker="check">demander si Tia traite des données le concernant ;</LegalItem>
            <LegalItem marker="check">accéder aux catégories de données, finalités et destinataires ;</LegalItem>
            <LegalItem marker="check">
              demander la rectification, mise à jour, verrouillage ou effacement de données inexactes ou
              traitées illicitement ;
            </LegalItem>
            <LegalItem marker="check">s'opposer à certains traitements pour motif légitime ;</LegalItem>
            <LegalItem marker="check">s'opposer à la prospection ;</LegalItem>
            <LegalItem marker="check">obtenir les informations relatives aux transferts internationaux lorsque la loi le prévoit.</LegalItem>
          </LegalList>
        </LegalCard>
        <p>
          Les demandes peuvent être adressées à{" "}
          <LegalLink href="mailto:info@tia-meet.com">
            info@tia-meet.com
          </LegalLink>
          . Tia peut demander une preuve raisonnable d'identité et peut refuser ou limiter une demande
          manifestement abusive ou lorsque la loi prévoit une exception.
        </p>
      </LegalSection>

      <LegalSection title="13. Droits supplémentaires lorsque le RGPD s'applique">
        <p>
          Lorsque le Règlement général sur la protection des données de l'Union européenne (« RGPD »)
          s'applique au traitement concerné, l'Utilisateur peut disposer, selon les conditions légales, de
          droits supplémentaires, notamment :
        </p>
        <LegalList>
          <LegalItem>droit à l'effacement ;</LegalItem>
          <LegalItem>droit à la limitation ;</LegalItem>
          <LegalItem>droit à la portabilité ;</LegalItem>
          <LegalItem>droit d'opposition à certains traitements fondés sur l'intérêt légitime ;</LegalItem>
          <LegalItem>droit de retirer un consentement ;</LegalItem>
          <LegalItem>droits liés à certaines décisions automatisées ;</LegalItem>
          <LegalItem>droit d'introduire une réclamation auprès de l'autorité de contrôle compétente.</LegalItem>
        </LegalList>
        <p>
          Certaines données relatives à la vie sexuelle, à l'orientation sexuelle ou données biométriques
          peuvent constituer des catégories particulières au sens du RGPD et nécessiter une condition
          spécifique de traitement, notamment le consentement explicite lorsqu'il est utilisé comme fondement.
        </p>
        <p>
          Lorsque le RGPD impose la désignation d'un représentant dans l'Union européenne ou d'un délégué à la
          protection des données, Tia met en place cette désignation avant de réaliser les traitements qui
          l'exigent et publie les coordonnées correspondantes.
        </p>
      </LegalSection>

      <LegalSection title="14. Cookies, SDKs et technologies similaires">
        <p>Tia peut utiliser des cookies, SDKs, identifiants ou technologies similaires. Ils peuvent être classés notamment comme :</p>
        <LegalList>
          <LegalItem>strictement nécessaires au fonctionnement ou à la sécurité ;</LegalItem>
          <LegalItem>mesure d'audience et diagnostic ;</LegalItem>
          <LegalItem>personnalisation ;</LegalItem>
          <LegalItem>marketing ou publicité, si ces fonctions sont utilisées.</LegalItem>
        </LegalList>
        <LegalNote>
          Lorsqu'un consentement est requis pour une technologie non essentielle, Tia le recueille avant son
          activation et permet son retrait selon les mécanismes disponibles. Les préférences peuvent également
          être gérées via les paramètres de l'appareil ou du système d'exploitation lorsque pertinent.
        </LegalNote>
        <LegalSubheading>14.1 Mesure publicitaire (Meta)</LegalSubheading>
        <p>
          L'Application utilise le SDK de Meta Platforms pour savoir quelles publicités amènent de nouveaux
          membres (installation et ouverture de l'Application). Sur iOS, l'identifiant publicitaire n'est
          partagé qu'avec l'accord de l'Utilisateur, donné via la demande de suivi d'Apple. Le profil, les
          photos et les messages ne sont jamais transmis à Meta.
        </p>
      </LegalSection>

      <LegalSection title="15. Sécurité">
        <p>
          Tia met en œuvre des mesures techniques et organisationnelles proportionnées à la nature des données
          et aux risques, notamment selon les systèmes utilisés :
        </p>
        <LegalList>
          <LegalItem>contrôle des accès ;</LegalItem>
          <LegalItem>limitation des privilèges internes ;</LegalItem>
          <LegalItem>chiffrement des communications en transit ;</LegalItem>
          <LegalItem>mécanismes d'authentification ;</LegalItem>
          <LegalItem>journalisation de sécurité ;</LegalItem>
          <LegalItem>sauvegardes et mesures de résilience ;</LegalItem>
          <LegalItem>procédures de gestion des incidents ;</LegalItem>
          <LegalItem>obligations contractuelles de sécurité imposées aux sous-traitants.</LegalItem>
        </LegalList>
        <LegalNote>
          Aucun système informatique n'offre une sécurité absolue. Tia ne peut donc garantir qu'un incident ne
          surviendra jamais malgré des mesures raisonnables. L'Utilisateur contribue à la sécurité en
          protégeant ses identifiants, son appareil et les informations qu'il choisit de partager.
        </LegalNote>
      </LegalSection>

      <LegalSection title="16. Violations de données">
        <p>
          En cas de violation de données personnelles, Tia évalue la nature de l'incident, les données
          concernées et le risque pour les personnes. Tia prend les mesures de confinement et de remédiation
          appropriées et effectue les notifications aux personnes et/ou autorités compétentes lorsque la
          réglementation applicable l'exige.
        </p>
      </LegalSection>

      <LegalSection title="17. Mineurs">
        <LegalCallout tone="alert">
          <p className="font-semibold">
            Tia est strictement réservé aux personnes âgées de 18 ans et plus.
          </p>
        </LegalCallout>
        <p>
          Tia ne cherche pas à collecter intentionnellement les données d'une personne mineure. Lorsqu'un
          Compte est raisonnablement suspecté d'appartenir à une personne mineure, Tia peut le suspendre
          immédiatement, demander une vérification d'âge et supprimer les données lorsque la situation est
          confirmée, sous réserve de la conservation strictement nécessaire à la sécurité, à une preuve ou à
          un signalement légal. Pour plus de détails, consulter la{" "}
          <LegalLink href="/child-safety">
            Politique de Protection des Mineurs Tia
          </LegalLink>
          .
        </p>
      </LegalSection>

      <LegalSection title="18. Confidentialité des signalements">
        <p>
          Tia traite les signalements avec un niveau de confidentialité approprié. La personne signalée n'est
          pas automatiquement informée de l'identité du signalant. Toutefois, des informations peuvent être
          communiquées lorsqu'une procédure contradictoire, une obligation légale ou l'exercice de droits
          l'exige.
        </p>
      </LegalSection>

      <LegalSection title="19. Traitements automatisés et intelligence artificielle">
        <p>
          Tia utilise des traitements algorithmiques et des fonctionnalités d'intelligence artificielle pour
          proposer des suggestions de mise en relation et améliorer l'expérience utilisateur. Ces traitements
          ne produisent pas de décision entièrement automatisée ayant des effets juridiques ou des effets
          significatifs similaires sur l'Utilisateur sans les garanties requises par la loi applicable.
          L'Utilisateur peut à tout moment demander des informations sur leur logique en écrivant à{" "}
          <LegalLink href="mailto:info@tia-meet.com">
            info@tia-meet.com
          </LegalLink>
          .
        </p>
      </LegalSection>

      <LegalSection title="20. Modifications de la Politique">
        <p>
          Tia peut modifier cette Politique afin de refléter une évolution du Service, de la réglementation ou
          de ses pratiques.
        </p>
        <p>
          En cas de modification substantielle, Tia en informe les Utilisateurs par un moyen approprié avant
          l'entrée en vigueur lorsque la loi l'exige. La date de dernière mise à jour figure en tête du
          document.
        </p>
      </LegalSection>

      <LegalSection title="21. Réclamations, autorité de contrôle et contact">
        <p>
          Pour toute question ou réclamation relative aux données personnelles, vous pouvez nous contacter à :
        </p>
        <LegalContact label="Email de contact">
          <LegalLink href="mailto:info@tia-meet.com">info@tia-meet.com</LegalLink>
        </LegalContact>
        <LegalNote>
          Sous réserve de sa compétence et de son fonctionnement institutionnel applicable, l'Utilisateur peut
          également saisir la <strong>Commission Malagasy de l'Informatique et des Libertés (CMIL)</strong> ou
          toute autorité de contrôle compétente selon la réglementation qui lui est applicable. Les personnes
          bénéficiant du RGPD peuvent également saisir l'autorité de protection des données compétente dans
          l'Espace économique européen lorsque le RGPD leur confère ce droit.
        </LegalNote>
      </LegalSection>
    </LegalPage>
  );
}
