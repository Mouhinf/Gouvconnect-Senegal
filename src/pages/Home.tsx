import React, { useState, useEffect } from 'react';
import { Search, Users, FileText, Building, CreditCard, MapPin, Phone, Mail, Star, TrendingUp, Clock, Download, Share2, Heart, Plane, Calculator, Building2, GraduationCap, Car, Home as HomeIcon, ChevronRight, Globe, Award, Shield, Zap, BookOpen, HeadphonesIcon, ArrowRight, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { demarches, categories } from '../data/demarches';
import type { Demarche, Categorie } from '../types';

const Home: React.FC = () => {
  const { state, actions } = useApp();
  const [popularDemarches, setPopularDemarches] = useState<Demarche[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Demarche[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Images du Sénégal pour le carousel
  const senegalImages = [
    'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Dakar moderne
    'https://images.pexels.com/photos/5490777/pexels-photo-5490777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Architecture sénégalaise
    'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Bâtiments administratifs
    'https://images.pexels.com/photos/5490779/pexels-photo-5490779.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'  // Paysage urbain Dakar
  ];

  // Categories avec icônes
  const categoryIcons = {
    'etat-civil': Users,
    'passeport': Plane,
    'fiscalite': Calculator,
    'entreprises': Building2,
    'education': GraduationCap,
    'sante': Heart,
    'transport': Car,
    'logement': HomeIcon
  };

  // Statistiques du site
  const siteStats = [
    { label: 'Démarches disponibles', value: '120+', icon: FileText },
    { label: 'Catégories', value: '8', icon: Building },
    { label: 'Utilisateurs aidés', value: '50K+', icon: Users },
    { label: 'Taux de satisfaction', value: '98%', icon: Award }
  ];

  // Services en vedette
  const featuredServices = [
    {
      title: 'Assistance 24/7',
      description: 'Support client disponible en permanence',
      icon: HeadphonesIcon,
      color: 'bg-blue-500'
    },
    {
      title: 'Sécurisé',
      description: 'Vos données sont protégées et sécurisées',
      icon: Shield,
      color: 'bg-green-500'
    },
    {
      title: 'Rapide',
      description: 'Traitement accéléré de vos demandes',
      icon: Zap,
      color: 'bg-yellow-500'
    },
    {
      title: 'Éducatif',
      description: 'Guides détaillés pour chaque démarche',
      icon: BookOpen,
      color: 'bg-purple-500'
    }
  ];

  // Actualités et annonces
  const newsItems = [
    {
      id: 1,
      title: 'Nouvelle procédure simplifiée pour les passeports',
      date: '15 Janvier 2024',
      type: 'info',
      description: 'La durée de traitement des passeports est réduite à 10 jours ouvrables.'
    },
    {
      id: 2,
      title: 'Extension des horaires d\'ouverture',
      date: '10 Janvier 2024',
      type: 'success',
      description: 'Les services administratifs sont maintenant ouverts jusqu\'à 18h.'
    },
    {
      id: 3,
      title: 'Maintenance programmée du système',
      date: '20 Janvier 2024',
      type: 'warning',
      description: 'Interruption de service prévue le dimanche de 2h à 6h du matin.'
    }
  ];

  useEffect(() => {
    // Simuler le chargement des données
    setLoading(true);
    setTimeout(() => {
      const popular = demarches
        .sort((a, b) => b.popularite - a.popularite)
        .slice(0, 6);
      setPopularDemarches(popular);
      setLoading(false);
    }, 1000);

    // Carousel automatique des images
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % senegalImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state.searchQuery.trim()) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [state.searchQuery]);

  const handleSearch = () => {
    if (!state.searchQuery.trim()) return;
    
    const results = demarches.filter(demarche => 
      demarche.titre.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      demarche.resume.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      demarche.motsCles.some(mot => mot.toLowerCase().includes(state.searchQuery.toLowerCase()))
    );
    setSearchResults(results);
  };

  const handleCategoryClick = (categoryId: string) => {
    const results = demarches.filter(demarche => 
      demarche.categorie === categoryId
    );
    setSearchResults(results);
    actions.setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de GouvConnect Sénégal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Hero avec carousel d'images */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 overflow-hidden">
        {/* Image de fond avec carousel */}
        <div className="absolute inset-0 z-0">
          {senegalImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Sénégal ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-6"
            >
              <Globe className="h-16 w-16 text-yellow-400 mr-4" />
              <div>
                <h1 className="text-4xl md:text-6xl font-bold">GouvConnect Sénégal</h1>
                <p className="text-xl text-blue-100 mt-2">République du Sénégal</p>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto"
            >
              Votre plateforme officielle pour simplifier toutes vos démarches administratives.
              <br />
              <span className="text-yellow-300 font-semibold">Simplicité • Efficacité • Transparence</span>
            </motion.p>
            
            {/* Barre de recherche intégrée */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Rechercher une démarche, un document, un service..."
                  value={state.searchQuery}
                  onChange={(e) => actions.setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 text-lg rounded-2xl border-0 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 text-gray-900 placeholder-gray-500 shadow-xl"
                />
              </div>
              <p className="text-sm text-blue-200 mt-3">
                Exemples : "acte de naissance", "passeport", "création d'entreprise"
              </p>
            </motion.div>

            {/* Statistiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {siteStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Actualités et annonces */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Info className="h-6 w-6 text-blue-600 mr-3" />
              Actualités et Annonces
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {newsItems.map((news) => (
                <div
                  key={news.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    news.type === 'info' ? 'border-blue-500 bg-blue-50' :
                    news.type === 'success' ? 'border-green-500 bg-green-50' :
                    'border-yellow-500 bg-yellow-50'
                  }`}
                >
                  <div className="flex items-start">
                    {news.type === 'info' && <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />}
                    {news.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />}
                    {news.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{news.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{news.description}</p>
                      <p className="text-xs text-gray-500">{news.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Résultats de recherche */}
        {searchResults.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Résultats de recherche ({searchResults.length})
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((demarche) => (
                <Link
                  key={demarche.id}
                  to={`/demarche/${demarche.id}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {demarche.titre}
                    </h3>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
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
                      <div className="flex items-center font-medium text-green-600">
                        <CreditCard className="w-4 h-4 mr-1" />
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
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-green-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section Catégories */}
        {searchResults.length === 0 && (
          <>
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Catégories de Démarches
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Explorez toutes nos catégories pour trouver rapidement la démarche qui vous concerne.
                  Chaque catégorie regroupe des services spécialisés avec des guides détaillés.
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {categories.map((category, index) => {
                  const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || FileText;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 p-8 text-left group relative overflow-hidden"
                    >
                      {/* Effet de fond coloré */}
                      <div 
                        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                        style={{ backgroundColor: category.couleur }}
                      ></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
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
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 text-sm mb-3">Services principaux :</h4>
                          {category.sousCategories.slice(0, 3).map((sous) => (
                            <div key={sous.id} className="flex items-center text-sm text-gray-600">
                              <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="group-hover:text-gray-800 transition-colors">{sous.nom}</span>
                            </div>
                          ))}
                          {category.sousCategories.length > 3 && (
                            <div className="text-sm font-medium" style={{ color: category.couleur }}>
                              +{category.sousCategories.length - 3} autres services...
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-6 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Explorer la catégorie
                          </span>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Services en vedette */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Pourquoi Choisir GouvConnect ?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Une plateforme moderne et sécurisée pour toutes vos démarches administratives
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {featuredServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Démarches populaires */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    <TrendingUp className="w-8 h-8 text-orange-500 mr-3" />
                    Démarches Populaires
                  </h2>
                  <p className="text-gray-600 mt-2">Les services les plus demandés par nos utilisateurs</p>
                </div>
                <Link
                  to="/demarches"
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Voir toutes les démarches
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {popularDemarches.map((demarche, index) => {
                  const category = categories.find(c => c.id === demarche.categorie);
                  const IconComponent = categoryIcons[category?.id as keyof typeof categoryIcons] || FileText;
                  
                  return (
                    <motion.div
                      key={demarche.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={`/demarche/${demarche.id}`}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 p-6 block group h-full"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${category?.couleur}20` }}
                            >
                              <IconComponent 
                                className="w-6 h-6" 
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
                            <span className="text-sm ml-1 font-medium">{demarche.popularite}</span>
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
            </section>

            {/* Actions rapides et contacts */}
            <section className="grid gap-8 md:grid-cols-2">
              {/* Actions rapides */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Actions Rapides
                </h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group">
                    <Phone className="w-6 h-6 text-green-600 mr-4" />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                        Contacter le support
                      </div>
                      <div className="text-sm text-gray-500">+221 33 823 23 23 • Disponible 24h/7j</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </button>
                  
                  <button className="w-full flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group">
                    <Mail className="w-6 h-6 text-blue-600 mr-4" />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Envoyer un email
                      </div>
                      <div className="text-sm text-gray-500">contact@gouvconnect.sn</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </button>
                  
                  <button className="w-full flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group">
                    <MapPin className="w-6 h-6 text-red-600 mr-4" />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                        Trouver un bureau
                      </div>
                      <div className="text-sm text-gray-500">Localisez le bureau le plus proche</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Informations utiles */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Informations Utiles
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-blue-200 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Horaires d'ouverture</h3>
                      <p className="text-blue-100 text-sm">
                        Lundi - Vendredi : 8h00 - 17h00<br />
                        Samedi : 8h00 - 12h00<br />
                        Dimanche : Fermé
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-200 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Adresse principale</h3>
                      <p className="text-blue-100 text-sm">
                        Immeuble Administratif<br />
                        Place de l'Indépendance<br />
                        Dakar, Sénégal
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="w-6 h-6 text-blue-200 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Sécurité des données</h3>
                      <p className="text-blue-100 text-sm">
                        Vos informations personnelles sont protégées selon les standards internationaux de sécurité.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;