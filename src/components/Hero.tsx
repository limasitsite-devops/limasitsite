import { motion } from 'motion/react';
import { ArrowRight, Shield, Cpu, Activity, Database } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 120, delay: 0.1 } },
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Dynamic Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40"></div>
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10 animate-pulse duration-[12000ms]"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-8 items-center">
          
          {/* Typographical / Copy Column */}
          <motion.div 
            className="lg:col-span-6 flex flex-col items-start space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Display Heading */}
            <motion.h1 
              variants={itemVariants}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] text-slate-900 tracking-tight"
            >
              A infraestrutura de TI que sua empresa precisa, <span className="text-blue-600 italic">sem limites.</span>
            </motion.h1>

            {/* Concise Supporting Description */}
            <motion.p 
              variants={itemVariants}
              className="text-slate-500 text-lg sm:text-xl max-w-xl font-medium leading-relaxed"
            >
              Projetamos, implementamos e monitoramos soluções de redes, cybersegurança avançada e alta disponibilidade. Menos gargalos, zero dor de cabeça.
            </motion.p>

            {/* Action Group */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#simulator"
                className="flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-4 rounded-xl text-base transition-all shadow-md hover:scale-[1.01] cursor-pointer"
              >
                <span>Conhecer Soluções</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </a>
            </motion.div>

            {/* Interactive State Panel (Optimized for fast mobile reading) */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 w-full max-w-lg"
            >
              <div className="hidden sm:block">
                <p className="text-2xl font-black text-slate-900 font-display">99.99%</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Uptime de Redes</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 font-display">24/7</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Monitoramento</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 font-display">11+</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Líderes de Setor</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Connected Network Architectural visualization (Animated interactive widget) */}
          <motion.div 
            className="lg:col-span-4 relative flex items-center justify-center w-full min-h-[300px] lg:min-h-[400px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Ambient Tech Visual Representation with interactive floating icons */}
            <div className="absolute inset-0 border border-slate-200 bg-gradient-to-b from-blue-50/10 to-transparent rounded-3xl [mask-image:radial-gradient(ellipse_at_center,white_80%,transparent_100%)]"></div>
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Radial server node circles */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-dashed border-slate-200"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div 
                className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-blue-200/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />

              {/* Core Hub */}
              <motion.div 
                className="relative z-10 w-20 h-20 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shadow-md cursor-pointer hover:border-blue-400 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Activity className="w-10 h-10 text-blue-600 animate-pulse" />
                <div className="absolute -inset-1 rounded-2xl bg-blue-400/10 blur opacity-40 animate-ping duration-1000"></div>
              </motion.div>

              {/* Connected node 1: Shield (Cybersecurity) */}
              <motion.div 
                className="absolute -top-6 left-1/2 -ml-6 w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-red-500 shadow-sm cursor-pointer hover:border-red-400 hover:text-red-600 transition-colors"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Shield className="w-6 h-6" />
              </motion.div>

              {/* Connected node 2: Database (Backup) */}
              <motion.div 
                className="absolute -bottom-6 left-1/2 -ml-6 w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm cursor-pointer hover:border-blue-500 hover:text-blue-700 transition-colors"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <Database className="w-6 h-6" />
              </motion.div>

              {/* Connected node 3: Cpu (Servers/Computing) */}
              <motion.div 
                className="absolute left-[-24px] top-1/2 -mt-6 w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-orange-500 shadow-sm cursor-pointer hover:border-orange-400 hover:text-orange-600 transition-colors"
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              >
                <Cpu className="w-6 h-6" />
              </motion.div>

              {/* Decorative data rays running between nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                <motion.line 
                  x1="50" y1="12" x2="50" y2="35" 
                  stroke="rgba(100, 116, 139, 0.15)" strokeWidth="1" 
                  strokeDasharray="4 4"
                />
                <motion.line 
                  x1="50" y1="88" x2="50" y2="65" 
                  stroke="rgba(100, 116, 139, 0.15)" strokeWidth="1" 
                  strokeDasharray="4 4"
                />
                <motion.line 
                  x1="12" y1="50" x2="35" y2="50" 
                  stroke="rgba(100, 116, 139, 0.15)" strokeWidth="1" 
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
