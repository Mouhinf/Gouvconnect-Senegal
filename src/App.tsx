import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ChatBot from './components/Chatbot/ChatBot';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Demarches from './pages/Demarches';
import DemarcheDetail from './pages/DemarcheDetail';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <Router>
          <div className="App">
            <Helmet>
              <title>GouvConnect Sénégal - Vos démarches administratives simplifiées</title>
              <meta name="description" content="Plateforme officielle pour faciliter l'accès aux démarches administratives du gouvernement du Sénégal. Simplicité, efficacité et transparence." />
              <meta name="keywords" content="sénégal, administration, démarches, gouvernement, état civil, passeport, fiscalité" />
              <meta property="og:title" content="GouvConnect Sénégal" />
              <meta property="og:description" content="Vos démarches administratives simplifiées" />
              <meta property="og:type" content="website" />
              <link rel="canonical" href="https://gouvconnect.sn" />
            </Helmet>
            
            <Header />
            
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/demarches" element={<Demarches />} />
                <Route path="/demarche/:id" element={<DemarcheDetail />} />
                {/* Add other routes as needed */}
              </Routes>
            </main>
            
            <Footer />
            <ChatBot />
            
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: '#4aed88',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;