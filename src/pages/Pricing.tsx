import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Zap, Star, Shield, Coins } from 'lucide-react';

export const Pricing = () => {
  const [viewMode, setViewMode] = useState<'plans' | 'credits'>('plans');

  const handlePurchase = (itemName: string, price: string) => {
    const message = `Olá! Gostaria de adquirir: *${itemName}* no valor de *${price}*. Como faço o pagamento?`;
    window.open(`https://wa.me/5594991233751?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Escolha como quer usar</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-8">
          Você atingiu o limite gratuito de 3 pedidos. Escolha um plano mensal ilimitado ou compre pacotes de créditos avulsos.
        </p>
        
        <div className="inline-flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setViewMode('plans')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              viewMode === 'plans' 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Planos Mensais
          </button>
          <button
            onClick={() => setViewMode('credits')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              viewMode === 'credits' 
                ? 'bg-emerald-600 text-white shadow-lg' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Coins className="w-4 h-4" /> Pacotes de Créditos
          </button>
        </div>
      </div>

      {viewMode === 'plans' ? (
        <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4">
          {/* Free Plan */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col relative">
            <h3 className="text-2xl font-bold text-white mb-2">Gratuito</h3>
            <p className="text-zinc-400 mb-6">Para quem quer começar a ajudar a comunidade.</p>
            <div className="text-4xl font-bold text-white mb-8">R$ 0<span className="text-lg text-zinc-500 font-normal">/mês</span></div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Até 3 pedidos de ajuda no total</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Responder até 5 pedidos</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Perfil básico</span>
              </li>
            </ul>
            
            <Button disabled className="w-full bg-zinc-800 text-zinc-400 border border-zinc-700">
              Plano Atual
            </Button>
          </div>

          {/* PRO Plan */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col relative border-indigo-500/50 shadow-[0_0_30px_rgba(79,70,229,0.15)] transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              MAIS POPULAR
            </div>
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/30">
              <Star className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Plano PRO</h3>
            <p className="text-zinc-400 mb-6">Para profissionais que querem se destacar.</p>
            <div className="text-4xl font-bold text-white mb-8">R$ 29<span className="text-lg text-zinc-500 font-normal">/mês</span></div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-bold text-white">Pedidos ilimitados</span>
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
            
            <Button 
              onClick={() => handlePurchase('Plano PRO (Mensal)', 'R$ 29,00')}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
            >
              Assinar PRO
            </Button>
          </div>

          {/* Strategic Plan */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col relative">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 border border-purple-500/30">
              <Shield className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Plano Estratégico</h3>
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
            </ul>
            
            <Button 
              onClick={() => handlePurchase('Plano Estratégico (Mensal)', 'R$ 99,00')}
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
            >
              Assinar Estratégico
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4">
          {/* Pacote 1 */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col relative border-emerald-500/20">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/30">
              <Zap className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pacote Básico</h3>
            <p className="text-zinc-400 mb-6">Ideal para quem precisa de ajuda pontual.</p>
            <div className="text-4xl font-bold text-white mb-8">R$ 15<span className="text-lg text-zinc-500 font-normal">/único</span></div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-bold text-white">+5 Créditos (Pedidos)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Créditos não expiram</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => handlePurchase('Pacote Básico (+5 Créditos)', 'R$ 15,00')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              Comprar Créditos
            </Button>
          </div>

          {/* Pacote 2 */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col relative border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              MELHOR CUSTO-BENEFÍCIO
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/30">
              <Coins className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pacote Intermediário</h3>
            <p className="text-zinc-400 mb-6">Para quem usa a plataforma com frequência.</p>
            <div className="text-4xl font-bold text-white mb-8">R$ 29<span className="text-lg text-zinc-500 font-normal">/único</span></div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-bold text-white">+15 Créditos (Pedidos)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Créditos não expiram</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Prioridade no suporte</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => handlePurchase('Pacote Intermediário (+15 Créditos)', 'R$ 29,00')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            >
              Comprar Créditos
            </Button>
          </div>

          {/* Pacote 3 */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col relative border-emerald-500/20">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/30">
              <Shield className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pacote Avançado</h3>
            <p className="text-zinc-400 mb-6">Para agências e alto volume de pedidos.</p>
            <div className="text-4xl font-bold text-white mb-8">R$ 99<span className="text-lg text-zinc-500 font-normal">/único</span></div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-bold text-white">+60 Créditos (Pedidos)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Créditos não expiram</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Suporte VIP</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => handlePurchase('Pacote Avançado (+60 Créditos)', 'R$ 99,00')}
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
            >
              Comprar Créditos
            </Button>
          </div>
        </div>
      )}
      
      <div className="mt-12 text-center text-zinc-500 text-sm">
        <p>Os pagamentos são processados manualmente de forma segura via WhatsApp.</p>
        <p>Após a confirmação, seus créditos ou plano serão ativados na sua conta.</p>
      </div>
    </div>
  );
};
