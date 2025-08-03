import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">GouvConnect</h3>
                <p className="text-sm text-gray-300">République du Sénégal</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Plateforme officielle pour faciliter l'accès aux démarches administratives
              du gouvernement du Sénégal. Simplicité, efficacité et transparence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/demarches" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Toutes les démarches
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Catégories
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Questions fréquentes
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services populaires</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/demarches/etat-civil" className="text-gray-300 hover:text-white transition-colors duration-200">
                  État civil
                </Link>
              </li>
              <li>
                <Link to="/demarches/passeport" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Passeport
                </Link>
              </li>
              <li>
                <Link to="/demarches/fiscalite" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Fiscalité
                </Link>
              </li>
              <li>
                <Link to="/demarches/entreprises" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Entreprises
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Immeuble Administratif<br />
                    Place de l'Indépendance<br />
                    Dakar, Sénégal
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <p className="text-gray-300 text-sm">+221 33 823 23 23</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <p className="text-gray-300 text-sm">contact@gouvconnect.sn</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong>Horaires:</strong><br />
                Lundi - Vendredi: 8h - 17h<br />
                Samedi: 8h - 12h
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
              <Link to="/mentions-legales" className="hover:text-white transition-colors duration-200">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-white transition-colors duration-200">
                Politique de confidentialité
              </Link>
              <Link to="/cgv" className="hover:text-white transition-colors duration-200">
                Conditions d'utilisation
              </Link>
              <Link to="/accessibilite" className="hover:text-white transition-colors duration-200">
                Accessibilité
              </Link>
              <Link to="/plan-site" className="hover:text-white transition-colors duration-200">
                Plan du site
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              © {currentYear} République du Sénégal. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;