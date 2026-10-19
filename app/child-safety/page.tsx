"use client";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ChildSafetyContent() {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get("embed") === "true";

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
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
          <div className="bg-linear-to-r from-blue-500/10 via-indigo-50 to-purple-50 px-8 py-12 border-b border-gray-100">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Politique de Protection des Mineurs et de Lutte contre l'Exploitation Sexuelle des Enfants
            </h1>
            <p className="text-lg text-gray-600">
              Version 2.0 — Dernière mise à jour : 11 août 2026
            </p>
          </div>

          <article className="px-8 py-10 prose prose-lg max-w-none">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <p className="text-red-800 leading-relaxed mb-0 font-semibold">
                Tia est un service de rencontres strictement réservé aux personnes âgées de 18 ans et plus. APLI
                SARLU applique une politique de tolérance zéro envers toute forme d'exploitation sexuelle, d'abus,
                de mise en danger, de sollicitation ou de sexualisation d'une personne mineure. Cette politique
                s'applique à tous les Comptes, profils, photos, messages, contenus et comportements liés à
                l'utilisation de Tia, y compris lorsqu'une interaction commencée sur Tia se poursuit hors de
                l'Application.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500/20">
                1. Notre engagement
              </h2>
              <p className="text-gray-600">
                Tia est un service de rencontres strictement réservé aux personnes âgées de 18 ans et plus. APLI
                SARLU applique une politique de tolérance zéro envers toute forme d'exploitation sexuelle, d'abus,
                de mise en danger, de sollicitation ou de sexualisation d'une personne mineure, y compris lorsque
                l'interaction commencée sur Tia se poursuit hors de l'Application.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-red-500/20">
                2. Définitions et comportements interdits
              </h2>
              <p className="text-gray-600 mb-4">Tia interdit notamment :</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">tout contenu d'abus sexuel d'enfants (« CSAM ») ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">toute exploitation ou abus sexuel d'enfant (« CSAE ») ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">la représentation sexuelle d'une personne mineure ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">
                    le grooming, c'est-à-dire la création ou l'entretien d'un contact avec un mineur à des fins
                    sexuelles, abusives ou d'exploitation ;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">la sollicitation d'images intimes d'une personne mineure ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">le chantage sexuel ou « sextortion » impliquant un mineur ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">la traite, le trafic ou l'exploitation commerciale d'un mineur ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">
                    toute proposition de rencontre à caractère sexuel impliquant une personne mineure ;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">le partage de liens, fichiers ou instructions permettant d'accéder à du CSAM ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">la glorification ou la banalisation d'un abus sexuel d'enfant ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-gray-700">
                    toute tentative de contourner les mécanismes de détection, signalement ou contrôle liés à la
                    protection des mineurs.
                  </span>
                </li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 mb-0">
                  Aucune intention humoristique, artistique ou provocatrice ne justifie un contenu illégal ou un
                  comportement mettant un mineur en danger.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-amber-500/20">
                3. Accès strictement réservé aux adultes
              </h2>
              <p className="text-gray-600 mb-4">
                Pour créer un Compte, l'Utilisateur doit déclarer être âgé d'au moins 18 ans et fournir sa date de
                naissance. Tia peut mettre en œuvre, selon les fonctionnalités disponibles :
              </p>
              <div className="grid md:grid-cols-1 gap-3 mb-6">
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">blocage de l'inscription des dates de naissance indiquant un âge inférieur à 18 ans ;</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">contrôles de cohérence ;</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">vérification de téléphone ou email ;</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">vérification de photo ou selfie ;</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">vérification documentaire ;</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">demande de justificatif en cas de doute ;</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">suspension conservatoire d'un Compte suspecté d'appartenir à un mineur.</span>
                </div>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <p className="text-yellow-800 font-semibold mb-0">
                  La fourniture d'une fausse date de naissance, l'utilisation du document d'un tiers, la
                  falsification d'une pièce ou le contournement volontaire d'une vérification constitue une violation
                  grave des CGU.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-orange-500/20">
                4. Limites des mécanismes de vérification
              </h2>
              <p className="text-gray-600 mb-4">
                Aucun mécanisme technique, déclaratif ou documentaire ne peut garantir avec une certitude absolue
                qu'une personne malintentionnée ne parviendra jamais à fournir de fausses informations ou à
                contourner un contrôle. Une vérification réussie ou un badge n'est donc pas une garantie absolue de
                l'âge réel, de l'identité, des intentions, des antécédents ou de la sécurité d'un Utilisateur.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-0">
                  <strong>
                    Dans toute la mesure permise par la loi, Tia ne saurait être tenue responsable du seul fait
                    qu'une personne ait frauduleusement contourné les mesures raisonnables mises en place pour
                    empêcher l'accès des mineurs.
                  </strong>{" "}
                  Cette limitation ne réduit pas les obligations légales de Tia lorsqu'elle acquiert connaissance
                  d'un risque crédible ou d'un contenu impliquant potentiellement un mineur.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-green-500/20">
                5. Signalement dans l'Application
              </h2>
              <p className="text-gray-600 mb-4">Les Utilisateurs sont invités à signaler immédiatement :</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">un profil paraissant appartenir à une personne mineure ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">une personne affirmant être mineure ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">un comportement de grooming ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">une sollicitation sexuelle impliquant un mineur ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">un contenu pouvant constituer du CSAM ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">toute menace, extorsion ou exploitation concernant un enfant.</span>
                </li>
              </ul>
              <div className="bg-green-50 rounded-lg p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">
                    Bouton « Signaler » disponible sur les profils et/ou conversations lorsque cette fonctionnalité
                    est prévue
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">
                    Signalement également possible à{" "}
                    <a href="mailto:info@tia-meet.com" className="text-primary hover:underline font-medium">
                      info@tia-meet.com
                    </a>
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">Les signalements concernant la sécurité d'un enfant sont traités en priorité</span>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500/20">
                6. Mesures de Tia en cas de suspicion
              </h2>
              <p className="text-gray-600 mb-4">
                Lorsqu'un signalement ou un élément objectif laisse raisonnablement suspecter qu'un Compte appartient
                à une personne mineure ou qu'un contenu implique l'exploitation d'un enfant, Tia peut immédiatement :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">suspendre le Compte ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">empêcher l'envoi ou la réception de messages ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">masquer ou retirer le contenu ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">demander une vérification d'âge ou d'identité ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">préserver les éléments techniques et contenus nécessaires à l'analyse ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">empêcher une réinscription ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">transmettre ou conserver des informations lorsque la loi l'exige ou l'autorise ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">coopérer avec les autorités compétentes.</span>
                </li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 mb-0">
                  Tia peut agir avant d'avoir terminé une enquête interne lorsqu'une mesure conservatoire est
                  raisonnablement nécessaire pour protéger une personne.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-red-500/20">
                7. CSAM : retrait, préservation et coopération
              </h2>
              <p className="text-gray-600 mb-4">
                Tia applique une politique de tolérance zéro au CSAM. Lorsqu'un contenu est raisonnablement identifié
                comme pouvant constituer du CSAM, Tia prend les mesures adaptées à la réglementation applicable,
                pouvant inclure :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">restriction immédiate de l'accès au contenu ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">suspension du Compte ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">préservation sécurisée des éléments nécessaires à une enquête, sans diffusion inutile ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    signalement ou transmission aux autorités ou organismes compétents lorsque la loi l'exige ou
                    l'autorise ;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">coopération avec une enquête judiciaire régulière.</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Le personnel et les prestataires ne doivent pas télécharger, dupliquer ou transmettre inutilement un
                contenu potentiellement illégal en dehors des procédures autorisées.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-400/40">
                8. Preuves et conservation
              </h2>
              <p className="text-gray-600 mb-4">
                Tia peut conserver les données nécessaires à un signalement de sécurité enfant, notamment :
                identifiants de Compte, contenu signalé, historique de signalement, métadonnées techniques
                pertinentes, décisions de modération et éléments transmis aux autorités.
              </p>
              <p className="text-gray-600">
                Cette conservation est limitée à ce qui est nécessaire pour la sécurité, la prévention de récidive,
                une procédure, la défense d'un droit ou une obligation légale. La suppression volontaire d'un Compte
                ne peut pas obliger Tia à détruire des éléments qu'elle est légalement tenue ou autorisée à
                conserver pour une enquête ou la protection d'un enfant.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-purple-500/20">
                9. Interdiction de contacter ou d'exploiter un mineur hors plateforme
              </h2>
              <p className="text-gray-600">
                Un Utilisateur ne peut pas échapper à cette politique en transférant une conversation vers WhatsApp,
                téléphone, email, réseau social ou tout autre service. Lorsqu'un comportement hors plateforme est
                signalé à Tia et qu'il est suffisamment lié à un Compte Tia pour révéler un risque de sécurité, Tia
                peut prendre des mesures sur le Compte concerné, dans la mesure permise par la loi et les CGU.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-400/40">
                10. Responsabilité de l'auteur d'un acte illicite
              </h2>
              <p className="text-gray-600 mb-4">
                Toute personne qui exploite, sollicite, menace, harcèle ou agresse un mineur demeure personnellement
                responsable de ses actes et peut faire l'objet des sanctions civiles ou pénales prévues par la loi.
                Le fait qu'une personne ait créé un Compte ou utilisé Tia ne transfère pas à Tia la responsabilité de
                l'acte illicite commis par cette personne.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-0">
                  Dans toute la mesure permise par la loi applicable, Tia n'est pas responsable d'un acte criminel
                  commis par un Utilisateur qui a trompé ou contourné les mesures raisonnables de la plateforme, sauf
                  faute propre de Tia engageant légalement sa responsabilité.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-500/20">
                11. Parents et représentants légaux
              </h2>
              <p className="text-gray-600 mb-4">
                Tia n'est pas destiné aux mineurs et ne doit pas être installé ou utilisé par eux. Les parents et
                représentants légaux sont encouragés à utiliser les mécanismes de contrôle parental, restrictions de
                téléchargement et paramètres d'âge mis à disposition par les systèmes d'exploitation et magasins
                d'applications.
              </p>
              <p className="text-gray-600">
                Toute personne pensant qu'un mineur utilise Tia peut le signaler immédiatement à{" "}
                <a href="mailto:info@tia-meet.com" className="text-primary hover:underline font-medium">
                  info@tia-meet.com
                </a>
                .
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-teal-500/20">
                12. Obligations des Utilisateurs
              </h2>
              <p className="text-gray-600 mb-4">Chaque Utilisateur doit :</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">déclarer son âge de manière exacte ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">ne jamais prêter son Compte à une personne mineure ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">ne jamais utiliser la photo, le document ou l'identité d'un mineur pour créer un profil ;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    signaler immédiatement tout Compte ou comportement laissant suspecter la présence d'un mineur ;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    ne pas tenter d'enquêter lui-même en demandant ou partageant du contenu sexuel ;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">coopérer raisonnablement avec Tia lorsqu'une vérification de sécurité est nécessaire.</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-orange-500/20">
                13. Modération humaine et automatisée
              </h2>
              <p className="text-gray-600">
                Tia peut utiliser des outils automatisés et des contrôles humains pour identifier des signaux
                associés aux faux profils, à la fraude, aux contenus interdits ou aux risques pour les mineurs. Ces
                outils réduisent les risques mais ne peuvent garantir la détection de chaque violation avant
                exposition. L'absence de détection immédiate ne signifie pas qu'un contenu ou comportement est
                autorisé.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-cyan-500/20">
                14. Contact dédié à la sécurité des enfants
              </h2>
              <p className="text-gray-600 mb-4">
                Un point de contact spécifique est mis à disposition pour toute question ou alerte liée à la sécurité
                des mineurs :
              </p>
              <div className="bg-linear-to-r from-cyan-50 to-blue-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-full p-3 shadow-sm">
                    <svg
                      className="w-6 h-6 text-cyan-600"
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
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href="mailto:info@tia-meet.com"
                      className="text-lg font-semibold text-cyan-600 hover:underline"
                    >
                      info@tia-meet.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-full p-3 shadow-sm">
                    <svg
                      className="w-6 h-6 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Responsable</p>
                    <p className="text-lg font-semibold text-gray-800">Équipe Sécurité Tia</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic mt-4">
                Tia désigne également dans les interfaces développeur pertinentes, notamment lorsque requis par
                Google Play, un point de contact interne habilité à répondre aux questions concernant les pratiques
                de lutte contre le CSAE/CSAM.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500/20">
                15. Conformité aux magasins d'applications
              </h2>
              <p className="text-gray-600">
                Tia maintient des standards publics interdisant explicitement le CSAE/CSAM, un mécanisme de
                signalement utilisateur et un point de contact relatif à la sécurité des enfants conformément aux
                politiques applicables aux applications sociales et de rencontres. Tia peut adapter cette Politique
                pour tenir compte d'une évolution des exigences Apple App Store, Google Play ou de la réglementation.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-orange-500/20">
                16. Coopération avec les autorités
              </h2>
              <p className="text-gray-600">
                Tia répond aux demandes légalement valables des autorités compétentes et peut prendre toute mesure
                autorisée par la loi afin de préserver la sécurité d'une personne, de prévenir une infraction grave
                ou de protéger un enfant. Tia peut refuser une demande informelle, excessivement large ou
                juridiquement insuffisante lorsqu'aucune urgence ou obligation légale ne justifie la communication.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-indigo-500/20">
                17. Modifications et révision continue
              </h2>
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
                <p className="text-indigo-800 mb-0">
                  Tia réévalue régulièrement ses procédures de modération, de contrôle d'âge, de signalement et de
                  conservation afin d'améliorer la protection des mineurs. Toute modification substantielle de cette
                  Politique est publiée dans l'Application ou sur le site de Tia.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-red-500/20">
                18. Contact
              </h2>
              <p className="text-gray-600 mb-4">Pour toute alerte liée à la sécurité d'un enfant :</p>
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
                  <p className="text-sm text-gray-600 mb-1">Contact sécurité enfant</p>
                  <a
                    href="mailto:info@tia-meet.com"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    info@tia-meet.com
                  </a>
                </div>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-red-800 mb-0 font-semibold">
                  Pour une situation urgente mettant immédiatement une personne en danger, il convient de contacter
                  directement les services d'urgence ou les autorités locales compétentes ; Tia n'est pas un service
                  d'urgence.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>
      {!isEmbed && <Footer />}
    </div>
  );
}

export default function ChildSafetyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ChildSafetyContent />
    </Suspense>
  );
}
