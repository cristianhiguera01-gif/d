import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES, UI_TEXT } from '../constants';

interface ProductGridProps {
  filterModel: string;
  lang: 'es' | 'en';
}

export const ProductGrid: React.FC<ProductGridProps> = ({ filterModel, lang }) => {
  return (
    <div className="space-y-12">
      {CATEGORIES.map(category => {
        const categoryProducts = PRODUCTS.filter(p => 
          p.category === category.id && 
          (p.compatibleModels.includes(filterModel) || p.compatibleModels.includes('Universal'))
        );

        if (categoryProducts.length === 0) return null;

        return (
          <div key={category.id} className="relative">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="bg-tamayo-amber text-black font-black px-3 py-1 rounded-md text-[10px] tracking-widest uppercase">
                {lang === 'es' ? 'SECCIÓN' : 'SECTION'}
              </div>
              <h4 className="font-display text-lg md:text-2xl font-black text-white uppercase tracking-tighter">
                {category[lang]}
              </h4>
              <div className="flex-grow h-px bg-white/5 hidden md:block"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {categoryProducts.map(product => (
                <div 
                  key={product.id} 
                  className="group bg-[#121212] border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden card-hover flex flex-col"
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 p-6 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-tamayo-amber/5 group-hover:bg-tamayo-amber/10 transition-colors"></div>
                    <img 
                      src={product.image} 
                      alt={product.name[lang]}
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/80 text-white text-[7px] font-black px-2 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                        {product.compatibleModels.includes('Universal') ? 'Universal' : filterModel}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <h5 className="font-display text-sm md:text-lg font-black text-white mb-2 uppercase leading-tight">
                      {product.name[lang]}
                    </h5>
                    <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed mb-4 flex-grow">
                      {product.description[lang]}
                    </p>
                    
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[7px] text-gray-600 font-black uppercase tracking-widest">STOCK</span>
                        <span className="text-[10px] font-bold text-green-500 uppercase">{UI_TEXT[lang].stock}</span>
                      </div>
                      <a 
                        href={`https://wa.me/573125194078?text=Hola,%20busco%20${product.name[lang]}%20para%20un%20${filterModel}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-tamayo-amber hover:text-black rounded-lg text-white transition-all text-[9px] font-bold uppercase tracking-widest group/btn border border-white/10"
                      >
                        {UI_TEXT[lang].quote} <Search size={10} className="group-hover/btn:scale-125 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
