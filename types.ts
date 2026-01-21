export type Category = 'bompers' | 'capo' | 'cabina' | 'estribos' | 'chasis';

export interface Brand {
  id: string;
  name: string;
  logo: string;
  color: string;
  models: string[];
  description: {
    es: string;
    en: string;
  };
}

export interface Product {
  id: string;
  name: {
    es: string;
    en: string;
  };
  category: Category;
  image: string;
  description: {
    es: string;
    en: string;
  };
  compatibleModels: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
