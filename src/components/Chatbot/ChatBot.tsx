import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { chatService } from '../../services/firebase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { state, actions } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (state.chatOpen && messages.length === 0) {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: '1',
        text: 'Bonjour ! Je suis votre assistant GouvConnect. Comment puis-je vous aider avec vos démarches administratives ?',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [state.chatOpen]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simple keyword-based responses - in production, integrate with OpenAI/Perplexity
    const message = userMessage.toLowerCase();
    
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return 'Bonjour ! Je suis là pour vous aider avec vos démarches administratives. Vous pouvez me poser des questions sur les documents à fournir, les délais, ou chercher une démarche spécifique.';
    }
    
    if (message.includes('acte de naissance') || message.includes('naissance')) {
      return 'Pour obtenir un acte de naissance, vous devez vous rendre à la mairie du lieu de naissance avec votre pièce d\'identité. Le délai est de 24h à 48h et le coût est de 1 000 FCFA. Souhaitez-vous plus de détails sur cette démarche ?';
    }
    
    if (message.includes('passeport')) {
      return 'Pour une demande de passeport, vous devez préparer votre acte de naissance, carte d\'identité, 2 photos récentes et justificatif de domicile. Le délai est de 15 jours ouvrables. Voulez-vous connaître les étapes détaillées ?';
    }
    
    if (message.includes('carte identité') || message.includes('cni')) {
      return 'La carte d\'identité nationale nécessite un acte de naissance, un certificat de résidence et 2 photos. Le délai est de 2 semaines. Dois-je vous guider vers la fiche complète ?';
    }
    
    if (message.includes('horaires') || message.includes('heures')) {
      return 'Les services administratifs sont généralement ouverts de 8h à 17h du lundi au vendredi, et de 8h à 12h le samedi. Certains services ont des horaires spécifiques.';
    }
    
    if (message.includes('contact') || message.includes('téléphone')) {
      return 'Vous pouvez nous contacter au +221 33 823 23 23 ou par email à contact@gouvconnect.sn. Notre équipe est disponible pendant les heures ouvrables.';
    }
    
    if (message.includes('merci') || message.includes('thank')) {
      return 'Je vous en prie ! N\'hésitez pas si vous avez d\'autres questions sur vos démarches administratives.';
    }
    
    // Default response
    return 'Je comprends votre question sur les démarches administratives. Pouvez-vous me donner plus de détails ? Vous pouvez aussi utiliser la barre de recherche pour trouver des informations spécifiques ou parcourir nos catégories.';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    simulateTyping();

    try {
      // Save message to Firebase
      await chatService.saveMessage({
        message: inputMessage,
        response: '',
        timestamp: new Date()
      });

      const botResponse = await generateBotResponse(inputMessage);
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1500);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: 'Acte de naissance', action: () => setInputMessage('Comment obtenir un acte de naissance ?') },
    { label: 'Passeport', action: () => setInputMessage('Quelles sont les étapes pour un passeport ?') },
    { label: 'Carte d\'identité', action: () => setInputMessage('Documents pour carte d\'identité ?') },
    { label: 'Horaires', action: () => setInputMessage('Quels sont les horaires d\'ouverture ?') }
  ];

  if (!state.chatOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: 20 }}
        className={`fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-2xl shadow-2xl ${
          isMinimized ? 'w-80 h-16' : 'w-80 h-96'
        } lg:w-96 lg:h-[500px] transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1 rounded-full">
              <Bot className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Assistant GouvConnect</h3>
              <p className="text-xs text-blue-100">En ligne</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-blue-700 rounded transition-colors duration-200"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={actions.toggleChat}
              className="p-1 hover:bg-blue-700 rounded transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-64 lg:h-80">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                      {message.sender === 'user' ? (
                        <User className="h-3 w-3 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-xs">
                    <div className="p-2 rounded-full bg-gray-200">
                      <Bot className="h-3 w-3 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Questions rapides :</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded border transition-colors duration-200"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatBot;