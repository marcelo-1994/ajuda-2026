import React from 'react';
import { Button } from '../components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export const Pricing = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Planos que crescem com você</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          Escolha o plano ideal para suas necessidades e comece a ajudar ou ser ajudado hoje mesmo.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col relative">
          <h3 className="text-2xl font-bold text-white mb-2">Gratuito</h3>
          <p className="text-zinc-400 mb-6">Para quem quer começar a ajudar a comunidade.</p>
          <div className="text-4xl font-bold text-white mb-8">R$ 0<span className="text-lg text-zinc-500 font-normal">/mês</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Até 3 pedidos de ajuda por mês</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Responder até 5 pedidos</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Perfil básico</span>
            </li>
          </ul>
          
          <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
            Plano Atual
          </Button>
        </div>

        {/* PRO Plan */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col relative border-indigo-500/50 shadow-[0_0_30px_rgba(79,70,229,0.15)] transform md:-translate-y-4">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            MAIS POPULAR
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">PRO</h3>
          <p className="text-zinc-400 mb-6">Para profissionais que querem se destacar.</p>
          <div className="text-4xl font-bold text-white mb-8">R$ 29<span className="text-lg text-zinc-500 font-normal">/mês</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Pedidos e respostas ilimitados</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Perfil destacado nas buscas</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Selo de Profissional Verificado</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Pode oferecer serviços pagos</span>
            </li>
          </ul>
          
          <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            Assinar PRO
          </Button>
        </div>

        {/* Strategic Plan */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col relative">
          <h3 className="text-2xl font-bold text-white mb-2">Estratégico</h3>
          <p className="text-zinc-400 mb-6">Para agências e mentores de alto nível.</p>
          <div className="text-4xl font-bold text-white mb-8">R$ 99<span className="text-lg text-zinc-500 font-normal">/mês</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Tudo do plano PRO</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Criar comunidade privada</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Vender mentorias exclusivas</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Analytics avançado do perfil</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
              <span className="text-zinc-300">Destaque na página inicial</span>
            </li>
          </ul>
          
          <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
            Assinar Estratégico
          </Button>
        </div>
      </div>
    </div>
  );
};
