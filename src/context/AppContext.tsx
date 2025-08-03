import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Demarche, Categorie, Language } from '../types';
import { demarcheService, categorieService } from '../services/firebase';

interface AppState {
  demarches: Demarche[];
  categories: Categorie[];
  currentLanguage: Language;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  chatOpen: boolean;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DEMARCHES'; payload: Demarche[] }
  | { type: 'SET_CATEGORIES'; payload: Categorie[] }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_CHAT' };

const initialState: AppState = {
  demarches: [],
  categories: [],
  currentLanguage: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  searchQuery: '',
  loading: false,
  error: null,
  chatOpen: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DEMARCHES':
      return { ...state, demarches: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'TOGGLE_CHAT':
      return { ...state, chatOpen: !state.chatOpen };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    loadDemarches: () => Promise<void>;
    loadCategories: () => Promise<void>;
    searchDemarches: (query: string) => Promise<Demarche[]>;
    setLanguage: (language: Language) => void;
    setSearchQuery: (query: string) => void;
    toggleChat: () => void;
  };
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    loadDemarches: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const demarches = await demarcheService.getAll();
        dispatch({ type: 'SET_DEMARCHES', payload: demarches });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Erreur lors du chargement des démarches' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    loadCategories: async () => {
      try {
        const categories = await categorieService.getAll();
        dispatch({ type: 'SET_CATEGORIES', payload: categories });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Erreur lors du chargement des catégories' });
      }
    },

    searchDemarches: async (query: string): Promise<Demarche[]> => {
      if (!query.trim()) return state.demarches;
      try {
        const results = await demarcheService.search(query);
        return results;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Erreur lors de la recherche' });
        return [];
      }
    },

    setLanguage: (language: Language) => {
      dispatch({ type: 'SET_LANGUAGE', payload: language });
      localStorage.setItem('gouvconnect-language', language.code);
    },

    setSearchQuery: (query: string) => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    },

    toggleChat: () => {
      dispatch({ type: 'TOGGLE_CHAT' });
    },
  };

  useEffect(() => {
    // Load saved language
    const savedLanguage = localStorage.getItem('gouvconnect-language');
    if (savedLanguage) {
      const languages: Language[] = [
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'wo', name: 'Wolof', flag: '🇸🇳' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
      ];
      const language = languages.find(l => l.code === savedLanguage);
      if (language) {
        dispatch({ type: 'SET_LANGUAGE', payload: language });
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};