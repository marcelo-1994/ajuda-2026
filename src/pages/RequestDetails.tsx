import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Clock, DollarSign, Star, UserCircle, Send, CheckCircle2 } from 'lucide-react';

export const RequestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [request, setRequest] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const fetchRequestDetails = async () => {
    if (!id) return;
    setLoading(true);
    
    // Fetch request
    const { data: reqData, error: reqError } = await supabase
      .from('help_requests')
      .select(`
        *,
        users (id, name, avatar_url, reputation_score)
      `)
      .eq('id', id)
      .single();

    if (reqError) console.error(reqError);
    else setRequest(reqData);

    // Fetch responses
    const { data: resData, error: resError } = await supabase
      .from('responses')
      .select(`
        *,
        users (id, name, avatar_url, reputation_score)
      `)
      .eq('request_id', id)
      .order('created_at', { ascending: true });

    if (resError) console.error(resError);
    else setResponses(resData || []);

    setLoading(false);
  };

  const handleSendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id || !message.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from('responses').insert([
      {
        request_id: id,
        responder_id: user.id,
        message: message.trim(),
      },
    ]);

    setSubmitting(false);
    if (error) {
      alert('Erro ao enviar resposta: ' + error.message);
    } else {
      setMessage('');
      fetchRequestDetails();
    }
  };

  const handleAcceptResponse = async (responseId: string) => {
    if (!user || request?.user_id !== user.id) return;

    const { error } = await supabase
      .from('responses')
      .update({ accepted: true })
      .eq('id', responseId);

    if (error) {
      alert('Erro ao aceitar resposta: ' + error.message);
    } else {
      // Update request status
      await supabase
        .from('help_requests')
        .update({ status: 'completed' })
        .eq('id', id);
        
      fetchRequestDetails();
    }
  };

  if (loading) return <div className="text-center py-12">Carregando detalhes...</div>;
  if (!request) return <div className="text-center py-12">Pedido não encontrado.</div>;

  const isOwner = user?.id === request.user_id;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Request Header */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                {request.category}
              </span>
              {request.is_paid ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <DollarSign className="h-3 w-3 mr-1" /> R$ {request.price}
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Ajuda Comunitária
                </span>
              )}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                request.status === 'open' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                request.status === 'completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'
              }`}>
                {request.status === 'open' ? 'Aberto' : request.status === 'completed' ? 'Concluído' : 'Em Andamento'}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{request.title}</h1>
            <div className="flex items-center text-sm text-zinc-500 gap-4">
              <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> Publicado em {new Date(request.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            {request.users?.avatar_url ? (
              <img src={request.users.avatar_url} alt={request.users.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <UserCircle className="w-12 h-12 text-zinc-400" />
            )}
            <div>
              <p className="text-xs text-zinc-500 mb-1">Solicitado por</p>
              <h3 className="font-bold">{request.users?.name || 'Usuário Anônimo'}</h3>
              <div className="flex items-center text-xs text-amber-600 dark:text-amber-500 font-medium">
                <Star className="h-3 w-3 mr-1 fill-amber-500" /> Reputação: {request.users?.reputation_score || 0}
              </div>
            </div>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {request.description}
          </p>
        </div>
      </div>

      {/* Responses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          Respostas <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm py-1 px-3 rounded-full">{responses.length}</span>
        </h2>
        
        <div className="space-y-6">
          {responses.map((response) => (
            <div key={response.id} className={`bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border ${response.accepted ? 'border-emerald-500 dark:border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-zinc-200 dark:border-zinc-800'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {response.users?.avatar_url ? (
                    <img src={response.users.avatar_url} alt={response.users.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <UserCircle className="w-10 h-10 text-zinc-400" />
                  )}
                  <div>
                    <h3 className="font-bold text-sm">{response.users?.name || 'Usuário Anônimo'}</h3>
                    <div className="flex items-center text-xs text-zinc-500 gap-2">
                      <span className="flex items-center text-amber-600 dark:text-amber-500"><Star className="h-3 w-3 mr-1" /> {response.users?.reputation_score || 0}</span>
                      <span>•</span>
                      <span>{new Date(response.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {response.accepted && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 mr-1" /> Solução Aceita
                  </span>
                )}
                
                {isOwner && !response.accepted && request.status === 'open' && (
                  <Button size="sm" variant="outline" className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-900/50 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400" onClick={() => handleAcceptResponse(response.id)}>
                    Aceitar Ajuda
                  </Button>
                )}
              </div>
              
              <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {response.message}
              </p>
            </div>
          ))}

          {responses.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 border-dashed">
              <p className="text-zinc-500">Nenhuma resposta ainda. Seja o primeiro a ajudar!</p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {user && !isOwner && request.status === 'open' && (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-bold mb-4">Oferecer Ajuda</h3>
          <form onSubmit={handleSendResponse}>
            <textarea
              required
              rows={4}
              placeholder="Descreva como você pode ajudar com este pedido..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-none mb-4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end">
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8" disabled={submitting || !message.trim()}>
                {submitting ? 'Enviando...' : (
                  <>Enviar Resposta <Send className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {!user && (
        <div className="text-center py-8 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
          <p className="text-indigo-800 dark:text-indigo-300 mb-4">Faça login para oferecer ajuda neste pedido.</p>
          <Link to="/login">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Entrar na Plataforma</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
