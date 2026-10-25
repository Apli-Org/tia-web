# Spécification Landing Page & Back Office - TIA

## 1. Vue d'ensemble

Ce document décrit les spécifications pour le **landing page** et le **back office** de l'application mobile TIA, une plateforme de rencontre nouvelle génération.

### Objectifs

- **Landing Page** : Attirer et convertir les utilisateurs vers l'application mobile
- **Back Office** : Administrer la plateforme (utilisateurs, modération, analytics, abonnements)

### Stack Technique

- **Framework** : Next.js 16 (App Router)
- **UI Library** : shadcn/ui (Tailwind CSS + Radix UI)
- **Backend** : Supabase (partagé avec l'app mobile)
- **Authentification** : Supabase Auth (JWT)
- **Base de données** : PostgreSQL via Supabase
- **Déploiement** : Vercel
- **Analytics** : Vercel Analytics

---

## 2. Landing Page - Spécifications

### 2.1 Objectifs du Landing Page

1. **Convertir** les visiteurs en téléchargements (App Store / Google Play)
2. **Informer** sur les fonctionnalités et la valeur unique de TIA
3. **Rassurer** sur la sécurité et la confidentialité
4. **Optimiser** pour le SEO et les conversions

### 2.2 Structure du Landing Page

#### Navigation

**Header (fixe au scroll)**

- Logo TIA
- Menu :
  - Fonctionnalités
  - Tarifs
  - FAQ
  - Connexion (lien vers back office)
- CTA : "Télécharger l'app" (bouton primaire)

**Footer**

- Liens légaux : CGU, Politique de confidentialité, Mentions légales
- Réseaux sociaux : Instagram, TikTok, Twitter/X
- Contact : support@tia.app
- Copyright © 2025 TIA

#### Sections du Landing Page

##### Section 1 : Hero (Au-dessus de la pliure)

**Contenu :**

- **Titre principal** : "Rencontrez l'âme sœur grâce à l'IA"
- **Sous-titre** : "TIA révolutionne les rencontres avec une expérience immersive, sécurisée et intelligente"
- **CTA principal** :
  - Bouton "Télécharger sur App Store" (iOS)
  - Bouton "Télécharger sur Google Play" (Android)
- **Visuel** : Animation ou mockup de l'app en action (swipe, match, chat)

**Design :**

- Gradient rose/rouge (#E94057) + dégradé subtil
- Typographie moderne et bold
- Illustration ou mockup d'iPhone/Android montrant l'interface swipe

##### Section 2 : Fonctionnalités Principales

**Titre** : "Pourquoi TIA change tout"

**Cards (3-4 fonctionnalités) :**

1. **Swipe Immersif**

   - Icône : Carte avec cœur
   - Description : "Une expérience de découverte inspirée de TikTok, fluide et addictive"

2. **Matchs Intelligents**

   - Icône : Intelligence artificielle
   - Description : "Notre IA analyse vos préférences pour des suggestions toujours plus pertinentes"

3. **Messages IA**

   - Icône : Bulle de chat avec étoile
   - Description : "L'IA vous suggère des messages d'ouverture uniques basés sur les profils"

4. **Sécurité Garantie**
   - Icône : Bouclier avec badge
   - Description : "Vérification d'identité et modération pour une expérience sûre"

**Design :**

- Grid responsive (2x2 sur desktop, 1 colonne sur mobile)
- Cards avec icônes, titre, description
- Hover effects subtils

##### Section 3 : Comment ça marche (Étapes)

**Titre** : "Trouvez l'amour en 3 étapes"

**Étapes :**

1. **Créez votre profil**

   - Illustration : Écran de profil
   - Description : "Ajoutez vos photos, centres d'intérêt et laissez notre IA vous aider"

2. **Découvrez & Swipez**

   - Illustration : Écran de swipe
   - Description : "Parcourez des profils compatibles et likez en un geste"

3. **Matchez & Discutez**
   - Illustration : Écran de chat
   - Description : "Démarrez la conversation avec des suggestions IA personnalisées"

**Design :**

- Timeline horizontale ou verticale (selon device)
- Numérotation claire (1, 2, 3)
- Screenshots de l'app pour chaque étape

##### Section 4 : Preuves Sociales (Témoignages)

**Titre** : "Ils ont trouvé l'amour sur TIA"

**Contenu :**

- 3-4 témoignages fictifs (ou réels si disponibles)
- Chaque témoignage :
  - Photo de profil (avatar ou stock photo)
  - Nom + âge
  - Citation courte (1-2 phrases)
  - Note 5 étoiles

**Exemple :**

> "TIA a transformé ma façon de rencontrer. Les suggestions sont tellement pertinentes !"
> — Sophie, 28 ans ⭐⭐⭐⭐⭐

**Design :**

- Carousel ou grid
- Cards avec citation, photo, nom

##### Section 5 : Tarifs & Abonnements

**Titre** : "Choisissez votre formule"

**Tiers d'abonnement (4 colonnes) :**

| **Base**                 | **Silver**              | **Gold**                 | **Elite**        |
| ------------------------ | ----------------------- | ------------------------ | ---------------- |
| Gratuit                  | 4.99€/mois              | 9.99€/mois               | 19.99€/mois      |
| Swipes limités (20/jour) | Swipes illimités        | Swipes illimités         | Swipes illimités |
| Découverte basique       | Filtres pro             | Filtres avancés          | Filtres ultra    |
| -                        | Voir qui like (1x/mois) | Voir qui like (illimité) | Mode incognito   |
| -                        | -                       | Accusés de lecture       | Priorité totale  |

**CTA :**

- "Télécharger gratuitement" (Base)
- "Commencer l'essai" (Silver, Gold, Elite)

**Design :**

- Cards verticales avec pricing
- Badge "Populaire" sur tier Gold
- Couleur différente pour chaque tier

##### Section 6 : FAQ (Accordéon)

**Titre** : "Questions fréquentes"

**Questions :**

1. **TIA est-elle vraiment gratuite ?**

   - Oui, la version Base est 100% gratuite. Vous pouvez upgrader pour débloquer des fonctionnalités premium.

2. **Comment fonctionne la vérification d'identité ?**

   - Vous pouvez uploader votre CIN pour obtenir un badge certifié, garantissant votre authenticité.

3. **Mes données sont-elles sécurisées ?**

   - Absolument. Nous utilisons un chiffrement de niveau bancaire et ne partageons jamais vos données.

4. **Puis-je annuler mon abonnement à tout moment ?**

   - Oui, sans frais ni pénalités.

5. **Sur quels appareils TIA est-elle disponible ?**

   - iOS (iPhone), Android, et bientôt le Web.

6. **Comment fonctionne l'IA de TIA ?**
   - Notre IA analyse vos préférences, comportements et profils likés pour suggérer des matchs pertinents et générer des messages d'ouverture uniques.

**Design :**

- Accordéon shadcn/ui
- Icône + / - pour ouvrir/fermer
- Style minimaliste

##### Section 7 : CTA Final

**Contenu :**

- **Titre** : "Prêt à rencontrer quelqu'un d'exceptionnel ?"
- **CTA** : Boutons App Store / Google Play (grands, centrés)
- **Background** : Gradient ou image de fond subtile

**Design :**

- Centré, minimal, impactant
- Boutons larges et visibles

### 2.3 Fonctionnalités Techniques du Landing Page

#### SEO & Performance

**Meta Tags :**

```html
<title>TIA - Rencontres Intelligentes avec l'IA | App de Dating</title>
<meta
  name="description"
  content="TIA révolutionne les rencontres avec l'IA. Swipes immersifs, matchs intelligents, messages suggérés. Téléchargez gratuitement sur iOS et Android."
/>
<meta property="og:title" content="TIA - Rencontres Intelligentes" />
<meta
  property="og:description"
  content="Trouvez l'amour avec TIA, l'app de rencontre nouvelle génération"
/>
<meta property="og:image" content="/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

**Performance :**

- Next.js Image Optimization pour toutes les images
- Lazy loading des sections non-critiques
- Prefetch des liens critiques
- Bundle splitting optimal
- Score Lighthouse : 95+ (Performance, SEO, Accessibility)

**Accessibilité :**

- ARIA labels sur tous les éléments interactifs
- Contraste WCAG AA minimum
- Navigation au clavier complète
- Alt text sur toutes les images

#### Analytics & Tracking

**Événements à tracker :**

- Page view
- CTA click (iOS download, Android download)
- Scroll depth (25%, 50%, 75%, 100%)
- Section visibility (Hero, Features, Pricing, FAQ)
- Link click (Footer, Navigation)

**Outils :**

- Vercel Analytics
- Google Analytics 4
- Pixel Meta (Facebook/Instagram Ads - optionnel)

#### Responsive Design

**Breakpoints Tailwind :**

- Mobile : < 640px
- Tablet : 640px - 1024px
- Desktop : > 1024px

**Adaptation :**

- Navigation mobile : Burger menu
- Sections : Stack vertical sur mobile, horizontal sur desktop
- CTA : Sticky bottom bar sur mobile (optionnel)

---

## 3. Back Office - Spécifications

### 3.1 Objectifs du Back Office

1. **Gérer les utilisateurs** : Visualiser, modérer, bannir, vérifier
2. **Analyser les données** : Métriques clés, KPIs, croissance
3. **Modérer le contenu** : Profils, photos, messages signalés
4. **Administrer les abonnements** : Gérer les tiers, transactions, remboursements
5. **Support utilisateur** : Répondre aux tickets, gérer les réclamations

### 3.2 Architecture du Back Office

#### Authentification

**Rôles utilisateurs :**

- **Super Admin** : Accès total (gestion admins, analytics, modération, config)
- **Modérateur** : Modération uniquement (profils, photos, messages)
- **Support** : Support utilisateur, tickets, remboursements

**Table Supabase :**

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'moderator', 'support')),
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE
);
```

**Connexion :**

- Email + mot de passe
- MFA (2FA) via email ou authenticator app (optionnel mais recommandé)
- Session JWT avec refresh token

#### Navigation du Back Office

**Sidebar (fixe) :**

1. **Dashboard** (Icône : LayoutDashboard)
2. **Utilisateurs** (Icône : Users)
   - Tous les utilisateurs
   - Utilisateurs premium
   - Utilisateurs bannis
3. **Modération** (Icône : Shield)
   - Profils à vérifier
   - Photos signalées
   - Messages signalés
4. **Abonnements** (Icône : CreditCard)
   - Transactions
   - Abonnements actifs
   - Remboursements
5. **Analytics** (Icône : BarChart3)
   - Vue d'ensemble
   - Croissance
   - Engagement
6. **Support** (Icône : MessageSquare)
   - Tickets ouverts
   - Historique
7. **Paramètres** (Icône : Settings)
   - Configuration app
   - Gestion admins
   - Logs d'activité

**Header (fixe) :**

- Logo TIA + "Back Office"
- Recherche globale (utilisateurs, transactions, etc.)
- Notifications (nouveaux signalements, tickets)
- Avatar + Dropdown : Profil, Déconnexion

### 3.3 Écrans du Back Office

#### 3.3.1 Dashboard (Vue d'ensemble)

**Métriques clés (Cards en haut) :**

1. **Utilisateurs Actifs**

   - Nombre total
   - Évolution (%) sur 7/30 jours
   - Icône : Users

2. **Matchs du jour**

   - Nombre de matchs créés aujourd'hui
   - Évolution (%)
   - Icône : Heart

3. **Revenus du mois**

   - Total MRR (Monthly Recurring Revenue)
   - Évolution (%)
   - Icône : DollarSign

4. **Signalements en attente**
   - Nombre de modérations en attente
   - Badge rouge si > 10
   - Icône : AlertTriangle

**Graphiques :**

1. **Croissance utilisateurs**

   - Line chart : Nouveaux inscrits par jour (30 derniers jours)
   - Filtre : 7j / 30j / 90j / 1 an

2. **Engagement**

   - Bar chart : Swipes, Likes, Messages par jour
   - Filtre par période

3. **Répartition des tiers**
   - Pie chart : % Base / Silver / Gold / Elite

**Tableau "Activité récente" :**

- Colonnes : Utilisateur, Action, Timestamp
- Actions : Inscription, Match, Abonnement, Signalement
- Limite : 10 dernières actions

#### 3.3.2 Utilisateurs

**Vue "Tous les utilisateurs"**

**Tableau avec colonnes :**

- Avatar + Prénom
- Email
- Âge
- Localisation
- Tier (Base/Silver/Gold/Elite) avec badge coloré
- Statut (Actif / Banni / Supprimé)
- Date d'inscription
- Actions (View, Edit, Ban)

**Filtres :**

- Tier (Multi-select)
- Statut (Multi-select)
- Âge (Range slider)
- Localisation (Dropdown pays/ville)
- Date d'inscription (Date range)

**Recherche :**

- Par nom, email, ID

**Pagination :**

- 25 / 50 / 100 résultats par page

**Actions en masse :**

- Bannir sélection
- Exporter CSV

**Détail utilisateur (Modal ou page dédiée) :**

**Onglets :**

1. **Profil**

   - Infos complètes : Nom, email, âge, genre, bio, intérêts
   - Photos (gallery)
   - Stats : Likes donnés/reçus, Matchs, Messages envoyés

2. **Activité**

   - Timeline : Likes, Matchs, Messages (10 derniers)
   - Dernière connexion
   - Swipes du jour

3. **Abonnement**

   - Tier actuel
   - Historique abonnements
   - Consommables (TIA Hearts, Boosts)
   - Transactions

4. **Modération**
   - Signalements reçus (profil, photos, messages)
   - Historique de modération
   - Actions : Avertir, Bannir, Supprimer photos

**Actions rapides :**

- Envoyer notification
- Bannir (avec raison)
- Réinitialiser mot de passe
- Supprimer compte

#### 3.3.3 Modération

**Vue "Profils à vérifier"**

**Contexte :**
Les utilisateurs soumettent leur CIN pour obtenir le badge "Vérifié".

**Tableau :**

- Avatar + Prénom
- Email
- Photo CIN (uploadée)
- Date de soumission
- Statut (En attente / Approuvé / Rejeté)
- Actions (Approuver, Rejeter)

**Détail vérification (Modal) :**

- Photo profil
- Photo CIN (zoomable)
- Champs à comparer : Prénom, Âge (via date de naissance)
- Boutons : Approuver, Rejeter (avec raison)

**Vue "Photos signalées"**

**Tableau :**

- Photo (thumbnail)
- Utilisateur (nom + lien profil)
- Raisons du signalement (Nudité, Harcèlement, Fake, Autre)
- Nombre de signalements
- Date du premier signalement
- Actions (Approuver, Supprimer, Bannir utilisateur)

**Détail signalement (Modal) :**

- Photo grande taille
- Liste des utilisateurs qui ont signalé (avec raison)
- Actions :
  - Approuver (photo OK)
  - Supprimer photo
  - Avertir utilisateur
  - Bannir utilisateur

**Vue "Messages signalés"**

**Tableau :**

- Message (contenu tronqué)
- Expéditeur (nom + lien)
- Destinataire (nom + lien)
- Raisons (Harcèlement, Spam, Contenu inapproprié)
- Nombre de signalements
- Date
- Actions (Approuver, Supprimer, Bannir)

#### 3.3.4 Abonnements

**Vue "Transactions"**

**Tableau :**

- ID Transaction
- Utilisateur (nom + lien)
- Type (Abonnement Silver/Gold/Elite, Consommable)
- Montant
- Méthode de paiement (Vanilla Pay, CB, Mobile Money)
- Statut (Succès, Échoué, Remboursé)
- Date
- Actions (View, Refund)

**Filtres :**

- Type de transaction
- Statut
- Méthode de paiement
- Date range

**Détail transaction (Modal) :**

- Toutes les infos transaction
- Données Vanilla Pay (transaction_id, gateway_response)
- Bouton "Rembourser" (si succès et < 30 jours)

**Vue "Abonnements actifs"**

**Tableau :**

- Utilisateur
- Tier (Silver/Gold/Elite)
- Date de début
- Date de fin
- Auto-renewal (On/Off)
- Actions (Cancel, Upgrade)

**Vue "Remboursements"**

**Tableau :**

- Transaction ID
- Utilisateur
- Montant remboursé
- Raison
- Date de remboursement
- Statut (En cours, Complété)

#### 3.3.5 Analytics

**Vue "Vue d'ensemble"**

**KPIs principaux (Cards) :**

- DAU (Daily Active Users)
- MAU (Monthly Active Users)
- MRR (Monthly Recurring Revenue)
- Churn rate (%)
- ARPU (Average Revenue Per User)

**Graphiques avancés :**

1. **Funnel d'acquisition**

   - Visiteurs landing page → Téléchargements → Inscriptions → Profils complétés → Premier swipe → Premier match

2. **Rétention (Cohortes)**

   - Table de rétention : % utilisateurs actifs après 1j, 7j, 30j, 90j
   - Par cohorte d'inscription (mois)

3. **Engagement par tier**

   - Swipes moyens/jour par tier
   - Messages moyens/jour par tier

4. **Répartition géographique**
   - Carte du monde avec heatmap (nombre d'utilisateurs par pays/région)

**Export :**

- Export CSV de tous les graphiques
- Export PDF du rapport complet

**Vue "Croissance"**

**Graphiques :**

- Nouveaux utilisateurs par jour/semaine/mois
- Croissance cumulée
- Taux de conversion (Téléchargements → Inscriptions)

**Vue "Engagement"**

**Métriques :**

- Swipes moyens par utilisateur/jour
- Likes moyens par utilisateur/jour
- Matchs moyens par utilisateur/jour
- Messages moyens par match
- Session duration moyenne
- Fréquence de retour (jours entre sessions)

#### 3.3.6 Support

**Vue "Tickets ouverts"**

**Tableau :**

- ID Ticket
- Utilisateur (nom + lien)
- Sujet
- Catégorie (Bug, Abonnement, Remboursement, Autre)
- Priorité (Haute, Moyenne, Basse)
- Statut (Nouveau, En cours, Résolu)
- Date de création
- Assigné à (Admin)
- Actions (View, Assign, Close)

**Détail ticket (Page dédiée) :**

- Infos ticket : Sujet, Catégorie, Priorité, Statut
- Utilisateur : Profil complet
- Conversation : Messages entre utilisateur et support
- Actions :
  - Répondre (éditeur riche)
  - Changer statut
  - Changer priorité
  - Assigner à un autre admin
  - Clôturer

**Vue "Historique"**

- Tous les tickets (avec filtre "Résolu")

#### 3.3.7 Paramètres

**Vue "Configuration app"**

**Sections :**

1. **Limites**

   - Swipes/jour pour tier Base (input)
   - Nombre max de photos par profil (input)
   - Distance max de découverte (input en km)

2. **Modération**

   - Activer modération automatique IA (toggle)
   - Seuil de signalements pour review automatique (input)

3. **Notifications**

   - Activer notifications push (toggle)
   - Personnaliser templates de notifications

4. **Paiements**
   - Clés API Vanilla Pay (champs sécurisés)
   - Webhooks URL
   - Activer paiements CB / Mobile Money (toggles)

**Vue "Gestion admins"**

**Tableau :**

- Nom
- Email
- Rôle (Super Admin / Modérateur / Support)
- Dernière connexion
- Statut (Actif / Inactif)
- Actions (Edit, Deactivate, Delete)

**Actions :**

- Ajouter admin (Modal avec formulaire)
- Modifier rôle
- Désactiver/Réactiver

**Vue "Logs d'activité"**

**Tableau :**

- Admin
- Action (Login, User banned, Transaction refunded, etc.)
- Détails (JSON ou texte)
- Timestamp

**Filtres :**

- Admin (Multi-select)
- Type d'action
- Date range

---

## 4. Modèles de Données (Back Office)

### 4.1 Tables Supabase (à créer)

#### admin_users

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'moderator', 'support')),
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE
);
```

#### admin_activity_logs

```sql
CREATE TABLE admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### support_tickets

```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  subject TEXT NOT NULL,
  category TEXT CHECK (category IN ('bug', 'subscription', 'refund', 'other')),
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('new', 'in_progress', 'resolved')) DEFAULT 'new',
  assigned_to UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### ticket_messages

```sql
CREATE TABLE ticket_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES support_tickets(id),
  sender_type TEXT CHECK (sender_type IN ('user', 'admin')),
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### verification_requests

```sql
CREATE TABLE verification_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  cin_photo_url TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  reviewed_by UUID REFERENCES admin_users(id),
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);
```

#### reported_content

```sql
CREATE TABLE reported_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id),
  content_type TEXT CHECK (content_type IN ('profile', 'photo', 'message')),
  content_id UUID NOT NULL,
  reason TEXT CHECK (reason IN ('nudity', 'harassment', 'fake', 'spam', 'other')),
  details TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'removed', 'user_banned')) DEFAULT 'pending',
  reviewed_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.2 Vues Matérialisées (pour Analytics)

#### daily_stats

```sql
CREATE MATERIALIZED VIEW daily_stats AS
SELECT
  DATE(created_at) as date,
  COUNT(DISTINCT id) as new_users,
  COUNT(DISTINCT CASE WHEN current_tier != 'base' THEN id END) as premium_users,
  (SELECT COUNT(*) FROM matches WHERE DATE(match_date) = DATE(users.created_at)) as matches_count,
  (SELECT SUM(amount_paid) FROM subscriptions WHERE DATE(start_date) = DATE(users.created_at)) as daily_revenue
FROM users
GROUP BY DATE(created_at);
```

---

## 5. Technologies & Stack Détaillé

### 5.1 Front-End

**Framework :**

- Next.js 15 (App Router avec React Server Components)

**UI Library :**

- shadcn/ui (Tailwind + Radix UI)
- Composants à utiliser :
  - `Button`, `Card`, `Table`, `Dialog`, `Dropdown`, `Input`, `Select`, `Tabs`, `Accordion`
  - `Sheet` (pour sidebar mobile)
  - `Toast` (notifications)
  - `Badge` (pour statuts, tiers)
  - `Chart` (via Recharts ou Tremor)

**Styling :**

- Tailwind CSS 3.4+
- CSS Modules pour styles spécifiques

**Charts & Visualisation :**

- Recharts (ou Tremor pour UI cohérente avec shadcn)
- React Google Charts (pour carte géographique)

**Forms :**

- React Hook Form + Zod (validation)

**Tables :**

- TanStack Table (ex React Table) pour tables complexes avec tri, filtres, pagination

**Iconographie :**

- lucide-react (cohérent avec shadcn/ui)

### 5.2 Back-End & Database

**Backend :**

- Supabase (PostgreSQL + Auth + Storage + Edge Functions)

**API :**

- Next.js API Routes (App Router : `/app/api/`)
- Supabase RPC Functions pour requêtes complexes

**Authentication :**

- Supabase Auth pour admins
- Middleware Next.js pour protection des routes

**File Storage :**

- Supabase Storage (pour photos CIN, exports CSV/PDF)

### 5.3 Déploiement & DevOps

**Hosting :**

- Vercel (optimisé pour Next.js)

**CI/CD :**

- Vercel Git Integration (auto-deploy sur push)

**Environnements :**

- Production : `tia.app`
- Staging : `staging.tia.app`
- Preview : Branches de feature

**Monitoring :**

- Vercel Analytics
- Sentry (error tracking)
- Supabase Dashboard (pour DB monitoring)

### 5.4 Sécurité

**Authentification Admin :**

- JWT avec Supabase
- Refresh tokens
- MFA (optionnel mais recommandé)

**Protection des Routes :**

- Middleware Next.js pour vérifier rôle admin
- RLS (Row Level Security) Supabase pour toutes les tables admin

**HTTPS :**

- Certificat SSL auto-géré par Vercel

**Rate Limiting :**

- Vercel Edge Config pour limiter requêtes par IP

**Logs :**

- Toutes les actions admin loguées dans `admin_activity_logs`

---

## 6. Design System & UI Guidelines

### 6.1 Palette de Couleurs

**Primaire :**

- `primary-500` : #E94057 (rose/rouge TIA)
- `primary-600` : #D12C43
- `primary-400` : #FF5C6F

**Neutrals :**

- `gray-50` : #F9FAFB
- `gray-100` : #F3F4F6
- `gray-500` : #6B7280
- `gray-900` : #111827

**Sémantiques :**

- Success : `green-500` (#10B981)
- Warning : `yellow-500` (#F59E0B)
- Error : `red-500` (#EF4444)
- Info : `blue-500` (#3B82F6)

**Tiers (Badges) :**

- Base : `gray-500`
- Silver : `slate-400` (#94A3B8)
- Gold : `amber-400` (#FBBF24)
- Elite : `purple-500` (#A855F7)

### 6.2 Typographie

**Font Family :**

- Primary : `Inter` (via Google Fonts)
- Monospace : `Fira Code` (pour IDs, JSON)

**Tailles :**

- H1 : `text-4xl` (36px) / Bold
- H2 : `text-3xl` (30px) / Semibold
- H3 : `text-2xl` (24px) / Semibold
- Body : `text-base` (16px) / Regular
- Small : `text-sm` (14px) / Regular
- Tiny : `text-xs` (12px) / Medium

### 6.3 Composants UI Récurrents

**Cards :**

- Fond : `bg-white`
- Border : `border border-gray-200`
- Shadow : `shadow-sm`
- Padding : `p-6`
- Radius : `rounded-lg`

**Buttons :**

- Primary : `bg-primary-500 hover:bg-primary-600 text-white`
- Secondary : `bg-gray-100 hover:bg-gray-200 text-gray-900`
- Danger : `bg-red-500 hover:bg-red-600 text-white`

**Tables :**

- Header : `bg-gray-50 text-gray-700 font-medium`
- Rows : `hover:bg-gray-50 border-b border-gray-200`
- Actions : Icônes (lucide-react) avec tooltips

**Badges :**

- Tiers : Couleur tier + texte blanc/noir (selon contraste)
- Statuts : Couleur sémantique + icône

---

## 7. Étapes de Développement

### Phase 1 : Setup & Landing Page (Semaine 1-2)

**Tâches :**

1. Initialiser projet Next.js 15
2. Configurer Tailwind CSS + shadcn/ui
3. Créer layout de base (Header, Footer)
4. Développer sections Landing Page :
   - Hero
   - Fonctionnalités
   - Comment ça marche
   - Témoignages
   - Tarifs
   - FAQ
   - CTA Final
5. Optimiser SEO (meta tags, sitemap, robots.txt)
6. Intégrer analytics (Vercel, GA4)
7. Tests responsiveness (Mobile, Tablet, Desktop)
8. Déployer sur Vercel

**Livrables :**

- Landing page fully responsive
- SEO optimisé
- Analytics en place

### Phase 2 : Back Office - Structure & Auth (Semaine 3)

**Tâches :**

1. Créer tables Supabase (`admin_users`, `admin_activity_logs`, etc.)
2. Développer système d'auth admin (login, logout, MFA optionnel)
3. Créer layout Back Office (Sidebar, Header)
4. Middleware de protection des routes
5. Dashboard (vue d'ensemble avec KPIs)

**Livrables :**

- Authentification admin fonctionnelle
- Layout Back Office responsive
- Dashboard avec métriques basiques

### Phase 3 : Back Office - Gestion Utilisateurs (Semaine 4)

**Tâches :**

1. Page "Tous les utilisateurs" (tableau, filtres, recherche)
2. Détail utilisateur (modal avec onglets)
3. Actions : Bannir, Supprimer, Réinitialiser mot de passe
4. Export CSV

**Livrables :**

- Gestion utilisateurs complète

### Phase 4 : Back Office - Modération (Semaine 5)

**Tâches :**

1. Page "Profils à vérifier" (vérification CIN)
2. Page "Photos signalées"
3. Page "Messages signalés"
4. Système de notifications pour nouveaux signalements

**Livrables :**

- Modération complète (profils, photos, messages)

### Phase 5 : Back Office - Abonnements & Analytics (Semaine 6)

**Tâches :**

1. Page "Transactions"
2. Page "Abonnements actifs"
3. Page "Remboursements"
4. Page Analytics (graphiques avec Recharts/Tremor)
5. Vues matérialisées Supabase pour stats

**Livrables :**

- Gestion abonnements
- Analytics avancées

### Phase 6 : Back Office - Support & Paramètres (Semaine 7)

**Tâches :**

1. Système de tickets (création, assignation, résolution)
2. Page "Gestion admins"
3. Page "Configuration app"
4. Page "Logs d'activité"

**Livrables :**

- Support utilisateur fonctionnel
- Paramètres configurables

### Phase 7 : Tests & Optimisation (Semaine 8)

**Tâches :**

1. Tests end-to-end (Playwright ou Cypress)
2. Tests unitaires (Jest + React Testing Library)
3. Optimisation performance (Lighthouse)
4. Accessibilité (WCAG AA)
5. Security audit (OWASP)

**Livrables :**

- Code testé et optimisé
- Score Lighthouse 95+
- Zero vulnerabilities critiques

### Phase 8 : Déploiement Production (Semaine 9)

**Tâches :**

1. Configuration domaines (tia.app, admin.tia.app)
2. Déploiement production sur Vercel
3. Configuration DNS
4. Monitoring (Sentry, Vercel Analytics)
5. Documentation utilisateur (pour admins)

**Livrables :**

- Landing page + Back Office en production
- Monitoring en place
- Documentation complète

---

## 8. Critères de Succès

### Landing Page

**Technique :**

- [ ] Score Lighthouse Performance : 95+
- [ ] Score Lighthouse SEO : 100
- [ ] Score Lighthouse Accessibility : 95+
- [ ] Temps de chargement < 2s (Desktop), < 3s (Mobile)
- [ ] Responsive sur tous devices (Mobile, Tablet, Desktop)

**Business :**

- [ ] Taux de conversion (Visite → Download) : 5% minimum
- [ ] Taux de rebond < 50%
- [ ] Temps moyen sur page > 2 minutes

### Back Office

**Technique :**

- [ ] Toutes les pages chargent en < 1s
- [ ] Aucun bug critique
- [ ] Sécurité : Zero vulnérabilités OWASP Top 10
- [ ] 100% des actions admin loguées

**Business :**

- [ ] Temps de réponse modération < 24h
- [ ] Temps de résolution ticket support < 48h
- [ ] 100% des transactions trackées

---

## 9. Ressources & Références

**Design Inspiration :**

- [Tinder Web](https://tinder.com) - Landing page
- [Bumble](https://bumble.com) - Tonalité, design
- [Vercel Dashboard](https://vercel.com) - Back office moderne
- [Stripe Dashboard](https://stripe.com) - Analytics, tables

**Documentation Technique :**

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

**Libraries & Tools :**

- [Recharts](https://recharts.org/) - Charts
- [TanStack Table](https://tanstack.com/table) - Tables complexes
- [React Hook Form](https://react-hook-form.com/) - Forms
- [Zod](https://zod.dev/) - Validation

---

## 10. Questions Ouvertes & Décisions à Prendre

**Landing Page :**

1. **Langue** : Français uniquement ou multilingue (FR/EN) ?
2. **CMS** : Contenu hardcodé ou CMS headless (Sanity, Contentful) ?
3. **Blog** : Prévoir un blog pour SEO ? (À discuter)

**Back Office :**

1. **Modération IA** : Utiliser un service tiers (Sightengine, AWS Rekognition) pour modération automatique ?
2. **MFA** : Obligatoire pour tous les admins ou optionnel ?
3. **Notifications** : Email, Slack, ou in-app uniquement ?

**Général :**

1. **Budget** : Quelle contrainte budgétaire pour services tiers ?
2. **Timeline** : Deadlines absolues ou flexibles ?
3. **Design** : Maquettes Figma existantes ou création from scratch ?

---

## Conclusion

Cette spécification fournit un plan complet pour développer le landing page et le back office de TIA avec Next.js et shadcn/ui. L'architecture est modulaire, scalable et optimisée pour la performance et la sécurité. Le planning propose 9 semaines de développement itératif avec des livrables clairs à chaque phase.

**Prochaines étapes :**

1. Validation de cette spec
2. Création des maquettes Figma (si nécessaire)
3. Initialisation du projet Next.js
4. Sprint 1 : Landing Page

---

**Document créé le** : 2025-12-29
**Version** : 1.0
**Auteur** : Claude (Anthropic)
**Projet** : TIA - Landing Page & Back Office
