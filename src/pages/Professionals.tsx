import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Search, Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';

export const Professionals = () => {
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchProfessionals();
  }, [searchTerm, planFilter, page]);

  const fetchProfessionals = async () => {
    setLoading(true);
    
    let query = supabase
      .from('users')
      .select('*', { count: 'exact' });

    if (planFilter !== 'all') {
      query = query.eq('plan', planFilter);
    }

    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%`);
    }

    const { data, error, count } = await query
      .order('reputation_score', { ascending: false })
      .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

    if (error) {
      console.error('Error fetching professionals:', error);
    } else {
      setProfessionals(data || []);
      setTotalCount(count || 0);
    }
    setLoading(false);
  };

  const getLevel = (score: number) => {
    return Math.floor(Math.sqrt((score || 0) / 10)) + 1;
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Encontre Profissionais</h1>
          <p className="text-zinc-400">Conecte-se com os melhores especialistas da plataforma.</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou especialidade..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          />
        </div>
        
        <div className="flex gap-4">
          <select
            className="px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            value={planFilter}
            onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }}
          >
            <option value="all">Todos os Planos</option>
            <option value="strategic">Estratégico (VIP)</option>
            <option value="pro">PRO</option>
            <option value="free">Gratuito</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-zinc-400">Carregando profissionais...</div>
      ) : (
        <>
          {professionals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionals.map((pro) => (
                <div key={pro.id} className="glass-panel p-6 rounded-2xl hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    {pro.avatar_url ? (
                      <img src={pro.avatar_url} alt={pro.name} className="w-24 h-24 rounded-full object-cover border-2 border-white/10" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-indigo-900/50 flex items-center justify-center text-indigo-300 font-bold text-3xl border-2 border-indigo-500/30">
                        {pro.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    {pro.plan === 'strategic' && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider bg-purple-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                        VIP
                      </span>
                    )}
                    {pro.plan === 'pro' && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider bg-indigo-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                        PRO
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-xl text-white mb-1">{pro.name || 'Usuário Anônimo'}</h3>
                  
                  <div className="flex items-center gap-4 mt-3 mb-4">
                    <div className="flex items-center text-amber-400">
                      <Star className="h-4 w-4 mr-1 fill-amber-400" />
                      <span className="font-bold">{pro.reputation_score || 0}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                    <div className="flex items-center text-indigo-400">
                      <Award className="h-4 w-4 mr-1" />
                      <span className="font-bold">Lvl {getLevel(pro.reputation_score)}</span>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {pro.bio || 'Nenhuma biografia disponível.'}
                  </p>

                  <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                    Ver Perfil
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass-panel rounded-2xl">
              <p className="text-zinc-400 text-lg">Nenhum profissional encontrado com os filtros atuais.</p>
              <Button 
                variant="outline" 
                className="mt-4 border-white/10 text-white hover:bg-white/10"
                onClick={() => { setSearchTerm(''); setPlanFilter('all'); }}
              >
                Limpar Filtros
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-white/10 bg-black/50 text-white hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-zinc-400 text-sm">
                Página {page} de {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="border-white/10 bg-black/50 text-white hover:bg-white/10"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
