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
import { getLegalMetadata } from "@/lib/legal-metadata";

export const metadata: Metadata = getLegalMetadata(
  "Conditions générales d’utilisation",
  "Les règles qui encadrent l’accès et l’utilisation de Tia, l’appli de rencontre éditée par APLI SARLU.",
);

type TermsPageProps = {
  searchParams: LegalPageSearchParams;
};

export default function TermsPage({ searchParams }: TermsPageProps) {
  return (
    <LegalPage
      title="Conditions Générales d'Utilisation et de Vente des services de APLI SARLU"
      version="2.1"
      updatedAt="25 octobre 2026"
      searchParams={searchParams}
    >
      <LegalCallout>
        <p>
          Les présentes Conditions Générales d'Utilisation (« CGU ») régissent l'accès et l'utilisation de
          l'application mobile Tia, de ses sites, interfaces, fonctionnalités, contenus et services associés
          (ensemble, le « Service »), édités par APLI SARLU. En créant un Compte, en cochant la case
          d'acceptation ou en utilisant le Service, l'Utilisateur reconnaît avoir lu, compris et accepté sans
          réserve les présentes CGU, la Politique de Confidentialité, la Politique de Protection des Mineurs
          et les Règles de la Communauté Tia. Si l'Utilisateur n'accepte pas ces documents, il ne doit pas
          créer de Compte ni utiliser le Service.
        </p>
      </LegalCallout>

      <LegalSection title="1. Identification de l'éditeur">
        <LegalCard>
          <p>
            <strong>Éditeur / exploitant :</strong> APLI SARLU, société à responsabilité limitée
            unipersonnelle de droit malgache
          </p>
          <p>
            <strong>Siège social :</strong> LOGT 51, Cité Ampefiloha, Antananarivo, Madagascar
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
            <strong>Représentant légal / Directeur de publication :</strong> Ali Pirbay
          </p>
          <p>
            <strong>Email général :</strong>{" "}
            <LegalLink href="mailto:info@tia-meet.com">
              info@tia-meet.com
            </LegalLink>
          </p>
          <p>
            <strong>Contact sécurité / signalements :</strong>{" "}
            <LegalLink href="mailto:info@tia-meet.com">
              info@tia-meet.com
            </LegalLink>
          </p>
          <p>
            <strong>Contact vie privée :</strong>{" "}
            <LegalLink href="mailto:info@tia-meet.com">
              info@tia-meet.com
            </LegalLink>
          </p>
        </LegalCard>
        <LegalNote>
          Dans les présentes CGU, « Tia », « APLI », « la Société », « nous », « notre » ou « nos » désignent
          APLI SARLU selon le contexte.
        </LegalNote>
      </LegalSection>

      <LegalSection title="2. Définitions">
        <LegalList>
          <LegalItem>
            <strong>Application :</strong> l'application mobile Tia et, le cas échéant, toute interface web
            associée.
          </LegalItem>
          <LegalItem>
            <strong>Compte :</strong> l'espace personnel créé par un Utilisateur afin d'accéder au Service.
          </LegalItem>
          <LegalItem>
            <strong>Contenu :</strong> tout texte, photo, image, vidéo, audio, donnée, message, information,
            lien ou autre élément transmis, publié, envoyé ou rendu accessible via le Service.
          </LegalItem>
          <LegalItem>
            <strong>Contenu Utilisateur :</strong> tout Contenu fourni par un Utilisateur.
          </LegalItem>
          <LegalItem>
            <strong>Match / Mise en relation :</strong> toute fonctionnalité permettant à deux Utilisateurs
            d'entrer en contact, selon les règles du Service.
          </LegalItem>
          <LegalItem>
            <strong>Service :</strong> l'ensemble des fonctionnalités fournies par Tia, gratuites ou payantes,
            y compris les outils de découverte, de suggestion, de communication, de modération, de
            vérification et les fonctionnalités assistées par algorithme ou intelligence artificielle.
          </LegalItem>
          <LegalItem>
            <strong>Utilisateur :</strong> toute personne physique majeure utilisant le Service.
          </LegalItem>
          <LegalItem>
            <strong>Services Premium :</strong> les abonnements, options ou fonctionnalités payantes proposées
            dans l'Application.
          </LegalItem>
          <LegalItem>
            <strong>Partenaire technique :</strong> tout prestataire intervenant pour le compte de Tia,
            notamment en matière d'hébergement, authentification, paiement, messagerie, notifications,
            analyse, sécurité, modération ou support.
          </LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Objet et nature du Service">
        <p>
          Tia fournit une plateforme technologique permettant à des personnes majeures de découvrir d'autres
          Utilisateurs, d'exprimer un intérêt réciproque et, lorsque les fonctionnalités le permettent, de
          communiquer.
        </p>
        <p>
          Tia n'est pas une agence matrimoniale, un service de conseil sentimental, un service de vérification
          d'antécédents, un service de sécurité privée, un assureur, un garant de moralité, un mandataire d'un
          Utilisateur, ni une partie à une relation, une rencontre ou une transaction pouvant intervenir entre
          Utilisateurs.
        </p>
        <p>
          Tia n'organise pas, ne supervise pas et ne contrôle pas les rencontres physiques entre Utilisateurs.
          Toute décision de poursuivre une conversation, de communiquer hors de l'Application ou de rencontrer
          une personne dans le monde réel est prise indépendamment par les personnes concernées.
        </p>
        <LegalCard>
          <p>
            L'obligation de Tia est une obligation de moyens consistant notamment à mettre à disposition le
            Service conformément aux fonctionnalités proposées, sous réserve de la disponibilité technique, de
            la maintenance, des règles de modération et des limites prévues par les présentes CGU.
          </p>
        </LegalCard>
      </LegalSection>

      <LegalSection title="4. Conditions d'éligibilité — Service strictement réservé aux majeurs">
        <p>
          Le Service est strictement réservé aux personnes âgées de <strong>18 ans ou plus</strong>.
        </p>
        <p>
          En créant un Compte, l'Utilisateur déclare et garantit :
        </p>
        <LegalList>
          <LegalItem>avoir au moins 18 ans révolus ;</LegalItem>
          <LegalItem>avoir la capacité juridique de conclure les présentes CGU ;</LegalItem>
          <LegalItem>fournir des informations exactes, sincères et à jour ;</LegalItem>
          <LegalItem>
            utiliser son propre numéro, email, identité, photos et moyens d'authentification, sauf
            fonctionnalité expressément prévue autrement ;
          </LegalItem>
          <LegalItem>ne pas avoir été définitivement banni de Tia, sauf autorisation écrite préalable de Tia ;</LegalItem>
          <LegalItem>
            ne pas être légalement empêché d'utiliser un service de rencontres ou de communiquer avec d'autres
            personnes ;
          </LegalItem>
          <LegalItem>
            ne pas utiliser le Service dans un objectif contraire à la loi, à la sécurité d'autrui ou aux
            présentes CGU.
          </LegalItem>
        </LegalList>
        <LegalCallout tone="alert">
          <p>
            Toute fausse déclaration d'âge, usurpation d'identité, utilisation de documents falsifiés ou
            contournement d'une mesure de sécurité constitue une violation grave des CGU et peut entraîner la
            suspension ou la suppression immédiate du Compte.
          </p>
        </LegalCallout>
        <p>
          Tia peut demander des éléments complémentaires afin de vérifier l'âge, l'identité ou la conformité
          d'un Compte lorsque cela paraît raisonnablement nécessaire.
        </p>
      </LegalSection>

      <LegalSection title="5. Création et sécurité du Compte">
        <p>
          Le Compte est personnel, individuel, non cessible et non transférable. Sauf fonctionnalité contraire
          expressément autorisée par Tia, chaque Utilisateur ne peut détenir qu'un seul Compte actif.
        </p>
        <p>
          L'Utilisateur est responsable de la confidentialité de ses identifiants, codes et appareils. Il doit
          informer Tia sans délai de tout accès non autorisé, perte d'un appareil, compromission
          d'identifiants ou utilisation suspecte du Compte.
        </p>
        <p>
          Tia peut bloquer temporairement un Compte lorsqu'une compromission, une fraude, une usurpation ou un
          risque de sécurité est suspecté.
        </p>
        <p>
          Le fait qu'une action soit effectuée depuis un Compte ne prive pas l'Utilisateur de la possibilité de
          démontrer une compromission, mais Tia pourra raisonnablement considérer les activités réalisées avec
          des identifiants valides comme provenant du titulaire tant qu'aucune anomalie n'a été signalée.
        </p>
      </LegalSection>

      <LegalSection title="6. Vérifications, badges et absence de garantie d'identité ou d'antécédents">
        <p>
          Tia peut proposer ou imposer certaines vérifications, notamment par selfie vidéo, comparaison avec
          la photo de profil, contrôle d'un document d'identité ou mécanisme automatisé, réalisées le cas
          échéant par un prestataire spécialisé, selon les fonctionnalités disponibles et la réglementation
          applicable.
        </p>
        <LegalCard>
          <p>
            <strong>Toute vérification, tout badge ou toute validation a une portée limitée.</strong> Une
            vérification réussie signifie uniquement que les éléments contrôlés ont satisfait au processus
            utilisé au moment du contrôle. Elle ne constitue jamais :
          </p>
          <LegalList>
            <LegalItem>une certification de moralité ;</LegalItem>
            <LegalItem>une enquête de police ou de sécurité ;</LegalItem>
            <LegalItem>une vérification exhaustive des antécédents civils ou pénaux ;</LegalItem>
            <LegalItem>une garantie de l'identité absolue d'un Utilisateur ;</LegalItem>
            <LegalItem>
              une garantie de son âge réel en cas de fraude sophistiquée ou de document falsifié ;
            </LegalItem>
            <LegalItem>
              une garantie de ses intentions, de son comportement futur, de sa santé, de sa situation
              personnelle ou de sa sécurité.
            </LegalItem>
          </LegalList>
        </LegalCard>
        <p>
          Tia ne réalise pas de contrôle systématique des casiers judiciaires, registres de délinquants sexuels
          ou antécédents de chaque Utilisateur, sauf si une fonctionnalité ou une obligation légale
          particulière est expressément mise en place et annoncée.
        </p>
        <p>
          L'Utilisateur reconnaît que tout mécanisme de vérification peut être contourné, trompé ou affecté par
          une erreur technique ou humaine.
        </p>
      </LegalSection>

      <LegalSection title="7. Fonctionnalités algorithmiques et intelligence artificielle">
        <p>
          Le Service peut utiliser des systèmes algorithmiques ou des fonctionnalités d'intelligence
          artificielle afin notamment de classer des profils, personnaliser des suggestions, détecter des
          comportements anormaux, faciliter certaines conversations ou améliorer l'expérience utilisateur.
        </p>
        <p>
          Ces systèmes produisent des estimations ou recommandations. Ils ne garantissent aucune compatibilité,
          sincérité, sécurité, attraction réciproque, rencontre ou résultat particulier.
        </p>
        <p>
          Une suggestion de profil, un score, un ordre d'affichage ou un contenu généré par une fonctionnalité
          d'IA ne constitue ni une approbation, ni une recommandation personnelle, ni une garantie de Tia
          concernant l'Utilisateur concerné.
        </p>
        <p>
          Sauf obligation légale contraire, l'Utilisateur demeure seul responsable de toute décision prise à
          partir d'une suggestion ou d'un contenu généré par le Service.
        </p>
        <p>
          Le coach T.IA est un assistant conversationnel reposant sur un modèle d'intelligence artificielle
          fourni par un prestataire tiers. Ses réponses sont générées automatiquement, peuvent être inexactes
          et ne constituent pas un conseil professionnel. Les données qu'il utilise sont décrites dans la{" "}
          <LegalLink href="/privacy">Politique de Confidentialité</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection title="8. Règles de conduite générales">
        <p>
          L'Utilisateur s'engage à respecter les autres personnes et à utiliser le Service de bonne foi. Il est
          notamment interdit de :
        </p>
        <LegalList>
          <LegalItem>harceler, menacer, intimider, traquer, humilier ou exercer une pression sur une autre personne ;</LegalItem>
          <LegalItem>tenir des propos haineux, discriminatoires, violents ou déshumanisants ;</LegalItem>
          <LegalItem>usurper l'identité d'un tiers ou créer un faux profil ;</LegalItem>
          <LegalItem>
            mentir de manière substantielle sur son âge, son identité ou ses intentions lorsque cette tromperie
            est susceptible de mettre autrui en danger ;
          </LegalItem>
          <LegalItem>publier ou transmettre du contenu sexuel non sollicité ;</LegalItem>
          <LegalItem>diffuser, menacer de diffuser ou solliciter des images intimes sans consentement ;</LegalItem>
          <LegalItem>partager du contenu représentant ou sexualisant une personne mineure ;</LegalItem>
          <LegalItem>
            rechercher, contacter, solliciter ou tenter de rencontrer une personne mineure à des fins sexuelles
            ou inappropriées ;
          </LegalItem>
          <LegalItem>
            organiser ou faciliter prostitution, exploitation sexuelle, traite des êtres humains, trafic ou
            activité criminelle ;
          </LegalItem>
          <LegalItem>
            demander de l'argent, organiser une escroquerie, un investissement, un prêt, un transfert de fonds
            ou une opération financière trompeuse ;
          </LegalItem>
          <LegalItem>
            promouvoir un produit, service, recrutement, activité commerciale, vente pyramidale ou sollicitation
            sans autorisation écrite de Tia ;
          </LegalItem>
          <LegalItem>
            collecter, copier, aspirer ou réutiliser les données d'autres Utilisateurs par scraping, robot,
            script ou autre automatisation non autorisée ;
          </LegalItem>
          <LegalItem>contourner les mesures de sécurité, les limitations du Service ou une sanction de Compte ;</LegalItem>
          <LegalItem>
            introduire un virus, code malveillant, charge nuisible ou tenter d'accéder sans autorisation aux
            systèmes de Tia ;
          </LegalItem>
          <LegalItem>
            publier les coordonnées privées, documents d'identité ou informations confidentielles d'autrui sans
            autorisation ;
          </LegalItem>
          <LegalItem>utiliser le Service pour inciter à la violence, à un crime ou à un comportement dangereux ;</LegalItem>
          <LegalItem>enfreindre les droits de propriété intellectuelle, la vie privée ou les droits d'un tiers.</LegalItem>
        </LegalList>
        <LegalNote>
          Les Règles de la Communauté Tia font partie intégrante des présentes CGU et peuvent détailler ces
          interdictions.
        </LegalNote>
      </LegalSection>

      <LegalSection title="9. Contenu Utilisateur">
        <p>
          L'Utilisateur demeure propriétaire des droits qu'il détient sur son Contenu Utilisateur.
        </p>
        <p>
          En transmettant du Contenu à Tia, il accorde à Tia, pour la durée nécessaire au fonctionnement du
          Service et sous réserve de la réglementation applicable, une licence non exclusive, mondiale,
          gratuite et techniquement sous-licenciable à ses prestataires, permettant d'héberger, stocker,
          reproduire, adapter au format, afficher, transmettre, modérer, analyser et traiter ce Contenu
          uniquement dans la mesure nécessaire pour :
        </p>
        <LegalList>
          <LegalItem>fournir les fonctionnalités demandées ;</LegalItem>
          <LegalItem>afficher le profil et les communications aux destinataires prévus ;</LegalItem>
          <LegalItem>assurer la sécurité, la prévention des abus et la modération ;</LegalItem>
          <LegalItem>résoudre un incident ou une réclamation ;</LegalItem>
          <LegalItem>respecter une obligation légale ;</LegalItem>
          <LegalItem>améliorer techniquement le Service selon les bases légales applicables.</LegalItem>
        </LegalList>
        <p>
          L'utilisation d'un Contenu identifiable à des fins publicitaires externes ou de témoignage
          nécessitera, lorsque la loi l'exige, une autorisation distincte.
        </p>
        <p>
          L'Utilisateur garantit qu'il dispose des droits et autorisations nécessaires sur tout Contenu qu'il
          fournit et que ce Contenu ne viole ni la loi ni les droits d'un tiers.
        </p>
      </LegalSection>

      <LegalSection title="10. Modération, signalement et blocage">
        <p>
          Tia peut utiliser une combinaison de signalements, contrôles humains, règles automatisées et outils
          algorithmiques afin de détecter des violations des CGU ou des risques de sécurité.
        </p>
        <p>
          L'Utilisateur peut signaler ou bloquer un autre Utilisateur depuis leur conversation, via
          le menu en haut à droite de la conversation, et retrouver les Utilisateurs bloqués dans Paramètres, Utilisateurs bloqués. Tout
          profil, message ou comportement peut également être signalé en écrivant à{" "}
          <LegalLink href="mailto:info@tia-meet.com">info@tia-meet.com</LegalLink>.
        </p>
        <p>
          Chaque photo de profil est analysée automatiquement. Une photo non conforme peut être retirée et
          compter comme un avertissement ; au troisième avertissement, le profil est masqué jusqu'à l'ajout
          d'une nouvelle photo conforme.
        </p>
        <p>
          Tia peut, sans que cela constitue une obligation générale de surveillance préalable de chaque
          communication :
        </p>
        <LegalList>
          <LegalItem>examiner un Compte, un signalement ou un Contenu ;</LegalItem>
          <LegalItem>restreindre temporairement certaines fonctionnalités ;</LegalItem>
          <LegalItem>masquer ou supprimer du Contenu ;</LegalItem>
          <LegalItem>suspendre, bannir ou supprimer un Compte ;</LegalItem>
          <LegalItem>empêcher la recréation de Comptes ;</LegalItem>
          <LegalItem>
            conserver les éléments nécessaires à la sécurité, à la prévention de récidive, à la défense de ses
            droits ou à la coopération avec les autorités ;
          </LegalItem>
          <LegalItem>transmettre des informations aux autorités lorsque la loi l'exige ou l'autorise.</LegalItem>
        </LegalList>
        <LegalCallout tone="alert">
          <p>
            Une mesure de sécurité, de modération ou de vérification ne garantit pas que tout comportement
            dangereux, frauduleux, illégal ou contraire aux CGU sera détecté avant qu'un autre Utilisateur n'y
            soit exposé.
          </p>
          <p>
            <strong>
              Le fait pour Tia de mettre en place volontairement des outils de sécurité ou de modération ne
              crée pas une garantie générale de sécurité ni une obligation de contrôler en temps réel
              l'ensemble des interactions.
            </strong>
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection title="11. Rencontres physiques et interactions hors plateforme">
        <p>
          Les rencontres physiques sont décidées et organisées{" "}
          <strong>indépendamment de Tia, sous la responsabilité des Utilisateurs concernés</strong>. Tia n'est
          pas présent lors des rencontres et ne contrôle ni le lieu, ni l'identité réelle, ni les intentions,
          ni le comportement des personnes rencontrées.
        </p>
        <p>
          L'Utilisateur reconnaît que les rencontres avec des personnes connues en ligne comportent des
          risques, y compris des risques de tromperie, fraude, vol, harcèlement, violence, agression physique
          ou sexuelle et autres comportements illégaux.
        </p>
        <p>
          Il appartient à chaque Utilisateur d'apprécier ces risques et de prendre les précautions
          raisonnables, notamment :
        </p>
        <LegalList>
          <LegalItem>privilégier un lieu public pour une première rencontre ;</LegalItem>
          <LegalItem>informer un proche de l'heure et du lieu du rendez-vous ;</LegalItem>
          <LegalItem>conserver son propre moyen de transport ou de retour ;</LegalItem>
          <LegalItem>éviter de communiquer trop rapidement son adresse personnelle ou des informations financières ;</LegalItem>
          <LegalItem>interrompre immédiatement une interaction lorsqu'un comportement paraît menaçant ou anormal ;</LegalItem>
          <LegalItem>utiliser les fonctions de blocage et de signalement disponibles.</LegalItem>
        </LegalList>
        <p>
          Toute communication poursuivie par téléphone, WhatsApp, email, réseau social ou autre service tiers
          se déroule hors du contrôle de Tia.
        </p>
      </LegalSection>

      <LegalSection title="12. Transactions, argent, cadeaux et arnaques">
        <p>
          Tia n'est partie à aucune transaction financière entre Utilisateurs et ne garantit aucun paiement,
          prêt, investissement, vente, cadeau ou transfert de fonds entre eux.
        </p>
        <LegalCallout tone="alert">
          <p className="font-semibold">
            Tia recommande de ne jamais envoyer d'argent ou de données bancaires à une personne rencontrée via
            le Service.
          </p>
        </LegalCallout>
        <p>
          L'Utilisateur qui décide néanmoins d'effectuer une transaction avec un autre Utilisateur le fait à
          ses propres risques et sous sa seule responsabilité, sans recours contre Tia fondé uniquement sur le
          fait que les personnes se sont connues via le Service.
        </p>
      </LegalSection>

      <LegalSection title="13. Services Premium, abonnements et paiements">
        <p>
          Tia peut proposer des abonnements et achats intégrés donnant accès à des fonctionnalités
          supplémentaires. Les prix, durées, avantages, modalités de renouvellement et éventuelles périodes
          promotionnelles sont ceux affichés au moment de l'achat.
        </p>
        <LegalCard>
          <p>
            Lorsque le paiement est effectué via l'App Store d'Apple ou Google Play, la facturation, le
            renouvellement, l'annulation et le remboursement sont également soumis aux règles et outils de la
            plateforme concernée. La suppression de l'Application ou du Compte ne résilie pas automatiquement
            un abonnement géré par Apple ou Google. L'Utilisateur doit utiliser les paramètres de gestion
            d'abonnement de la plateforme concernée.
          </p>
        </LegalCard>
        <LegalCard>
          <p>
            Lorsque le paiement est effectué par mobile money (Orange Money, MVola ou Airtel Money) via Vanilla
            Pay, il s'agit d'un paiement unique pour la durée choisie, sans renouvellement automatique :
            l'accès aux fonctionnalités payantes prend fin à l'échéance, sauf nouveau paiement.
          </p>
        </LegalCard>
        <p>
          Sauf règle impérative contraire ou politique obligatoire de la plateforme de paiement, les paiements
          effectués pour une période déjà commencée ne sont pas remboursables.
        </p>
        <p>
          Tia peut modifier les tarifs pour les périodes futures. Lorsqu'une réglementation ou une plateforme
          l'exige, l'Utilisateur sera informé avant l'entrée en vigueur du nouveau tarif.
        </p>
      </LegalSection>

      <LegalSection title="14. Suspension et résiliation">
        <p>
          L'Utilisateur peut cesser d'utiliser le Service et demander la suppression de son Compte à tout
          moment, depuis Paramètres, section Zone de danger, Supprimer mon compte, ou selon les modalités
          indiquées sur la page{" "}
          <LegalLink href="/account-deletion">Suppression du Compte et des Données</LegalLink>.
        </p>
        <p>Tia peut suspendre, limiter ou supprimer un Compte notamment en cas de :</p>
        <LegalList>
          <LegalItem>violation des présentes CGU ;</LegalItem>
          <LegalItem>suspicion raisonnable de fraude, usurpation ou activité dangereuse ;</LegalItem>
          <LegalItem>signalement crédible impliquant la sécurité d'une personne ;</LegalItem>
          <LegalItem>suspicion qu'un Utilisateur soit mineur ;</LegalItem>
          <LegalItem>risque pour la sécurité ou l'intégrité du Service ;</LegalItem>
          <LegalItem>obligation légale ou demande d'une autorité compétente ;</LegalItem>
          <LegalItem>tentative de contournement d'une sanction ;</LegalItem>
          <LegalItem>défaut de paiement d'un Service Premium.</LegalItem>
        </LegalList>
        <p>
          Tia peut prendre une mesure conservatoire avant d'avoir terminé son analyse lorsqu'un risque de
          sécurité le justifie raisonnablement.
        </p>
        <p>
          Lorsqu'une notification ou une procédure de contestation est imposée par une loi applicable, Tia la
          met en œuvre dans les conditions requises.
        </p>
      </LegalSection>

      <LegalSection title="15. Inactivité">
        <p>
          Tia peut désactiver ou supprimer des Comptes durablement inactifs, sous réserve des durées de
          conservation nécessaires à la sécurité, à la prévention des abus, aux obligations légales ou à
          l'exercice de droits.
        </p>
        <p>
          Lorsque cette suppression concerne un Compte encore associé à un abonnement payant géré par une
          plateforme tierce, l'Utilisateur demeure responsable de la gestion de son abonnement auprès de cette
          plateforme.
        </p>
      </LegalSection>

      <LegalSection title="16. Services et contenus de tiers">
        <p>
          Le Service peut intégrer ou renvoyer vers des services, liens, cartes, systèmes d'authentification,
          plateformes de paiement, outils de communication ou contenus fournis par des tiers.
        </p>
        <p>
          Tia ne contrôle pas les services tiers et ne garantit ni leur disponibilité, ni leur contenu, ni
          leurs pratiques. Leur utilisation peut être soumise à leurs propres conditions et politiques de
          confidentialité.
        </p>
        <p>
          Dans toute la mesure permise par la loi, Tia n'est pas responsable d'un dommage résultant
          exclusivement d'un service tiers indépendant de Tia.
        </p>
      </LegalSection>

      <LegalSection title="17. Disponibilité du Service et absence de garantie de résultat">
        <p>
          Le Service est fourni « <strong>en l'état</strong> » et « <strong>selon disponibilité</strong> »,
          dans toute la mesure permise par la loi. Tia ne garantit notamment pas :
        </p>
        <LegalList>
          <LegalItem>une disponibilité permanente ou sans interruption ;</LegalItem>
          <LegalItem>l'absence totale d'erreur, bug, incident ou perte de données ;</LegalItem>
          <LegalItem>la compatibilité avec tous les appareils, réseaux ou systèmes ;</LegalItem>
          <LegalItem>qu'un Utilisateur obtiendra un Match, une réponse, une rencontre ou une relation ;</LegalItem>
          <LegalItem>l'exactitude de toutes les informations publiées par les Utilisateurs ;</LegalItem>
          <LegalItem>la sécurité absolue de toute interaction ;</LegalItem>
          <LegalItem>l'absence de faux profil ou de comportement malveillant malgré les mesures de sécurité mises en place.</LegalItem>
        </LegalList>
        <p>
          Tia peut modifier, suspendre ou faire évoluer certaines fonctionnalités pour des raisons techniques,
          de sécurité, juridiques ou commerciales.
        </p>
      </LegalSection>

      <LegalSection title="18. Clause essentielle — responsabilité individuelle des Utilisateurs">
        <LegalCallout tone="alert">
          <p>
            <strong>
              Chaque Utilisateur est seul responsable de ses propres actes, déclarations, communications,
              choix, déplacements, rencontres et transactions.
            </strong>
          </p>
        </LegalCallout>
        <p>
          Dans toute la mesure permise par la loi applicable, Tia ne répond pas des actes, omissions ou
          comportements d'un Utilisateur ou d'un tiers, sur ou hors du Service, notamment :
        </p>
        <LegalList>
          <LegalItem>mensonge, faux profil ou usurpation d'identité ;</LegalItem>
          <LegalItem>harcèlement, stalking, menaces ou intimidation ;</LegalItem>
          <LegalItem>vol, escroquerie, fraude, extorsion ou chantage ;</LegalItem>
          <LegalItem>discrimination ou atteinte à la réputation ;</LegalItem>
          <LegalItem>diffusion non consentie d'un contenu privé ou intime ;</LegalItem>
          <LegalItem>agression, violence, séquestration ou atteinte aux biens ;</LegalItem>
          <LegalItem>agression ou violence sexuelle ;</LegalItem>
          <LegalItem>prostitution, exploitation sexuelle ou traite ;</LegalItem>
          <LegalItem>acte criminel ou délictueux de toute nature ;</LegalItem>
          <LegalItem>dommage corporel, moral, matériel ou financier causé par un autre Utilisateur ou un tiers.</LegalItem>
        </LegalList>
        <LegalNote>
          Le simple fait que deux personnes aient été mises en relation, aient communiqué ou se soient
          découvertes au moyen de Tia ne transfère pas à Tia la responsabilité des actes ultérieurs de l'une de
          ces personnes.
        </LegalNote>
      </LegalSection>

      <LegalSection title="19. Renonciation et acceptation des risques liés aux interactions">
        <p>
          Dans toute la mesure permise par la loi applicable, l'Utilisateur reconnaît accepter les risques
          ordinaires et raisonnablement prévisibles inhérents à l'utilisation d'un service de rencontres et
          aux interactions avec des personnes inconnues.
        </p>
        <p>
          Sous réserve des responsabilités légalement non excluables, l'Utilisateur renonce à diriger contre
          Tia une réclamation fondée exclusivement sur le comportement d'un autre Utilisateur ou d'un tiers
          lorsque Tia n'a pas elle-même commis de faute susceptible d'engager sa responsabilité en vertu de la
          loi applicable.
        </p>
        <p>
          Aucune stipulation des présentes ne vise à exonérer l'auteur d'un acte illicite de sa propre
          responsabilité.
        </p>
      </LegalSection>

      <LegalSection title="20. Limitation de responsabilité de Tia">
        <p>
          <strong>Dans toute la mesure maximale autorisée par la loi applicable</strong>, Tia, APLI SARLU, ses
          dirigeants, salariés, représentants, prestataires et partenaires ne pourront être tenus responsables
          des dommages indirects, consécutifs, accessoires, spéciaux ou immatériels résultant de l'accès au
          Service ou de son utilisation, notamment perte de profit, perte d'opportunité, perte de données,
          préjudice commercial ou dommage résultant d'un acte d'un Utilisateur ou d'un tiers.
        </p>
        <LegalCard>
          <p>
            Sous réserve des cas dans lesquels un plafond de responsabilité est interdit par une règle
            impérative, la responsabilité cumulée de Tia, tous faits générateurs et fondements confondus, au
            titre d'un événement lié au Service, est limitée au montant effectivement payé par l'Utilisateur à
            Tia au cours des douze (12) mois précédant directement le fait générateur. Pour un Utilisateur
            n'ayant versé aucun montant à Tia au cours de cette période, cette clause ne crée aucune garantie
            financière et s'applique dans toute la mesure autorisée par la loi.
          </p>
        </LegalCard>
        <LegalNote>
          Les limitations du présent article constituent un élément essentiel de l'équilibre contractuel et
          s'appliquent quelle que soit la qualification juridique de la demande, sous réserve des règles
          impératives contraires.
        </LegalNote>
      </LegalSection>

      <LegalSection title="21. Responsabilités qui ne peuvent être exclues">
        <p>
          Aucune stipulation des présentes CGU n'exclut ou ne limite une responsabilité lorsque son exclusion
          ou sa limitation est interdite par une disposition légale impérative.
        </p>
        <p>
          En particulier, les présentes CGU ne peuvent priver une personne d'un droit impératif résultant,
          lorsqu'il est applicable, d'une fraude ou d'un dol de Tia, d'une faute lourde lorsque la loi interdit
          son exclusion, d'une atteinte imputable à Tia que la loi impose d'indemniser, ni des droits
          impératifs attachés à la protection des données personnelles ou à la protection du consommateur.
        </p>
        <p>
          Toute clause de limitation doit être interprétée de manière à produire l'effet protecteur maximal
          légalement autorisé sans entraîner la nullité des autres stipulations.
        </p>
      </LegalSection>

      <LegalSection title="22. Indemnisation de Tia par l'Utilisateur">
        <LegalCard>
          <p>
            Dans toute la mesure permise par la loi, l'Utilisateur s'engage à indemniser, défendre et tenir
            indemnes Tia, APLI SARLU, leurs dirigeants, salariés, représentants, prestataires et partenaires
            contre toute réclamation, procédure, condamnation, perte, dommage, coût ou frais raisonnable de
            défense résultant directement :
          </p>
          <LegalList>
            <LegalItem>de la violation des présentes CGU par l'Utilisateur ;</LegalItem>
            <LegalItem>d'un Contenu qu'il publie ou transmet ;</LegalItem>
            <LegalItem>de la violation des droits d'un tiers ;</LegalItem>
            <LegalItem>d'un comportement illicite, frauduleux, violent, abusif ou dangereux de sa part ;</LegalItem>
            <LegalItem>d'une transaction ou d'un différend qu'il provoque avec un autre Utilisateur ou un tiers.</LegalItem>
          </LegalList>
        </LegalCard>
        <LegalNote>
          Cette obligation ne couvre pas la part d'un dommage directement causée par une faute propre de Tia
          dont la responsabilité ne peut être exclue par la loi.
        </LegalNote>
      </LegalSection>

      <LegalSection title="23. Coopération avec les autorités et conservation des preuves">
        <p>
          Tia peut préserver et communiquer des informations lorsqu'elle estime de bonne foi que cela est
          nécessaire pour :
        </p>
        <LegalList>
          <LegalItem>répondre à une réquisition, décision judiciaire ou demande légalement valable ;</LegalItem>
          <LegalItem>protéger les droits ou la sécurité d'une personne ;</LegalItem>
          <LegalItem>
            prévenir ou enquêter sur une fraude, une exploitation sexuelle, un risque impliquant un mineur ou
            une infraction grave ;
          </LegalItem>
          <LegalItem>exercer ou défendre les droits de Tia.</LegalItem>
        </LegalList>
        <p>
          Toute communication de données personnelles est effectuée conformément à la réglementation
          applicable et à la Politique de Confidentialité.
        </p>
      </LegalSection>

      <LegalSection title="24. Propriété intellectuelle de Tia">
        <p>
          L'Application, la marque Tia, les logiciels, bases de données, interfaces, éléments graphiques,
          textes, logos, fonctionnalités, modèles, systèmes et contenus appartenant à Tia ou à ses concédants
          sont protégés par les droits de propriété intellectuelle applicables.
        </p>
        <p>
          Tia accorde à l'Utilisateur un droit personnel, limité, révocable, non exclusif et non transférable
          d'utiliser le Service pour un usage privé conformément aux présentes CGU.
        </p>
        <p>
          Sauf autorisation écrite, il est interdit de copier, modifier, distribuer, désassembler,
          rétroconcevoir, revendre, exploiter commercialement ou créer un service dérivé à partir de Tia, dans
          la mesure où une telle interdiction est légalement permise.
        </p>
      </LegalSection>

      <LegalSection title="25. Données personnelles">
        <p>
          Le traitement des données personnelles est régi par la{" "}
          <LegalLink href="/privacy">
            Politique de Confidentialité Tia
          </LegalLink>
          , qui fait partie intégrante du cadre contractuel applicable au Service. L'Utilisateur doit également
          consulter les informations et consentements présentés au moment où certaines données sensibles,
          données de localisation ou données de vérification sont collectées.
        </p>
      </LegalSection>

      <LegalSection title="26. Force majeure et événements hors contrôle raisonnable">
        <p>
          Tia ne pourra être tenue responsable d'un retard, d'une interruption ou d'une inexécution résultant
          d'un événement hors de son contrôle raisonnable, notamment catastrophe naturelle, panne majeure
          d'infrastructure, coupure d'électricité ou de télécommunication, cyberattaque externe malgré des
          mesures raisonnables, conflit, acte d'autorité, grève externe, défaillance généralisée d'un
          fournisseur critique ou autre cas de force majeure reconnu par la loi applicable.
        </p>
      </LegalSection>

      <LegalSection title="27. Modification du Service et des CGU">
        <p>
          Tia peut modifier les présentes CGU afin notamment de tenir compte d'une évolution du Service, de la
          sécurité, de la réglementation ou des pratiques techniques.
        </p>
        <p>
          Toute modification substantielle sera portée à la connaissance des Utilisateurs par un moyen approprié
          avant son entrée en vigueur lorsque la loi l'exige.
        </p>
        <p>
          Lorsque l'acceptation expresse d'une nouvelle version est légalement nécessaire, Tia pourra demander
          une nouvelle validation avant de permettre la poursuite de l'utilisation du Service.
        </p>
      </LegalSection>

      <LegalSection title="28. Cession">
        <p>
          Tia peut transférer tout ou partie de ses droits et obligations dans le cadre d'une restructuration,
          fusion, acquisition, cession d'activité ou opération comparable, sous réserve des droits impératifs
          des Utilisateurs et des règles applicables à la protection des données.
        </p>
        <p>
          L'Utilisateur ne peut céder son Compte ou ses droits d'accès au Service sans l'accord écrit de Tia.
        </p>
      </LegalSection>

      <LegalSection title="29. Divisibilité">
        <p>
          Si une stipulation des présentes CGU est déclarée nulle, illicite ou inapplicable, les autres
          stipulations demeurent en vigueur. La stipulation concernée sera interprétée ou remplacée, dans la
          mesure permise par la loi, de manière à se rapprocher le plus possible de l'objectif licite initial.
        </p>
      </LegalSection>

      <LegalSection title="30. Non-renonciation">
        <p>
          Le fait pour Tia de ne pas exercer immédiatement un droit ne constitue pas une renonciation à ce
          droit.
        </p>
      </LegalSection>

      <LegalSection title="31. Intégralité de l'accord">
        <p>
          Les présentes CGU, la Politique de Confidentialité, la Politique de Protection des Mineurs, la Charte
          de Sécurité et les Règles de la Communauté constituent, avec les informations spécifiques affichées
          lors d'un achat ou d'une fonctionnalité, l'ensemble des règles contractuelles applicables à
          l'utilisation de Tia.
        </p>
      </LegalSection>

      <LegalSection title="32. Survie">
        <p>
          Les clauses qui, par leur nature, doivent continuer à produire effet après la fermeture d'un Compte
          demeurent applicables, notamment celles relatives à la propriété intellectuelle, à la responsabilité,
          à l'indemnisation, à la preuve, à la coopération avec les autorités, aux litiges et à la protection
          des données conservées légalement.
        </p>
      </LegalSection>

      <LegalSection title="33. Droit applicable et règlement des différends">
        <p>
          Sous réserve des règles impératives éventuellement applicables au consommateur dans son pays de
          résidence, les présentes CGU sont régies par le droit malgache.
        </p>
        <p>
          Avant toute procédure, l'Utilisateur est invité à adresser une réclamation écrite à{" "}
          <LegalLink href="mailto:info@tia-meet.com">
            info@tia-meet.com
          </LegalLink>{" "}
          afin de permettre une tentative de règlement amiable pendant trente (30) jours.
        </p>
        <p>
          À défaut d'accord amiable, les juridictions compétentes d'
          <strong>Antananarivo, Madagascar</strong>, pourront être saisies, sans préjudice de toute règle
          impérative de compétence juridictionnelle ou de protection du consommateur qui serait légalement
          applicable à l'Utilisateur.
        </p>
      </LegalSection>

      <LegalSection title="34. Langue">
        <p>
          La version française des présentes CGU constitue la version de référence, sauf lorsqu'une règle
          impérative impose la primauté d'une autre version linguistique pour un Utilisateur déterminé.
        </p>
      </LegalSection>

      <LegalSection title="35. Contact">
        <LegalContact label="Pour toute question relative aux présentes CGU">
          <LegalLink href="mailto:info@tia-meet.com">info@tia-meet.com</LegalLink>
        </LegalContact>
      </LegalSection>
    </LegalPage>
  );
}
