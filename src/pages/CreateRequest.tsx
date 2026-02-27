import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { DollarSign, Tag, FileText, Type, AlertCircle } from 'lucide-react';

export const CreateRequest = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState<number | null>(null);
  const [checkingLimit, setCheckingLimit] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tecnologia',
    is_paid: false,
    price: '',
  });

  useEffect(() => {
    const checkLimit = async () => {
      if (!user) return;
      
      const { count, error } = await supabase
        .from('help_requests')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      if (!error && count !== null) {
        setRequestCount(count);
      }
      setCheckingLimit(false);
    };
    
    checkLimit();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    const { error } = await supabase.from('help_requests').insert([
      {
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        is_paid: formData.is_paid,
        price: formData.is_paid ? parseFloat(formData.price) : null,
      },
    ]);

    setLoading(false);
    if (error) {
      if (error.message === 'Invalid API key') {
        alert('Erro ao criar pedido: A chave do Supabase (VITE_SUPABASE_ANON_KEY) está incorreta. Verifique se você copiou a chave "anon public" inteira, sem espaços extras, no painel de Secrets do AI Studio. Depois, aperte F5.');
      } else {
        alert('Erro ao criar pedido: ' + error.message);
      }
    } else {
      navigate('/requests');
    }
  };

  if (checkingLimit) {
    return (
      <div className="max-w-2xl mx-auto flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Check if user reached the limit of 3 requests and is on the free plan
  const isFreePlan = !profile?.plan || profile.plan === 'free';
  const userCredits = profile?.credits || 0;
  const totalAllowed = 3 + userCredits;

  if (isFreePlan && requestCount !== null && requestCount >= totalAllowed) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <div className="bg-white dark:bg-zinc-900 border border-red-500/30 p-8 rounded-3xl text-center shadow-2xl">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Limite Atingido</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 max-w-md mx-auto">
            Você já utilizou seus {totalAllowed} pedidos disponíveis. Para continuar pedindo ajuda ou oferecendo serviços, você precisa adicionar créditos ou fazer um upgrade de plano.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto px-8">
                Ver Planos e Créditos
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto px-8">
              Voltar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Criar Novo Pedido de Ajuda</h1>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
            <Type className="h-4 w-4 mr-2" /> Título do Pedido
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Preciso de ajuda para configurar um servidor Linux"
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
            <Tag className="h-4 w-4 mr-2" /> Categoria
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Tecnologia">Tecnologia</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Negócios">Negócios</option>
            <option value="Educação">Educação</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
            <FileText className="h-4 w-4 mr-2" /> Descrição Detalhada
          </label>
          <textarea
            required
            rows={6}
            placeholder="Descreva o problema com o máximo de detalhes possível..."
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-none"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <label className="flex items-center gap-3 cursor-pointer mb-4">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
              checked={formData.is_paid}
              onChange={(e) => setFormData({ ...formData, is_paid: e.target.checked })}
            />
            <span className="font-medium">Oferecer pagamento por esta ajuda</span>
          </label>
          
          {formData.is_paid && (
            <div className="pl-8 animate-in fade-in slide-in-from-top-2">
              <label className="flex items-center text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                <DollarSign className="h-4 w-4 mr-2" /> Valor Oferecido (R$)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required={formData.is_paid}
                placeholder="Ex: 150.00"
                className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          )}
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Pedido'}
          </Button>
        </div>
      </form>
    </div>
  );
};
