import React from 'react';
import { ShoppingBag, Star, Download, ExternalLink, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';

const products = [
  {
    id: 1,
    title: 'Template Landing Page SaaS',
    author: 'Marcelo Reis',
    price: 'R$ 49,90',
    rating: 4.9,
    sales: 124,
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    title: 'Mentoria: Carreira em Tech',
    author: 'Ana Silva',
    price: 'R$ 150,00',
    rating: 5.0,
    sales: 45,
    category: 'Mentoria',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    title: 'E-book: Vendas B2B',
    author: 'Carlos Mendes',
    price: 'R$ 29,90',
    rating: 4.7,
    sales: 312,
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1554415707-6e8cfc938c37?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 4,
    title: 'Boilerplate React + Supabase',
    author: 'Dev Team',
    price: 'R$ 99,00',
    rating: 4.8,
    sales: 89,
    category: 'Código',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 5,
    title: 'Consultoria de SEO',
    author: 'Agência Digital',
    price: 'R$ 300,00',
    rating: 4.9,
    sales: 22,
    category: 'Serviço',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 6,
    title: 'Pack de Posts para Instagram',
    author: 'Creative Studio',
    price: 'R$ 39,90',
    rating: 4.6,
    sales: 450,
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400',
  }
];

export const Marketplace = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-indigo-400" />
            Marketplace
          </h1>
          <p className="text-zinc-400">Compre e venda produtos digitais, templates e mentorias.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white w-full md:w-auto">
            Vender Produto
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar produtos, templates, mentorias..." 
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
          <Filter className="h-5 w-5 mr-2" /> Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="glass-panel rounded-2xl overflow-hidden group hover:border-indigo-500/50 transition-colors">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                {product.category}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{product.title}</h3>
              <p className="text-sm text-zinc-400 mb-4">por {product.author}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-medium text-sm">{product.rating}</span>
                  <span className="text-zinc-500 text-xs">({product.sales})</span>
                </div>
                <span className="text-lg font-bold text-emerald-400">{product.price}</span>
              </div>
              
              <Button className="w-full bg-white/5 hover:bg-indigo-600 text-white border border-white/10 hover:border-indigo-500 transition-colors">
                Comprar Agora
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
