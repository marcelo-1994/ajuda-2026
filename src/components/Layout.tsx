import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { HeartHandshake, Menu, UserCircle, X } from 'lucide-react';
import { Notifications } from './Notifications';

export const Layout = () => {
  const { user, profile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-zinc-50 font-sans relative overflow-hidden">
      <div className="atmosphere-bg"></div>
      
      <header className="sticky top-0 z-50 w-full glass-header">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight z-50 relative">
            <HeartHandshake className="h-6 w-6 text-indigo-400" />
            <span className="text-gradient">AJUDA+</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/requests" className="text-zinc-300 hover:text-white transition-colors">Explorar Pedidos</Link>
            <Link to="/professionals" className="text-zinc-300 hover:text-white transition-colors">Profissionais</Link>
            <Link to="/marketplace" className="text-zinc-300 hover:text-white transition-colors">Marketplace</Link>
            <Link to="/ranking" className="text-zinc-300 hover:text-white transition-colors">Ranking</Link>
            <Link to="/pricing" className="text-zinc-300 hover:text-white transition-colors">Planos</Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Notifications />
                <Link to="/dashboard" className="hidden md:block text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <div className="hidden md:flex items-center gap-2 z-50 relative">
                  <Link to="/profile">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    ) : (
                      <UserCircle className="h-8 w-8 text-zinc-400" />
                    )}
                  </Link>
                  <Button variant="ghost" size="sm" onClick={signOut} className="text-zinc-300 hover:text-white hover:bg-white/10">Sair</Button>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Entrar</Link>
                <Link to="/register">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.5)]">Cadastrar</Button>
                </Link>
              </div>
            )}
            <button 
              className="md:hidden text-zinc-300 hover:text-white relative z-50 p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-6 pb-6 overflow-y-auto">
          <nav className="flex flex-col gap-6 text-lg font-medium">
            <Link to="/requests" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white transition-colors">Explorar Pedidos</Link>
            <Link to="/professionals" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white transition-colors">Profissionais</Link>
            <Link to="/marketplace" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white transition-colors">Marketplace</Link>
            <Link to="/ranking" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white transition-colors">Ranking</Link>
            <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white transition-colors">Planos</Link>
            
            {user && (
              <>
                <div className="h-px bg-white/10 my-2"></div>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link to="/community" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white transition-colors">
                  Comunidade (Chat)
                </Link>
                <Link to="/integrations" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white transition-colors">
                  Integrações
                </Link>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 hover:text-white transition-colors">
                  Meu Perfil
                </Link>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut();
                  }} 
                  className="text-left text-red-400 hover:text-red-300 transition-colors"
                >
                  Sair da Conta
                </button>
              </>
            )}

            {!user && (
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/10">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-3 rounded-xl bg-white/5 text-white font-medium border border-white/10">
                  Entrar
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-3 rounded-xl bg-indigo-600 text-white font-medium border border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                  Cadastrar
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 py-8 mt-16 relative z-10">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} AJUDA+. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};
