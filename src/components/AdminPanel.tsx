import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { QuoteRequest } from '../types';
import { getRecentQuoteRequests, db } from '../firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { Database, Clock, RefreshCw, Layers, CheckCircle, Smartphone, Mail, Building2, User } from 'lucide-react';

export default function AdminPanel() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Firestore Snapshot listening to catch data instantly!
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'quoteRequests'), orderBy('createdAt', 'desc'), limit(20));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: QuoteRequest[] = [];
      snapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data()
        } as QuoteRequest);
      });
      setRequests(docs);
      setLoading(false);
    }, (error) => {
      console.error("Firestore onSnapshot error:", error);
      // Fallback to manual load
      handleManualRefresh();
    });

    return () => unsubscribe();
  }, []);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getRecentQuoteRequests(20);
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Panel Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2 text-blue-600 font-mono text-xs uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Console Operacional Firestore Live</span>
            </div>
            <h2 className="text-3xl font-display font-black text-slate-900 mt-1">
              Painel de Registro de Orçamentos
            </h2>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed font-semibold">
              Demonstração em tempo real das simulações gravadas no banco de persistência em nuvem. Cada requisição inserida no simulador gera um registro imediato abaixo.
            </p>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="inline-flex items-center space-x-2 border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-bold text-slate-600 px-4 py-2 rounded-lg cursor-pointer transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-blue-600' : 'text-slate-400'}`} />
            <span>Atualizar registros</span>
          </button>
        </div>

        {/* Database records grid/list */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">Aguardando dados da nuvem...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="border border-dashed border-slate-200 bg-white rounded-3xl p-16 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-display font-black text-lg text-slate-900">Nenhum registro encontrado</h3>
            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
              O banco de dados Firestore está conectado com sucesso, mas ainda não possui simulações ativas. Faça uma simulação no site para visualizar os dados atualizados em tempo real!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req, idx) => (
              <motion.div
                key={req.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 hover:border-slate-350 hover:shadow-md transition-all"
              >
                {/* Micro record header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] font-mono font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(req.createdAt).toLocaleString('pt-BR', { hour12: false })}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100">
                    {req.companySize === 'small' && 'PEQUENO'}
                    {req.companySize === 'medium' && 'MÉDIO'}
                    {req.companySize === 'large' && 'GRANDE'}
                    {req.companySize === 'enterprise' && 'CORPORATIVO'}
                  </span>
                </div>

                {/* Company details */}
                <div className="space-y-3.5">
                  <div className="flex items-start space-x-2.5">
                    <Building2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">EMPRESA / RESPONSÁVEL</span>
                      <span className="text-sm font-bold text-slate-900 block truncate">{req.companyName}</span>
                      <span className="text-xs text-slate-500 flex items-center space-x-1 font-semibold mt-0.5">
                        <User className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{req.contactName}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 pt-2 border-t border-slate-100">
                    <Mail className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="overflow-hidden">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">CONTATOS CORP</span>
                      <span className="text-xs text-slate-600 block truncate font-medium select-all">{req.email}</span>
                      <span className="text-xs text-slate-400 flex items-center space-x-1 font-mono tracking-tight font-bold mt-0.5">
                        <Smartphone className="w-3 h-3 text-slate-400" />
                        <span>{req.phone}</span>
                      </span>
                    </div>
                  </div>

                  {/* Selected items */}
                  <div className="pt-2.5 border-t border-slate-100">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 flex items-center gap-1 font-bold">
                      <Layers className="w-3 h-3" /> Camadas Solicitadas:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {req.infrastructureNeeds && req.infrastructureNeeds.length > 0 ? (
                        req.infrastructureNeeds.map((need, nIdx) => (
                          <span
                            key={nIdx}
                            className="text-[9px] font-mono font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-blue-600 capitalize"
                          >
                            {need === 'security' && 'Cybersegurança'}
                            {need === 'connectivity' && 'Conectividade'}
                            {need === 'cloud' && 'Cloud & VM'}
                            {need === 'backup' && 'Backup Veeam'}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold font-mono">Nenhum módulo selecionado</span>
                      )}
                    </div>
                  </div>

                  {/* Extra comments */}
                  {req.additionalDetails && (
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-500 font-medium leading-relaxed max-h-16 overflow-y-auto">
                      <span className="text-[8px] font-mono text-slate-400 uppercase font-black block mb-0.5">NOTAS:</span>
                      {req.additionalDetails}
                    </div>
                  )}

                  {/* Pricing estimation box */}
                  <div className="bg-blue-50/50 border border-slate-200/80 rounded-xl p-3 flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">{req.status}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-mono block text-right">R$/Mês Estimado:</span>
                      <span className="text-base font-extrabold text-blue-600 font-display">R$ {req.estimatedMonthly?.toLocaleString('pt-BR') || '0'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
