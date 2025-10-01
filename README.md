# KREDI LAKAY - Système de Gestion de Portefeuille de Prêts

Application web complète de gestion de portefeuille de prêts pour les institutions de microfinance, agents de crédit et caissiers.

## 🎯 Fonctionnalités Principales

### Front-Office
- **Tableau de Bord Interactif** - Visualisation en temps réel des KPI et performances
- **Gestion des Membres** - Enregistrement, KYC, profils détaillés
- **Gestion des Prêts** - Types multiples (journalier, hebdomadaire, mensuel, bi-hebdomadaire)
- **Traitement des Paiements** - Multi-méthodes avec génération automatique de reçus
- **Recherche Avancée** - Recherche multi-critères performante
- **Notifications en Temps Réel** - Alertes et rappels automatiques

### Back-Office
- **Gestion des Utilisateurs** - Rôles: Super Admin, Admin, Manager, Agent, Caissier
- **Suivi des Dépenses** - Catégorisation et approbation
- **Calcul des Commissions** - Automatique avec suivi de performance
- **Rapports et Analytics** - Portefeuille, Cash Flow, P&L, comparatifs agents
- **Audit et Logs** - Traçabilité complète des opérations
- **Paramètres Système** - Configuration des taux, commissions, et paramètres

## 🛠️ Technologies Utilisées

- **Framework**: Next.js 14 (App Router) + TypeScript
- **UI Components**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **State Management**: React Context API + Hooks

## 📦 Installation

   ```bash
# Cloner le repository
   git clone <repository-url>
   cd krediLakay

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Modifier .env.local avec vos credentials Supabase

# Lancer le serveur de développement
npm run dev
```

## 🚀 Démarrage Rapide

1. **Configuration Supabase**
   ```bash
   # Créer un projet Supabase sur https://supabase.com
   # Copier l'URL et la clé API dans .env.local
   ```

2. **Migration de la base de données**
   ```sql
   -- Exécuter le fichier supabase_migration.sql dans l'éditeur SQL Supabase
   -- Cela créera toutes les tables, triggers et fonctions nécessaires
   ```

3. **Lancer l'application**
   ```bash
   npm run dev
   # Ouvrir http://localhost:3000
   ```

## 📁 Structure du Projet

```
krediLakay/
├── app/                        # Pages Next.js (App Router)
│   ├── page.tsx               # Dashboard principal
│   ├── members/               # Gestion des membres
│   ├── loans/                 # Gestion des prêts
│   ├── payments/              # Traitement des paiements
│   ├── expenses/              # Gestion des dépenses
│   ├── commissions/           # Suivi des commissions
│   ├── analytics/             # Rapports et analytics
│   ├── admin/                 # Administration
│   ├── audit/                 # Audit et logs
│   └── support/               # Support et aide
│
├── components/                # Composants React réutilisables
│   ├── ui/                    # Composants UI de base (shadcn/ui)
│   ├── layout/                # Header, Sidebar, Navigation
│   ├── dashboard/             # Composants du tableau de bord
│   ├── loans/                 # Composants de gestion de prêts
│   ├── payments/              # Composants de paiement
│   ├── admin/                 # Composants d'administration
│   ├── clients/               # Composants de gestion client
│   ├── notifications/         # Centre de notifications
│   ├── search/                # Recherche avancée
│   └── export/                # Exportation de données
│
├── lib/                       # Utilitaires et helpers
│   ├── supabase.ts           # Client Supabase
│   ├── api.ts                # Fonctions API
│   ├── types.ts              # Types TypeScript
│   ├── utils.ts              # Fonctions utilitaires
│   ├── auth.ts               # Authentification
│   └── commission.ts         # Calculs de commissions
│
├── supabase_migration.sql     # Migration de base de données
└── package.json               # Dépendances du projet
```

## 🗄️ Architecture de la Base de Données

### Tables Principales
- `institutions` - Gestion multi-tenant
- `loan_types` - Produits de prêt configurables
- `profiles` - Utilisateurs et rôles
- `clients` - Base de membres avec KYC
- `loans` - Gestion des prêts
- `payment_schedules` - Calendriers de remboursement
- `payments` - Enregistrement des paiements
- `kyc_documents` - Documents KYC
- `commissions` - Calcul des commissions
- `notifications` - Système de notifications
- `reports` - Rapports générés
- `expenses` - Gestion des dépenses

## 👥 Rôles et Permissions

- **Super Admin**: Accès complet au système
- **Admin**: Gestion de l'institution et utilisateurs
- **Manager**: Supervision des opérations
- **Agent**: Gestion des clients et prêts
- **Caissier**: Traitement des paiements

## 📊 Fonctionnalités Avancées

### Types de Prêts Supportés
- **Quotidien** - Remboursements journaliers
- **Hebdomadaire** - Remboursements hebdomadaires
- **Bi-hebdomadaire** - Remboursements toutes les 2 semaines
- **Mensuel** - Remboursements mensuels

### Calculs Automatiques
- Échéanciers de paiement
- Intérêts composés
- Commissions des agents
- Pénalités de retard
- Évaluation des risques

### Rapports Disponibles
- Portfolio de prêts
- Cash Flow Analysis
- Profit & Loss (P&L)
- Performance des agents
- Analyse de tendances
- KYC Status
- Risk Assessment

## 🔒 Sécurité

- **Row Level Security (RLS)** - Sécurité au niveau base de données
- **Role-Based Access Control** - Contrôle d'accès basé sur les rôles
- **Audit Trail** - Traçabilité complète des opérations
- **Data Validation** - Validation avec Zod
- **Secure Authentication** - via Supabase Auth

## 🎨 Interface Utilisateur

- **Design Moderne** - Interface professionnelle type banking app
- **Responsive** - Compatible desktop, tablette, mobile
- **Accessible** - Conforme aux standards WCAG
- **Thème** - Palette de couleurs bleue/violette professionnelle
- **Animations** - Transitions fluides et feedback visuel

## 📱 Support Mobile

L'application est entièrement responsive et optimisée pour:
- Smartphones (iOS/Android)
- Tablettes
- Desktop (Windows/Mac/Linux)

## 🌐 Navigateurs Supportés

- Chrome/Edge (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Compile pour production
npm start            # Lance le serveur de production

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
npm run type-check   # Vérifie les types TypeScript
```

## 📚 Documentation

Pour plus d'informations:
- **Base de Connaissances**: Accessible via `/support/kb`
- **API Documentation**: Voir `lib/api.ts`
- **Type Definitions**: Voir `lib/types.ts`

## 🤝 Support

- **Email**: support@kredilakay.com
- **Téléphone**: +509-1234-5678
- **Documentation**: http://localhost:3000/support/kb

## 📝 Licence

Copyright © 2024 KREDI LAKAY. Tous droits réservés.

## 🔄 Version

**Version actuelle**: 1.0.0

### Prochaines Fonctionnalités
- Intégration SMS/Email notifications
- API Mobile Money
- Intégration bureau de crédit
- PWA pour utilisation offline
- Multi-langue (Créole, Français, Anglais)
- Rapports PDF avancés
- Dashboard temps réel avec WebSockets

## 👨‍💻 Développement

### Pré-requis
- Node.js 18+ et npm
- Compte Supabase
- Éditeur de code (VS Code recommandé)

### Configuration de développement
1. Installer les dépendances
2. Configurer Supabase
3. Exécuter les migrations
4. Lancer le serveur de dev

### Structure des Commits
```
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Formatage
refactor: Refactoring
test: Tests
chore: Maintenance
```

## 🐛 Rapport de Bugs

Pour reporter un bug, veuillez inclure:
- Description du problème
- Étapes pour reproduire
- Comportement attendu vs actuel
- Screenshots si applicable
- Version du navigateur/OS

## 🎯 Roadmap

- [ ] Q1 2024: Lancement version 1.0
- [ ] Q2 2024: Intégrations externes (SMS, Mobile Money)
- [ ] Q3 2024: Application mobile native
- [ ] Q4 2024: IA pour scoring crédit automatique

---

**Développé avec ❤️ pour les institutions de microfinance haïtiennes**
