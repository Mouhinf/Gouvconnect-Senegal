export interface Demarche {
  id: string;
  titre: string;
  categorie: string;
  sousCategorie?: string;
  resume: string;
  description: string;
  etapes: Etape[];
  documentsRequis: Document[];
  contacts: Contact[];
  documentsATelechager: DocumentTelecharge[];
  liensExternes: LienExterne[];
  delais: string;
  cout?: string;
  popularite: number;
  dateCreation: string;
  dateMiseAJour: string;
  version: string;
  statut: 'actif' | 'suspendu' | 'archive';
  motsCles: string[];
  difficulte: 'facile' | 'moyenne' | 'difficile';
}

export interface Etape {
  id: string;
  numero: number;
  titre: string;
  description: string;
  documentsRequis?: string[];
  dureeEstimee?: string;
  lieu?: string;
  conseil?: string;
}

export interface Document {
  id: string;
  nom: string;
  type: 'obligatoire' | 'optionnel' | 'selon_cas';
  description?: string;
  format?: string;
  exemple?: string;
}

export interface Contact {
  id: string;
  type: 'telephone' | 'email' | 'adresse' | 'site_web';
  nom: string;
  valeur: string;
  horaires?: string;
  description?: string;
}

export interface DocumentTelecharge {
  id: string;
  nom: string;
  type: 'formulaire' | 'modele' | 'guide' | 'reglementation';
  url: string;
  taille?: string;
  format: string;
  description?: string;
}

export interface LienExterne {
  id: string;
  nom: string;
  url: string;
  description?: string;
  type: 'officiel' | 'information' | 'service';
}

export interface Categorie {
  id: string;
  nom: string;
  description: string;
  icone: string;
  couleur: string;
  sousCategories: SousCategorie[];
  ordre: number;
  nombreDemarches: number;
}

export interface SousCategorie {
  id: string;
  nom: string;
  description: string;
  icone?: string;
}

export interface FAQ {
  id: string;
  question: string;
  reponse: string;
  categorie: string;
  ordre: number;
  motsCles: string[];
}

export interface ChatMessage {
  id: string;
  message: string;
  response: string;
  timestamp: Date;
  userId?: string;
}

export interface Feedback {
  id: string;
  type: 'suggestion' | 'probleme' | 'amelioration';
  sujet: string;
  message: string;
  email?: string;
  demarcheId?: string;
  statut: 'nouveau' | 'en_cours' | 'resolu';
  dateCreation: string;
}

export interface User {
  id: string;
  email: string;
  nom: string;
  role: 'admin' | 'editeur' | 'lecteur';
  dateCreation: string;
  dernierAcces: string;
}

export interface SearchFilters {
  categorie?: string;
  sousCategorie?: string;
  difficulte?: string;
  motCle?: string;
  tri?: 'pertinence' | 'popularite' | 'alphabetique' | 'recent';
}

export interface Language {
  code: 'fr' | 'wo' | 'en';
  name: string;
  flag: string;
}