import { ShieldCheck, Mail, Phone, Network, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 pt-16 pb-8 relative z-10 overflow-hidden">
      
      {/* Footer background ambient tint */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-50/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-200">
          
          {/* Logo brand & description column */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <a href="#home" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-50 border border-blue-200 rounded-lg group-hover:border-blue-400 transition-colors">
                <ShieldCheck className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black tracking-tight text-lg text-slate-900">
                  LIMAS <span className="text-blue-600">IT</span>
                </span>
                <span className="text-[8px] font-mono tracking-[3px] text-slate-400 uppercase -mt-0.5 font-bold">
                  Soluções em TI
                </span>
              </div>
            </a>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm">
              Provedora certificada de soluções corporativas de conectividade, cybersegurança integrada e nuvens híbridas. Integrando produtos homologados pelos maiores fabricantes do mercado tecnológico do mundo.
            </p>
          </div>

          {/* Quick interactive shortcuts */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">Tecnologias</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-500 hover:text-slate-800 transition-colors font-medium">Fortinet Fortigate NGFW</span></li>
              <li><span className="text-slate-500 hover:text-slate-800 transition-colors font-medium">SonicWall TZ / NSA Series</span></li>
              <li><span className="text-slate-500 hover:text-slate-800 transition-colors font-medium">Veeam Backup & Replication</span></li>
              <li><span className="text-slate-500 hover:text-slate-800 transition-colors font-medium">Faronics Deep Freeze</span></li>
              <li><span className="text-slate-500 hover:text-slate-800 transition-colors font-medium">Furukawa Structured Cabling</span></li>
            </ul>
          </div>

          {/* Real Portuguese Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">Fale Conosco</h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="hover:text-slate-800 transition-colors font-medium">(83) 99825-5226</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="hover:text-slate-800 transition-colors font-medium select-all">contato@limasit.com.br</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer legal & copyright info panel */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-400 font-mono font-bold">
            © {new Date().getFullYear()} LIMAS IT. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4 text-[10px] text-slate-400 font-mono font-bold">
            <span className="hover:text-blue-600 transition-colors flex items-center space-x-1 cursor-pointer">
              <span>Políticas de Privacidade</span>
            </span>
            <span>•</span>
            <span className="hover:text-blue-600 transition-colors flex items-center space-x-1 cursor-pointer">
              <span>Termos de Uso</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
