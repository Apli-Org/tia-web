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
              <span>Dernière mise à jour : 23/12/2025</span>
            </div>
          </div>

          <article className="px-8 py-10 prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <p className="text-gray-700 leading-relaxed mb-0">
                La présente Politique de Confidentialité décrit la manière dont
                TIA collecte, utilise, stocke et protège les données
                personnelles de ses utilisateurs.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-10">
              En utilisant l&apos;Application, vous acceptez les pratiques
              décrites dans cette politique.
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
                  <strong>Nom de la société / Éditeur :</strong> APli SALU
                </p>
                <p className="text-gray-700">
                  <strong>Adresse :</strong> LOGT 51 CITE Ampefiloha
                  Antananarivo Madagascar
                </p>
                <p className="text-gray-700">
                  <strong>Email de contact :</strong>{" "}
                  <a
                    href="mailto:ali@tia-meet.com"
                    className="text-primary hover:underline"
                  >
                    ali@tia-meet.com
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
                    Mise en relation entre utilisateurs
                  </span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-700">
                    Amélioration de l&apos;expérience utilisateur
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
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                4. Base légale du traitement
              </h2>
              <p className="text-gray-600 mb-4">
                Les traitements de données reposent sur :
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Le consentement de l&apos;utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    L&apos;exécution du contrat (fourniture du service)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    L&apos;intérêt légitime de l&apos;éditeur (sécurité,
                    amélioration du service)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Les obligations légales applicables à Madagascar
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
                  Les données personnelles ne sont pas vendues.
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                Elles peuvent être partagées uniquement avec :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Des prestataires techniques (hébergement, maintenance,
                    messagerie)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Des autorités compétentes, si la loi l&apos;exige
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Des partenaires strictement nécessaires au fonctionnement de
                    l&apos;Application
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Tous les partenaires sont soumis à des obligations de
                confidentialité.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                6. Hébergement et transfert des données
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
                Dans ce cas, des mesures sont prises pour garantir un niveau de
                protection adéquat des données.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                7. Durée de conservation
              </h2>
              <p className="text-gray-600 mb-4">
                Les données personnelles sont conservées :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Tant que le compte utilisateur est actif
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Jusqu&apos;à la suppression du compte par l&apos;utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Ou conformément aux obligations légales en vigueur
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm italic">
                Les comptes inactifs peuvent être supprimés après une période
                prolongée d&apos;inactivité.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                8. Droits des utilisateurs
              </h2>
              <p className="text-gray-600 mb-4">
                Conformément aux principes de protection des données, chaque
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
                </ul>
              </div>
              <p className="text-gray-600">
                Les demandes peuvent être adressées à :{" "}
                <a
                  href="mailto:ali@tia-meet.com"
                  className="text-primary hover:underline font-medium"
                >
                  ali@tia-meet.com
                </a>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                9. Sécurité des données
              </h2>
              <p className="text-gray-600 mb-4">
                Nous mettons en œuvre des mesures techniques et
                organisationnelles pour protéger les données personnelles,
                notamment :
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
              <p className="text-gray-600 text-sm italic">
                Malgré ces mesures, aucun système n&apos;est totalement
                sécurisé.
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
                    href="mailto:ali@tia-meet.com"
                    className="text-primary hover:underline font-medium"
                  >
                    ali@tia-meet.com
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
                    Certaines données peuvent être conservées temporairement si
                    la loi l&apos;exige.
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
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                12. Cookies et technologies similaires
              </h2>
              <p className="text-gray-600 mb-4">
                L&apos;Application peut utiliser des cookies ou technologies
                similaires pour :
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">Améliorer la navigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Analyser l&apos;utilisation de l&apos;Application
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">
                    Personnaliser l&apos;expérience utilisateur
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                L&apos;utilisateur peut gérer ses préférences via les paramètres
                de son appareil.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                13. Modification de la politique
              </h2>
              <p className="text-gray-600 mb-4">
                Cette Politique de Confidentialité peut être mise à jour à tout
                moment.
              </p>
              <p className="text-gray-600">
                Toute modification importante sera notifiée aux utilisateurs via
                l&apos;Application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary/20">
                14. Contact
              </h2>
              <p className="text-gray-600 mb-6">
                Pour toute question concernant cette Politique de
                Confidentialité, vous pouvez nous contacter à :
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
                    href="mailto:ali@tia-meet.com"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    ali@tia-meet.com
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

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <PrivacyContent />
    </Suspense>
  );
}
