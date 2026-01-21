import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductGrid } from './components/ProductGrid';
import { BRANDS, UI_TEXT } from './constants';
import { Brand } from './types';
import { Truck, MessageCircle, Wrench, ShieldCheck, ChevronLeft, MapPin, Phone, Mail } from 'lucide-react';
import { ChatAssistant } from './components/ChatAssistant';

const App: React.FC = () => {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const t = UI_TEXT[lang];

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-tamayo-dark text-gray-100 font-sans selection:bg-tamayo-amber selection:text-black scroll-smooth">
      
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero Section Móvil */}
      <section id="inicio" className="relative hero-bg min-h-screen flex items-center overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-15 pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 w-full py-8 text-center lg:text-left">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10 animate-fade-in">
              <div className="inline-block px-3 py-1.5 bg-tamayo-amber/10 text-tamayo-amber rounded-full text-[10px] md:text-xs font-bold mb-6 border border-tamayo-amber/20 uppercase tracking-widest">
                 🚛 {lang === 'es' ? 'EL REY DEL ACERO INOXIDABLE' : 'THE KING OF STAINLESS STEEL'}
              </div>
              <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-black leading-tight mb-4">
                {t.heroTitle.split(' ')[0]}<br/>
                <span className="gradient-text">{t.heroTitle.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-sm md:text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                {t.heroSubtitle}
              </p>
              <div className="flex justify-center lg:justify-start">
                <a href="#marcas" className="gradient-primary text-black font-bold px-8 py-4 rounded-xl text-lg shadow-lg uppercase tracking-tighter">
                  {t.selectBrand.split(' ')[0]} {t.selectBrand.split(' ').slice(1).join(' ')}
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800" className="rounded-3xl border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Truck Lujo Acero Inoxidable" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand & Model Flow */}
      <section id="marcas" className="py-12 md:py-24 bg-tamayo-surface relative">
        <div className="max-w-7xl mx-auto px-4">
          {!selectedBrand ? (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-4xl font-black mb-4 uppercase tracking-tighter text-white">
                  {t.selectBrand}
                </h2>
                <div className="w-16 h-1 bg-tamayo-amber mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {BRANDS.map(brand => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand)}
                    className="bg-tamayo-dark p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col items-center gap-4 transition-all hover:border-tamayo-amber hover:-translate-y-2 group shadow-xl"
                  >
                    <span className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">{brand.logo}</span>
                    <span className="font-bold text-[10px] md:text-sm uppercase tracking-widest group-hover:text-tamayo-amber">{brand.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <button 
                onClick={() => setSelectedBrand(null)}
                className="flex items-center gap-2 text-tamayo-amber text-[10px] font-bold uppercase tracking-widest mb-8 hover:underline"
              >
                <ChevronLeft size={14} /> {t.back}
              </button>

              <div className="bg-tamayo-dark/50 p-6 md:p-10 rounded-3xl border border-white/5 mb-10 flex flex-col md:flex-row items-center gap-6">
                <span className="text-7xl">{selectedBrand.logo}</span>
                <div className="text-center md:text-left">
                  <h3 className="font-display text-3xl font-black text-white uppercase mb-2">{selectedBrand.name}</h3>
                  <p className="text-gray-400 text-xs md:text-sm max-w-xl">{selectedBrand.description[lang]}</p>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-6 text-center">{t.selectModel}</h4>
                <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar md:justify-center md:flex-wrap">
                  {selectedBrand.models.map(model => (
                    <button
                      key={model}
                      onClick={() => setSelectedModel(model)}
                      className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold uppercase tracking-tighter text-[10px] transition-all border ${
                        selectedModel === model 
                        ? 'gradient-primary text-black border-transparent scale-105 shadow-lg shadow-amber-500/20' 
                        : 'bg-gray-800 text-gray-400 hover:text-white border-white/5'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>

              {selectedModel && (
                <div className="animate-slide-up">
                  <div className="text-center mb-10">
                    <h3 className="font-display text-xl md:text-2xl font-black text-white uppercase">
                      {t.catalogFor} <span className="text-tamayo-amber">{selectedBrand.name} {selectedModel}</span>
                    </h3>
                  </div>
                  <ProductGrid filterModel={selectedModel} lang={lang} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Services Mini */}
      <section id="servicios" className="py-16 bg-tamayo-dark">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-tamayo-surface rounded-2xl border border-white/5">
            <Wrench className="w-8 h-8 text-tamayo-amber mx-auto mb-4" />
            <h5 className="font-bold text-xs uppercase mb-2">{lang === 'es' ? 'Instalación' : 'Installation'}</h5>
            <p className="text-gray-500 text-[10px]">{lang === 'es' ? 'Expertos en montaje de lujos de acero inoxidable.' : 'Experts in stainless steel luxury fitting.'}</p>
          </div>
          <div className="p-6 bg-tamayo-surface rounded-2xl border border-white/5">
            <Truck className="w-8 h-8 text-tamayo-amber mx-auto mb-4" />
            <h5 className="font-bold text-xs uppercase mb-2">{lang === 'es' ? 'Envíos' : 'Shipping'}</h5>
            <p className="text-gray-500 text-[10px]">{lang === 'es' ? 'Todo el territorio nacional.' : 'All national territory.'}</p>
          </div>
          <div className="p-6 bg-tamayo-surface rounded-2xl border border-white/5">
            <ShieldCheck className="w-8 h-8 text-tamayo-amber mx-auto mb-4" />
            <h5 className="font-bold text-xs uppercase mb-2">{lang === 'es' ? 'Calidad' : 'Quality'}</h5>
            <p className="text-gray-500 text-[10px]">{lang === 'es' ? 'Acero inoxidable 304 premium.' : 'Premium 304 stainless steel.'}</p>
          </div>
        </div>
      </section>

      {/* Footer Minimalist */}
      <footer className="bg-black py-12 border-t border-gray-900 text-center px-4">
        <div className="flex justify-center items-center gap-6 mb-8 text-gray-500">
           <MapPin size={18} /> <Phone size={18} /> <Mail size={18} />
        </div>
        <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black">
          &copy; 2024 TRACTOLUJOS TAMAYO | {t.footer}
        </p>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/573125194078?text=${lang === 'es' ? 'Hola,%20busco%20lujos%20en%20acero%20inoxidable' : 'Hello,%20looking%20for%20stainless%20steel%20luxury%20accessories'}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 transition-all hover:scale-110 animate-bounce"
      >
        <MessageCircle size={24} />
        <div className="flex flex-col text-left leading-none">
          <span className="text-[8px] font-black uppercase tracking-widest opacity-80">{t.quote}</span>
          <span className="font-bold text-sm">WHATSAPP</span>
        </div>
      </a>

      {/* Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default App;