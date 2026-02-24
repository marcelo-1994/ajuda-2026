import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { PlusCircle, Clock, CheckCircle2, Star } from 'lucide-react';

export const Dashboard = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({
    openRequests: 0,
    completedRequests: 0,
    responses: 0,
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    if (!user) return;
    
    const { count: openCount } = await supabase
      .from('help_requests')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'open');

    const { count: completedCount } = await supabase
      .from('help_requests')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'completed');

    const { count: responseCount } = await supabase
      .from('responses')
      .select('*', { count: 'exact', head: true })
      .eq('responder_id', user.id);

    setStats({
      openRequests: openCount || 0,
      completedRequests: completedCount || 0,
      responses: responseCount || 0,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Olá, {profile?.name || 'Usuário'}</h1>
          <p className="text-zinc-500">Bem-vindo ao seu painel de controle.</p>
        </div>
        <Link to="/create-request">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Pedido
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-medium text-zinc-500">Pedidos Abertos</h3>
          </div>
          <p className="text-3xl font-bold">{stats.openRequests}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-medium text-zinc-500">Concluídos</h3>
          </div>
          <p className="text-3xl font-bold">{stats.completedRequests}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-zinc-500">Respostas Dadas</h3>
          </div>
          <p className="text-3xl font-bold">{stats.responses}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <Star className="h-6 w-6 text-amber-600 dark:text-amber-400 fill-amber-600" />
            </div>
            <h3 className="font-medium text-zinc-500">Reputação</h3>
          </div>
          <p className="text-3xl font-bold">{profile?.reputation_score || 0}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Seus Pedidos Recentes</h2>
            <Link to="/profile" className="text-sm text-indigo-600 hover:underline">Ver todos</Link>
          </div>
          <p className="text-zinc-500 text-sm">Nenhum pedido recente encontrado.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Suas Respostas</h2>
            <Link to="/profile" className="text-sm text-indigo-600 hover:underline">Ver todas</Link>
          </div>
          <p className="text-zinc-500 text-sm">Nenhuma resposta recente encontrada.</p>
        </div>
      </div>
    </div>
  );
};
