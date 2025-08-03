import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Clock, Star, ChevronRight, Users, Plane, Calculator, Building2, GraduationCap, Heart, Car, Home, FileText, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { demarches, categories } from '../data/demarches';
import type { Demarche, SearchFilters } from '../types';

const Demarches: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredDemarches, setFilteredDemarches] = useState<Demarche[]>(demarches);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    categorie: searchParams.get('categorie') || '',
    difficulte: searchParams.get('difficulte') || '',
    tri: (searchParams.get('tri') as SearchFilters['tri']) || 'popularite'
  });

  const iconMap = {
    Users, Plane, Calculator, Building2, GraduationCap, Heart, Car, Home, FileText
  };

  useEffect(() => {
    let filtered = [...demarches];

    // Filtrage par recherche textuelle
    if (searchQuery.trim()) {
      filtered = filtered.filter(demarche =>
        demarche.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demarche.resume.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demarche.motsCles.some(mot => mot.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filtrage par catégorie
    if (filters.categorie) {
      filtered = filtered.filter(demarche => demarche.categorie === filters.categorie);
    }

    // Filtrage par difficulté
    if (filters.difficulte) {
      filtered = filtered.filter(demarche => demarche.difficulte === filters.difficulte);
    }

    // Tri
    switch (filters.tri) {
      case 'popularite':
        filtered.sort((a, b) => b.popularite - a.popularite);
        break;
      case 'alphabetique':
        filtered.sort((a, b) => a.titre.localeCompare(b.titre));
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.dateMiseAJour).getTime() - new Date(a.dateMiseAJour).getTime());
        break;
      default:
        break;
    }

    setFilteredDemarches(filtered);
  }, [searchQuery, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({ tri: 'popularite' });
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFiltersCount = Object.values(filters).filter(v => v && v !== 'popularite').length + (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Toutes les Démarches
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Découvrez l'ensemble des démarches administratives disponibles au Sénégal
            </motion.p>
            
            {/* Barre de recherche */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une démarche..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-0 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtres et statistiques */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredDemarches.length} démarche{filteredDemarches.length > 1 ? 's' : ''} trouvée{filteredDemarches.length > 1 ? 's' : ''}
            </h2>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Effacer les filtres ({activeFiltersCount})
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtres</span>
              {activeFiltersCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Panneau de filtres */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
            >
              <div className="grid gap-6 md:grid-cols-3">
                {/* Filtre par catégorie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Catégorie
                  </label>
                  <select
                    value={filters.categorie || ''}
                    onChange={(e) => handleFilterChange('categorie', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nom}</option>
                    ))}
                  </select>
                </div>

                {/* Filtre par difficulté */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Difficulté
                  </label>
                  <select
                    value={filters.difficulte || ''}
                    onChange={(e) => handleFilterChange('difficulte', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Toutes les difficultés</option>
                    <option value="facile">Facile</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="difficile">Difficile</option>
                  </select>
                </div>

                {/* Tri */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Trier par
                  </label>
                  <select
                    value={filters.tri || 'popularite'}
                    onChange={(e) => handleFilterChange('tri', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="popularite">Popularité</option>
                    <option value="alphabetique">Ordre alphabétique</option>
                    <option value="recent">Plus récent</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liste des démarches */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDemarches.map((demarche, index) => {
            const category = categories.find(c => c.id === demarche.categorie);
            const IconComponent = iconMap[category?.icone as keyof typeof iconMap] || FileText;
            
            return (
              <motion.div
                key={demarche.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/demarche/${demarche.id}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 p-6 block group h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${category?.couleur}20` }}
                      >
                        <IconComponent 
                          className="w-5 h-5" 
                          style={{ color: category?.couleur }}
                        />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {category?.nom}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-orange-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm ml-1">{demarche.popularite}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                    {demarche.titre}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {demarche.resume}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {demarche.delais}
                    </div>
                    {demarche.cout && (
                      <div className="font-medium text-green-600">
                        {demarche.cout}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      demarche.difficulte === 'facile' ? 'bg-green-100 text-green-800' :
                      demarche.difficulte === 'moyenne' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {demarche.difficulte}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Message si aucun résultat */}
        {filteredDemarches.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune démarche trouvée</h3>
            <p className="text-gray-500 mb-6">
              Essayez de modifier vos critères de recherche ou vos filtres.
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Effacer tous les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Demarches;