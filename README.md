# GouvConnect Sénégal

Plateforme web officielle pour faciliter l'accès aux démarches administratives du gouvernement du Sénégal.

## 🎯 Objectif

GouvConnect Sénégal simplifie l'accès aux services administratifs en offrant :
- **Recherche centralisée** : Trouvez rapidement vos démarches
- **Navigation intuitive** : Organisation par catégories thématiques
- **Assistance intelligente** : Chatbot intégré pour vous guider
- **Informations complètes** : Étapes détaillées, documents requis, délais et coûts
- **Interface multilingue** : Français, Wolof, Anglais

## 🚀 Fonctionnalités

### Fonctionnalités principales
- ✅ Recherche intelligente avec suggestions
- ✅ Navigation par catégories (État civil, Passeport, Fiscalité, etc.)
- ✅ Chatbot d'assistance conversationnelle
- ✅ Fiches démarches détaillées
- ✅ Interface responsive (mobile, tablette, desktop)
- ✅ Système multilingue
- ✅ Partage social et favoris
- ✅ Interface d'administration

### Technologies utilisées
- **Frontend** : React 18 + TypeScript + Tailwind CSS
- **Backend** : Firebase (Firestore, Auth, Storage)
- **Animations** : Framer Motion
- **Routing** : React Router DOM
- **Forms** : React Hook Form + Yup
- **Notifications** : React Hot Toast
- **Build** : Vite

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Firebase
- Clé API OpenAI (pour le chatbot)

### 1. Cloner le projet
```bash
git clone https://github.com/your-repo/gouvconnect-senegal.git
cd gouvconnect-senegal
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration Firebase

1. Créez un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activez Firestore Database
3. Activez Authentication (Email/Password)
4. Activez Storage
5. Copiez la configuration Firebase

### 4. Configuration des variables d'environnement

Copiez le fichier `.env.example` vers `.env` :
```bash
cp .env.example .env
```

Remplissez les variables :
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=gouvconnect-senegal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gouvconnect-senegal
VITE_FIREBASE_STORAGE_BUCKET=gouvconnect-senegal.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123DEF

# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-...
```

### 5. Initialiser les données de démonstration

Les données de démonstration seront créées automatiquement au premier lancement.

### 6. Démarrer le serveur de développement
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🏗️ Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Layout/         # Header, Footer
│   ├── Chatbot/        # Système de chat
│   └── ...
├── context/            # Contexts React (état global)
├── pages/              # Pages de l'application
├── services/           # Services Firebase
├── types/              # Types TypeScript
├── config/             # Configuration Firebase
└── utils/              # Fonctions utilitaires
```

## 🎨 Design System

### Palette de couleurs
- **Primaire** : Bleu institutionnel (#1E40AF, #3B82F6)
- **Secondaire** : Vert émeraude (#059669)
- **Accent** : Orange (#F97316)
- **Neutres** : Nuances de gris
- **États** : Vert (succès), Rouge (erreur), Jaune (attention)

### Typographie
- **Polices** : Système par défaut (system-ui, sans-serif)
- **Poids** : 400, 600, 700 maximum
- **Interlignage** : 150% pour le texte, 120% pour les titres

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Aperçu du build
npm run preview

# Linting
npm run lint

# Type checking  
npm run type-check
```

## 📊 Base de données Firestore

### Collections principales

#### `demarches`
```javascript
{
  id: string,
  titre: string,
  categorie: string,
  resume: string,  
  description: string,
  etapes: Etape[],
  documentsRequis: Document[],
  contacts: Contact[],
  delais: string,
  cout?: string,
  popularite: number,
  statut: 'actif' | 'suspendu',
  // ...
}
```

#### `categories`
```javascript
{
  id: string,
  nom: string,
  description: string,
  icone: string,
  couleur: string,
  sousCategories: SousCategorie[],
  ordre: number
}
```

#### `faq`
```javascript
{
  id: string,
  question: string,
  reponse: string,
  categorie: string,
  ordre: number
}
```

## 🤖 Configuration du Chatbot

Le chatbot utilise l'API OpenAI. Configuration dans `src/services/chatbot.ts` :

```javascript
const response = await openai.completions.create({
  model: "gpt-3.5-turbo",
  messages: [...],
  temperature: 0.7,
  max_tokens: 150
});
```

## 🚀 Déploiement

### 1. Build de production
```bash
npm run build
```

### 2. Déploiement avec Firebase Hosting
```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Initialiser le projet
firebase init hosting

# Déployer
firebase deploy
```

### 3. Déploiement avec Netlify
```bash
# Build
npm run build

# Glisser-déposer le dossier dist/ sur netlify.com
# Ou utiliser la CLI Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### 4. Variables d'environnement en production

Configurez les variables d'environnement dans votre plateforme de déploiement :
- Netlify : Site settings > Environment variables
- Vercel : Project settings > Environment Variables
- Firebase : `firebase functions:config:set`

## 🔒 Sécurité

### Règles Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Démarches publiques en lecture
    match /demarches/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Administration seulement pour les admins
    match /admin/{document} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### Rules Storage
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## 📈 Analytics et Monitoring

### Google Analytics 4
Configuration dans `src/config/analytics.ts` :
```javascript
gtag('config', 'GA_TRACKING_ID', {
  page_title: document.title,
  page_location: window.location.href
});
```

### Monitoring des erreurs
```javascript
// Sentry (optionnel)
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN",
  environment: process.env.NODE_ENV
});
```

## 🧪 Tests

### Tests unitaires avec Vitest
```bash
# Installer les dépendances de test
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Lancer les tests
npm run test

# Coverage
npm run test:coverage
```

### Tests E2E avec Playwright
```bash
# Installer Playwright
npm install -D @playwright/test

# Lancer les tests E2E
npm run test:e2e
```

## 🔧 Maintenance

### Mise à jour des données
1. Interface d'administration : `/admin`
2. Import CSV/JSON via l'interface
3. API REST pour intégrations externes

### Backup automatique
```bash
# Export Firestore
gcloud firestore export gs://your-bucket/backups/$(date +%Y%m%d)

# Restauration
gcloud firestore import gs://your-bucket/backups/20231215
```

### Monitoring des performances
- Lighthouse CI pour les performances
- Firebase Performance Monitoring
- Real User Monitoring (RUM)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Guidelines de contribution
- Code en TypeScript avec types stricts
- Tests unitaires pour les nouvelles fonctionnalités
- Documentation mise à jour
- Respect des conventions de nommage
- Messages de commit descriptifs

## 📄 Licence

Ce projet est sous licence MIT. Voir `LICENSE` pour plus de détails.

## 🆘 Support

- **Documentation** : README.md et docs/
- **Issues** : GitHub Issues
- **Email** : support@gouvconnect.sn
- **Slack** : #gouvconnect-dev

## 📚 Ressources

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

## 🎉 Remerciements

- Gouvernement du Sénégal
- Équipe de développement
- Contributeurs open source
- Communauté des utilisateurs

---

**Fait avec ❤️ pour les citoyens du Sénégal**