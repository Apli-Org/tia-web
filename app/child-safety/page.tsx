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
  "Protection des mineurs",
  "La politique de tolérance zéro de Tia contre l’exploitation et les abus sexuels envers les enfants.",
);

type ChildSafetyPageProps = {
  searchParams: LegalPageSearchParams;
};

export default function ChildSafetyPage({ searchParams }: ChildSafetyPageProps) {
  return (
    <LegalPage
      title="Politique de Protection des Mineurs et de Lutte contre l'Exploitation Sexuelle des Enfants"
      version="2.0"
      updatedAt="11 août 2026"
      searchParams={searchParams}
    >
      <LegalCallout tone="alert">
        <p className="font-semibold">
          Tia est un service de rencontres strictement réservé aux personnes âgées de 18 ans et plus. APLI
          SARLU applique une politique de tolérance zéro envers toute forme d'exploitation sexuelle, d'abus,
          de mise en danger, de sollicitation ou de sexualisation d'une personne mineure. Cette politique
          s'applique à tous les Comptes, profils, photos, messages, contenus et comportements liés à
          l'utilisation de Tia, y compris lorsqu'une interaction commencée sur Tia se poursuit hors de
          l'Application.
        </p>
      </LegalCallout>

      <LegalSection title="1. Notre engagement">
        <p>
          Tia est un service de rencontres strictement réservé aux personnes âgées de 18 ans et plus. APLI
          SARLU applique une politique de tolérance zéro envers toute forme d'exploitation sexuelle, d'abus,
          de mise en danger, de sollicitation ou de sexualisation d'une personne mineure, y compris lorsque
          l'interaction commencée sur Tia se poursuit hors de l'Application.
        </p>
      </LegalSection>

      <LegalSection title="2. Définitions et comportements interdits">
        <p>Tia interdit notamment :</p>
        <LegalList>
          <LegalItem marker="cross">tout contenu d'abus sexuel d'enfants (« CSAM ») ;</LegalItem>
          <LegalItem marker="cross">toute exploitation ou abus sexuel d'enfant (« CSAE ») ;</LegalItem>
          <LegalItem marker="cross">la représentation sexuelle d'une personne mineure ;</LegalItem>
          <LegalItem marker="cross">
            le grooming, c'est-à-dire la création ou l'entretien d'un contact avec un mineur à des fins
            sexuelles, abusives ou d'exploitation ;
          </LegalItem>
          <LegalItem marker="cross">la sollicitation d'images intimes d'une personne mineure ;</LegalItem>
          <LegalItem marker="cross">le chantage sexuel ou « sextortion » impliquant un mineur ;</LegalItem>
          <LegalItem marker="cross">la traite, le trafic ou l'exploitation commerciale d'un mineur ;</LegalItem>
          <LegalItem marker="cross">toute proposition de rencontre à caractère sexuel impliquant une personne mineure ;</LegalItem>
          <LegalItem marker="cross">le partage de liens, fichiers ou instructions permettant d'accéder à du CSAM ;</LegalItem>
          <LegalItem marker="cross">la glorification ou la banalisation d'un abus sexuel d'enfant ;</LegalItem>
          <LegalItem marker="cross">
            toute tentative de contourner les mécanismes de détection, signalement ou contrôle liés à la
            protection des mineurs.
          </LegalItem>
        </LegalList>
        <LegalCallout>
          <p>
            Aucune intention humoristique, artistique ou provocatrice ne justifie un contenu illégal ou un
            comportement mettant un mineur en danger.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection title="3. Accès strictement réservé aux adultes">
        <p>
          Pour créer un Compte, l'Utilisateur doit déclarer être âgé d'au moins 18 ans et fournir sa date de
          naissance. Tia peut mettre en œuvre, selon les fonctionnalités disponibles :
        </p>
        <LegalList>
          <LegalItem marker="check">blocage de l'inscription des dates de naissance indiquant un âge inférieur à 18 ans ;</LegalItem>
          <LegalItem marker="check">contrôles de cohérence ;</LegalItem>
          <LegalItem marker="check">vérification de téléphone ou email ;</LegalItem>
          <LegalItem marker="check">vérification de photo ou selfie ;</LegalItem>
          <LegalItem marker="check">vérification documentaire ;</LegalItem>
          <LegalItem marker="check">demande de justificatif en cas de doute ;</LegalItem>
          <LegalItem marker="check">suspension conservatoire d'un Compte suspecté d'appartenir à un mineur.</LegalItem>
        </LegalList>
        <LegalCallout tone="alert">
          <p className="font-semibold">
            La fourniture d'une fausse date de naissance, l'utilisation du document d'un tiers, la
            falsification d'une pièce ou le contournement volontaire d'une vérification constitue une violation
            grave des CGU.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection title="4. Limites des mécanismes de vérification">
        <p>
          Aucun mécanisme technique, déclaratif ou documentaire ne peut garantir avec une certitude absolue
          qu'une personne malintentionnée ne parviendra jamais à fournir de fausses informations ou à
          contourner un contrôle. Une vérification réussie ou un badge n'est donc pas une garantie absolue de
          l'âge réel, de l'identité, des intentions, des antécédents ou de la sécurité d'un Utilisateur.
        </p>
        <LegalCard>
          <p>
            <strong>
              Dans toute la mesure permise par la loi, Tia ne saurait être tenue responsable du seul fait
              qu'une personne ait frauduleusement contourné les mesures raisonnables mises en place pour
              empêcher l'accès des mineurs.
            </strong>{" "}
            Cette limitation ne réduit pas les obligations légales de Tia lorsqu'elle acquiert connaissance
            d'un risque crédible ou d'un contenu impliquant potentiellement un mineur.
          </p>
        </LegalCard>
      </LegalSection>

      <LegalSection title="5. Signalement dans l'Application">
        <p>Les Utilisateurs sont invités à signaler immédiatement :</p>
        <LegalList>
          <LegalItem>un profil paraissant appartenir à une personne mineure ;</LegalItem>
          <LegalItem>une personne affirmant être mineure ;</LegalItem>
          <LegalItem>un comportement de grooming ;</LegalItem>
          <LegalItem>une sollicitation sexuelle impliquant un mineur ;</LegalItem>
          <LegalItem>un contenu pouvant constituer du CSAM ;</LegalItem>
          <LegalItem>toute menace, extorsion ou exploitation concernant un enfant.</LegalItem>
        </LegalList>
        <LegalCard>
          <LegalList>
            <LegalItem marker="check">
              Bouton « Signaler » disponible sur les profils et/ou conversations lorsque cette fonctionnalité
              est prévue
            </LegalItem>
            <LegalItem marker="check">
              Signalement également possible à{" "}
              <LegalLink href="mailto:info@tia-meet.com">
                info@tia-meet.com
              </LegalLink>
            </LegalItem>
            <LegalItem marker="check">Les signalements concernant la sécurité d'un enfant sont traités en priorité</LegalItem>
          </LegalList>
        </LegalCard>
      </LegalSection>

      <LegalSection title="6. Mesures de Tia en cas de suspicion">
        <p>
          Lorsqu'un signalement ou un élément objectif laisse raisonnablement suspecter qu'un Compte appartient
          à une personne mineure ou qu'un contenu implique l'exploitation d'un enfant, Tia peut immédiatement :
        </p>
        <LegalList>
          <LegalItem>suspendre le Compte ;</LegalItem>
          <LegalItem>empêcher l'envoi ou la réception de messages ;</LegalItem>
          <LegalItem>masquer ou retirer le contenu ;</LegalItem>
          <LegalItem>demander une vérification d'âge ou d'identité ;</LegalItem>
          <LegalItem>préserver les éléments techniques et contenus nécessaires à l'analyse ;</LegalItem>
          <LegalItem>empêcher une réinscription ;</LegalItem>
          <LegalItem>transmettre ou conserver des informations lorsque la loi l'exige ou l'autorise ;</LegalItem>
          <LegalItem>coopérer avec les autorités compétentes.</LegalItem>
        </LegalList>
        <LegalCallout>
          <p>
            Tia peut agir avant d'avoir terminé une enquête interne lorsqu'une mesure conservatoire est
            raisonnablement nécessaire pour protéger une personne.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection title="7. CSAM : retrait, préservation et coopération">
        <p>
          Tia applique une politique de tolérance zéro au CSAM. Lorsqu'un contenu est raisonnablement identifié
          comme pouvant constituer du CSAM, Tia prend les mesures adaptées à la réglementation applicable,
          pouvant inclure :
        </p>
        <LegalList>
          <LegalItem>restriction immédiate de l'accès au contenu ;</LegalItem>
          <LegalItem>suspension du Compte ;</LegalItem>
          <LegalItem>préservation sécurisée des éléments nécessaires à une enquête, sans diffusion inutile ;</LegalItem>
          <LegalItem>
            signalement ou transmission aux autorités ou organismes compétents lorsque la loi l'exige ou
            l'autorise ;
          </LegalItem>
          <LegalItem>coopération avec une enquête judiciaire régulière.</LegalItem>
        </LegalList>
        <LegalNote>
          Le personnel et les prestataires ne doivent pas télécharger, dupliquer ou transmettre inutilement un
          contenu potentiellement illégal en dehors des procédures autorisées.
        </LegalNote>
      </LegalSection>

      <LegalSection title="8. Preuves et conservation">
        <p>
          Tia peut conserver les données nécessaires à un signalement de sécurité enfant, notamment :
          identifiants de Compte, contenu signalé, historique de signalement, métadonnées techniques
          pertinentes, décisions de modération et éléments transmis aux autorités.
        </p>
        <p>
          Cette conservation est limitée à ce qui est nécessaire pour la sécurité, la prévention de récidive,
          une procédure, la défense d'un droit ou une obligation légale. La suppression volontaire d'un Compte
          ne peut pas obliger Tia à détruire des éléments qu'elle est légalement tenue ou autorisée à
          conserver pour une enquête ou la protection d'un enfant.
        </p>
      </LegalSection>

      <LegalSection title="9. Interdiction de contacter ou d'exploiter un mineur hors plateforme">
        <p>
          Un Utilisateur ne peut pas échapper à cette politique en transférant une conversation vers WhatsApp,
          téléphone, email, réseau social ou tout autre service. Lorsqu'un comportement hors plateforme est
          signalé à Tia et qu'il est suffisamment lié à un Compte Tia pour révéler un risque de sécurité, Tia
          peut prendre des mesures sur le Compte concerné, dans la mesure permise par la loi et les CGU.
        </p>
      </LegalSection>

      <LegalSection title="10. Responsabilité de l'auteur d'un acte illicite">
        <p>
          Toute personne qui exploite, sollicite, menace, harcèle ou agresse un mineur demeure personnellement
          responsable de ses actes et peut faire l'objet des sanctions civiles ou pénales prévues par la loi.
          Le fait qu'une personne ait créé un Compte ou utilisé Tia ne transfère pas à Tia la responsabilité de
          l'acte illicite commis par cette personne.
        </p>
        <LegalCard>
          <p>
            Dans toute la mesure permise par la loi applicable, Tia n'est pas responsable d'un acte criminel
            commis par un Utilisateur qui a trompé ou contourné les mesures raisonnables de la plateforme, sauf
            faute propre de Tia engageant légalement sa responsabilité.
          </p>
        </LegalCard>
      </LegalSection>

      <LegalSection title="11. Parents et représentants légaux">
        <p>
          Tia n'est pas destiné aux mineurs et ne doit pas être installé ou utilisé par eux. Les parents et
          représentants légaux sont encouragés à utiliser les mécanismes de contrôle parental, restrictions de
          téléchargement et paramètres d'âge mis à disposition par les systèmes d'exploitation et magasins
          d'applications.
        </p>
        <p>
          Toute personne pensant qu'un mineur utilise Tia peut le signaler immédiatement à{" "}
          <LegalLink href="mailto:info@tia-meet.com">
            info@tia-meet.com
          </LegalLink>
          .
        </p>
      </LegalSection>

      <LegalSection title="12. Obligations des Utilisateurs">
        <p>Chaque Utilisateur doit :</p>
        <LegalList>
          <LegalItem>déclarer son âge de manière exacte ;</LegalItem>
          <LegalItem>ne jamais prêter son Compte à une personne mineure ;</LegalItem>
          <LegalItem>ne jamais utiliser la photo, le document ou l'identité d'un mineur pour créer un profil ;</LegalItem>
          <LegalItem>signaler immédiatement tout Compte ou comportement laissant suspecter la présence d'un mineur ;</LegalItem>
          <LegalItem>ne pas tenter d'enquêter lui-même en demandant ou partageant du contenu sexuel ;</LegalItem>
          <LegalItem>coopérer raisonnablement avec Tia lorsqu'une vérification de sécurité est nécessaire.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="13. Modération humaine et automatisée">
        <p>
          Tia peut utiliser des outils automatisés et des contrôles humains pour identifier des signaux
          associés aux faux profils, à la fraude, aux contenus interdits ou aux risques pour les mineurs. Ces
          outils réduisent les risques mais ne peuvent garantir la détection de chaque violation avant
          exposition. L'absence de détection immédiate ne signifie pas qu'un contenu ou comportement est
          autorisé.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact dédié à la sécurité des enfants">
        <p>
          Un point de contact spécifique est mis à disposition pour toute question ou alerte liée à la sécurité
          des mineurs :
        </p>
        <LegalContact label="Email">
          <LegalLink href="mailto:info@tia-meet.com">info@tia-meet.com</LegalLink>
        </LegalContact>
        <LegalContact label="Responsable">Équipe Sécurité Tia</LegalContact>
        <LegalNote>
          Tia désigne également dans les interfaces développeur pertinentes, notamment lorsque requis par
          Google Play, un point de contact interne habilité à répondre aux questions concernant les pratiques
          de lutte contre le CSAE/CSAM.
        </LegalNote>
      </LegalSection>

      <LegalSection title="15. Conformité aux magasins d'applications">
        <p>
          Tia maintient des standards publics interdisant explicitement le CSAE/CSAM, un mécanisme de
          signalement utilisateur et un point de contact relatif à la sécurité des enfants conformément aux
          politiques applicables aux applications sociales et de rencontres. Tia peut adapter cette Politique
          pour tenir compte d'une évolution des exigences Apple App Store, Google Play ou de la réglementation.
        </p>
      </LegalSection>

      <LegalSection title="16. Coopération avec les autorités">
        <p>
          Tia répond aux demandes légalement valables des autorités compétentes et peut prendre toute mesure
          autorisée par la loi afin de préserver la sécurité d'une personne, de prévenir une infraction grave
          ou de protéger un enfant. Tia peut refuser une demande informelle, excessivement large ou
          juridiquement insuffisante lorsqu'aucune urgence ou obligation légale ne justifie la communication.
        </p>
      </LegalSection>

      <LegalSection title="17. Modifications et révision continue">
        <LegalCallout>
          <p>
            Tia réévalue régulièrement ses procédures de modération, de contrôle d'âge, de signalement et de
            conservation afin d'améliorer la protection des mineurs. Toute modification substantielle de cette
            Politique est publiée dans l'Application ou sur le site de Tia.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection title="18. Contact">
        <p>Pour toute alerte liée à la sécurité d'un enfant :</p>
        <LegalContact label="Contact sécurité enfant">
          <LegalLink href="mailto:info@tia-meet.com">info@tia-meet.com</LegalLink>
        </LegalContact>
        <LegalCallout tone="alert">
          <p className="font-semibold">
            Pour une situation urgente mettant immédiatement une personne en danger, il convient de contacter
            directement les services d'urgence ou les autorités locales compétentes ; Tia n'est pas un service
            d'urgence.
          </p>
        </LegalCallout>
      </LegalSection>
    </LegalPage>
  );
}
