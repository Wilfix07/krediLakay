# 📖 Guide d'Installation - KREDI LAKAY

## 🎯 Installation Complète en 5 Étapes

### Étape 1: Cloner et Installer les Dépendances ✅

```bash
# Si pas déjà fait, cloner le repository
git clone <repository-url>
cd krediLakay

# Installer toutes les dépendances
npm install
```

**Vérification:**
```bash
npm list --depth=0
# Devrait afficher toutes les dépendances installées
```

---

### Étape 2: Configuration de Supabase ⚠️

#### 2.1 Créer un Projet Supabase

1. Aller sur https://supabase.com
2. Créer un compte ou se connecter
3. Cliquer sur "New Project"
4. Choisir:
   - **Organization**: Votre organisation
   - **Name**: kredi-lakay (ou autre nom)
   - **Database Password**: Choisir un mot de passe fort
   - **Region**: Choisir la région la plus proche (ex: us-east-1)
5. Attendre la création du projet (~2 minutes)

#### 2.2 Obtenir les Credentials

1. Dans le dashboard Supabase, aller à **Settings** → **API**
2. Copier les informations suivantes:
   - **Project URL** (commence par https://xxx.supabase.co)
   - **anon public key** (commence par eyJ...)

#### 2.3 Créer le Fichier d'Environnement

Créer un fichier `.env.local` à la racine du projet:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Application Configuration
NEXT_PUBLIC_APP_NAME=KREDI LAKAY
NEXT_PUBLIC_APP_VERSION=1.0.0
```

**⚠️ Remplacer** les valeurs avec vos vraies credentials Supabase!

---

### Étape 3: Migration de la Base de Données ⚠️

#### 3.1 Accéder à l'Éditeur SQL

1. Dans Supabase, aller à **SQL Editor**
2. Cliquer sur **New Query**

#### 3.2 Exécuter la Migration

1. Ouvrir le fichier `supabase_migration.sql`
2. **Copier TOUT le contenu** du fichier
3. **Coller** dans l'éditeur SQL Supabase
4. Cliquer sur **Run** ou **Ctrl+Enter**

#### 3.3 Vérifier la Migration

```sql
-- Vérifier que les tables sont créées
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Devrait afficher 12 tables:
-- institutions, loan_types, profiles, clients, loans,
-- payment_schedules, payments, kyc_documents, kyc_verifications,
-- commissions, notifications, reports
```

#### 3.4 Résolution de Problèmes

**Si erreur "policy already exists":**
- ✅ Le script gère déjà cette erreur avec `DROP POLICY IF EXISTS`
- Relancez simplement le script complet

**Si erreur "table already exists":**
```sql
-- Option 1: Nettoyer la base (ATTENTION: supprime toutes les données!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- Option 2: Décommenter les lignes DROP TABLE au début du script
```

---

### Étape 4: Lancer l'Application ✅

```bash
# Lancer le serveur de développement
npm run dev
```

**Output attendu:**
```
✓ Starting...
✓ Ready in 3s
- Local:        http://localhost:3000
```

**L'application sera accessible à:**
- http://localhost:3000 (ou 3001, 3002, 3003, 3004 si ports occupés)

---

### Étape 5: Vérification ✅

#### 5.1 Tester la Navigation

1. **Dashboard** - Ouvrir http://localhost:3000
   - ✅ Devrait afficher le tableau de bord avec graphiques
   - ✅ Vérifier que les statistiques s'affichent

2. **Membres** - Cliquer sur "Membres" dans le menu
   - ✅ Devrait afficher la page de gestion des membres
   - ✅ Tester les onglets (Liste, Recherche, Profils, KYC)

3. **Prêts** - Cliquer sur "Prêts"
   - ✅ Devrait afficher la gestion des prêts
   - ✅ Tester les onglets (Prêts, Nouvelles Demandes, Produits)

4. **Paiements** - Cliquer sur "Paiements"
   - ✅ Devrait afficher la gestion financière
   - ✅ Tester les onglets (Paiements, Dépenses)

5. **Administration** - Cliquer sur "Administration"
   - ✅ Devrait afficher le panneau d'administration
   - ✅ Tester les onglets (Vue d'ensemble, Utilisateurs, Paramètres, Système)

#### 5.2 Tester les Fonctionnalités

- [ ] Notifications en temps réel (clocher en haut à droite)
- [ ] Recherche avancée (menu Membres → Recherche)
- [ ] Menu expandable (cliquer sur les sections avec sous-menus)
- [ ] Responsive mobile (réduire la fenêtre)
- [ ] Navigation entre les pages

---

## 🐛 Dépannage

### Problème: "Module not found"
```bash
# Solution: Réinstaller les dépendances
npm install
```

### Problème: "Port already in use"
```bash
# Next.js trouvera automatiquement le prochain port disponible
# L'URL sera affichée dans la console (ex: http://localhost:3001)
```

### Problème: Cache Next.js corrompu
```bash
# Nettoyer le cache
Remove-Item -Recurse -Force .next
npm run dev
```

### Problème: Erreurs Supabase
```bash
# Vérifier le fichier .env.local
# - Les URLs doivent être correctes
# - Les clés ne doivent pas avoir d'espaces
# - Le fichier doit être à la racine du projet
```

### Problème: "Failed to compile"
```bash
# 1. Vérifier qu'il n'y a pas d'erreurs TypeScript
npm run lint

# 2. Nettoyer et reconstruire
Remove-Item -Recurse -Force .next
npm run dev
```

---

## 📊 Checklist de Vérification

### Configuration ✅
- [ ] Dépendances installées (`npm install`)
- [ ] Fichier `.env.local` créé avec credentials Supabase
- [ ] Migration SQL exécutée dans Supabase
- [ ] Serveur de développement lancé (`npm run dev`)
- [ ] Application accessible dans le navigateur

### Fonctionnalités ✅
- [ ] Dashboard s'affiche correctement
- [ ] Navigation fonctionne
- [ ] Sous-menus s'expandent
- [ ] Notifications apparaissent
- [ ] Recherche fonctionne
- [ ] Responsive mobile ok

### Base de Données ✅
- [ ] 12 tables créées
- [ ] RLS activé
- [ ] Policies configurées
- [ ] Indexes créés
- [ ] Triggers fonctionnels

---

## 🎨 Premières Étapes dans l'App

### 1. Explorer le Dashboard
- Voir les graphiques interactifs
- Consulter les KPI en temps réel
- Vérifier les notifications

### 2. Créer un Type de Prêt
1. Menu **Prêts** → Onglet **Produits**
2. Cliquer **Nouveau Type**
3. Remplir le formulaire (nom, taux, montants, durée)
4. Sauvegarder

### 3. Ajouter un Membre (Futur)
1. Menu **Membres**
2. Cliquer **Nouveau Membre**
3. Remplir les informations KYC
4. Sauvegarder

### 4. Créer une Demande de Prêt (Futur)
1. Menu **Prêts** → Onglet **Nouvelles Demandes**
2. Sélectionner un client
3. Choisir le type de prêt
4. Remplir le formulaire
5. Voir le calendrier de remboursement généré automatiquement
6. Soumettre

---

## 🔐 Configuration Avancée (Optionnel)

### Authentification Supabase

Pour activer l'authentification réelle:

1. Dans Supabase: **Authentication** → **Providers**
2. Activer **Email** provider
3. Configurer les URLs de redirection
4. Créer le premier utilisateur admin

### Variables d'Environnement Additionnelles

```env
# SMS (Optionnel)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# Email (Optionnel)
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@kredilakay.com

# Mobile Money (Optionnel)
MONCASH_CLIENT_ID=your-moncash-client-id
MONCASH_SECRET_KEY=your-moncash-secret
```

---

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Compile pour production
npm start            # Lance le serveur de production

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
```

---

## 🚀 Déploiement (Production)

### Option 1: Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Suivre les instructions
# Configurer les variables d'environnement dans Vercel dashboard
```

### Option 2: Netlify

1. Connecter le repository à Netlify
2. Configurer les variables d'environnement
3. Build command: `npm run build`
4. Publish directory: `.next`

### Option 3: VPS/Serveur Dédié

```bash
# Build
npm run build

# Installer PM2
npm install -g pm2

# Lancer avec PM2
pm2 start npm --name "kredilakay" -- start

# Configurer reverse proxy (Nginx)
```

---

## 📞 Support

### En cas de problème:

1. **Vérifier les logs**:
   ```bash
   # Logs de compilation dans la console
   ```

2. **Vérifier la configuration**:
   - .env.local existe et est correct
   - Supabase est configuré
   - Migration SQL exécutée

3. **Nettoyer et redémarrer**:
   ```bash
   Remove-Item -Recurse -Force .next
   npm install
   npm run dev
   ```

4. **Contacter le support technique**:
   - Email: support@kredilakay.com
   - Documentation: /support/kb dans l'app

---

## ✅ Installation Réussie!

Si vous voyez le Dashboard avec les graphiques et le menu de navigation:
- 🎉 **Félicitations!** L'installation est réussie!
- 🚀 **Prochaine étape**: Explorer les fonctionnalités
- 📚 **Documentation**: Consultez README.md pour plus d'infos

---

**Bon développement avec KREDI LAKAY!** 🏦

