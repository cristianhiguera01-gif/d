
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy TamayoBot. ¿Buscas algún accesorio en especial para tu camión?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const responseText = await generateChatResponse(messages, userMsg);
      
      if (responseText === "ERROR_INVALID_KEY") {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: 'La llave API no es válida o expiró. Por favor selecciona una nueva llave de un proyecto con facturación activa.', 
          isError: true 
        }]);
        // Trigger re-selection on "Requested entity was not found" error
        // @ts-ignore
        window.aistudio?.openSelectKey();
      } else {
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, hubo un error al conectar con el servidor.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  // API Key Check Helper following Gemini SDK guidelines
  const checkApiKey = async () => {
     // @ts-ignore
     if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
            // @ts-ignore
             await window.aistudio.openSelectKey();
             // Note: We assume success after triggering the dialog to avoid race conditions.
        }
     }
  };

  const toggleChat = () => {
    if (!isOpen) {
        checkApiKey();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'bg-gray-800 rotate-90' : 'bg-tamayo-red hover:bg-red-700 animate-bounce'
        }`}
      >
        {isOpen ? <X className="text-white w-8 h-8" /> : <MessageSquare className="text-white w-8 h-8" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-tamayo-red p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">TamayoBot</h3>
                <span className="text-xs text-red-200 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  En línea (Gemini 3 Flash)
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-tamayo-red text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'
                  } ${msg.isError ? 'bg-red-900/50 border-red-500' : ''}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-2xl p-3 rounded-bl-none flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 text-tamayo-red animate-spin" />
                  <span className="text-xs text-gray-400">Escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-gray-900 border-t border-gray-800">
            <div className="flex items-center space-x-2 bg-gray-950 rounded-full border border-gray-700 px-4 py-2 focus-within:border-tamayo-red focus-within:ring-1 focus-within:ring-tamayo-red transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Busco defensa para Kenworth..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-tamayo-red rounded-full text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-center flex flex-col gap-1">
                <button 
                    // @ts-ignore
                    onClick={() => window.aistudio?.openSelectKey()} 
                    className="text-[10px] text-gray-500 hover:text-gray-300 underline"
                >
                    Configurar API Key (Proyecto de Pago)
                </button>
                <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[8px] text-gray-600 hover:text-gray-400"
                >
                  Documentación de Facturación
                </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
