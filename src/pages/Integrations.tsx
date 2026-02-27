import React from 'react';
import { Link2, Webhook, Github, MessageCircle, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';

const integrations = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Receba notificações de novos pedidos e mensagens diretamente no seu WhatsApp.',
    icon: <MessageCircle className="h-8 w-8 text-emerald-500" />,
    status: 'connected',
    color: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Processe pagamentos de forma segura e receba diretamente na sua conta bancária.',
    icon: <Link2 className="h-8 w-8 text-indigo-500" />,
    status: 'disconnected',
    color: 'bg-indigo-500/10 border-indigo-500/20',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Sincronize seus repositórios e mostre seus projetos no seu perfil.',
    icon: <Github className="h-8 w-8 text-zinc-300" />,
    status: 'disconnected',
    color: 'bg-zinc-500/10 border-zinc-500/20',
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Conecte-se ao servidor da comunidade e receba alertas de vagas.',
    icon: <Webhook className="h-8 w-8 text-[#5865F2]" />,
    status: 'disconnected',
    color: 'bg-[#5865F2]/10 border-[#5865F2]/20',
  }
];

export const Integrations = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-bold text-white mb-3 flex items-center justify-center md:justify-start gap-3">
          <Link2 className="h-8 w-8 text-indigo-400" />
          Integrações
        </h1>
        <p className="text-zinc-400 max-w-2xl">
          Conecte o AJUDA+ com suas ferramentas favoritas para automatizar seu fluxo de trabalho, receber notificações e gerenciar pagamentos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className={`glass-panel p-6 rounded-3xl border ${integration.color} transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.1)]`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5 shadow-inner">
                  {integration.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{integration.name}</h3>
                  <div className="flex items-center gap-2">
                    {integration.status === 'connected' ? (
                      <span className="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1" /> Conectado
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-medium text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full">
                        Não conectado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 h-10">
              {integration.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                Ver Documentação <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
              
              {integration.status === 'connected' ? (
                <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30">
                  Desconectar
                </Button>
              ) : (
                <Button size="sm" className="bg-white/10 hover:bg-indigo-600 text-white border border-white/10 hover:border-indigo-500">
                  Conectar <RefreshCw className="h-3 w-3 ml-2" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
