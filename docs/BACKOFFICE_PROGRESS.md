# TIA Back Office - Progression du Développement

**Dernière mise à jour :** 31 décembre 2025
**Version :** 1.6.0
**Statut global :** Phase 9 terminée ✅

---

## 📊 Vue d'ensemble

Ce document suit la progression du développement du back office TIA selon les phases définies dans [SPEC_LANDING_BACKOFFICE.md](./SPEC_LANDING_BACKOFFICE.md).

### Progression globale : 82% (9/11 phases)

```
Phase 1:  ████████████████████ 100% ✅ Base de données
Phase 2:  ████████████████████ 100% ✅ Authentification Admin
Phase 3:  ████████████████████ 100% ✅ Layout & Navigation
Phase 4:  ████████████████████ 100% ✅ Dashboard avec données réelles
Phase 5:  ████████████████████ 100% ✅ Gestion Utilisateurs
Phase 6:  ████████████████████ 100% ✅ Gestion des Prix (Abonnements & Microtransactions)
Phase 7:  ████████████████████ 100% ✅ Gestion du Personnel (Rôles & Permissions)
Phase 8:  ████████████████████ 100% ✅ Système de Modération
Phase 9:  ████████████████████ 100% ✅ Support & Paramètres
Phase 10: ░░░░░░░░░░░░░░░░░░░░   0% ⏳ Analytics & Export
Phase 11: ░░░░░░░░░░░░░░░░░░░░   0% ⏳ Tests & Optimisation
```

---

## ✅ Phase 1 : Base de Données (TERMINÉE)

**Date de début :** 29 décembre 2025
**Date de fin :** 29 décembre 2025
**Statut :** ✅ Complétée

### Migrations créées

| Table                   | Fichier            | Statut | Description                            |
| ----------------------- | ------------------ | ------ | -------------------------------------- |
| `admin_users`           | Migration Supabase | ✅     | Gestion des administrateurs avec rôles |
| `admin_activity_logs`   | Migration Supabase | ✅     | Journal d'audit immutable              |
| `support_tickets`       | Migration Supabase | ✅     | Système de tickets de support          |
| `ticket_messages`       | Migration Supabase | ✅     | Messages des tickets                   |
| `verification_requests` | Migration Supabase | ✅     | Demandes de vérification CIN           |
| `reported_content`      | Migration Supabase | ✅     | Signalements de contenu                |

### Fonctionnalités implémentées

- ✅ Row Level Security (RLS) sur toutes les tables
- ✅ Triggers automatiques (vérification, modération)
- ✅ Indexes optimisés pour les requêtes
- ✅ Foreign Keys avec CASCADE appropriés
- ✅ Types TypeScript générés dans `lib/database.types.ts`

### Seed Data

- ✅ Admin super_admin créé : `admin@tia.app` (ID: `172c82e4-f915-4f76-802b-2032e26db300`)

### Fichiers créés

- `lib/database.types.ts` - Types TypeScript auto-générés

---

## ✅ Phase 2 : Authentification Admin (TERMINÉE)

**Date de début :** 29 décembre 2025
**Date de fin :** 29 décembre 2025
**Statut :** ✅ Complétée

### Composants créés

| Fichier                                | Type             | Description                                |
| -------------------------------------- | ---------------- | ------------------------------------------ |
| `actions/admin/auth.ts`                | Server Action    | Actions d'authentification (login, logout) |
| `lib/auth/roles.ts`                    | Utility          | Helpers pour vérification des rôles admin  |
| `components/backoffice/login-form.tsx` | Client Component | Formulaire de connexion avec validation    |
| `app/(backoffice)/login/page.tsx`      | Server Component | Page de login (SSR)                        |

### Fonctionnalités implémentées

- ✅ Login admin avec email/password
- ✅ Vérification du rôle admin dans la base
- ✅ Redirection automatique si non-admin
- ✅ Tracking de `last_login` dans `admin_users`
- ✅ Logging des connexions dans `admin_activity_logs`
- ✅ Logout avec journalisation
- ✅ États de chargement et gestion d'erreurs
- ✅ Middleware mis à jour pour vérifier les rôles admin

### Sécurité

- ✅ Session JWT via Supabase Auth
- ✅ Vérification du statut `is_active`
- ✅ Déconnexion forcée si non-admin
- ✅ Protection des routes `/dashboard/*`, `/users/*`, `/moderation/*`, etc.
- ✅ Redirection automatique vers `/dashboard` si déjà connecté

### Architecture

- ✅ **Pattern SSR/Client Component** : Pages en SSR, formulaires en Client Components
- ✅ **Actions structurées** : `actions/admin/` au lieu de `app/actions/`
- ✅ **Séparation des responsabilités** : auth.ts (actions), roles.ts (utilities)

---

## ✅ Phase 3 : Layout & Navigation (TERMINÉE)

**Date de début :** 30 décembre 2025
**Date de fin :** 30 décembre 2025
**Statut :** ✅ Complétée

### Composants créés

| Fichier                                 | Type             | Description                       |
| --------------------------------------- | ---------------- | --------------------------------- |
| `components/backoffice/app-sidebar.tsx` | Client Component | Sidebar avec navigation et logout |
| `components/ui/sidebar.tsx`             | UI Component     | Composant sidebar shadcn/ui       |
| `app/(backoffice)/(app)/layout.tsx`     | Server Component | Layout avec SidebarProvider       |

### Fonctionnalités implémentées

- ✅ Sidebar collapsible avec icônes
- ✅ Navigation: Dashboard, Utilisateurs, Modération, Abonnements
- ✅ Footer avec avatar et dropdown (Paramètres, Déconnexion)
- ✅ Active state sur les liens de navigation
- ✅ Logo TIA dans le header
- ✅ Responsive (sidebar collapsible sur mobile)

---

## ✅ Phase 4 : Dashboard avec Données Réelles (TERMINÉE)

**Date de début :** 30 décembre 2025
**Date de fin :** 30 décembre 2025
**Statut :** ✅ Complétée

### Fichiers créés/modifiés

| Fichier                                                 | Type             | Description                        |
| ------------------------------------------------------- | ---------------- | ---------------------------------- |
| `actions/admin/dashboard.action.ts`                     | Server Action    | Requêtes KPIs depuis Supabase      |
| `app/(backoffice)/(app)/dashboard/page.tsx`             | Server Component | Page dashboard avec vraies données |
| `app/(backoffice)/(app)/dashboard/dashboard-charts.tsx` | Client Component | Graphiques Recharts                |

### Fonctionnalités implémentées

- ✅ KPI: Utilisateurs actifs (total + évolution vs mois dernier)
- ✅ KPI: Matchs du jour (count + évolution vs hier)
- ✅ KPI: Revenus du mois en MGA (MRR + évolution)
- ✅ KPI: Signalements en attente
- ✅ Graphique: Croissance utilisateurs sur 6 mois
- ✅ Graphique: Matchs par mois
- ✅ Tableau: Activité récente (signalements, abonnements, inscriptions)
- ✅ Loading skeletons avec Suspense
- ✅ Format monétaire MGA

### Requêtes Supabase

- `getDashboardKPIs()` - Récupère les 4 KPIs principaux
- `getGrowthData()` - Données graphique croissance (6 mois)
- `getRecentActivity()` - 5 dernières actions (signalements, abonnements, inscriptions)
- `getTierDistribution()` - Répartition des tiers (Base/Silver/Gold/Elite)

---

## ✅ Phase 5 : Gestion Utilisateurs (TERMINÉE)

**Date de début :** 30 décembre 2025
**Date de fin :** 30 décembre 2025
**Statut :** ✅ Complétée

### Fichiers créés

| Fichier                                              | Type             | Description                       |
| ---------------------------------------------------- | ---------------- | --------------------------------- |
| `actions/admin/users.action.ts`                      | Server Action    | CRUD utilisateurs + export CSV    |
| `app/(backoffice)/(app)/users/page.tsx`              | Server Component | Page liste avec stats             |
| `app/(backoffice)/(app)/users/users-table.tsx`       | Server Component | Tableau paginé                    |
| `app/(backoffice)/(app)/users/users-filters.tsx`     | Client Component | Filtres et recherche (sticky)     |
| `app/(backoffice)/(app)/users/user-actions.tsx`      | Client Component | Menu actions (bannir, supprimer)  |
| `app/(backoffice)/(app)/users/user-detail-modal.tsx` | Client Component | Modal détail utilisateur          |
| `app/(backoffice)/(app)/users/pagination.tsx`        | Client Component | Pagination avec loading spinner   |
| `app/(backoffice)/(app)/users/loading.tsx`           | Loading UI       | Skeleton animé pendant chargement |
| `components/backoffice/page-transition.tsx`          | Client Component | Transitions fluides entre pages   |

### Fonctionnalités implémentées

- ✅ Liste des utilisateurs avec tableau paginé (20/page)
- ✅ Stats: Total, Actifs, Premium, Bannis
- ✅ Filtres: Tier, Statut, Vérification, Genre
- ✅ Recherche par nom ou email
- ✅ Modal détail utilisateur avec onglets (Info, Photos, Abonnement)
- ✅ Actions: Bannir (durée + raison), Débannir, Supprimer
- ✅ Export CSV avec filtres appliqués
- ✅ Pagination avec navigation

### UX/UI Améliorations

- ✅ Transitions fluides entre pages (Framer Motion)
- ✅ Loading skeleton pendant le chargement
- ✅ Spinner sur boutons pendant les actions
- ✅ Filtres sticky (restent visibles au scroll)
- ✅ Scroll automatique en haut lors de navigation/filtrage
- ✅ Tous les contrôles désactivés pendant le chargement

### Server Actions

- `getUsers()` - Liste paginée avec filtres
- `getUserById()` - Détail utilisateur + abonnement
- `getUserStats()` - Statistiques globales
- `banUser()` - Bannir avec durée et raison
- `unbanUser()` - Débannir
- `deleteUser()` - Soft delete (30 jours)
- `exportUsersCSV()` - Export CSV

---

## ✅ Phase 6 : Gestion des Prix (TERMINÉE)

**Date de début :** 30 décembre 2025
**Date de fin :** 30 décembre 2025
**Statut :** ✅ Complétée

### Migrations créées

| Table             | Description                                  |
| ----------------- | -------------------------------------------- |
| `pricing_config`  | Configuration des prix (abonnements + micro) |
| `pricing_history` | Historique immutable des changements de prix |

### Fichiers créés

| Fichier                                                              | Type             | Description                  |
| -------------------------------------------------------------------- | ---------------- | ---------------------------- |
| `actions/admin/pricing.action.ts`                                    | Server Action    | CRUD prix + historique       |
| `app/(backoffice)/(app)/pricing/page.tsx`                            | Server Component | Page principale tarification |
| `app/(backoffice)/(app)/pricing/subscriptions/page.tsx`              | Server Component | Liste abonnements            |
| `app/(backoffice)/(app)/pricing/subscriptions/subscription-grid.tsx` | Client Component | Grille tarifs par tier       |
| `app/(backoffice)/(app)/pricing/consumables/page.tsx`                | Server Component | Liste microtransactions      |
| `app/(backoffice)/(app)/pricing/consumables/consumable-grid.tsx`     | Client Component | Grille produits consommables |
| `app/(backoffice)/(app)/pricing/history/page.tsx`                    | Server Component | Historique des modifications |
| `app/(backoffice)/(app)/pricing/pricing-edit-modal.tsx`              | Client Component | Modal édition de prix        |

### Fonctionnalités implémentées

- ✅ Dashboard prix avec stats (revenus 30j, produits actifs/inactifs)
- ✅ Gestion abonnements Silver/Gold/Elite (mensuel, trimestriel, annuel)
- ✅ Gestion microtransactions (TIA Hearts, Boosts, Révélations)
- ✅ Modification des prix avec modal
- ✅ Activation/désactivation des offres (switch)
- ✅ Affichage des réductions (prix barré + pourcentage)
- ✅ Badge "Populaire" pour les offres mises en avant
- ✅ Historique des modifications avec audit trail
- ✅ Navigation avec breadcrumbs

### Server Actions

- `getSubscriptionPricing()` - Liste tarifs abonnements
- `getConsumablePricing()` - Liste tarifs microtransactions
- `getPricingById()` - Détail d'un tarif
- `updatePricing()` - Modifier un tarif (avec historique)
- `createPricing()` - Créer un nouveau tarif
- `togglePricingStatus()` - Activer/désactiver
- `deletePricing()` - Soft delete
- `getPricingHistory()` - Historique d'un tarif
- `getAllPricingHistory()` - Historique global paginé
- `getPricingStats()` - Statistiques revenus

---

## ✅ Phase 7 : Gestion du Personnel et Permissions (TERMINÉE)

**Date de début :** 31 décembre 2025
**Date de fin :** 31 décembre 2025
**Statut :** ✅ Complétée

### Migrations créées

| Table                | Description                                  |
| -------------------- | -------------------------------------------- |
| `admin_roles`        | Rôles dynamiques avec code, nom, description |
| `admin_actions`      | Actions/permissions disponibles              |
| `admin_role_actions` | Table de jonction rôle-action                |

### Fichiers créés

| Fichier                                                     | Type             | Description                       |
| ----------------------------------------------------------- | ---------------- | --------------------------------- |
| `actions/admin/roles.action.ts`                             | Server Action    | CRUD rôles + vérification actions |
| `app/(backoffice)/(app)/staff/page.tsx`                     | Server Component | Page liste personnel              |
| `app/(backoffice)/(app)/staff/staff-table.tsx`              | Server Component | Tableau personnel                 |
| `app/(backoffice)/(app)/staff/staff-filters.tsx`            | Client Component | Filtres dynamiques                |
| `app/(backoffice)/(app)/staff/staff-actions.tsx`            | Client Component | Menu actions personnel            |
| `app/(backoffice)/(app)/staff/create-staff-button.tsx`      | Client Component | Création nouveau membre           |
| `app/(backoffice)/(app)/staff/edit-staff-modal.tsx`         | Client Component | Modification membre               |
| `app/(backoffice)/(app)/staff/reset-password-modal.tsx`     | Client Component | Réinitialisation mot de passe     |
| `app/(backoffice)/(app)/staff/roles/page.tsx`               | Server Component | Page gestion des rôles            |
| `app/(backoffice)/(app)/staff/roles/roles-table.tsx`        | Server Component | Tableau des rôles                 |
| `app/(backoffice)/(app)/staff/roles/role-row.tsx`           | Client Component | Ligne rôle interactive            |
| `app/(backoffice)/(app)/staff/roles/create-role-button.tsx` | Client Component | Création nouveau rôle             |
| `app/(backoffice)/(app)/staff/roles/edit-role-modal.tsx`    | Client Component | Édition rôle + permissions        |

### Fonctionnalités implémentées

- ✅ **Système de permissions par actions** (vs rôles statiques)
- ✅ Liste du personnel avec stats (total, actifs, par rôle)
- ✅ Filtres dynamiques par rôle et statut
- ✅ Création de nouveaux membres du personnel
- ✅ Modification des informations et rôle
- ✅ Activation/désactivation des comptes
- ✅ Réinitialisation de mot de passe
- ✅ Page gestion des rôles (`/staff/roles`)
- ✅ CRUD rôles (créer, modifier, supprimer)
- ✅ Attribution des actions aux rôles (checkboxes par catégorie)
- ✅ Protection des rôles système (super_admin non supprimable)
- ✅ Sidebar basée sur actions (pas sur rôles)

### Architecture des permissions

**Modèle de données :**

- `admin_roles` : Rôles dynamiques (super_admin est système)
- `admin_actions` : 17 actions prédéfinies par catégorie
- `admin_role_actions` : Table de jonction pour assigner actions aux rôles

**Catégories d'actions :**
| Catégorie | Actions |
| ------------ | ---------------------------------------------------- |
| Dashboard | `view_dashboard` |
| Users | `view_users`, `manage_users`, `ban_users`, `delete_users` |
| Staff | `view_staff`, `manage_staff`, `reset_passwords` |
| Roles | `manage_roles` |
| Moderation | `view_reports`, `moderate_content` |
| Pricing | `view_pricing`, `manage_pricing` |
| Support | `view_tickets`, `manage_tickets` |
| Analytics | `view_analytics`, `export_data` |

### Server Actions

- `getAllRoles()` - Liste tous les rôles avec nombre de membres
- `getRoleWithActions()` - Détail d'un rôle avec ses actions
- `createRole()` - Créer un nouveau rôle avec actions
- `updateRole()` - Modifier rôle et ses actions
- `deleteRole()` - Supprimer rôle (si non-système et sans membres)
- `checkAdminAction()` - Vérifier si un admin a une action
- `getAdminActions()` - Liste des actions d'un admin
- `getStaffMembers()` - Liste personnel avec filtres
- `createStaffMember()` - Créer compte personnel
- `updateStaffMember()` - Modifier membre
- `toggleStaffStatus()` - Activer/désactiver
- `resetStaffPassword()` - Réinitialiser mot de passe

---

## ✅ Phase 8 : Système de Modération (TERMINÉE)

**Date de début :** 31 décembre 2025
**Date de fin :** 31 décembre 2025
**Statut :** ✅ Complétée

### Fichiers créés

| Fichier                                                                     | Type             | Description                    |
| --------------------------------------------------------------------------- | ---------------- | ------------------------------ |
| `actions/admin/moderation-types.ts`                                         | Types            | Types partagés pour modération |
| `actions/admin/verifications.action.ts`                                     | Server Action    | CRUD vérifications CIN         |
| `actions/admin/reports.action.ts`                                           | Server Action    | CRUD signalements              |
| `app/(backoffice)/(app)/moderation/page.tsx`                                | Server Component | Dashboard modération           |
| `app/(backoffice)/(app)/moderation/loading.tsx`                             | Loading UI       | Skeleton chargement            |
| `app/(backoffice)/(app)/moderation/verifications/page.tsx`                  | Server Component | Liste vérifications CIN        |
| `app/(backoffice)/(app)/moderation/verifications/verifications-table.tsx`   | Server Component | Tableau vérifications          |
| `app/(backoffice)/(app)/moderation/verifications/verifications-filters.tsx` | Client Component | Filtres vérifications          |
| `app/(backoffice)/(app)/moderation/verifications/verification-actions.tsx`  | Client Component | Actions vérification           |
| `app/(backoffice)/(app)/moderation/verifications/pagination.tsx`            | Client Component | Pagination                     |
| `app/(backoffice)/(app)/moderation/photos/page.tsx`                         | Server Component | Liste photos signalées         |
| `app/(backoffice)/(app)/moderation/photos/photos-table.tsx`                 | Server Component | Grille photos                  |
| `app/(backoffice)/(app)/moderation/messages/page.tsx`                       | Server Component | Liste messages signalés        |
| `app/(backoffice)/(app)/moderation/messages/messages-table.tsx`             | Server Component | Tableau messages               |
| `app/(backoffice)/(app)/moderation/profiles/page.tsx`                       | Server Component | Liste profils signalés         |
| `app/(backoffice)/(app)/moderation/profiles/profiles-table.tsx`             | Server Component | Tableau profils                |
| `app/(backoffice)/(app)/moderation/_components/report-actions.tsx`          | Client Component | Menu actions signalement       |
| `app/(backoffice)/(app)/moderation/_components/reports-filters.tsx`         | Client Component | Filtres partagés               |
| `app/(backoffice)/(app)/moderation/_components/reports-pagination.tsx`      | Client Component | Pagination partagée            |

### Fonctionnalités implémentées

- ✅ **Dashboard modération** avec stats globales (vérifications, photos, messages, profils)
- ✅ **Vérifications CIN** (`/moderation/verifications`)
  - Liste paginée avec filtres par statut
  - Stats: En attente, Approuvées, Rejetées, Total
  - Actions: Approuver, Rejeter avec raison
  - Aperçu photo CIN sans floutage
- ✅ **Photos signalées** (`/moderation/photos`)
  - Grille de photos avec aperçu direct
  - Stats: En attente, Supprimées, Avertis, Bannis
  - Filtres par statut et raison
  - Actions: Approuver, Supprimer, Avertir, Bannir
- ✅ **Messages signalés** (`/moderation/messages`)
  - Liste avec contenu du message
  - Stats: En attente, Supprimés, Avertis, Bannis
  - Filtres par statut et raison
- ✅ **Profils signalés** (`/moderation/profiles`)
  - Liste avec avatar et infos utilisateur
  - Stats: En attente, Supprimés, Avertis, Bannis
  - Filtres par statut et raison
- ✅ **Bouton retour** sur chaque sous-page
- ✅ **Permissions** vérifiées (`view_reports`, `moderate_content`)

### Types de signalement

| Type    | Raisons disponibles                                    |
| ------- | ------------------------------------------------------ |
| Profile | Faux profil, Spam, Harcèlement, Contenu haineux, Autre |
| Photo   | Nudité, Violence, Mineur, Faux profil, Autre           |
| Message | Harcèlement, Spam, Violence, Contenu haineux, Autre    |

### Actions de modération

| Action    | Description                               |
| --------- | ----------------------------------------- |
| Approuver | Marquer comme faux signalement            |
| Supprimer | Supprimer le contenu signalé              |
| Avertir   | Envoyer un avertissement à l'utilisateur  |
| Bannir    | Bannir l'utilisateur (durée configurable) |

### Server Actions

**Vérifications (`verifications.action.ts`) :**

- `getVerificationStats()` - Stats par statut
- `getVerificationRequests()` - Liste paginée avec filtres
- `getVerificationById()` - Détail vérification
- `approveVerification()` - Approuver + marquer user vérifié
- `rejectVerification()` - Rejeter avec raison

**Signalements (`reports.action.ts`) :**

- `getModerationStats()` - Stats globales dashboard
- `getReportedContent()` - Liste paginée tous types
- `getReportsByType()` - Liste par type de contenu
- `getReportById()` - Détail signalement
- `reviewReport()` - Traiter avec action
- `getReportStats()` - Stats par type

---

## ✅ Phase 9 : Support & Paramètres (TERMINÉE)

**Date de début :** 31 décembre 2025
**Date de fin :** 31 décembre 2025
**Statut :** ✅ Complétée

### Fichiers créés

| Fichier                                                                | Type             | Description                     |
| ---------------------------------------------------------------------- | ---------------- | ------------------------------- |
| `actions/admin/support/types.ts`                                       | Types            | Types tickets et messages       |
| `actions/admin/support/stats.action.ts`                                | Server Action    | Statistiques support            |
| `actions/admin/support/tickets.action.ts`                              | Server Action    | CRUD tickets                    |
| `actions/admin/support/messages.action.ts`                             | Server Action    | Gestion messages                |
| `actions/admin/support/index.ts`                                       | Barrel Export    | Export centralisé               |
| `actions/admin/settings/types.ts`                                      | Types            | Types logs d'activité           |
| `actions/admin/settings/logs.action.ts`                                | Server Action    | CRUD logs                       |
| `actions/admin/settings/index.ts`                                      | Barrel Export    | Export centralisé               |
| `app/(backoffice)/(app)/support/page.tsx`                              | Server Component | Dashboard support               |
| `app/(backoffice)/(app)/support/loading.tsx`                           | Loading UI       | Skeleton chargement             |
| `app/(backoffice)/(app)/support/tickets/page.tsx`                      | Server Component | Liste tickets                   |
| `app/(backoffice)/(app)/support/tickets/tickets-table.tsx`             | Server Component | Tableau tickets                 |
| `app/(backoffice)/(app)/support/tickets/tickets-filters.tsx`           | Client Component | Filtres tickets                 |
| `app/(backoffice)/(app)/support/tickets/ticket-actions.tsx`            | Client Component | Menu actions                    |
| `app/(backoffice)/(app)/support/tickets/pagination.tsx`                | Client Component | Pagination                      |
| `app/(backoffice)/(app)/support/tickets/[id]/page.tsx`                 | Server Component | Détail ticket                   |
| `app/(backoffice)/(app)/support/tickets/[id]/ticket-header.tsx`        | Client Component | En-tête avec actions            |
| `app/(backoffice)/(app)/support/tickets/[id]/ticket-conversation.tsx`  | Client Component | Conversation chat               |
| `app/(backoffice)/(app)/settings/page.tsx`                             | Server Component | Hub paramètres                  |
| `app/(backoffice)/(app)/settings/loading.tsx`                          | Loading UI       | Skeleton chargement             |
| `app/(backoffice)/(app)/settings/logs/page.tsx`                        | Server Component | Journal d'activité              |
| `app/(backoffice)/(app)/settings/logs/logs-table.tsx`                  | Server Component | Tableau logs                    |
| `app/(backoffice)/(app)/settings/logs/logs-filters.tsx`                | Client Component | Filtres logs                    |
| `app/(backoffice)/(app)/settings/logs/pagination.tsx`                  | Client Component | Pagination                      |

### Fonctionnalités implémentées

- ✅ **Dashboard Support** (`/support`)
  - Stats: Tickets en attente, en cours, résolus, non assignés
  - Temps moyen de résolution
  - Liens rapides vers les vues filtrées
- ✅ **Liste des tickets** (`/support/tickets`)
  - Tableau paginé avec filtres (statut, priorité, catégorie, assignation)
  - Recherche par sujet ou email
  - Actions rapides: Assigner, changer statut/priorité
- ✅ **Détail ticket** (`/support/tickets/[id]`)
  - Affichage conversation style chat
  - Modification statut, priorité, assignation
  - Envoi de réponses (admin ou système)
- ✅ **Hub Paramètres** (`/settings`)
  - Résumé activité (aujourd'hui, semaine, total)
  - Liens vers les sections
- ✅ **Journal d'activité** (`/settings/logs`)
  - Liste paginée avec filtres (admin, action, dates)
  - Recherche textuelle
  - Labels lisibles pour les actions
- ✅ **Navigation mise à jour**
  - Support ajouté à la sidebar (action: `view_tickets`)
  - Paramètres accessible via dropdown utilisateur

### Architecture des actions (Split)

Les actions sont organisées en modules séparés pour plus de clarté:

```
actions/admin/
├── support/
│   ├── types.ts          # Types partagés
│   ├── stats.action.ts   # getSupportStats()
│   ├── tickets.action.ts # CRUD tickets
│   ├── messages.action.ts # CRUD messages
│   └── index.ts          # Barrel export
└── settings/
    ├── types.ts          # Types + actionLabels
    ├── logs.action.ts    # CRUD logs
    └── index.ts          # Barrel export
```

### Server Actions - Support

- `getSupportStats()` - Statistiques globales
- `getTickets()` - Liste paginée avec filtres
- `getTicketById()` - Détail d'un ticket
- `updateTicketStatus()` - Changer statut
- `updateTicketPriority()` - Changer priorité
- `assignTicket()` - Assigner à un admin
- `getTicketMessages()` - Messages d'un ticket
- `addTicketMessage()` - Ajouter une réponse
- `getAssignableAdmins()` - Admins disponibles

### Server Actions - Settings

- `getActivityStats()` - Stats globales logs
- `getActivityLogs()` - Liste paginée avec filtres
- `getAdminsForFilter()` - Admins pour filtre
- `getDistinctActions()` - Actions uniques

---

## ⏳ Phase 10 : Analytics & Export (À VENIR)

**Statut :** ⏳ Non commencée

### Tâches prévues

- [ ] Dashboard analytics avancé
- [ ] Graphiques de tendances
- [ ] Export de données (CSV, Excel)
- [ ] Rapports automatisés

---

## ⏳ Phase 11 : Tests & Optimisation (À VENIR)

**Statut :** ⏳ Non commencée

### Tâches prévues

- [ ] Tests end-to-end (Playwright)
- [ ] Tests unitaires (Jest)
- [ ] Optimisation performance
- [ ] Audit accessibilité
- [ ] Security audit

---

## 📁 Structure du Projet

```
tia-web/
├── actions/
│   └── admin/
│       ├── auth.action.ts       ✅ Actions d'authentification
│       ├── dashboard.action.ts  ✅ Requêtes dashboard Supabase
│       ├── users.action.ts      ✅ CRUD utilisateurs
│       ├── pricing.action.ts    ✅ CRUD prix + historique
│       ├── staff.action.ts      ✅ CRUD personnel
│       ├── roles.action.ts      ✅ CRUD rôles + permissions
│       ├── moderation-types.ts  ✅ Types partagés modération
│       ├── verifications.action.ts ✅ CRUD vérifications CIN
│       ├── reports.action.ts    ✅ CRUD signalements
│       ├── support/             ✅ Module support (split)
│       │   ├── types.ts
│       │   ├── stats.action.ts
│       │   ├── tickets.action.ts
│       │   ├── messages.action.ts
│       │   └── index.ts
│       └── settings/            ✅ Module paramètres (split)
│           ├── types.ts
│           ├── logs.action.ts
│           └── index.ts
├── app/
│   ├── (backoffice)/
│   │   ├── layout.tsx           ✅ Layout principal
│   │   ├── login/
│   │   │   └── page.tsx         ✅ Page de login (SSR)
│   │   └── (app)/
│   │       ├── layout.tsx       ✅ Layout avec sidebar + transitions
│   │       ├── dashboard/
│   │       │   ├── page.tsx             ✅ Dashboard avec vraies données
│   │       │   └── dashboard-charts.tsx ✅ Graphiques Recharts
│   │       ├── users/
│   │       │   ├── page.tsx             ✅ Liste utilisateurs
│   │       │   ├── users-table.tsx      ✅ Tableau paginé
│   │       │   ├── users-filters.tsx    ✅ Filtres sticky avec loading
│   │       │   ├── user-actions.tsx     ✅ Actions (bannir, supprimer)
│   │       │   ├── user-detail-modal.tsx ✅ Modal détail
│   │       │   ├── pagination.tsx       ✅ Pagination avec spinner
│   │       │   └── loading.tsx          ✅ Skeleton UI
│   │       ├── pricing/
│   │       │   ├── page.tsx             ✅ Dashboard tarification
│   │       │   ├── pricing-edit-modal.tsx ✅ Modal édition prix
│   │       │   ├── subscriptions/
│   │       │   │   ├── page.tsx         ✅ Liste abonnements
│   │       │   │   └── subscription-grid.tsx ✅ Grille par tier
│   │       │   ├── consumables/
│   │       │   │   ├── page.tsx         ✅ Liste microtransactions
│   │       │   │   └── consumable-grid.tsx ✅ Grille par type
│   │       │   └── history/
│   │       │       └── page.tsx         ✅ Historique modifications
│   │       ├── staff/
│   │           ├── page.tsx             ✅ Liste personnel
│   │           ├── staff-table.tsx      ✅ Tableau personnel
│   │           ├── staff-filters.tsx    ✅ Filtres dynamiques
│   │           ├── staff-actions.tsx    ✅ Menu actions
│   │           ├── create-staff-button.tsx ✅ Création membre
│   │           ├── edit-staff-modal.tsx ✅ Modification membre
│   │           └── roles/
│   │               ├── page.tsx         ✅ Gestion rôles
│   │               ├── roles-table.tsx  ✅ Tableau rôles
│   │               ├── role-row.tsx     ✅ Ligne interactive
│   │               ├── create-role-button.tsx ✅ Création rôle
│   │               └── edit-role-modal.tsx ✅ Édition rôle
│   │       └── moderation/
│   │           ├── page.tsx             ✅ Dashboard modération
│   │           ├── loading.tsx          ✅ Skeleton chargement
│   │           ├── _components/
│   │           │   ├── report-actions.tsx   ✅ Menu actions
│   │           │   ├── reports-filters.tsx  ✅ Filtres partagés
│   │           │   └── reports-pagination.tsx ✅ Pagination
│   │           ├── verifications/
│   │           │   ├── page.tsx             ✅ Liste vérifications
│   │           │   ├── verifications-table.tsx ✅ Tableau
│   │           │   ├── verifications-filters.tsx ✅ Filtres
│   │           │   ├── verification-actions.tsx ✅ Actions
│   │           │   └── pagination.tsx       ✅ Pagination
│   │           ├── photos/
│   │           │   ├── page.tsx             ✅ Liste photos
│   │           │   └── photos-table.tsx     ✅ Grille photos
│   │           ├── messages/
│   │           │   ├── page.tsx             ✅ Liste messages
│   │           │   └── messages-table.tsx   ✅ Tableau messages
│   │           └── profiles/
│   │               ├── page.tsx             ✅ Liste profils
│   │               └── profiles-table.tsx   ✅ Tableau profils
│   │       ├── support/
│   │       │   ├── page.tsx                 ✅ Dashboard support
│   │       │   ├── loading.tsx              ✅ Skeleton
│   │       │   └── tickets/
│   │       │       ├── page.tsx             ✅ Liste tickets
│   │       │       ├── tickets-table.tsx    ✅ Tableau tickets
│   │       │       ├── tickets-filters.tsx  ✅ Filtres
│   │       │       ├── ticket-actions.tsx   ✅ Menu actions
│   │       │       ├── pagination.tsx       ✅ Pagination
│   │       │       └── [id]/
│   │       │           ├── page.tsx         ✅ Détail ticket
│   │       │           ├── ticket-header.tsx ✅ En-tête
│   │       │           └── ticket-conversation.tsx ✅ Chat
│   │       └── settings/
│   │           ├── page.tsx                 ✅ Hub paramètres
│   │           ├── loading.tsx              ✅ Skeleton
│   │           └── logs/
│   │               ├── page.tsx             ✅ Journal activité
│   │               ├── logs-table.tsx       ✅ Tableau logs
│   │               ├── logs-filters.tsx     ✅ Filtres
│   │               └── pagination.tsx       ✅ Pagination
│   └── (landing)/               ✅ Déjà implémenté
├── components/
│   ├── backoffice/
│   │   ├── app-sidebar.tsx      ✅ Sidebar navigation
│   │   ├── login-form.tsx       ✅ Formulaire de connexion
│   │   └── page-transition.tsx  ✅ Transitions Framer Motion
│   ├── landing/                 ✅ Déjà implémenté
│   └── ui/                      ✅ shadcn/ui components
├── lib/
│   ├── auth/
│   │   └── roles.ts             ✅ Helpers d'authentification
│   ├── database.types.ts        ✅ Types TypeScript Supabase
│   └── supabase/
│       ├── server.ts            ✅ Client serveur
│       ├── client.ts            ✅ Client navigateur
│       ├── admin.ts             ✅ Client admin (service_role)
│       └── proxy.ts             ✅ Middleware avec vérification admin
├── next.config.ts               ✅ Config images Supabase Storage
└── middleware.ts                ✅ Protection des routes
```

---

## 🔑 Informations Importantes

### Credentials de Test

**Super Admin :**

- Email : `admin@tia.app`
- Mdp : `tiaadmin`

### URLs

- Landing Page : `/`
- Login Back Office : `/login`
- Dashboard : `/dashboard` (protégé)
- Utilisateurs : `/users` (protégé)
- Personnel : `/staff` (protégé, action: manage_staff)
- Rôles : `/staff/roles` (protégé, action: manage_roles)
- Tarification : `/pricing` (protégé, action: view_pricing)
- Modération : `/moderation` (protégé, action: view_reports)
- Vérifications CIN : `/moderation/verifications` (protégé, action: view_reports)
- Photos signalées : `/moderation/photos` (protégé, action: view_reports)
- Messages signalés : `/moderation/messages` (protégé, action: view_reports)
- Profils signalés : `/moderation/profiles` (protégé, action: view_reports)
- Support : `/support` (protégé, action: view_tickets)
- Tickets : `/support/tickets` (protégé, action: view_tickets)
- Détail ticket : `/support/tickets/[id]` (protégé, action: view_tickets)
- Paramètres : `/settings` (protégé)
- Journal d'activité : `/settings/logs` (protégé)

### Environnement

```env
NEXT_PUBLIC_SUPABASE_URL=https://ibx1fmqov1sdyrzpemyv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[clé dans .env.local]
```

---

## 🐛 Issues Connues

Aucune issue connue pour le moment.

---

## 📝 Notes Techniques

### Patterns utilisés

1. **SSR First** : Pages en Server Components, composants interactifs en Client Components
2. **Server Actions** : Toutes les mutations sont des server actions
3. **Type Safety** : Types TypeScript auto-générés depuis Supabase
4. **RLS** : Row Level Security activé sur toutes les tables sensibles

### Décisions d'Architecture

- ✅ Actions dans `/actions/admin/` au lieu de `/app/actions/`
- ✅ Composants back office dans `/components/backoffice/`
- ✅ Séparation auth/roles : actions vs utilities
- ✅ Middleware avec vérification active/inactive admin

---

## 🚀 Prochaine Phase : Analytics & Export

**Priorité :** Moyenne

### Fonctionnalités à implémenter

1. Dashboard analytics avancé avec graphiques de tendances
2. Export de données (CSV, Excel)
3. Rapports automatisés et programmés
4. Métriques de performance

### Pages à créer

- `/analytics` - Dashboard analytics
- `/analytics/users` - Métriques utilisateurs
- `/analytics/revenue` - Métriques revenus
- `/analytics/reports` - Rapports personnalisés

---

**Projet :** TIA - Back Office
**Framework :** Next.js 16 + Supabase + shadcn/ui + Framer Motion + date-fns
