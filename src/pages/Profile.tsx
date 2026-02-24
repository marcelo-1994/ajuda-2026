import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Star, Award, Medal, CheckCircle2, Clock, MessageSquare, Trophy } from 'lucide-react';

export const Profile = () => {
  const { user, profile, signOut } = useAuth();

  if (!user || !profile) {
    return <div className="text-center py-12 text-zinc-400">Carregando perfil...</div>;
  }

  const getLevel = (score: number) => {
    return Math.floor(Math.sqrt((score || 0) / 10)) + 1;
  };

  const level = getLevel(profile.reputation_score);
  const nextLevelScore = Math.pow(level, 2) * 10;
  const progress = Math.min(100, ((profile.reputation_score || 0) / nextLevelScore) * 100);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-panel p-8 rounded-3xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-900/50 to-purple-900/50"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 pt-12">
          <div className="relative">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.name} className="w-32 h-32 rounded-full object-cover border-4 border-black shadow-xl" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 font-bold text-4xl border-4 border-black shadow-xl">
                {profile.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-black rounded-full p-1 border border-white/10">
              <div className="bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                L{level}
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
              {profile.name}
              {profile.plan === 'pro' && <span className="text-xs uppercase tracking-wider bg-indigo-500 text-white px-2 py-1 rounded-full font-bold">PRO</span>}
              {profile.plan === 'strategic' && <span className="text-xs uppercase tracking-wider bg-purple-500 text-white px-2 py-1 rounded-full font-bold">VIP</span>}
            </h1>
            <p className="text-zinc-400 mb-4">{profile.email}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">{profile.reputation_score || 0}</span>
                <span className="text-zinc-400 text-sm">Reputação</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto mt-6 md:mt-0">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              Editar Perfil
            </Button>
            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10" onClick={signOut}>
              Sair da Conta
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-400" /> Progresso do Nível
            </h2>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-zinc-400">Nível {level}</span>
              <span className="text-zinc-400">Nível {level + 1}</span>
            </div>
            <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-zinc-500 mt-3 text-center">
              Faltam {nextLevelScore - (profile.reputation_score || 0)} pontos para o próximo nível
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Medal className="h-5 w-5 text-amber-400" /> Suas Conquistas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                </div>
                <span className="text-xs font-bold text-white mb-1">Primeira Ajuda</span>
                <span className="text-[10px] text-zinc-500">Concluiu 1 pedido</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                  <Star className="h-6 w-6 text-amber-400" />
                </div>
                <span className="text-xs font-bold text-white mb-1">5 Estrelas</span>
                <span className="text-[10px] text-zinc-500">Recebeu avaliação máxima</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10 opacity-50 grayscale">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3">
                  <MessageSquare className="h-6 w-6 text-indigo-400" />
                </div>
                <span className="text-xs font-bold text-white mb-1">Comunicador</span>
                <span className="text-[10px] text-zinc-500">10 respostas dadas</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10 opacity-50 grayscale">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                </div>
                <span className="text-xs font-bold text-white mb-1">Top 10</span>
                <span className="text-[10px] text-zinc-500">Top 10 do mês</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">Sobre Mim</h2>
            {profile.bio ? (
              <p className="text-zinc-400 text-sm leading-relaxed">{profile.bio}</p>
            ) : (
              <p className="text-zinc-500 text-sm italic">Nenhuma biografia adicionada.</p>
            )}
          </div>

          <div className="glass-panel p-6 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">Estatísticas</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Membro desde</span>
                <span className="text-white text-sm font-medium">{new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Plano Atual</span>
                <span className="text-white text-sm font-medium uppercase">{profile.plan}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
