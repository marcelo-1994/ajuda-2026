import React, { useState } from 'react';
import { MessageSquare, Hash, Users, Send, Search, Image as ImageIcon, Smile, MoreVertical } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';

const channels = [
  { id: 'geral', name: 'geral', unread: 0 },
  { id: 'ajuda', name: 'ajuda-mutua', unread: 3 },
  { id: 'vagas', name: 'vagas-e-freelas', unread: 0 },
  { id: 'projetos', name: 'projetos-colab', unread: 12 },
];

const mockMessages = [
  { id: 1, user: 'João Silva', avatar: 'https://i.pravatar.cc/150?u=1', time: '10:30', text: 'Bom dia pessoal! Alguém manja de React Native?' },
  { id: 2, user: 'Maria Souza', avatar: 'https://i.pravatar.cc/150?u=2', time: '10:32', text: 'Oi João! Eu trabalho com RN faz uns 2 anos. Qual a dúvida?' },
  { id: 3, user: 'João Silva', avatar: 'https://i.pravatar.cc/150?u=1', time: '10:35', text: 'Estou com um problema na navegação usando o React Navigation. Posso te mandar DM?' },
  { id: 4, user: 'Maria Souza', avatar: 'https://i.pravatar.cc/150?u=2', time: '10:36', text: 'Claro, manda lá!' },
  { id: 5, user: 'Carlos Mendes', avatar: 'https://i.pravatar.cc/150?u=3', time: '11:00', text: 'Galera, acabei de postar um pedido de ajuda de design lá na plataforma. Se alguém puder dar uma olhada 🙏' },
];

export const Community = () => {
  const { profile } = useAuth();
  const [activeChannel, setActiveChannel] = useState('geral');
  const [message, setMessage] = useState('');

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] min-h-[600px] flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-64 glass-panel rounded-3xl p-6 flex flex-col h-full shrink-0">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-400" />
          Comunidade
        </h2>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar canais..." 
            className="w-full bg-black/30 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Canais</h3>
          <div className="space-y-1">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeChannel === channel.id 
                    ? 'bg-indigo-600/20 text-indigo-300 font-medium' 
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 opacity-70" />
                  {channel.name}
                </div>
                {channel.unread > 0 && (
                  <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-panel rounded-3xl flex flex-col h-full overflow-hidden relative">
        {/* Chat Header */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <Hash className="h-6 w-6 text-zinc-400" />
            <div>
              <h3 className="font-bold text-white text-lg">{activeChannel}</h3>
              <p className="text-xs text-zinc-400">Canal para discussões gerais da comunidade</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img src="https://i.pravatar.cc/150?u=1" className="w-8 h-8 rounded-full border-2 border-zinc-900" alt="User" />
              <img src="https://i.pravatar.cc/150?u=2" className="w-8 h-8 rounded-full border-2 border-zinc-900" alt="User" />
              <img src="https://i.pravatar.cc/150?u=3" className="w-8 h-8 rounded-full border-2 border-zinc-900" alt="User" />
              <div className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-xs text-white font-medium">+42</div>
            </div>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {mockMessages.map((msg) => (
            <div key={msg.id} className="flex gap-4 group">
              <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-white">{msg.user}</span>
                  <span className="text-xs text-zinc-500">{msg.time}</span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/20 border-t border-white/5 shrink-0">
          <div className="flex items-end gap-2 bg-zinc-900/50 border border-white/10 rounded-2xl p-2 focus-within:border-indigo-500/50 transition-colors">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white shrink-0">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Conversar em #${activeChannel}...`}
              className="w-full bg-transparent border-none text-white focus:outline-none resize-none py-2 px-2 text-sm max-h-32 min-h-[40px]"
              rows={1}
            />
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white shrink-0">
              <Smile className="h-5 w-5" />
            </Button>
            <Button 
              className={`shrink-0 rounded-xl ${message.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-white/5 text-zinc-500'}`}
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
