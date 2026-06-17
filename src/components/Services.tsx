import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceItem } from '../types';
import { Shield, Network, Cloud, Database, Check, ArrowRight, Server, Cpu } from 'lucide-react';

export default function Services() {
  const [selectedService, setSelectedService] = useState<string>('security');

  const services: ServiceItem[] = [
    {
      id: 'security',
      title: 'Defesa e Cybersegurança Corporativa',
      category: 'security',
      iconName: 'Shield',
      shortDesc: 'Proteção zero-trust de ponta a ponta para blindar as redes corporativas da sua empresa.',
      longDesc: 'Implementamos barreiras de cybersegurança avançadas e redundantes que mitigam ataques digitais, vazamentos de dados e invasões em tempo real. Nossa arquitetura une Firewalls líderes (Fortinet/SonicWall) a monitoramento preditivo de endpoints.',
      features: [
        'Firewalls Next-Generation com IPS e Deep Packet Inspection',
        'VPNs corporativas e acesso seguro centralizado para home office',
        'Proteção contra Ransomware e vírus em servidores e endpoints',
        'Auditoria completa de vulnerabilidades e compliance LGPD'
      ]
    },
    {
      id: 'connectivity',
      title: 'Redes e Cabeamento Estruturado',
      category: 'connectivity',
      iconName: 'Network',
      shortDesc: 'Interconecte escritórios, fábricas e datacenters com links de alta velocidade e fidelidade.',
      longDesc: 'Construção e otimização físicas de redes corporativas. Planejamento inteligente de caminhos ópticos com insumos premium para garantir estabilidade, taxas de latência mínimas e altíssima escalabilidade estrutural.',
      features: [
        'Fibras ópticas e cabling estruturado categoria 6A e 8 (Furukawa)',
        'Switches corporativos inteligentes e otimização de espectro',
        'Projetos de sinal Wi-Fi 6 de alta densidade por área ativa',
        'Mapeamento completo e identificação com certificação oficial'
      ]
    },
    {
      id: 'cloud',
      title: 'Datacenter, Nuvem e Virtualização',
      category: 'cloud',
      iconName: 'Cloud',
      shortDesc: 'Reduza custos físicos de hardware migrando cargas críticas para nuvens seguras.',
      longDesc: 'Consultoria e engenharia para modernizar sua capacidade de processamento. Projetamos topologias em nuvens híbridas inteligentes, utilizando o potencial máximo do Microsoft Azure aliado a servidores virtualizados VMware de altíssima fidelidade.',
      features: [
        'Migração estruturada de servidores locais para o ecossistema Azure/IBM',
        'Virtualização avançada para aproveitamento máximo de hardware (VMware)',
        'Suporte de nível Enterprise para servidores físicos locais Lenovo',
        'Instalação de bancos de dados otimizados em infraestrutura serverless'
      ]
    },
    {
      id: 'backup',
      title: 'Recuperação, Backup e Disponibilidade',
      category: 'backup',
      iconName: 'Database',
      shortDesc: 'Garantia de retenção e restauração instantânea de documentos e sistemas vitais.',
      longDesc: 'Os dados do seu negócio são seu maior patrimônio. Projetamos loops redundantes de segurança que armazenam pontos de recuperação fora do alcance de ameaças externas, assegurando que seu negócio nunca pare.',
      features: [
        'Cópia de segurança contínua para máquinas virtuais e bancos de dados',
        'Restauração de nível granular em frações de minuto com Veeam',
        'Proteção ativa de backups blindados fora da rede principal',
        'Simulações constantes de desastres para homologar planos de contingência'
      ]
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-6 h-6 text-red-500" />;
      case 'Network': return <Network className="w-6 h-6 text-teal-600" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-blue-600" />;
      case 'Database': return <Database className="w-6 h-6 text-orange-500" />;
      default: return <Server className="w-6 h-6 text-slate-500" />;
    }
  };

  const getThemeClasses = (category: string) => {
    switch (category) {
      case 'security':
        return {
          pill: 'text-red-500 bg-red-50 border-red-200',
          check: 'bg-red-50 text-red-500 border-red-200',
          checkIcon: 'text-red-500',
          link: 'text-red-500 hover:text-red-600'
        };
      case 'connectivity':
        return {
          pill: 'text-teal-600 bg-teal-50 border-teal-200',
          check: 'bg-teal-50 text-teal-600 border-teal-200',
          checkIcon: 'text-teal-600',
          link: 'text-teal-600 hover:text-teal-700'
        };
      case 'cloud':
        return {
          pill: 'text-blue-600 bg-blue-50 border-blue-200',
          check: 'bg-blue-50 text-blue-600 border-blue-200',
          checkIcon: 'text-blue-600',
          link: 'text-blue-600 hover:text-blue-700'
        };
      case 'backup':
        return {
          pill: 'text-orange-500 bg-orange-50 border-orange-200',
          check: 'bg-orange-50 text-orange-500 border-orange-200',
          checkIcon: 'text-orange-500',
          link: 'text-orange-500 hover:text-orange-600'
        };
      default:
        return {
          pill: 'text-slate-500 bg-slate-50 border-slate-200',
          check: 'bg-slate-50 text-slate-500 border-slate-200',
          checkIcon: 'text-slate-500',
          link: 'text-slate-500 hover:text-slate-600'
        };
    }
  };

  const currentService = services.find(s => s.id === selectedService) || services[0];

  return (
    <section id="services" className="relative py-28 bg-slate-50 overflow-hidden">
      {/* Decorative linear background */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">Portfólio de Soluções</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mt-2">
            Nossos Serviços de Engenharia de TI.
          </h2>
          <p className="text-slate-500 mt-4 text-base font-medium leading-relaxed">
            Abordamos a infraestrutura corporativa sob o conceito de estabilidade integrada. Soluções completas desenhadas para garantir zero gargalo, máxima blindagem de dados e escalabilidade sustentável.
          </p>
        </div>

        {/* Modular Interactive Layout (Toggles on Left, Dynamic Card on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Services Left Toggles List (Optimized for both mobile scrolling and vertical desktop structure) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {services.map((service) => {
              const isSelected = selectedService === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`text-left w-full p-5 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? 'bg-white border-slate-200 shadow-md'
                      : 'bg-transparent border-transparent hover:border-slate-200/50 hover:bg-white/40'
                  }`}
                >
                  {/* Left accent border on selected */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-service-indicator"
                      className={`absolute left-0 top-4 bottom-4 w-1 rounded-r ${
                        service.category === 'security' ? 'bg-red-500' :
                        service.category === 'connectivity' ? 'bg-teal-600' :
                        service.category === 'cloud' ? 'bg-blue-600' :
                        service.category === 'backup' ? 'bg-orange-500' : 'bg-blue-600'
                      }`}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl border transition-colors ${
                      isSelected 
                        ? service.category === 'security' ? 'bg-red-50 border-red-200' :
                          service.category === 'connectivity' ? 'bg-teal-50 border-teal-200' :
                          service.category === 'cloud' ? 'bg-blue-50 border-blue-200' :
                          service.category === 'backup' ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'
                        : 'bg-slate-100 border-slate-200/50'
                    }`}>
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <h3 className={`font-display font-bold text-lg leading-tight transition-colors ${
                        isSelected ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-800'
                      }`}>
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-semibold line-clamp-2 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Service Detailed Box Display Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-lg"
              >
                {/* Background ambient light */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 space-y-6">
                  
                  <div className="flex flex-col space-y-3.5">
                    {/* Category Pill */}
                    <div>
                      <span className={`inline-block text-xs font-mono font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full border ${getThemeClasses(currentService.category).pill}`}>
                        {currentService.category === 'security' && 'Cibernetica & LGPD'}
                        {currentService.category === 'connectivity' && 'Redes & Conectividade'}
                        {currentService.category === 'cloud' && 'Virtualização & Cloud'}
                        {currentService.category === 'backup' && 'Continuidade de Dados'}
                      </span>
                    </div>

                    {/* Service Heading */}
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                      {currentService.title}
                    </h3>
                  </div>

                  {/* Comprehensive narrative desc */}
                  <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                    {currentService.longDesc}
                  </p>

                  {/* Bullet features panel list */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 font-bold">Tópicos e Entregas Inclusas:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {currentService.features.map((feature, idx) => {
                        const theme = getThemeClasses(currentService.category);
                        return (
                          <div key={idx} className="flex items-start space-x-2.5">
                            <div className={`mt-0.5 p-0.5 rounded-full border ${theme.check}`}>
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-xs text-slate-600 font-semibold leading-snug">{feature}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA connection to Simulator */}
                  <div className="pt-6">
                    <a
                      href="#simulator"
                      onClick={(e) => {
                        e.preventDefault();
                        localStorage.setItem('selectedService', currentService.title);
                        document.querySelector('#simulator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`inline-flex items-center space-x-2 transition-colors font-bold text-sm cursor-pointer ${getThemeClasses(currentService.category).link}`}
                    >
                      <span>Simular este escopo para sua empresa</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
