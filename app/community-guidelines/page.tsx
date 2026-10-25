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
  "Règles de la communauté",
  "Les règles de comportement que chaque membre de Tia s’engage à respecter.",
);

type CommunityGuidelinesPageProps = {
  searchParams: LegalPageSearchParams;
};

export default function CommunityGuidelinesPage({ searchParams }: CommunityGuidelinesPageProps) {
  return (
    <LegalPage
      title="Règles de la Communauté Tia"
      version="1.0"
      updatedAt="11 août 2026"
      searchParams={searchParams}
    >
      <LegalCallout>
        <p>
          Tia veut offrir un environnement de rencontre respectueux entre adultes. L'accès au Service implique
          le respect des présentes règles. Une violation peut entraîner avertissement, restriction, suspension
          ou bannissement définitif, selon la gravité et le risque.
        </p>
      </LegalCallout>

      <LegalSection title="1. Réservé aux 18 ans et plus">
        <p>Vous devez avoir au moins 18 ans. Il est interdit de :</p>
        <LegalList>
          <LegalItem>créer un Compte si vous êtes mineur ;</LegalItem>
          <LegalItem>permettre à un mineur d'utiliser votre Compte ;</LegalItem>
          <LegalItem>créer un profil au nom d'un mineur ;</LegalItem>
          <LegalItem>publier du contenu sexualisant un mineur ;</LegalItem>
          <LegalItem>contacter un mineur à des fins romantiques ou sexuelles.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="2. Soyez authentique">
        <p>Utilisez vos propres informations et photos. Sont interdits :</p>
        <LegalList>
          <LegalItem>faux profils ;</LegalItem>
          <LegalItem>usurpation d'identité ;</LegalItem>
          <LegalItem>utilisation de photos volées ;</LegalItem>
          <LegalItem>identité fictive utilisée pour tromper ou nuire ;</LegalItem>
          <LegalItem>falsification d'âge ;</LegalItem>
          <LegalItem>comptes multiples destinés à contourner une sanction.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Respect et consentement">
        <p>
          Ne harcelez pas une personne qui ne souhaite pas poursuivre une conversation. Sont interdits :
        </p>
        <LegalList>
          <LegalItem>menaces ;</LegalItem>
          <LegalItem>intimidation ;</LegalItem>
          <LegalItem>insultes répétées ;</LegalItem>
          <LegalItem>stalking ;</LegalItem>
          <LegalItem>coercition sexuelle ;</LegalItem>
          <LegalItem>pression pour obtenir une rencontre, un numéro ou une photo intime ;</LegalItem>
          <LegalItem>sexualisation non sollicitée ;</LegalItem>
          <LegalItem>contenu sexuel envoyé sans consentement.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="4. Aucun contenu sexuel impliquant des mineurs">
        <LegalCallout tone="alert">
          <p>
            Tia applique une tolérance zéro au CSAM, au grooming et à toute exploitation sexuelle d'enfant.
            Tout comportement de ce type peut entraîner un bannissement immédiat, la préservation des preuves
            et une coopération avec les autorités selon la loi.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection title="5. Pas de haine ni de discrimination abusive">
        <p>
          Sont interdits les contenus ou comportements qui attaquent, menacent, déshumanisent ou appellent à
          la violence contre une personne ou un groupe en raison notamment d'une caractéristique protégée par
          la loi applicable.
        </p>
        <p>
          Les préférences personnelles de rencontre peuvent être exprimées dans les limites des
          fonctionnalités prévues, mais elles ne justifient pas l'humiliation, l'insulte ou l'incitation à la
          haine.
        </p>
      </LegalSection>

      <LegalSection title="6. Pas de violence ni de menace">
        <p>Il est interdit :</p>
        <LegalList>
          <LegalItem>de menacer de blesser ou tuer une personne ;</LegalItem>
          <LegalItem>de glorifier une agression réelle contre un Utilisateur ;</LegalItem>
          <LegalItem>de publier une menace crédible ;</LegalItem>
          <LegalItem>d'utiliser Tia pour planifier une agression, un enlèvement, une extorsion ou un crime.</LegalItem>
        </LegalList>
        <LegalNote>
          Tia peut suspendre immédiatement un Compte lorsqu'un risque grave est suspecté.
        </LegalNote>
      </LegalSection>

      <LegalSection title="7. Pas d'escroquerie ni de sollicitation financière">
        <p>Sont interdits :</p>
        <LegalList>
          <LegalItem>demandes d'argent trompeuses ;</LegalItem>
          <LegalItem>faux investissements ;</LegalItem>
          <LegalItem>prêts entre inconnus proposés comme condition d'une relation ;</LegalItem>
          <LegalItem>fraude au paiement ;</LegalItem>
          <LegalItem>phishing ;</LegalItem>
          <LegalItem>vol d'identifiants ;</LegalItem>
          <LegalItem>arnaques sentimentales ;</LegalItem>
          <LegalItem>chantage ou sextortion.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="8. Pas de prostitution, exploitation ou traite">
        <p>
          Tia ne peut pas être utilisé pour organiser, promouvoir ou faciliter :
        </p>
        <LegalList>
          <LegalItem>prostitution ou escorting ;</LegalItem>
          <LegalItem>exploitation sexuelle ;</LegalItem>
          <LegalItem>traite des êtres humains ;</LegalItem>
          <LegalItem>recrutement coercitif ;</LegalItem>
          <LegalItem>trafic illicite.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="9. Respectez la vie privée">
        <p>Il est interdit de :</p>
        <LegalList>
          <LegalItem>publier l'adresse privée d'une personne sans autorisation ;</LegalItem>
          <LegalItem>partager un document d'identité tiers ;</LegalItem>
          <LegalItem>diffuser un numéro privé ou des données financières pour nuire ;</LegalItem>
          <LegalItem>publier des images intimes sans consentement ;</LegalItem>
          <LegalItem>menacer de révéler une conversation ou un contenu privé afin d'obtenir un avantage.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="10. Contenus intimes et pornographiques">
        <p>
          Tia peut limiter ou interdire les contenus explicitement pornographiques selon les fonctionnalités
          et politiques applicables. Les images intimes non consenties, les menaces de diffusion et tout
          contenu impliquant une personne mineure sont strictement interdits.
        </p>
      </LegalSection>

      <LegalSection title="11. Pas de spam ou d'usage commercial non autorisé">
        <p>Sont interdits sans autorisation de Tia :</p>
        <LegalList>
          <LegalItem>publicité répétitive ;</LegalItem>
          <LegalItem>recrutement commercial ;</LegalItem>
          <LegalItem>vente de produits ou services ;</LegalItem>
          <LegalItem>liens d'affiliation ;</LegalItem>
          <LegalItem>systèmes pyramidaux ;</LegalItem>
          <LegalItem>collecte de prospects ;</LegalItem>
          <LegalItem>sollicitation politique ou commerciale automatisée.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="12. Pas de manipulation technique">
        <p>Il est interdit de :</p>
        <LegalList>
          <LegalItem>scraper les profils ;</LegalItem>
          <LegalItem>utiliser bots ou scripts non autorisés ;</LegalItem>
          <LegalItem>contourner les limitations ;</LegalItem>
          <LegalItem>tester ou exploiter une faille sans autorisation ;</LegalItem>
          <LegalItem>introduire un logiciel malveillant ;</LegalItem>
          <LegalItem>tenter d'accéder au Compte d'autrui ;</LegalItem>
          <LegalItem>falsifier des données techniques pour contourner une sanction.</LegalItem>
        </LegalList>
      </LegalSection>

      <LegalSection title="13. Signalez les comportements dangereux">
        <p>Signalez immédiatement :</p>
        <LegalList>
          <LegalItem>un Compte paraissant mineur ;</LegalItem>
          <LegalItem>une menace ;</LegalItem>
          <LegalItem>une escroquerie ;</LegalItem>
          <LegalItem>un harcèlement ;</LegalItem>
          <LegalItem>une agression ;</LegalItem>
          <LegalItem>un faux profil ;</LegalItem>
          <LegalItem>un contenu sexuel non consenti ;</LegalItem>
          <LegalItem>tout comportement contraire à ces règles.</LegalItem>
        </LegalList>
        <p>
          Le signalement peut être fait dans l'Application ou à{" "}
          <LegalLink href="mailto:info@tia-meet.com">
            info@tia-meet.com
          </LegalLink>
          .
        </p>
      </LegalSection>

      <LegalSection title="14. Modération et sanctions">
        <p>Tia peut prendre notamment les mesures suivantes :</p>
        <LegalList>
          <LegalItem>avertissement ;</LegalItem>
          <LegalItem>suppression de contenu ;</LegalItem>
          <LegalItem>limitation d'une fonctionnalité ;</LegalItem>
          <LegalItem>suspension ;</LegalItem>
          <LegalItem>vérification supplémentaire ;</LegalItem>
          <LegalItem>bannissement définitif ;</LegalItem>
          <LegalItem>prévention de réinscription ;</LegalItem>
          <LegalItem>coopération avec les autorités lorsque la loi l'exige ou l'autorise.</LegalItem>
        </LegalList>
        <LegalNote>
          La sanction dépend notamment de la gravité, de la répétition, du contexte, de la crédibilité du
          signalement et du risque pour autrui. Tia n'est pas tenue de révéler l'intégralité de ses méthodes
          de détection ou de sécurité lorsqu'une telle divulgation pourrait faciliter leur contournement.
        </LegalNote>
      </LegalSection>

      <LegalSection title="15. Sécurité hors plateforme">
        <p>
          Un comportement dangereux commis après qu'une conversation a quitté Tia peut conduire à une sanction
          du Compte lorsqu'il est suffisamment lié à l'utilisation du Service et qu'il démontre un risque pour
          la communauté. Le fait de déplacer une conversation vers un autre service n'autorise pas un
          comportement interdit par les présentes règles.
        </p>
      </LegalSection>

      <LegalSection title="16. Contestation d'une mesure">
        <p>
          Lorsque Tia met à disposition une procédure d'appel ou lorsque la loi l'exige, l'Utilisateur peut
          demander le réexamen d'une décision de modération. La demande doit être faite de bonne foi et ne
          suspend pas automatiquement une mesure prise pour protéger la sécurité d'autrui.
        </p>
      </LegalSection>

      <LegalSection title="17. Règle générale">
        <p>
          Si un comportement n'est pas expressément cité mais qu'il est manifestement frauduleux, dangereux,
          abusif, illégal ou contraire à l'objectif d'un service de rencontres entre adultes, Tia peut prendre
          les mesures raisonnablement nécessaires pour protéger le Service et ses Utilisateurs.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
