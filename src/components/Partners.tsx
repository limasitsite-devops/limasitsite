import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Partner } from '../types';
import { ShieldCheck, Cloud, Network, Server, Database, Globe } from 'lucide-react';

export default function Partners() {
  const [activeFilter, setActiveFilter] = useState<string>('Todos');

  const partners: Partner[] = [
    { id: 'fortinet', name: 'Fortinet', category: 'Segurança', description: 'Firewalls corporativos NGFW e segurança cibernética de alta performance.', color: 'hover:border-red-400/80' },
    { id: 'sonicwall', name: 'SonicWall', category: 'Segurança', description: 'Proteção avançada de redes, gateways inteligentes e VPNs seguras.', color: 'hover:border-amber-400/80' },
    { id: 'bitdefender', name: 'Bitdefender', category: 'Segurança', description: 'Antivírus corporativo e segurança inteligente para todos os seus endpoints.', color: 'hover:border-orange-400/80' },
    { id: 'faronics', name: 'Faronics', category: 'Segurança', description: 'Tecnologia Deep Freeze para restauração instantânea de estados do dispositivo.', color: 'hover:border-rose-400/80' },
    { id: 'hikvision', name: 'Hikvision', category: 'Segurança', description: 'CFTV inteligente, monitoramento IP e controle de acessos integrado.', color: 'hover:border-yellow-500/80' },
    { id: 'furukawa', name: 'Furukawa Electric', category: 'Conectividade', description: 'Líder em cabeamento estruturado, conexões de fibra e infra de rede.', color: 'hover:border-teal-400/80' },
    { id: 'lenovo', name: 'Lenovo Enterprise', category: 'Hardware', description: 'Servidores e storage empresariais de extrema confiabilidade de hardware.', color: 'hover:border-slate-400/80' },
    { id: 'vmware', name: 'VMware', category: 'Cloud', description: 'Servidores virtualizados e ambientes de nuvem híbrida altamente integrados.', color: 'hover:border-indigo-400/80' },
    { id: 'microsoft', name: 'Microsoft', category: 'Cloud', description: 'Ambientes corporativos Azure, Windows Server e ferramentas de produtividade.', color: 'hover:border-blue-400/80' },
    { id: 'veeam', name: 'Veeam Backup', category: 'Backup', description: 'Backup, replicação instantânea e alta fidelidade em proteção de dados.', color: 'hover:border-orange-400/80' },
    { id: 'ibm', name: 'IBM Partner', category: 'Cloud', description: 'Consultoria de sistemas complexos, cloud híbrido e servidores robustos.', color: 'hover:border-blue-600/80' }
  ];

  const filters = ['Todos', 'Segurança', 'Conectividade', 'Cloud', 'Backup', 'Hardware'];

  const filteredPartners = activeFilter === 'Todos'
    ? partners
    : partners.filter(p => p.category === activeFilter);

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Segurança': return <ShieldCheck className="w-5 h-5 text-red-500" />;
      case 'Conectividade': return <Network className="w-5 h-5 text-teal-600" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-blue-600" />;
      case 'Backup': return <Database className="w-5 h-5 text-orange-500" />;
      case 'Hardware': return <Server className="w-5 h-5 text-slate-500" />;
      default: return <Globe className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section id="partners" className="relative py-24 bg-white border-t border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">Grandes Parceiros corporativos</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-2">
              Para grandes projetos, os líderes de mercado global.
            </h2>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed font-medium">
              Mantemos parcerias estratégicas certificadas para entregar soluções tecnológicas homologadas e de excelência absoluta para sua empresa.
            </p>
          </div>

          {/* Minimalist filter controls (lightweight, zero-bloat) */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs font-mono tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Bento Grid (Fluid motion transitions, highly optimized for mobile rendering) */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((partner) => (
              <motion.div
                key={partner.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`group relative bg-white hover:bg-slate-50/50 border border-slate-200 ${partner.color} p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 h-48 hover:-translate-y-1 shadow-sm hover:shadow-md`}
              >
                {/* Background glow path */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.02),transparent)] opacity-100 rounded-2xl pointer-events-none"></div>

                <div>
                  {/* Top bar with category icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 text-slate-600">
                      {partner.category}
                    </span>
                    <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
                      {getIconForCategory(partner.category)}
                    </div>
                  </div>

                  {/* Partner Logo/Name Display (Modernist typography replacement of old logos) */}
                  <h3 className="font-display font-extrabold text-2xl text-slate-800 tracking-tight mt-4 flex items-center space-x-1">
                    <span>{partner.name}</span>
                    {partner.name === 'IBM Partner' && <span className="text-[10px] font-mono font-bold tracking-tight text-blue-600 ml-1.5">BUSINESS PARTNER</span>}
                  </h3>
                </div>

                {/* Partner Description */}
                <div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Informative Partner Footnote */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-mono">
            Todas as marcas pertencem aos seus respectivos proprietários. Projetos desenhados e implementados em conformidade com as diretrizes do fabricante.
          </p>
        </div>

      </div>
    </section>
  );
}
