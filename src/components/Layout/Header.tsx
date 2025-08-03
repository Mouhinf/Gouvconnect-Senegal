import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, Globe, Phone, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../SearchBar';
import LanguageSelector from '../LanguageSelector';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state, actions } = useApp();

  const navigation = [
    { name: 'Accueil', href: '/', current: true },
    { name: 'Démarches', href: '/demarches', current: false },
    { name: 'Catégories', href: '/categories', current: false },
    { name: 'FAQ', href: '/faq', current: false },
    { name: 'Contact', href: '/contact', current: false },
  ];

  return (
    <>
      {/* Top bar with contact info */}
      <div className="bg-blue-900 text-white py-2 px-4 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+221 33 823 23 23</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>contact@gouvconnect.sn</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Horaires: 8h - 17h (Lun-Ven)</span>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">GouvConnect</h1>
                <p className="text-sm text-blue-600 font-medium">République du Sénégal</p>
              </div>
            </Link>

            {/* Desktop search bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    item.current ? 'text-blue-600 border-b-2 border-blue-600' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={actions.toggleChat}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                Assistance
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="lg:hidden pb-4">
            <SearchBar />
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    actions.toggleChat();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Assistance Chat
                </button>
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <LanguageSelector />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;