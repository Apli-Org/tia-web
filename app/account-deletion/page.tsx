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
  "Suppression de compte",
  "Comment supprimer ton compte Tia et ce qu’il advient de tes données.",
);

type AccountDeletionPageProps = {
  searchParams: LegalPageSearchParams;
};

export default function AccountDeletionPage({ searchParams }: AccountDeletionPageProps) {
  return (
    <LegalPage
      title="Suppression du Compte et des Données"
      version="1.1"
      updatedAt="25 octobre 2026"
      searchParams={searchParams}
    >
      <LegalCallout>
        <p>
          Cette page explique comment demander la suppression d'un Compte Tia et des données personnelles
          associées.
        </p>
      </LegalCallout>

      <LegalSection title="1. Supprimer son Compte depuis l'Application">
        <p>Dans l'Application :</p>
        <LegalCard>
          <ol className="flex list-decimal flex-col gap-2.5 pl-5 marker:font-bold marker:text-tia-violet-500">
            <li>ouvrez <strong>Paramètres</strong> ;</li>
            <li>
              dans la section <strong>Zone de danger</strong>, choisissez <strong>Supprimer mon compte</strong> ;
            </li>
            <li>choisissez la suppression différée ou la suppression immédiate (voir l'article 3) ;</li>
            <li>
              confirmez avec votre mot de passe ou, si vous vous connectez avec Google ou Apple, avec le code
              reçu par email.
            </li>
          </ol>
        </LegalCard>
        <LegalNote>
          Le parcours et les intitulés exacts peuvent varier légèrement selon la version de l'Application. Les
          options affichées dans l'Application font foi.
        </LegalNote>
      </LegalSection>

      <LegalSection title="2. Demander la suppression sans accès à l'Application">
        <p>Vous pouvez également envoyer une demande à :</p>
        <LegalContact label="Objet recommandé : « Demande de suppression de compte »">
          <LegalLink href="mailto:info@tia-meet.com">info@tia-meet.com</LegalLink>
        </LegalContact>
        <p>
          Indiquez l'adresse email utilisée pour votre Compte afin que nous puissions identifier votre
          demande. Tia peut demander une vérification raisonnable afin d'éviter qu'un tiers
          tente de supprimer frauduleusement votre Compte.
        </p>
      </LegalSection>

      <LegalSection title="3. Ce qui se passe après la demande">
        <p>L'Application propose deux options :</p>
        <LegalList>
          <LegalItem>
            <strong>Suppression différée (30 jours) :</strong> votre Compte est désactivé et votre profil
            masqué immédiatement, puis le Compte est supprimé définitivement au bout de trente (30) jours. Si
            vous vous reconnectez avant cette date, la demande est annulée et votre Compte est réactivé. Si un
            abonnement est encore en cours au terme de ces trente jours, la suppression a lieu à la fin de
            l'abonnement.
          </LegalItem>
          <LegalItem>
            <strong>Suppression immédiate :</strong> votre Compte, votre profil, vos photos, vos matchs, vos
            likes et les messages que vous avez envoyés sont supprimés immédiatement et définitivement. Cette
            action est irréversible.
          </LegalItem>
        </LegalList>
        <p>
          Une demande envoyée par email est traitée dans un délai maximal de trente (30) jours. Après la
          suppression définitive :
        </p>
        <LegalList>
          <LegalItem>
            certaines copies techniques peuvent rester temporairement dans les sauvegardes jusqu'à leur
            rotation normale, généralement pour une période supplémentaire pouvant aller jusqu'à
            quatre-vingt-dix (90) jours ;
          </LegalItem>
          <LegalItem>
            les enregistrements de paiement sont conservés pour les obligations comptables, sans lien avec
            votre Compte et sans le numéro de téléphone utilisé pour un paiement par mobile money ;
          </LegalItem>
          <LegalItem>
            certaines informations peuvent être conservées séparément lorsqu'une obligation légale, une
            procédure, un dossier de sécurité, la prévention de fraude, la protection d'une personne ou la
            défense d'un droit le justifie.
          </LegalItem>
        </LegalList>
        <LegalNote>
          Un Compte définitivement supprimé ne peut plus être réactivé : les informations éventuellement
          conservées ne servent pas à reconstituer le profil ni à poursuivre l'usage ordinaire du Service.
        </LegalNote>
      </LegalSection>

      <LegalSection title="4. Signalements, bannissements et sécurité">
        <p>
          Une demande de suppression ne permet pas d'exiger la destruction immédiate de preuves nécessaires à :
        </p>
        <LegalList>
          <LegalItem>un signalement de harcèlement, violence, fraude ou exploitation ;</LegalItem>
          <LegalItem>une enquête impliquant potentiellement une personne mineure ;</LegalItem>
          <LegalItem>la prévention d'une réinscription après un bannissement grave ;</LegalItem>
          <LegalItem>une demande légalement valable d'une autorité ;</LegalItem>
          <LegalItem>l'établissement, l'exercice ou la défense d'un droit en justice.</LegalItem>
        </LegalList>
        <LegalNote>
          Ces informations sont conservées uniquement pendant la durée raisonnablement nécessaire à la
          finalité concernée et conformément à la réglementation applicable.
        </LegalNote>
      </LegalSection>

      <LegalSection title="5. Abonnements en cours">
        <LegalCallout tone="alert">
          <p className="font-semibold">
            La suppression du Compte Tia ne résilie pas automatiquement un abonnement géré par l'App Store ou
            Google Play.
          </p>
        </LegalCallout>
        <p>
          Si vous avez un abonnement actif, vous devez également l'annuler dans les paramètres d'abonnement de
          la plateforme par laquelle vous avez souscrit.
        </p>
        <p>
          Un abonnement payé par mobile money (Orange Money, MVola, Airtel Money) n'est jamais renouvelé
          automatiquement : il n'y a rien à résilier.
        </p>
      </LegalSection>

      <LegalSection title="6. Données déjà partagées avec d'autres personnes">
        <p>
          La suppression de votre Compte retire votre profil du Service, mais Tia ne peut pas garantir la
          suppression d'une copie qu'un autre Utilisateur aurait déjà enregistrée, copiée ou reçue, par
          exemple une capture d'écran ou un message sauvegardé hors de Tia. Une utilisation illicite de telles
          informations peut toutefois être signalée et peut engager la responsabilité de son auteur.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>
          Pour toute demande relative à la suppression d'un Compte ou de données :
        </p>
        <LegalContact label="APLI SARLU — Tia · LOGT 51, Cité Ampefiloha, Antananarivo, Madagascar">
          <LegalLink href="mailto:info@tia-meet.com">info@tia-meet.com</LegalLink>
        </LegalContact>
      </LegalSection>
    </LegalPage>
  );
}
