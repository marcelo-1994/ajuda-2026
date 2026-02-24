import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { HeartHandshake, Menu, UserCircle } from 'lucide-react';
import { Notifications } from './Notifications';

export const Layout = () => {
  const { user, profile, signOut } = useAuth();

  return (
    <div className="min-h-screen text-zinc-50 font-sans relative overflow-hidden">
      <div className="atmosphere-bg"></div>
      
      <header className="sticky top-0 z-50 w-full glass-header">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <HeartHandshake className="h-6 w-6 text-indigo-400" />
            <span className="text-gradient">AJUDA+</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/requests" className="text-zinc-300 hover:text-white transition-colors">Explorar Pedidos</Link>
            <Link to="/professionals" className="text-zinc-300 hover:text-white transition-colors">Profissionais</Link>
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
                <div className="flex items-center gap-2">
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
              <>
                <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Entrar</Link>
                <Link to="/register">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.5)]">Cadastrar</Button>
                </Link>
              </>
            )}
            <Button variant="ghost" size="icon" className="md:hidden text-zinc-300">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
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
