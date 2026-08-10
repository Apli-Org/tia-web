"use client";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
              <span>Dernière mise à jour : Août 2026</span>
            </div>
          </div>

          <article className="px-8 py-10 prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <p className="text-gray-700 leading-relaxed mb-0">
                La présente Politique de Confidentialité décrit la manière
                dont TIA (APLI SARLU) collecte, utilise, partage, conserve et
                protège les données personnelles de ses utilisateurs, ainsi
                que les droits dont ils disposent à cet égard.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-10">
              Elle doit être lue conjointement avec les{" "}
              <Link href="/terms" className="text-primary hover:underline font-medium">
                Conditions Générales d&apos;Utilisation
              </Link>{" "}
              et la{" "}
              <Link href="/child-safety" className="text-primary hover:underline font-medium">
                Politique de Protection des Mineurs
              </Link>{" "}
              de TIA. En utilisant l&apos;Application, vous reconnaissez avoir
              pris connaissance des pratiques décrites dans cette politique.
            </p>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                1. Responsable du traitement
              </h2>
              <p className="text-gray-600 mb-4">
                Le responsable du traitement des données est :
              </p>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Nom de la société / Éditeur :</strong> APLI SARLU
                </p>
                <p className="text-gray-700">
                  <strong>Adresse :</strong> LOGT 51 CITE Ampefiloha
                  Antananarivo Madagascar
                </p>
                <p className="text-gray-700">
                  <strong>Point de contact vie privée :</strong>{" "}
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
                2. Données personnelles collectées
              </h2>
              <p className="text-gray-600 mb-6">
                Dans le cadre de l&apos;utilisation de l&apos;Application, nous
                pouvons collecter les données suivantes :
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                2.1 Données fournies par l&apos;utilisateur
              </h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Nom ou pseudonyme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Adresse e-mail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Numéro de téléphone (le cas échéant)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Date de naissance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Genre</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Photos de profil</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Description personnelle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Préférences de rencontre
                  </span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                2.2 Données collectées automatiquement
              </h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Adresse IP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Type d&apos;appareil et système d&apos;exploitation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Identifiants techniques (cookies, identifiants mobiles)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Données de localisation approximative (si autorisées)
                  </span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                2.3 Données liées à l&apos;utilisation
              </h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Messages échangés dans l&apos;Application
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Interactions (likes, matchs, signalements)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Historique de connexion</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                2.4 Données de paiement
              </h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-0">
                  Les paiements sont traités directement par l&apos;App Store
                  d&apos;Apple, Google Play et notre prestataire de gestion
                  d&apos;abonnements. TIA n&apos;a accès à aucune donnée de
                  carte bancaire et ne la stocke pas.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                3. Finalités de la collecte des données
              </h2>
              <p className="text-gray-600 mb-4">
                Les données personnelles sont collectées pour les finalités
                suivantes :
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-700">
                    Création et gestion des comptes utilisateurs
                  </span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-700">
                    Mise en relation, y compris via des fonctionnalités
                    assistées par intelligence artificielle
                  </span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-700">
                    Amélioration de l&apos;expérience utilisateur et
                    statistiques agrégées
                  </span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-700">
                    Sécurité et prévention des fraudes
                  </span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-700">
                    Modération des contenus et comportements abusifs
                  </span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-700">
                    Communication avec les utilisateurs
                  </span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-700">
                    Respect de nos obligations légales et réponse aux
                    réquisitions des autorités
                  </span>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                4. Base légale du traitement
              </h2>
              <p className="text-gray-600 mb-4">
                Chaque traitement repose sur l&apos;une des bases légales
                suivantes, selon la finalité concernée :
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Exécution du contrat</strong> — création de
                    compte, fonctionnement du Service, mise en relation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Consentement de l&apos;utilisateur</strong> —
                    géolocalisation, notifications, fonctionnalités
                    optionnelles
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Intérêt légitime de l&apos;éditeur</strong> —
                    sécurité de la plateforme, prévention de la fraude,
                    amélioration du service, statistiques agrégées
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    <strong>Obligation légale</strong> — réponse aux
                    réquisitions des autorités, lutte contre l&apos;exploitation
                    des mineurs, obligations comptables
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                5. Partage des données
              </h2>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-800 font-semibold">
                  Les données personnelles ne sont ni vendues, ni louées.
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                Elles peuvent être partagées, dans la stricte mesure
                nécessaire, avec :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Nos prestataires techniques (hébergement, infrastructure
                    cloud, messagerie, notifications push, gestion des
                    abonnements)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Les plateformes de paiement (Apple, Google) pour le
                    traitement des transactions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Les autorités compétentes, sur réquisition légale ou en
                    cas de signalement lié à la sécurité des mineurs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Tout partenaire strictement nécessaire au fonctionnement
                    de l&apos;Application
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Tous nos prestataires sont liés par des obligations
                contractuelles de confidentialité et de sécurité.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                6. Transferts internationaux
              </h2>
              <p className="text-gray-600 mb-4">
                Les données peuvent être hébergées :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">À Madagascar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Ou sur des serveurs situés à l&apos;étranger (ex. Europe,
                    Afrique, cloud international)
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                Lorsqu&apos;un transfert intervient vers un pays ne
                bénéficiant pas d&apos;une reconnaissance d&apos;adéquation,
                TIA veille à ce que des garanties appropriées soient mises en
                œuvre par ses prestataires (clauses contractuelles types ou
                mécanisme équivalent).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                7. Durée de conservation
              </h2>
              <p className="text-gray-600 mb-4">
                Les données personnelles sont conservées tant que le compte
                utilisateur est actif. En cas de suppression du compte ou de
                demande de suppression, les données sont supprimées ou
                anonymisées dans un délai maximum de trente (30) jours, sous
                réserve des données devant être conservées au-delà pour :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Répondre à une obligation légale ou comptable
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Assurer la preuve d&apos;un droit ou d&apos;un contrat,
                    dans les limites de la prescription applicable
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Les besoins d&apos;une procédure de modération ou de
                    coopération avec les autorités, notamment en matière de
                    protection des mineurs, pendant la durée strictement
                    nécessaire
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Les comptes inactifs depuis plus de trente (30) jours (offre
                gratuite) peuvent être suspendus ou supprimés conformément aux
                CGU.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                8. Droits des utilisateurs
              </h2>
              <p className="text-gray-600 mb-4">
                Conformément à la réglementation applicable, chaque
                utilisateur dispose des droits suivants :
              </p>
              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">
                      Droit d&apos;accès à ses données
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">
                      Droit de rectification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">
                      Droit de suppression (&quot;droit à l&apos;oubli&quot;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">
                      Droit d&apos;opposition au traitement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">
                      Droit à la limitation du traitement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700 font-medium">
                      Droit à la portabilité des données fournies
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-600">
                Ces droits peuvent être exercés en écrivant à{" "}
                <a
                  href="mailto:info@tia-meet.com"
                  className="text-primary hover:underline font-medium"
                >
                  info@tia-meet.com
                </a>
                . Les résidents de l&apos;Union Européenne disposent en outre
                du droit d&apos;introduire une réclamation auprès de
                l&apos;autorité de contrôle compétente de leur pays de
                résidence (par exemple la CNIL en France).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                9. Sécurité des données
              </h2>
              <p className="text-gray-600 mb-4">
                Nous mettons en œuvre des mesures techniques et
                organisationnelles raisonnables pour protéger les données
                personnelles, notamment :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">🔒</span>
                  <span className="text-gray-700">
                    Chiffrement des données sensibles
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">🔒</span>
                  <span className="text-gray-700">
                    Accès restreint aux données
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">🔒</span>
                  <span className="text-gray-700">
                    Surveillance et prévention des accès non autorisés
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm italic mb-2">
                Malgré ces mesures, aucun système n&apos;est totalement
                sécurisé et TIA ne peut garantir une sécurité absolue.
              </p>
              <p className="text-gray-600 text-sm italic">
                En cas de violation de données susceptible d&apos;engendrer un
                risque pour les droits et libertés des personnes concernées,
                TIA en informera les personnes concernées et, le cas échéant,
                les autorités compétentes, dans les meilleurs délais et
                conformément à la réglementation applicable.
              </p>
            </section>

            <section id="delete-data" className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                10. Suppression des données utilisateur
              </h2>
              <p className="text-gray-600 mb-4">
                Les utilisateur(ice)s peuvent demander la suppression de leurs
                données personnelles à tout moment.
              </p>
              <p className="text-gray-600 mb-4">
                Pour effectuer une demande, veuillez nous contacter à
                l&apos;adresse suivante :
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 flex items-center gap-2">
                  <span>📧</span>
                  <a
                    href="mailto:info@tia-meet.com"
                    className="text-primary hover:underline font-medium"
                  >
                    info@tia-meet.com
                  </a>
                </p>
                <p className="text-gray-600 text-sm mt-2 italic">
                  (en précisant l&apos;e-mail utilisé dans l&apos;application et
                  l&apos;objet &quot;Demande de suppression de données&quot;)
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    La suppression des données sera effectuée dans un délai
                    maximum de 30 jours.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Certaines données peuvent être conservées au-delà de ce
                    délai lorsque la loi l&apos;exige (voir article 7).
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                11. Protection des mineurs
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-yellow-800 font-semibold">
                  L&apos;Application est strictement réservée aux personnes
                  âgées de 18 ans et plus.
                </p>
              </div>
              <p className="text-gray-600">
                Aucune donnée de mineur n&apos;est collectée intentionnellement.
                Si TIA découvre qu&apos;un compte a été créé par ou concerne
                une personne mineure, ce compte est immédiatement suspendu et
                les données associées supprimées, sous réserve de la
                conservation des éléments nécessaires à un signalement aux
                autorités compétentes, conformément à la{" "}
                <Link href="/child-safety" className="text-primary hover:underline font-medium">
                  Politique de Protection des Mineurs
                </Link>{" "}
                de TIA.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                12. Cookies et technologies similaires
              </h2>
              <p className="text-gray-600 mb-4">
                L&apos;Application peut utiliser des cookies ou technologies
                similaires, répartis en trois catégories :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Cookies strictement nécessaires au fonctionnement
                    (authentification, sécurité)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Cookies de mesure d&apos;audience
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Le cas échéant, cookies de personnalisation
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                Les cookies non strictement nécessaires ne sont déposés
                qu&apos;avec le consentement de l&apos;utilisateur, lequel
                peut être retiré à tout moment via les paramètres de son
                appareil ou de l&apos;Application.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                13. Traitements automatisés et intelligence artificielle
              </h2>
              <p className="text-gray-600">
                TIA utilise des traitements algorithmiques et des
                fonctionnalités d&apos;intelligence artificielle pour proposer
                des suggestions de mise en relation et améliorer
                l&apos;expérience utilisateur. Ces traitements ne produisent
                pas de décision entièrement automatisée ayant des effets
                juridiques ou significatifs similaires sur
                l&apos;Utilisateur, qui peut à tout moment demander des
                informations sur leur logique en écrivant à{" "}
                <a
                  href="mailto:info@tia-meet.com"
                  className="text-primary hover:underline font-medium"
                >
                  info@tia-meet.com
                </a>
                .
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                14. Modification de la politique
              </h2>
              <p className="text-gray-600 mb-4">
                Cette Politique de Confidentialité peut être mise à jour à tout
                moment.
              </p>
              <p className="text-gray-600">
                Toute modification substantielle sera notifiée aux
                utilisateurs via l&apos;Application ou par email, avant son
                entrée en vigueur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                15. Contact et réclamations
              </h2>
              <p className="text-gray-600 mb-6">
                Pour toute question ou réclamation relative à cette Politique
                de Confidentialité, vous pouvez nous contacter à :
              </p>
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
                    Email de contact
                  </p>
                  <a
                    href="mailto:info@tia-meet.com"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    info@tia-meet.com
                  </a>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4 italic">
                Les résidents de l&apos;Union Européenne peuvent également
                saisir l&apos;autorité de contrôle compétente de leur pays de
                résidence.
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
