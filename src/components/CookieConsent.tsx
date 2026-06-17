import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Settings, X, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setVisible(false);
  };

  const handleAcceptAll = () => {
    const all = { necessary: true, analytics: true, marketing: true };
    setPreferences(all);
    localStorage.setItem('cookieConsent', JSON.stringify(all));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 mt-0.5">
                  <Cookie className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Este site utiliza cookies</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
                    Utilizamos cookies para melhorar sua experiência, analisar tráfego e personalizar conteúdo. Você pode gerenciar suas preferências a qualquer momento.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 flex-shrink-0">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Configurações</span>
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="text-xs font-mono font-bold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Aceitar Todos
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-slate-800">Preferências de Cookies</span>
                </div>
                <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-not-allowed opacity-70">
                  <input type="checkbox" checked disabled className="w-4 h-4 accent-blue-600 rounded" />
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">Necessários</span>
                    <span className="text-[10px] text-slate-400">Sempre ativos</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-300 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">Analíticos</span>
                    <span className="text-[10px] text-slate-400">Métricas de uso</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-300 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">Marketing</span>
                    <span className="text-[10px] text-slate-400">Publicidade personalizada</span>
                  </div>
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAccept}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-sm cursor-pointer"
                >
                  <span>Salvar Preferências</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
