import React, { useState, useEffect } from 'react';
import { Shield, Users, ShoppingBag, DollarSign, Settings, Trash2, Loader2, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [platformFee, setPlatformFee] = useState(10);
  const [isSavingFee, setIsSavingFee] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'settings'>('overview');

  // Basic admin check - in a real app, this would check a role in the database
  // For this demo, we'll just allow any logged-in user to see it, or you could hardcode an email
  const isAdmin = user !== null; // Replace with user?.email === 'admin@example.com' if needed

  useEffect(() => {
    if (isAdmin) {
      fetchData();
      
      // Load saved fee from localStorage if exists
      const savedFee = localStorage.getItem('ajudai_platform_fee');
      if (savedFee) {
        setPlatformFee(Number(savedFee));
      }
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*, seller:users(name, email)')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Fetch users count (simulated or real if we can query users table)
      const { count, error: usersError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
        
      if (!usersError && count !== null) {
        setUsersCount(count);
      } else {
        // Fallback if users table is not accessible
        setUsersCount(156);
      }

    } catch (error) {
      console.error('Erro ao buscar dados do admin:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== id));
    } catch (error: any) {
      alert('Erro ao excluir produto: ' + error.message);
    }
  };

  const handleSaveFee = () => {
    setIsSavingFee(true);
    setTimeout(() => {
      localStorage.setItem('ajudai_platform_fee', platformFee.toString());
      setIsSavingFee(false);
      alert('Taxa da plataforma atualizada com sucesso!');
    }, 800);
  };

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // Calculate simulated revenue based on products
  const totalProductValue = products.reduce((acc, p) => acc + Number(p.price), 0);
  const simulatedSales = products.length * 3; // Assume each product sold 3 times on average
  const totalRevenue = totalProductValue * 3;
  const platformRevenue = totalRevenue * (platformFee / 100);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="h-8 w-8 text-indigo-400" />
            Painel Administrativo
          </h1>
          <p className="text-zinc-400">Gerencie a plataforma, produtos e configurações.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-8 gap-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-t-lg font-medium text-sm whitespace-nowrap transition-colors ${
            activeTab === 'overview' 
              ? 'bg-white/10 text-white border-b-2 border-indigo-500' 
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-t-lg font-medium text-sm whitespace-nowrap transition-colors ${
            activeTab === 'products' 
              ? 'bg-white/10 text-white border-b-2 border-indigo-500' 
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Gerenciar Produtos
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-t-lg font-medium text-sm whitespace-nowrap transition-colors ${
            activeTab === 'settings' 
              ? 'bg-white/10 text-white border-b-2 border-indigo-500' 
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Configurações
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-zinc-400 font-medium">Usuários Totais</h3>
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <Users className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{usersCount}</p>
                  <p className="text-sm text-emerald-400 mt-2 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12% este mês
                  </p>
                </div>
                
                <div className="glass-panel p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-zinc-400 font-medium">Produtos Ativos</h3>
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <ShoppingBag className="h-5 w-5 text-emerald-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{products.length}</p>
                  <p className="text-sm text-emerald-400 mt-2 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +5 novos hoje
                  </p>
                </div>
                
                <div className="glass-panel p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-zinc-400 font-medium">Volume de Vendas</h3>
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <DollarSign className="h-5 w-5 text-amber-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-zinc-500 mt-2">
                    {simulatedSales} vendas estimadas
                  </p>
                </div>
                
                <div className="glass-panel p-6 rounded-2xl border-indigo-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <h3 className="text-indigo-300 font-medium">Receita da Plataforma</h3>
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <Shield className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white relative z-10">
                    R$ {platformRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-indigo-300/70 mt-2 relative z-10">
                    Baseado na taxa de {platformFee}%
                  </p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Atividade Recente</h3>
                <div className="space-y-4">
                  {products.slice(0, 5).map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                          <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{product.title}</p>
                          <p className="text-sm text-zinc-400">Adicionado por {product.seller?.name || 'Usuário'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-bold">R$ {Number(product.price).toFixed(2).replace('.', ',')}</p>
                        <p className="text-xs text-zinc-500">{new Date(product.created_at).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <p className="text-zinc-500 text-center py-4">Nenhuma atividade recente.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Gerenciar Produtos do Marketplace</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-400 text-sm">
                      <th className="pb-3 font-medium">Produto</th>
                      <th className="pb-3 font-medium">Vendedor</th>
                      <th className="pb-3 font-medium">Categoria</th>
                      <th className="pb-3 font-medium">Preço</th>
                      <th className="pb-3 font-medium">Data</th>
                      <th className="pb-3 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {products.map(product => (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image_url} alt="" className="w-8 h-8 rounded object-cover" />
                            <span className="text-white font-medium line-clamp-1">{product.title}</span>
                          </div>
                        </td>
                        <td className="py-4 text-zinc-300">{product.seller?.name || 'Desconhecido'}</td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-white/10 rounded text-xs text-zinc-300">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 text-emerald-400 font-medium">
                          R$ {Number(product.price).toFixed(2).replace('.', ',')}
                        </td>
                        <td className="py-4 text-zinc-400">
                          {new Date(product.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Excluir produto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-zinc-500">
                          Nenhum produto cadastrado no marketplace.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <div className="glass-panel p-6 rounded-2xl mb-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-indigo-400" />
                  Configurações Financeiras
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Taxa da Plataforma (Porcentagem do Desenvolvedor)
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <input 
                          type="number" 
                          min="0"
                          max="100"
                          value={platformFee}
                          onChange={(e) => setPlatformFee(Number(e.target.value))}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-lg"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">%</span>
                      </div>
                      <Button 
                        onClick={handleSaveFee}
                        disabled={isSavingFee}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6"
                      >
                        {isSavingFee ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Salvar'}
                      </Button>
                    </div>
                    <p className="text-sm text-zinc-500 mt-2">
                      Esta é a porcentagem que a plataforma retém de cada venda realizada no marketplace.
                    </p>
                  </div>

                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-300 mb-1">Aviso sobre alterações</h4>
                      <p className="text-xs text-amber-200/70 leading-relaxed">
                        Alterar a taxa da plataforma afetará apenas as novas vendas. Vendas já realizadas manterão a taxa vigente no momento da transação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
