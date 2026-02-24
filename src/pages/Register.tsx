import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      alert('Verifique seu email para confirmar o cadastro!');
      navigate('/login');
    }
    setLoading(false);
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-3xl font-bold text-center mb-8">Criar Conta</h2>
      
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm">{error}</div>}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome Completo</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
          {loading ? 'Criando...' : 'Cadastrar'}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-between">
        <span className="border-b border-zinc-200 dark:border-zinc-800 w-1/5 lg:w-1/4"></span>
        <span className="text-xs text-center text-zinc-500 uppercase">ou cadastre-se com</span>
        <span className="border-b border-zinc-200 dark:border-zinc-800 w-1/5 lg:w-1/4"></span>
      </div>

      <div className="mt-6 flex gap-4">
        <Button variant="outline" className="w-full" onClick={() => handleOAuthLogin('google')}>
          Google
        </Button>
        <Button variant="outline" className="w-full" onClick={() => handleOAuthLogin('github')}>
          GitHub
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Já tem uma conta? <Link to="/login" className="text-indigo-600 hover:underline">Entrar</Link>
      </p>
    </div>
  );
};
