import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, MessageSquare, Lock, DollarSign } from 'lucide-react';

interface AdvantageItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  colorClass: string;
  bgClass: string;
}

export default function Advantages() {
  const advantages: AdvantageItem[] = [
    {
      id: 'performance',
      icon: Lightbulb,
      title: 'Alta Performance',
      description: 'Eficiência, proatividade e excelência na construção de soluções tecnológicas para que seu negócio possa alcançar as metas e objetivos com rapidez e menos riscos.',
      colorClass: 'text-blue-600',
      bgClass: 'bg-blue-50/50 hover:bg-blue-50'
    },
    {
      id: 'support',
      icon: MessageSquare,
      title: 'Suporte Especializado',
      description: 'Nossa equipe é composta por técnicos, analistas e engenheiros certificados e preparados para executar serviços com os mais altos padrões de qualidade.',
      colorClass: 'text-indigo-600',
      bgClass: 'bg-indigo-50/50 hover:bg-indigo-50'
    },
    {
      id: 'security',
      icon: Lock,
      title: 'Maior Segurança',
      description: 'Os dados são ativos que geram as informações que movem o mundo. Por isso nos preocupamos em mantê-los disponíveis, confidenciais e íntegros.',
      colorClass: 'text-red-500',
      bgClass: 'bg-red-50/50 hover:bg-red-50'
    },
    {
      id: 'cost-benefit',
      icon: DollarSign,
      title: 'Custo Benefício',
      description: 'Oferecemos aos nossos clientes serviços personalizados em conformidade com as suas reais necessidades e orçamento.',
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50/50 hover:bg-emerald-50'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="advantages" className="py-20 bg-white border-y border-slate-100 relative overflow-hidden">
      {/* Background soft geometric shape for depth */}
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-16 top-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Diferenciais de Negócio
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            Por que escolher a <span className="text-blue-600">Limas IT</span>?
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Garantimos excelência operacional, blindagem cibernética de alta escala e conformidade orçamentária total para a infraestrutura de TI do seu negócio.
          </p>
        </div>

        {/* Advantages Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`p-8 rounded-2xl border border-slate-100/80 bg-white shadow-sm transition-all duration-300 flex flex-col items-center text-center group`}
              >
                {/* Icon Container */}
                <div className={`p-4 rounded-2xl ${item.bgClass} ${item.colorClass} border border-transparent group-hover:border-slate-200/50 transition-all duration-300 mb-6 flex items-center justify-center`}>
                  <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Advantage Title */}
                <h3 className="text-lg font-display font-extrabold text-slate-800 tracking-tight mb-3">
                  {item.title}
                </h3>

                {/* Advantage Description */}
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-semibold">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
