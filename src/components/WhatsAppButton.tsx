import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show the tooltip after a small delay to catch user's attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    // Auto-hide the tooltip after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 13000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // WhatsApp link format for Brazil (+55 (83) 99825-5226)
  const whatsappUrl = "https://wa.me/5583998255226?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20as%20soluções%20da%20Limas%20IT.";

  return (
    <div id="whatsapp-floating-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            id="whatsapp-tooltip-card"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="mb-3 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 max-w-[260px] pointer-events-auto relative before:content-[''] before:absolute before:bottom-[-6px] before:right-6 before:w-3 before:h-3 before:bg-white before:border-r before:border-b before:border-slate-200 before:rotate-45"
          >
            <button
              id="whatsapp-tooltip-close-btn"
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            
            <div className="flex items-start space-x-2.5 pr-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">Suporte Online</p>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                  Olá! Como podemos ajudar a impulsionar a TI da sua empresa hoje?
                </p>
              </div>
            </div>
            
            <a
              id="whatsapp-tooltip-action"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 flex items-center justify-center space-x-1.5 w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa4f] text-white py-1.5 px-3 rounded-lg text-xs font-bold transition-colors uppercase tracking-wider"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Fale Conosco</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main Button */}
      <motion.a
        id="whatsapp-float-trigger"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 260, damping: 15 }}
        className="pointer-events-auto relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all outline-none"
        onMouseEnter={() => setShowTooltip(true)}
      >
        {/* Repeating beautiful sonar wave animation */}
        <span className="absolute inset-0 bg-[#25D366] rounded-full scale-100 opacity-60 animate-ping shadow-[0_0_15px_rgba(37,211,102,0.6)] duration-2000 pointer-events-none" />
        
        <MessageCircle className="w-7 h-7 fill-current z-10" />
      </motion.a>
    </div>
  );
}
