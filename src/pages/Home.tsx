import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, CheckCircle2, Star, Users } from 'lucide-react';

export const Home = () => {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-20 pb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
          Ajuda mútua que <span className="text-indigo-600 dark:text-indigo-400">transforma</span> vidas.
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Conecte-se com profissionais e pessoas dispostas a ajudar. Peça suporte, ofereça seus serviços e construa uma reputação sólida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto text-lg h-14 px-8">
              Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/requests">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8">
              Explorar Pedidos
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
            <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Comunidade Ativa</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Milhares de pessoas prontas para ajudar ou precisando do seu conhecimento.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Pedidos Resolvidos</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Acompanhe o status e garanta que sua necessidade seja atendida com qualidade.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
            <Star className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Reputação e Níveis</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Ganhe pontos, suba no ranking e destaque-se como um profissional de excelência.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 rounded-3xl p-12 text-center text-white max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para fazer a diferença?</h2>
        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
          Junte-se ao AJUDA+ hoje mesmo. É grátis para começar e você pode evoluir para planos profissionais quando quiser.
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-zinc-100 text-lg h-14 px-10">
            Criar Conta Gratuita
          </Button>
        </Link>
      </section>
    </div>
  );
};
