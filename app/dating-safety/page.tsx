import type { Metadata } from "next";
import { LegalCallout } from "@/components/legal/legal-callout";
import { LegalItem } from "@/components/legal/legal-item";
import { LegalLink } from "@/components/legal/legal-link";
import { LegalList } from "@/components/legal/legal-list";
import { LegalNote } from "@/components/legal/legal-note";
import { LegalPage, type LegalPageSearchParams } from "@/components/legal/legal-page";
import { LegalSection } from "@/components/legal/legal-section";
import { getLegalMetadata } from "@/lib/legal-metadata";

export const metadata: Metadata = getLegalMetadata(
  "Charte de sécurité des rencontres",
  "Les conseils de Tia pour rencontrer quelqu’un en ligne et hors ligne en toute sécurité.",
);

type DatingSafetyPageProps = {
  searchParams: LegalPageSearchParams;
};

export default function DatingSafetyPage({ searchParams }: DatingSafetyPageProps) {
  return (
    <LegalPage
      title="Charte de Sécurité des Rencontres"
      version="1.0"
      updatedAt="11 août 2026"
      searchParams={searchParams}
    >
      <LegalCallout>
        <p>
          Tia est conçu pour faciliter des mises en relation entre personnes majeures. Aucun service de
          rencontres ne peut cependant garantir la sincérité, l'identité, les intentions ou le comportement
          futur de chaque personne. Cette Charte explique les précautions recommandées avant, pendant et après
          une interaction.
        </p>
      </LegalCallout>

      <LegalSection title="1. Une vérification n'est pas une garantie de sécurité">
        <p>
          Un badge, un selfie vérifié, une validation de téléphone ou un contrôle d'identité signifie
          uniquement qu'un processus technique a été satisfait. Cela ne signifie pas que Tia garantit :
        </p>
        <LegalList>
          <LegalItem>la moralité de la personne ;</LegalItem>
          <LegalItem>l'absence d'antécédents ;</LegalItem>
          <LegalItem>son état civil ;</LegalItem>
          <LegalItem>ses intentions ;</LegalItem>
          <LegalItem>sa santé ;</LegalItem>
          <LegalItem>son comportement futur.</LegalItem>
        </LegalList>
        <LegalNote>Restez prudent même avec un profil vérifié.</LegalNote>
      </LegalSection>

      <LegalSection title="2. Prenez le temps d'échanger">
        <p>Avant une rencontre physique :</p>
        <LegalList>
          <LegalItem>échangez suffisamment pour détecter les incohérences ;</LegalItem>
          <LegalItem>méfiez-vous des déclarations d'amour ou d'urgence financière très rapides ;</LegalItem>
          <LegalItem>utilisez si possible un appel audio ou vidéo avant de vous déplacer ;</LegalItem>
          <LegalItem>ne donnez pas immédiatement votre adresse personnelle, lieu de travail précis ou informations financières.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. N'envoyez jamais d'argent à une personne rencontrée sur Tia">
        <LegalCallout tone="alert">
          <p className="font-semibold">
            Les demandes d'argent, investissements, prêts, achats de billets, urgences familiales ou demandes
            de codes de paiement sont des signaux de risque.
          </p>
        </LegalCallout>
        <p>
          Tia ne garantit aucune transaction entre Utilisateurs et ne vous demandera pas de payer un autre
          Utilisateur pour débloquer un Match ou conserver un Compte. Signalez toute sollicitation suspecte.
        </p>
      </LegalSection>

      <LegalSection title="4. Protégez vos informations personnelles">
        <p>Évitez de transmettre trop tôt :</p>
        <LegalList>
          <LegalItem>adresse personnelle ;</LegalItem>
          <LegalItem>numéro de pièce d'identité ;</LegalItem>
          <LegalItem>mots de passe ou codes OTP ;</LegalItem>
          <LegalItem>informations bancaires ;</LegalItem>
          <LegalItem>localisation en temps réel ;</LegalItem>
          <LegalItem>documents privés ;</LegalItem>
          <LegalItem>photos intimes permettant de vous identifier.</LegalItem>
        </LegalList>
        <LegalNote>
          Un destinataire peut enregistrer ou copier ce que vous lui envoyez, même si cela est interdit par
          les CGU.
        </LegalNote>
      </LegalSection>

      <LegalSection title="5. Première rencontre : privilégiez un lieu public">
        <p>Pour une première rencontre :</p>
        <LegalList>
          <LegalItem>choisissez un lieu fréquenté ;</LegalItem>
          <LegalItem>évitez un domicile privé ou une zone isolée ;</LegalItem>
          <LegalItem>informez un proche de votre rendez-vous ;</LegalItem>
          <LegalItem>conservez votre propre moyen de transport ;</LegalItem>
          <LegalItem>gardez votre téléphone chargé ;</LegalItem>
          <LegalItem>prévoyez une manière simple de partir à tout moment.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="6. Alcool et substances">
        <p>
          Une consommation importante d'alcool ou de substances peut réduire la capacité à évaluer une
          situation et à consentir librement. Ne laissez pas une personne inconnue contrôler vos boissons,
          médicaments, transport ou moyens de communication.
        </p>
        <p>
          Si vous vous sentez désorienté, menacé ou physiquement mal, quittez la situation lorsque cela est
          possible et contactez une personne de confiance ou les services locaux compétents.
        </p>
      </LegalSection>

      <LegalSection title="7. Consentement">
        <p>
          Le consentement doit être libre, clair et peut être retiré à tout moment. Un Match, une conversation,
          une photo, un flirt, un rendez-vous ou une relation antérieure ne constitue jamais un consentement
          permanent à une activité sexuelle ou physique.
        </p>
        <p>
          Toute pression, menace ou acte sexuel non consenti doit être pris au sérieux.
        </p>
      </LegalSection>

      <LegalSection title="8. Si quelque chose semble anormal">
        <p>Interrompez une interaction si une personne :</p>
        <LegalList>
          <LegalItem>refuse systématiquement toute vérification raisonnable ;</LegalItem>
          <LegalItem>change fréquemment d'identité ou d'histoire ;</LegalItem>
          <LegalItem>vous menace ou vous fait culpabiliser ;</LegalItem>
          <LegalItem>demande de l'argent ;</LegalItem>
          <LegalItem>tente de vous isoler ;</LegalItem>
          <LegalItem>insiste pour obtenir des photos intimes ;</LegalItem>
          <LegalItem>prétend avoir moins de 18 ans ;</LegalItem>
          <LegalItem>vous demande de garder secrète une situation dangereuse.</LegalItem>
        </LegalList>
        <p className="font-semibold">Utilisez les fonctions Bloquer et Signaler.</p>
      </LegalSection>

      <LegalSection title="9. Mineurs">
        <LegalCallout tone="alert">
          <p>
            Tia est strictement réservé aux personnes âgées de 18 ans et plus. Si une personne indique ou
            laisse raisonnablement penser qu'elle est mineure, interrompez immédiatement toute interaction
            romantique ou sexuelle et signalez le Compte.
          </p>
        </LegalCallout>
        <p>
          Ne demandez jamais à une personne potentiellement mineure d'envoyer des images intimes afin de «
          prouver » son âge.
        </p>
      </LegalSection>

      <LegalSection title="10. Communications hors Tia">
        <p>
          Lorsque vous quittez Tia pour WhatsApp, téléphone, email ou un réseau social, Tia ne contrôle plus
          l'environnement technique de la conversation. Le fait qu'un Match ait commencé sur Tia ne signifie
          pas que Tia approuve ou supervise les échanges effectués ailleurs.
        </p>
      </LegalSection>

      <LegalSection title="11. Signaler un incident">
        <p>
          Vous pouvez signaler un profil ou une conversation dans l'Application lorsque la fonctionnalité est
          disponible, ou écrire à{" "}
          <LegalLink href="mailto:info@tia-meet.com">
            info@tia-meet.com
          </LegalLink>
          . Tia peut suspendre un Compte, préserver des éléments et coopérer avec les autorités lorsque la
          situation le justifie.
        </p>
        <LegalCallout tone="alert">
          <p>
            Pour une urgence immédiate, contactez directement les services d'urgence ou les autorités locales.
            Tia n'est pas un service d'urgence et ne peut intervenir physiquement sur le lieu d'un incident.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection title="12. Responsabilité personnelle">
        <p>
          Chaque Utilisateur reste responsable de ses décisions, déplacements et interactions. Les outils de
          sécurité de Tia sont destinés à réduire certains risques ; ils ne peuvent éliminer tous les risques
          liés à des personnes malintentionnées.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
