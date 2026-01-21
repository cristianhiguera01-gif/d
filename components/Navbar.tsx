import React, { useState, useEffect } from 'react';
import { Menu, Truck, X, Languages } from 'lucide-react';

interface NavbarProps {
  lang: 'es' | 'en';
  setLang: (lang: 'es' | 'en') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
              <Truck className="w-6 h-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-sm md:text-xl title-glow leading-none">TRACTOLUJOS</span>
              <span className="font-display font-black text-sm md:text-xl title-glow leading-none text-right">TAMAYO</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-300 hover:text-tamayo-amber transition-colors font-medium text-sm uppercase tracking-wider">{lang === 'es' ? 'Inicio' : 'Home'}</a>
            <a href="#marcas" className="text-gray-300 hover:text-tamayo-amber transition-colors font-medium text-sm uppercase tracking-wider">{lang === 'es' ? 'Marcas' : 'Brands'}</a>
            <a href="#servicios" className="text-gray-300 hover:text-tamayo-amber transition-colors font-medium text-sm uppercase tracking-wider">{lang === 'es' ? 'Servicios' : 'Services'}</a>
            
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold hover:bg-tamayo-amber hover:text-black transition-all"
            >
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="md:hidden p-2 rounded-lg bg-white/5 text-tamayo-amber"
            >
              <span className="text-xs font-black">{lang.toUpperCase()}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden bg-gray-800 p-2 rounded-lg text-gray-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden nav-blur border-b border-gray-800 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            <a href="#inicio" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-300 font-display">INICIO</a>
            <a href="#marcas" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-300 font-display">MARCAS</a>
            <a href="#servicios" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-300 font-display">SERVICIOS</a>
          </div>
        </div>
      )}
    </nav>
  );
};
