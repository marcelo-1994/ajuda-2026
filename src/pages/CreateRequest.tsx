import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

export const CreateRequest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      setSubmitting(true);
      setError('');
      
      const { error: insertError } = await supabase.from('requests').insert([
        {
          title,
          description,
          category,
          location,
          user_id: user.id,
          status: 'open'
        }
      ]);

      if (insertError) throw insertError;
      
      navigate('/requests');
    } catch (err: any) {
      console.error('Error creating request:', err);
      setError('Erro ao criar pedido. Tente novamente mais tarde.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </button>
      
      <div className="glass-panel p-8 rounded-3xl">
        <h1 className="text-3xl font-bold text-white mb-2">Novo Pedido de Ajuda</h1>
        <p className="text-zinc-400 mb-8">Descreva o que você precisa para que a comunidade possa te ajudar.</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-center gap-3 text-red-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Título do Pedido</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              placeholder="Ex: Preciso de ajuda para criar uma logo"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Descrição Detalhada</label>
            <textarea 
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 resize-none h-32"
              placeholder="Descreva com detalhes o que você precisa..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Categoria</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Design">Design</option>
                <option value="Programação">Programação</option>
                <option value="Marketing">Marketing</option>
                <option value="Edição de Vídeo">Edição de Vídeo</option>
                <option value="Redação">Redação</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Localização (Opcional)</label>
              <input 
                type="text" 
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                placeholder="Ex: São Paulo, SP ou Remoto"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 mt-4 text-lg font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)]"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Publicando...
              </span>
            ) : (
              'Publicar Pedido'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
