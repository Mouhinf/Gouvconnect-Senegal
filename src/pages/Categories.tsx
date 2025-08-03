import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Plane, Calculator, Building2, GraduationCap, Heart, Car, Home, ChevronRight, FileText, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { categories, demarches } from '../data/demarches';
import type { Categorie, Demarche } from '../types';

const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryDemarches, setCategoryDemarches] = useState<Demarche[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const iconMap = {
    Users,
    Plane,
    Calculator,
    Building2,
    GraduationCap,
    Heart,
    Car,
    Home,
    FileText
  };

  useEffect(() => {
    if (selectedCategory) {
      const filtered = demarches.filter(d => d.categorie === selectedCategory);
      setCategoryDemarches(filtered);
    }
  }, [selectedCategory]);

  const filteredCategories = categories.filter(cat =>
    searchQuery === '' || 
    cat.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Catégories de Démarches
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Explorez toutes les démarches administratives organisées par thématique
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
                  placeholder="Rechercher une catégorie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-0 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedCategory ? (
          // Vue des catégories
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCategories.map((category, index) => {
              const IconComponent = iconMap[category.icone as keyof typeof iconMap] || FileText;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${category.couleur}20` }}
                      >
                        <IconComponent 
                          className="w-8 h-8" 
                          style={{ color: category.couleur }}
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.nom}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <FileText className="w-4 h-4 mr-1" />
                          {category.nombreDemarches} démarches
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm">Sous-catégories :</h4>
                      {category.sousCategories.slice(0, 3).map((sous) => (
                        <div key={sous.id} className="flex items-center text-sm text-gray-600">
                          <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                          {sous.nom}
                        </div>
                      ))}
                      {category.sousCategories.length > 3 && (
                        <div className="text-sm text-blue-600 font-medium">
                          +{category.sousCategories.length - 3} autres...
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Voir les démarches
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Vue des démarches d'une catégorie
          <div>
            <div className="flex items-center mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <ChevronRight className="w-5 h-5 mr-2 rotate-180" />
                Retour aux catégories
              </button>
            </div>

            {(() => {
              const category = categories.find(c => c.id === selectedCategory);
              const IconComponent = iconMap[category?.icone as keyof typeof iconMap] || FileText;
              
              return (
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mr-6"
                      style={{ backgroundColor: `${category?.couleur}20` }}
                    >
                      <IconComponent 
                        className="w-8 h-8" 
                        style={{ color: category?.couleur }}
                      />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{category?.nom}</h1>
                      <p className="text-gray-600 mt-2">{category?.description}</p>
                    </div>
                  </div>

                  {/* Sous-catégories */}
                  <div className="grid gap-4 md:grid-cols-3 mb-8">
                    {category?.sousCategories.map((sous) => (
                      <div key={sous.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">{sous.nom}</h3>
                        <p className="text-sm text-gray-600">{sous.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Liste des démarches */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryDemarches.map((demarche) => (
                <Link
                  key={demarche.id}
                  to={`/demarche/${demarche.id}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {demarche.titre}
                    </h3>
                    <div className="flex items-center text-orange-500 ml-4">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm ml-1">{demarche.popularite}</span>
                    </div>
                  </div>
                  
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
              ))}
            </div>

            {categoryDemarches.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune démarche trouvée</h3>
                <p className="text-gray-500">Cette catégorie ne contient pas encore de démarches.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;