import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { Demarche } from '../types';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Demarche[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { actions, state } = useApp();
  const navigate = useNavigate();

  // Popular searches
  const popularSearches = [
    'Acte de naissance',
    'Passeport',
    'Carte d\'identité',
    'Permis de conduire',
    'Certificat de résidence'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('gouvconnect-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Add to recent searches
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('gouvconnect-recent-searches', JSON.stringify(updated));

    // Perform search
    actions.setSearchQuery(searchQuery);
    navigate(`/recherche?q=${encodeURIComponent(searchQuery)}`);
    setShowSuggestions(false);
    setQuery('');
  };

  const handleInputChange = async (value: string) => {
    setQuery(value);
    
    if (value.length >= 2) {
      const results = await actions.searchDemarches(value);
      setSuggestions(results.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(value.length === 0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Rechercher une démarche, un document..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"
        />
        {query && (
          <button
            onClick={clearQuery}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto"
          >
            {/* Search suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-3">Suggestions</h4>
                <div className="space-y-2">
                  {suggestions.map((demarche) => (
                    <button
                      key={demarche.id}
                      onClick={() => navigate(`/demarche/${demarche.id}`)}
                      className="w-full text-left p-2 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <div className="font-medium text-gray-900">{demarche.titre}</div>
                      <div className="text-sm text-gray-500 truncate">{demarche.resume}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent searches */}
            {suggestions.length === 0 && recentSearches.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <h4 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Recherches récentes
                </h4>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="w-full text-left p-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular searches */}
            {suggestions.length === 0 && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Recherches populaires
                </h4>
                <div className="grid grid-cols-1 gap-1">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="text-left p-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {suggestions.length === 0 && recentSearches.length === 0 && query.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>Commencez à taper pour rechercher des démarches</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;