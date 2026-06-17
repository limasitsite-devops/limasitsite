import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminOpen: boolean;
}

export default function Header({ onAdminToggle, isAdminOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Parceiros', href: '#partners' },
    { name: 'Soluções', href: '#services' },
    { name: 'Orçamento Inteligente', href: '#simulator' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="header-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Brand */}
        <a href="#home" onClick={() => handleLinkClick('#home')} className="flex items-center space-x-2 group">
          <div className="relative w-8 h-8 flex items-center justify-center bg-blue-600 rounded overflow-hidden group-hover:bg-blue-700 transition-colors">
            <ShieldCheck className="w-4.5 h-4.5 text-white relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-tight text-xl text-slate-800 uppercase">
              LIMAS <span className="text-blue-600">IT</span>
            </span>
            <span className="text-[9px] font-mono tracking-[4px] text-slate-400 uppercase -mt-1 block font-bold">
              Soluções em TI
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors relative py-1 cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#simulator"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#simulator');
            }}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-full text-sm transition-all duration-300 shadow-sm uppercase tracking-wider hover:scale-[1.02]"
          >
            <span>Saiba Mais</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-600 hover:text-blue-600 p-2 focus:outline-none"
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200/90 backdrop-blur-lg flex flex-col px-6 py-6 space-y-4 md:hidden shadow-2xl text-slate-800"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-left text-base font-semibold text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-4">
              <a
                href="#simulator"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#simulator');
                }}
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full text-sm flex items-center justify-center space-x-2 uppercase tracking-wide"
              >
                <span>Saiba Mais</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
