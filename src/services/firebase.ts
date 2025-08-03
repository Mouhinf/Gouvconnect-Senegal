import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  writeBatch,
  increment
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Demarche, Categorie, FAQ, Feedback, ChatMessage } from '../types';

// Collections references
const demarchesRef = collection(db, 'demarches');
const categoriesRef = collection(db, 'categories');
const faqRef = collection(db, 'faq');
const feedbackRef = collection(db, 'feedback');
const chatRef = collection(db, 'chat');
const analyticsRef = collection(db, 'analytics');

// Démarches services
export const demarcheService = {
  async getAll(): Promise<Demarche[]> {
    const snapshot = await getDocs(query(demarchesRef, where('statut', '==', 'actif')));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Demarche));
  },

  async getById(id: string): Promise<Demarche | null> {
    const docSnap = await getDoc(doc(demarchesRef, id));
    if (docSnap.exists()) {
      // Increment popularity counter
      await updateDoc(doc(demarchesRef, id), {
        popularite: increment(1)
      });
      return { id: docSnap.id, ...docSnap.data() } as Demarche;
    }
    return null;
  },

  async getByCategory(categorieId: string): Promise<Demarche[]> {
    const q = query(
      demarchesRef,
      where('categorie', '==', categorieId),
      where('statut', '==', 'actif'),
      orderBy('popularite', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Demarche));
  },

  async search(terme: string, filters?: any): Promise<Demarche[]> {
    // Simple search implementation - in production, consider using Algolia or similar
    const snapshot = await getDocs(query(demarchesRef, where('statut', '==', 'actif')));
    const demarches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Demarche));
    
    return demarches.filter(demarche => 
      demarche.titre.toLowerCase().includes(terme.toLowerCase()) ||
      demarche.resume.toLowerCase().includes(terme.toLowerCase()) ||
      demarche.motsCles.some(mot => mot.toLowerCase().includes(terme.toLowerCase()))
    );
  },

  async getPopular(limit_count = 10): Promise<Demarche[]> {
    const q = query(
      demarchesRef,
      where('statut', '==', 'actif'),
      orderBy('popularite', 'desc'),
      limit(limit_count)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Demarche));
  },

  async create(demarche: Omit<Demarche, 'id'>): Promise<string> {
    const docRef = await addDoc(demarchesRef, {
      ...demarche,
      dateCreation: Timestamp.now(),
      dateMiseAJour: Timestamp.now()
    });
    return docRef.id;
  },

  async update(id: string, updates: Partial<Demarche>): Promise<void> {
    await updateDoc(doc(demarchesRef, id), {
      ...updates,
      dateMiseAJour: Timestamp.now()
    });
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(demarchesRef, id));
  }
};

// Categories services
export const categorieService = {
  async getAll(): Promise<Categorie[]> {
    const snapshot = await getDocs(query(categoriesRef, orderBy('ordre')));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Categorie));
  },

  async getById(id: string): Promise<Categorie | null> {
    const docSnap = await getDoc(doc(categoriesRef, id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Categorie;
    }
    return null;
  },

  async create(categorie: Omit<Categorie, 'id'>): Promise<string> {
    const docRef = await addDoc(categoriesRef, categorie);
    return docRef.id;
  },

  async update(id: string, updates: Partial<Categorie>): Promise<void> {
    await updateDoc(doc(categoriesRef, id), updates);
  }
};

// FAQ services
export const faqService = {
  async getAll(): Promise<FAQ[]> {
    const snapshot = await getDocs(query(faqRef, orderBy('ordre')));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FAQ));
  },

  async getByCategory(categorie: string): Promise<FAQ[]> {
    const q = query(faqRef, where('categorie', '==', categorie), orderBy('ordre'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FAQ));
  }
};

// Feedback services
export const feedbackService = {
  async create(feedback: Omit<Feedback, 'id' | 'dateCreation' | 'statut'>): Promise<string> {
    const docRef = await addDoc(feedbackRef, {
      ...feedback,
      dateCreation: Timestamp.now(),
      statut: 'nouveau'
    });
    return docRef.id;
  },

  async getAll(): Promise<Feedback[]> {
    const snapshot = await getDocs(query(feedbackRef, orderBy('dateCreation', 'desc')));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feedback));
  }
};

// Chat services
export const chatService = {
  async saveMessage(message: Omit<ChatMessage, 'id'>): Promise<string> {
    const docRef = await addDoc(chatRef, {
      ...message,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  }
};

// Analytics services
export const analyticsService = {
  async trackSearch(terme: string, resultats: number): Promise<void> {
    await addDoc(analyticsRef, {
      type: 'search',
      terme,
      resultats,
      timestamp: Timestamp.now()
    });
  },

  async trackPageView(page: string): Promise<void> {
    await addDoc(analyticsRef, {
      type: 'page_view',
      page,
      timestamp: Timestamp.now()
    });
  }
};

// Initialize demo data
export const initializeDemoData = async (): Promise<void> => {
  try {
    // Check if data already exists
    const existingDemarches = await getDocs(query(demarchesRef, limit(1)));
    if (!existingDemarches.empty) {
      console.log('Demo data already exists');
      return;
    }

    const batch = writeBatch(db);

    // Demo categories
    const demoCategories: Omit<Categorie, 'id'>[] = [
      {
        nom: "État Civil",
        description: "Actes de naissance, mariage, décès et autres documents d'état civil",
        icone: "FileText",
        couleur: "#3B82F6",
        sousCategories: [
          { id: "naissance", nom: "Actes de naissance", description: "Demande et renouvellement d'actes de naissance" },
          { id: "mariage", nom: "Actes de mariage", description: "Procédures de mariage et actes" },
          { id: "deces", nom: "Actes de décès", description: "Déclaration de décès et actes" }
        ],
        ordre: 1,
        nombreDemarches: 8
      },
      {
        nom: "Passeport et Voyages",
        description: "Demandes de passeport, visas et documents de voyage",
        icone: "Plane",
        couleur: "#059669",
        sousCategories: [
          { id: "passeport", nom: "Passeport", description: "Demande et renouvellement de passeport" },
          { id: "visa", nom: "Visa", description: "Demandes de visa" }
        ],
        ordre: 2,
        nombreDemarches: 5
      },
      {
        nom: "Fiscalité",
        description: "Impôts, taxes et déclarations fiscales",
        icone: "Calculator",
        couleur: "#DC2626",
        sousCategories: [
          { id: "impots", nom: "Impôts sur le revenu", description: "Déclaration et paiement des impôts" },
          { id: "patente", nom: "Patente", description: "Licence d'exploitation commerciale" }
        ],
        ordre: 3,
        nombreDemarches: 12
      },
      {
        nom: "Entreprises",
        description: "Création, modification et gestion d'entreprises",
        icone: "Building2",
        couleur: "#7C3AED",
        sousCategories: [
          { id: "creation", nom: "Création d'entreprise", description: "Formalités de création" },
          { id: "modification", nom: "Modifications", description: "Changements statutaires" }
        ],
        ordre: 4,
        nombreDemarches: 15
      }
    ];

    // Demo démarches
    const demoDemarches: Omit<Demarche, 'id'>[] = [
      {
        titre: "Demande d'acte de naissance",
        categorie: "etat-civil",
        sousCategorie: "naissance",
        resume: "Obtenir une copie d'acte de naissance pour diverses démarches administratives",
        description: "L'acte de naissance est un document officiel qui atteste de la naissance d'une personne. Il est nécessaire pour de nombreuses démarches administratives.",
        etapes: [
          {
            id: "1",
            numero: 1,
            titre: "Rassembler les documents",
            description: "Préparez votre pièce d'identité et les informations sur la personne concernée",
            dureeEstimee: "15 minutes"
          },
          {
            id: "2",
            numero: 2,
            titre: "Se rendre à la mairie",
            description: "Rendez-vous à la mairie du lieu de naissance ou de résidence",
            lieu: "Mairie",
            dureeEstimee: "30 minutes"
          }
        ],
        documentsRequis: [
          {
            id: "1",
            nom: "Pièce d'identité",
            type: "obligatoire",
            description: "Carte d'identité nationale ou passeport en cours de validité"
          }
        ],
        contacts: [
          {
            id: "1",
            type: "telephone",
            nom: "Mairie de Dakar",
            valeur: "+221 33 823 23 23",
            horaires: "8h-17h du lundi au vendredi"
          }
        ],
        documentsATelechager: [
          {
            id: "1",
            nom: "Formulaire de demande",
            type: "formulaire",
            url: "/documents/formulaire-acte-naissance.pdf",
            format: "PDF"
          }
        ],
        liensExternes: [
          {
            id: "1",
            nom: "Site officiel de l'état civil",
            url: "https://etatcivil.gouv.sn",
            type: "officiel"
          }
        ],
        delais: "24h à 48h",
        cout: "1 000 FCFA",
        popularite: 0,
        dateCreation: new Date().toISOString(),
        dateMiseAJour: new Date().toISOString(),
        version: "1.0",
        statut: "actif",
        motsCles: ["acte", "naissance", "état civil", "mairie"],
        difficulte: "facile"
      }
    ];

    // Add demo data to batch
    demoCategories.forEach(categorie => {
      const docRef = doc(categoriesRef);
      batch.set(docRef, categorie);
    });

    demoDemarches.forEach(demarche => {
      const docRef = doc(demarchesRef);
      batch.set(docRef, demarche);
    });

    // Commit batch
    await batch.commit();
    console.log('Demo data initialized successfully');
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
};