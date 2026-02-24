import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { DollarSign, Tag, FileText, Type } from 'lucide-react';

export const CreateRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tecnologia',
    is_paid: false,
    price: '',
  });

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
      alert('Erro ao criar pedido: ' + error.message);
    } else {
      navigate('/requests');
    }
  };

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
