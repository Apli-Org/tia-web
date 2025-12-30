# Fonctionnalités Back Office - TIA (Application Mobile de Rencontre)

Ce document liste toutes les fonctionnalités à implémenter pour gérer l'application mobile TIA via le back office.

---

## 1. Gestion des Utilisateurs

### 1.1 Liste des Utilisateurs

**Table source:** `users` (56 utilisateurs)

| Fonctionnalité | Description | Statut |
|----------------|-------------|--------|
| Afficher tous les utilisateurs | Tableau paginé avec avatar, prénom, email, âge, localisation | À faire |
| Filtrer par tier | Base / Silver / Gold / Elite | À faire |
| Filtrer par statut | Actif / Inactif / En attente de suppression | À faire |
| Filtrer par date d'inscription | Range de dates | À faire |
| Filtrer par localisation | Pays/ville | À faire |
| Recherche | Par nom, email, ID | À faire |
| Export CSV | Exporter la liste filtrée | À faire |

### 1.2 Détail Utilisateur

| Fonctionnalité | Description | Champs DB |
|----------------|-------------|-----------|
| Infos profil | Nom, email, âge, genre, bio, intérêts, profession | `firstName`, `email`, `birthdate`, `gender`, `bio`, `interests`, `profession` |
| Photos | Galerie de photos profil | `photos`, `profilePhoto` |
| Localisation | Coordonnées GPS et adresse | `latitude`, `longitude`, `location`, `address` |
| Statistiques | Likes donnés/reçus, matchs, messages | `stats` (JSONB) |
| Tier actuel | Niveau d'abonnement | `current_tier` |
| Abonnement actif | Détails subscription | `subscription_id` → `subscriptions` |
| Vérification | Badge vérifié | `is_verified` |
| Statut compte | Actif, programmé pour suppression | `is_active`, `scheduled_deletion_date` |

### 1.3 Actions sur Utilisateur

| Action | Description | Impact DB |
|--------|-------------|-----------|
| Bannir utilisateur | Désactiver le compte | `is_active = false` |
| Débannir utilisateur | Réactiver le compte | `is_active = true` |
| Annuler suppression programmée | Retirer la date de suppression | `scheduled_deletion_date = NULL` |
| Supprimer définitivement | Suppression RGPD | DELETE cascade |
| Envoyer notification push | Notification ciblée | Via `tokenPush` |
| Modifier tier manuellement | Upgrade/downgrade gratuit | `current_tier`, créer `subscription` |

### 1.4 Filtres Avancés par Tier

**Champs débloqués selon le tier:**

| Tier | Champs supplémentaires |
|------|------------------------|
| Silver | `profession`, `education_level` |
| Gold | `height`, `religion`, `smoking`, `drinking`, `has_children`, `wants_children` |
| Elite | `relationship_type`, `political_views`, `is_verified` |

---

## 2. Gestion des Abonnements et Prix

### 2.1 Configuration des Tiers d'Abonnement

**À créer:** Table `subscription_tiers` pour centraliser les prix et privilèges

| Tier | Prix (MGA) | Prix (EUR) | Durée |
|------|------------|------------|-------|
| Base | 0 | 0 | - |
| Silver | 12,000 | ~4.99€ | 1 mois |
| Gold | 20,000 | ~9.99€ | 1 mois |
| Elite | 30,000 | ~19.99€ | 1 mois |

### 2.2 Privilèges par Tier

**Table source:** `subscription_features`, `user_preferences`

| Privilège | Base | Silver | Gold | Elite |
|-----------|------|--------|------|-------|
| **Swipes quotidiens** | 50 | Illimité | Illimité | Illimité |
| **Voir qui m'a liké** | Non (flou) | 1x/mois | Illimité | Illimité |
| **TIA Hearts / mois** | 0 | 1 | 3 | 5 |
| **Boosts / mois** | 0 | 1 | 2 | 4 |
| **Révélations / mois** | Payant | Inclus | Illimité | Illimité |
| **Filtres profession** | Non | Oui | Oui | Oui |
| **Filtres éducation** | Non | Oui | Oui | Oui |
| **Filtres taille** | Non | Non | Oui | Oui |
| **Filtres religion** | Non | Non | Oui | Oui |
| **Filtres enfants** | Non | Non | Oui | Oui |
| **Accusés de lecture** | Non | Non | Oui | Oui |
| **Mode incognito** | Non | Non | Non | Oui |
| **Profils vérifiés only** | Non | Non | Non | Oui |
| **Priorité découverte** | Non | Non | Non | Oui |

### 2.3 Fonctionnalités Back Office - Abonnements

| Fonctionnalité | Description |
|----------------|-------------|
| Lister tous les abonnements actifs | Tableau avec user, tier, date début/fin, auto-renew |
| Modifier prix des tiers | Éditer prix Silver/Gold/Elite |
| Modifier quotas mensuels | TIA Hearts, Boosts, Révélations par tier |
| Annuler abonnement | Passer statut à `cancelled` |
| Prolonger abonnement | Modifier `end_date` |
| Activer/désactiver auto-renew | Toggle `auto_renew` |
| Historique par utilisateur | Timeline des abonnements |

### 2.4 Upgrades et Downgrades

**Upgrades proratisés (observés en DB):**

| Upgrade | Prix |
|---------|------|
| Silver → Gold | 8,000 MGA (prorata) |
| Silver → Elite | 18,000 MGA |
| Gold → Elite | 10,000 MGA (prorata) |

| Fonctionnalité BO | Description |
|-------------------|-------------|
| Configurer prix upgrade | Définir prix de transition entre tiers |
| Upgrade manuel gratuit | Offrir un upgrade sans paiement |
| Downgrade utilisateur | Réduire le tier (à l'expiration) |

---

## 3. Gestion des Consommables (Micro-Achats)

### 3.1 Types de Consommables

**Table source:** `user_consumables`, `micro_purchases`

| Type | Slug | Description |
|------|------|-------------|
| TIA Heart | `tia_heart` | Super Like - met en avant un like |
| Boost | `boost` | Profil mis en avant 30-60 min |
| Révélation Like | `reveal_like` | Défloutage d'un profil qui vous a liké |

### 3.2 Tarification des Packs

**Données existantes en DB:**

| Produit | Quantité | Prix (MGA) |
|---------|----------|------------|
| TIA Heart | x1 | 2,000 |
| TIA Heart | x3 | 5,000 |
| TIA Heart | x5 | 8,000 |
| TIA Heart | x10 | 12,000 |
| Boost | x1 | 3,000 |
| Boost | x5 | 12,000 |
| Boost | x10 | 20,000 |
| Révélation Like | x1 | 1,000 |
| Révélation Like | x5 | 4,000 |
| Révélation Like | x10 | 8,000 |

### 3.3 Fonctionnalités Back Office - Consommables

| Fonctionnalité | Description |
|----------------|-------------|
| Lister tous les packs | Tableau des produits avec prix |
| Modifier prix pack | Éditer le prix d'un pack |
| Ajouter nouveau pack | Créer un nouveau bundle |
| Désactiver pack | Retirer de la vente |
| Créditer consommables | Offrir des consommables à un utilisateur |
| Historique achats | Voir tous les achats micro_purchases |
| Statistiques ventes | Volume, revenus par type |

### 3.4 Quotas Mensuels par Abonnement

**Table source:** `subscription_features`

| Fonctionnalité | Description |
|----------------|-------------|
| Afficher quotas actifs | Par abonnement: quota, utilisé, reset_date |
| Modifier quotas tier | Changer monthly_quota par tier |
| Reset manuel quota | Remettre used_count à 0 |
| Historique consommation | Via `consumable_usage_log` |

---

## 4. Gestion des Transactions et Paiements

### 4.1 Vanilla Pay Transactions

**Table source:** `vanilla_pay_transactions` (109 transactions)

| Champ | Description |
|-------|-------------|
| `idpanier` | ID unique panier Vanilla Pay |
| `montant` | Montant en MGA |
| `status` | pending / completed / failed / cancelled |
| `product_type` | subscription / consumable |
| `tier` | silver / gold / elite (si subscription) |
| `consumable_type` | tia_heart / boost / reveal_like |
| `quantity` | Quantité achetée |
| `api_version` | v1 ou v2 |
| `devise` | MGA ou EUR |

### 4.2 Fonctionnalités Back Office - Transactions

| Fonctionnalité | Description |
|----------------|-------------|
| Lister transactions | Tableau paginé avec filtres |
| Filtrer par statut | pending / completed / failed |
| Filtrer par type | subscription / consumable |
| Filtrer par méthode paiement | MVola, Orange Money, etc. |
| Filtrer par date | Range de dates |
| Détail transaction | Voir gateway_response JSON |
| Rembourser | Créer entrée remboursement |
| Export transactions | CSV/PDF pour comptabilité |

### 4.3 Statistiques Financières

| KPI | Calcul |
|-----|--------|
| MRR | Somme abonnements actifs |
| Revenus du jour | Transactions completed aujourd'hui |
| Revenus du mois | Total mensuel |
| ARPU | Revenus / Utilisateurs actifs |
| Taux échec paiement | Failed / Total transactions |
| Répartition par tier | % Silver / Gold / Elite |

---

## 5. Modération

### 5.1 Vérification d'Identité (CIN)

**Table source:** `verification_requests`

| Fonctionnalité | Description |
|----------------|-------------|
| Liste demandes en attente | status = 'pending' |
| Voir photo CIN | `cin_photo_url` |
| Voir selfie (optionnel) | `selfie_photo_url` |
| Comparer avec profil | Prénom, date naissance |
| Approuver | status = 'approved', `users.is_verified = true` |
| Rejeter | status = 'rejected', remplir `rejection_reason` |
| Historique vérifications | Par utilisateur |

### 5.2 Contenu Signalé

**Table source:** `reported_content`

| Type contenu | Slug |
|--------------|------|
| Profil | `profile` |
| Photo | `photo` |
| Message | `message` |
| Bio | `bio` |

| Raison | Slug |
|--------|------|
| Nudité | `nudity` |
| Harcèlement | `harassment` |
| Faux profil | `fake` |
| Spam | `spam` |
| Violence | `violence` |
| Discours haineux | `hate_speech` |
| Mineur | `minor` |
| Autre | `other` |

### 5.3 Fonctionnalités Modération

| Fonctionnalité | Description |
|----------------|-------------|
| Liste signalements pending | Tableau avec contenu, raison, reporter |
| Voir contenu signalé | Photo, message, bio |
| Approuver (faux signalement) | status = 'approved' |
| Supprimer contenu | status = 'removed' |
| Avertir utilisateur | status = 'user_warned' |
| Bannir utilisateur | status = 'user_banned' |
| Notes admin | Champ `admin_notes` |
| Filtrer par type contenu | profile / photo / message |
| Filtrer par raison | nudity, harassment, etc. |
| Statistiques modération | Signalements/jour, temps résolution |

---

## 6. Support Utilisateur

### 6.1 Tickets de Support

**Tables sources:** `support_tickets`, `ticket_messages`

| Catégorie | Slug |
|-----------|------|
| Bug | `bug` |
| Abonnement | `subscription` |
| Remboursement | `refund` |
| Compte | `account` |
| Modération | `moderation` |
| Autre | `other` |

| Priorité | Slug |
|----------|------|
| Haute | `high` |
| Moyenne | `medium` |
| Basse | `low` |

| Statut | Slug |
|--------|------|
| Nouveau | `new` |
| En cours | `in_progress` |
| Résolu | `resolved` |
| Fermé | `closed` |

### 6.2 Fonctionnalités Support

| Fonctionnalité | Description |
|----------------|-------------|
| Liste tickets | Tableau avec sujet, catégorie, priorité, statut |
| Filtrer par statut | new / in_progress / resolved |
| Filtrer par priorité | high / medium / low |
| Filtrer par catégorie | bug, subscription, etc. |
| Assigner ticket | Affecter à un admin |
| Répondre au ticket | Ajouter message `ticket_messages` |
| Changer statut | Progression du ticket |
| Changer priorité | Escalade/désescalade |
| Clôturer ticket | status = 'closed' |
| Temps de résolution | Calculer `resolved_at - created_at` |

---

## 7. Analytics et Dashboard

### 7.1 KPIs Principaux

| KPI | Source | Calcul |
|-----|--------|--------|
| Utilisateurs totaux | `users` | COUNT(*) |
| Utilisateurs actifs (DAU) | `users` | is_active = true + last_active récent |
| Nouveaux inscrits/jour | `users` | created_at = today |
| Matchs du jour | `matches` | created_at = today |
| Messages du jour | `messages` | created_at = today |
| MRR | `subscriptions` | SUM(amount_paid) actifs |
| Signalements en attente | `reported_content` | status = 'pending' |
| Tickets ouverts | `support_tickets` | status IN ('new', 'in_progress') |

### 7.2 Graphiques

| Graphique | Type | Description |
|-----------|------|-------------|
| Croissance utilisateurs | Line | Nouveaux inscrits / jour |
| Répartition tiers | Pie | % Base / Silver / Gold / Elite |
| Engagement | Bar | Swipes, Likes, Messages / jour |
| Revenus | Line | MRR, transactions / jour |
| Rétention (Cohortes) | Table | % actifs après 1j, 7j, 30j |
| Funnel conversion | Funnel | Inscription → Profil complet → Match |

### 7.3 Export Rapports

| Fonctionnalité | Description |
|----------------|-------------|
| Export KPIs CSV | Données brutes |
| Export PDF rapport | Dashboard formaté |
| Programmation rapports | Email hebdo/mensuel |

---

## 8. Administration et Configuration

### 8.1 Gestion des Admins

**Table source:** `admin_users`

| Rôle | Slug | Permissions |
|------|------|-------------|
| Super Admin | `super_admin` | Accès total |
| Modérateur | `moderator` | Modération uniquement |
| Support | `support` | Tickets uniquement |

| Fonctionnalité | Description |
|----------------|-------------|
| Lister admins | Tableau nom, email, rôle, dernière connexion |
| Ajouter admin | Formulaire création |
| Modifier rôle | Changer permissions |
| Désactiver admin | is_active = false |
| Réactiver admin | is_active = true |
| Supprimer admin | DELETE |

### 8.2 Logs d'Activité

**Table source:** `admin_activity_logs`

| Fonctionnalité | Description |
|----------------|-------------|
| Voir tous les logs | Tableau admin, action, timestamp |
| Filtrer par admin | Multi-select |
| Filtrer par action | user_banned, content_removed, etc. |
| Filtrer par date | Range |
| Détail log | Voir `details` JSONB |

### 8.3 Configuration Application

**À implémenter (table `app_config` à créer)**

| Paramètre | Type | Description |
|-----------|------|-------------|
| swipes_limit_base | integer | Limite swipes/jour tier Base |
| max_photos_per_profile | integer | Nombre max photos profil |
| max_discovery_distance | integer | Distance max en km |
| auto_moderation_enabled | boolean | Modération IA active |
| report_threshold_auto_review | integer | Seuil signalements pour review auto |
| boost_duration_minutes | integer | Durée boost (30 ou 60) |
| subscription_prices | JSONB | Prix des abonnements |
| consumable_prices | JSONB | Prix des packs |

---

## 9. Fonctionnalités Techniques

### 9.1 Sessions Boost

**Table source:** `boost_sessions`

| Fonctionnalité | Description |
|----------------|-------------|
| Lister boosts actifs | status = 'active' |
| Statistiques boost | impressions, profile_views, likes_received |
| Historique par user | Tous les boosts d'un utilisateur |
| Forcer fin boost | status = 'cancelled' |

### 9.2 Mode Incognito (Elite)

**Table source:** `incognito_sessions`

| Fonctionnalité | Description |
|----------------|-------------|
| Sessions actives | is_active = true |
| Historique sessions | Par utilisateur |
| Forcer désactivation | ended_at = now(), is_active = false |

### 9.3 Accusés de Lecture (Gold+)

**Table source:** `read_receipts`

| Fonctionnalité | Description |
|----------------|-------------|
| Statistiques globales | Nombre total de lectures |
| Par conversation | Messages lus dans un match |

### 9.4 Limites Swipes Quotidiens

**Table source:** `daily_swipe_limits`

| Fonctionnalité | Description |
|----------------|-------------|
| Voir limites actives | Par utilisateur et date |
| Reset manuel | Remettre swipes_count à 0 |
| Modifier tier_limit | Changer limite pour un tier |

---

## 10. Tables à Créer pour le Back Office

### 10.1 subscription_tiers (Configuration des prix)

```sql
CREATE TABLE subscription_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_slug TEXT UNIQUE NOT NULL CHECK (tier_slug IN ('base', 'silver', 'gold', 'elite')),
  name TEXT NOT NULL,
  price_mga INTEGER NOT NULL DEFAULT 0,
  price_eur NUMERIC(10,2) DEFAULT 0,
  duration_days INTEGER NOT NULL DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  features JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 10.2 consumable_products (Configuration des packs)

```sql
CREATE TABLE consumable_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consumable_type TEXT NOT NULL CHECK (consumable_type IN ('tia_heart', 'boost', 'reveal_like')),
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price_mga INTEGER NOT NULL,
  price_eur NUMERIC(10,2),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 10.3 app_config (Configuration globale)

```sql
CREATE TABLE app_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES admin_users(id),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 10.4 refunds (Remboursements)

```sql
CREATE TABLE refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES vanilla_pay_transactions(id),
  user_id UUID REFERENCES users(id),
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'rejected')) DEFAULT 'pending',
  processed_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ
);
```

---

## 11. Récapitulatif des Pages Back Office

| Section | Pages | Priorité |
|---------|-------|----------|
| **Dashboard** | Vue d'ensemble KPIs | P0 |
| **Utilisateurs** | Liste, Détail, Premium, Bannis | P0 |
| **Abonnements** | Actifs, Configuration tiers, Transactions | P0 |
| **Consommables** | Configuration packs, Historique achats | P1 |
| **Modération** | Vérifications CIN, Photos signalées, Messages signalés | P0 |
| **Support** | Tickets ouverts, Historique | P1 |
| **Analytics** | Vue d'ensemble, Croissance, Engagement, Revenus | P1 |
| **Paramètres** | Configuration app, Gestion admins, Logs | P2 |

---

## 12. API Endpoints à Créer

### Utilisateurs
- `GET /api/admin/users` - Liste paginée
- `GET /api/admin/users/:id` - Détail utilisateur
- `PATCH /api/admin/users/:id` - Modifier utilisateur
- `POST /api/admin/users/:id/ban` - Bannir
- `POST /api/admin/users/:id/unban` - Débannir
- `DELETE /api/admin/users/:id` - Supprimer

### Abonnements
- `GET /api/admin/subscriptions` - Liste abonnements
- `GET /api/admin/subscription-tiers` - Configuration tiers
- `PATCH /api/admin/subscription-tiers/:tier` - Modifier tier
- `POST /api/admin/subscriptions/:id/cancel` - Annuler

### Transactions
- `GET /api/admin/transactions` - Liste transactions
- `POST /api/admin/transactions/:id/refund` - Rembourser

### Modération
- `GET /api/admin/verifications` - Demandes CIN
- `POST /api/admin/verifications/:id/approve` - Approuver
- `POST /api/admin/verifications/:id/reject` - Rejeter
- `GET /api/admin/reports` - Signalements
- `POST /api/admin/reports/:id/action` - Action modération

### Support
- `GET /api/admin/tickets` - Liste tickets
- `POST /api/admin/tickets/:id/reply` - Répondre
- `PATCH /api/admin/tickets/:id/status` - Changer statut

### Analytics
- `GET /api/admin/analytics/overview` - KPIs
- `GET /api/admin/analytics/growth` - Croissance
- `GET /api/admin/analytics/revenue` - Revenus

---

**Document créé le:** 2025-12-30
**Version:** 1.0
**Basé sur:** SPEC_LANDING_BACKOFFICE.md + Analyse DB Supabase
