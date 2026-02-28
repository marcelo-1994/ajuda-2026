import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Search, Filter, Plus, X, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const Marketplace = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Design');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*, seller:users(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      setSubmitting(true);
      const { error } = await supabase.from('products').insert([
        {
          title,
          description,
          price: parseFloat(price),
          category,
          image_url: imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400',
          seller_id: user.id
        }
      ]);

      if (error) throw error;
      
      setShowAddModal(false);
      setTitle('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      fetchProducts();
    } catch (error: any) {
      alert('Erro ao adicionar produto: ' + error.message + '\n\nCertifique-se de ter criado a tabela "products" no Supabase.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBuy = (product: any) => {
    const message = encodeURIComponent(`Olá! Tenho interesse no produto "${product.title}" que vi no Marketplace do Nova Publica por R$ ${product.price}. Como podemos prosseguir?`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {user && (
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white w-full md:w-auto shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            >
              <Plus className="h-4 w-4 mr-2" /> Vender Produto
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar produtos, templates, mentorias..." 
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
          <Filter className="h-5 w-5 mr-2" /> Filtros
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-3xl">
          <ShoppingBag className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Nenhum produto encontrado</h3>
          <p className="text-zinc-400">Seja o primeiro a adicionar um produto no marketplace!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="glass-panel rounded-2xl overflow-hidden group hover:border-indigo-500/50 transition-colors flex flex-col">
              <div className="h-48 overflow-hidden relative shrink-0">
                <img 
                  src={product.image_url} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                  {product.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{product.title}</h3>
                <p className="text-sm text-zinc-400 mb-2">por {product.seller?.name || 'Usuário'}</p>
                <p className="text-sm text-zinc-300 mb-4 line-clamp-2 flex-1">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4 mt-auto">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="text-white font-medium text-sm">5.0</span>
                  </div>
                  <span className="text-lg font-bold text-emerald-400">
                    R$ {Number(product.price).toFixed(2).replace('.', ',')}
                  </span>
                </div>
                
                <Button 
                  onClick={() => handleBuy(product)}
                  className="w-full bg-white/5 hover:bg-indigo-600 text-white border border-white/10 hover:border-indigo-500 transition-colors"
                >
                  Comprar Agora
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">Vender Produto</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Título do Produto</label>
                <input 
                  required
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Ex: Template Landing Page"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Descrição</label>
                <textarea 
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none h-24"
                  placeholder="Descreva seu produto..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Preço (R$)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="49.90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Categoria</label>
                  <select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Design">Design</option>
                    <option value="Código">Código</option>
                    <option value="Mentoria">Mentoria</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Serviço">Serviço</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">URL da Imagem (Opcional)</label>
                <input 
                  type="url" 
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <Button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white mt-4"
              >
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Publicar Produto'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
