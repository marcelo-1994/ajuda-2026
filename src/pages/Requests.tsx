import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Search, Filter, Clock, MessageSquare, DollarSign, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const Requests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchRequests();
  }, [searchTerm, categoryFilter, statusFilter, page]);

  const fetchRequests = async () => {
    setLoading(true);
    
    let query = supabase
      .from('help_requests')
      .select(`
        *,
        users (name, avatar_url, reputation_score)
      `, { count: 'exact' });

    if (categoryFilter !== 'all') {
      query = query.eq('category', categoryFilter);
    }
    
    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

    if (error) {
      console.error('Error fetching requests:', error);
    } else {
      setRequests(data || []);
      setTotalCount(count || 0);
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Explorar Pedidos de Ajuda</h1>
          <p className="text-zinc-400">Encontre pessoas que precisam do seu conhecimento.</p>
        </div>
        <Link to="/create-request">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.5)]">Criar Pedido</Button>
        </Link>
      </div>

      <div className="glass-panel p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por palavras-chave..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          />
        </div>
        
        <div className="flex gap-4">
          <select
            className="px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          >
            <option value="all">Todas Categorias</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Negócios">Negócios</option>
            <option value="Educação">Educação</option>
            <option value="Outros">Outros</option>
          </select>

          <select
            className="px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="all">Todos Status</option>
            <option value="open">Aberto</option>
            <option value="in_progress">Em Andamento</option>
            <option value="completed">Concluído</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-zinc-400">Carregando pedidos...</div>
      ) : (
        <div className="grid gap-6">
          {requests.length > 0 ? (
            <>
              {requests.map((request) => (
                <Link key={request.id} to={`/requests/${request.id}`} className="block group">
                  <div className="glass-panel p-6 rounded-2xl hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {request.users?.avatar_url ? (
                          <img src={request.users.avatar_url} alt={request.users.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-indigo-900/50 flex items-center justify-center text-indigo-300 font-bold border border-indigo-500/30">
                            {request.users?.name?.charAt(0) || 'U'}
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-white">{request.users?.name || 'Usuário Anônimo'}</h3>
                          <div className="flex items-center text-xs text-zinc-400 gap-2 mt-1">
                            <span className="flex items-center text-amber-400"><Star className="h-3 w-3 mr-1 fill-amber-400" /> {request.users?.reputation_score || 0}</span>
                            <span>•</span>
                            <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {new Date(request.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      {request.is_paid ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <DollarSign className="h-3 w-3 mr-1" /> Pago
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          Comunidade
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">{request.title}</h2>
                    <p className="text-zinc-400 line-clamp-2 mb-6 leading-relaxed">
                      {request.description}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-zinc-300 border border-white/5">
                        {request.category}
                      </span>
                      <div className="flex items-center text-sm text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                        <MessageSquare className="h-4 w-4 mr-2" /> Responder
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
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
          ) : (
            <div className="text-center py-16 glass-panel rounded-2xl">
              <p className="text-zinc-400 text-lg">Nenhum pedido encontrado com os filtros atuais.</p>
              <Button 
                variant="outline" 
                className="mt-4 border-white/10 text-white hover:bg-white/10"
                onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setStatusFilter('all'); }}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
