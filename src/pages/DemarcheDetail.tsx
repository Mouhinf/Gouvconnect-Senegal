import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, MapPin, Phone, Mail, Download, ExternalLink, Share2, Bookmark, CheckCircle, AlertTriangle, Info, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { demarches } from '../data/demarches';
import type { Demarche } from '../types';
import toast from 'react-hot-toast';

const DemarcheDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [demarche, setDemarche] = useState<Demarche | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (id) {
      loadDemarche(id);
    }
  }, [id]);

  const loadDemarche = async (demarcheId: string) => {
    try {
      setLoading(true);
      const data = demarches.find(d => d.id === demarcheId);
      setDemarche(data);
      
      // Check if bookmarked
      const bookmarks = JSON.parse(localStorage.getItem('gouvconnect-bookmarks') || '[]');
      setBookmarked(bookmarks.includes(demarcheId));
    } catch (error) {
      console.error('Error loading demarche:', error);
      toast.error('Erreur lors du chargement de la démarche');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && demarche) {
      try {
        await navigator.share({
          title: demarche.titre,
          text: demarche.resume,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papiers');
    }
  };

  const handleBookmark = () => {
    if (!demarche) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('gouvconnect-bookmarks') || '[]');
    let updatedBookmarks;
    
    if (bookmarked) {
      updatedBookmarks = bookmarks.filter((bid: string) => bid !== demarche.id);
      toast.success('Démarche retirée des favoris');
    } else {
      updatedBookmarks = [...bookmarks, demarche.id];
      toast.success('Démarche ajoutée aux favoris');
    }
    
    localStorage.setItem('gouvconnect-bookmarks', JSON.stringify(updatedBookmarks));
    setBookmarked(!bookmarked);
  };

  const handleDownload = (doc: any) => {
    // In a real app, this would trigger the actual download
    toast.success(`Téléchargement de ${doc.nom} commencé`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!demarche) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Démarche non trouvée</h1>
          <Link to="/demarches" className="text-blue-600 hover:text-blue-700">
            Retour aux démarches
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    facile: 'bg-green-100 text-green-800',
    moyenne: 'bg-yellow-100 text-yellow-800',
    difficile: 'bg-red-100 text-red-800'
  };

  const stepIcons = {
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    10: '🔟'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/demarches"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Retour aux démarches
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBookmark}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  bookmarked 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark className="h-4 w-4" />
                <span>{bookmarked ? 'Enregistré' : 'Enregistrer'}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <Share2 className="h-4 w-4" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and basic info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{demarche.titre}</h1>
                  <p className="text-lg text-gray-600 leading-relaxed">{demarche.resume}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[demarche.difficulte]}`}>
                  {demarche.difficulte}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Délai</div>
                    <div className="font-semibold text-gray-900">{demarche.delais}</div>
                  </div>
                </div>
                {demarche.cout && (
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-500">Coût</div>
                      <div className="font-semibold text-gray-900">{demarche.cout}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-500">Popularité</div>
                    <div className="font-semibold text-gray-900">#{demarche.popularite}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            {demarche.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  {demarche.description}
                </div>
              </motion.div>
            )}

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Étapes à suivre</h2>
              <div className="space-y-6">
                {demarche.etapes.map((etape, index) => (
                  <div key={etape.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                      {etape.numero}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{etape.titre}</h3>
                      <p className="text-gray-600 mb-3">{etape.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        {etape.dureeEstimee && (
                          <span className="flex items-center text-blue-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {etape.dureeEstimee}
                          </span>
                        )}
                        {etape.lieu && (
                          <span className="flex items-center text-green-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {etape.lieu}
                          </span>
                        )}
                      </div>
                      {etape.conseil && (
                        <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-md">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                            <p className="text-sm text-amber-800">{etape.conseil}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Documents required */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents requis</h2>
              <div className="space-y-4">
                {demarche.documentsRequis.map((document) => (
                  <div key={document.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0">
                      {document.type === 'obligatoire' ? (
                        <CheckCircle className="h-5 w-5 text-red-500" />
                      ) : document.type === 'optionnel' ? (
                        <Info className="h-5 w-5 text-blue-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{document.nom}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          document.type === 'obligatoire' ? 'bg-red-100 text-red-700' :
                          document.type === 'optionnel' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {document.type}
                        </span>
                      </div>
                      {document.description && (
                        <p className="text-gray-600 text-sm">{document.description}</p>
                      )}
                      {document.exemple && (
                        <p className="text-blue-600 text-sm mt-1">Exemple : {document.exemple}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <button
                  onClick={handleBookmark}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    bookmarked 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  <Bookmark className="h-4 w-4" />
                  <span>{bookmarked ? 'Enregistré' : 'Enregistrer'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors duration-200"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Partager</span>
                </button>
              </div>
            </motion.div>

            {/* Downloads */}
            {demarche.documentsATelechager.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Documents à télécharger</h3>
                <div className="space-y-3">
                  {demarche.documentsATelechager.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleDownload(doc)}
                      className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left"
                    >
                      <Download className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{doc.nom}</div>
                        <div className="text-sm text-gray-500">{doc.format.toUpperCase()}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contacts */}
            {demarche.contacts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contacts utiles</h3>
                <div className="space-y-4">
                  {demarche.contacts.map((contact) => (
                    <div key={contact.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                        {contact.type === 'telephone' && <Phone className="h-4 w-4 text-blue-600" />}
                        {contact.type === 'email' && <Mail className="h-4 w-4 text-green-600" />}
                        {contact.type === 'adresse' && <MapPin className="h-4 w-4 text-red-600" />}
                        {contact.type === 'site_web' && <ExternalLink className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{contact.nom}</div>
                        <div className="text-gray-600">{contact.valeur}</div>
                        {contact.horaires && (
                          <div className="text-sm text-gray-500 mt-1">{contact.horaires}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* External links */}
            {demarche.liensExternes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Liens utiles</h3>
                <div className="space-y-3">
                  {demarche.liensExternes.map((lien) => (
                    <a
                      key={lien.id}
                      href={lien.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    >
                      <ExternalLink className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{lien.nom}</div>
                        {lien.description && (
                          <div className="text-sm text-gray-500">{lien.description}</div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemarcheDetail;