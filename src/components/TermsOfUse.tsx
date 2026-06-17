import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function TermsOfUse({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center space-x-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-10 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao site</span>
        </button>

        <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight">Termos de Uso</h1>
        <p className="text-xs text-slate-400 font-mono mt-2">Última atualização: Junho 2026</p>

        <div className="mt-10 space-y-8 text-sm text-slate-600 leading-relaxed font-medium">
          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o site da Limas IT, você concorda com estes Termos de Uso. Caso não concorde com algum dos termos, recomendamos que não utilize o site. Reservamo-nos o direito de alterar estes termos a qualquer momento.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">2. Descrição dos Serviços</h2>
            <p>A Limas IT oferece soluções corporativas de TI, incluindo cybersegurança, redes e cabeamento estruturado, datacenter, nuvem e virtualização, e recuperação e backup. As informações no site são de caráter informativo e não constituem oferta comercial formal.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">3. Uso do Site</h2>
            <p>O site deve ser utilizado de forma ética e em conformidade com a legislação vigente. É proibido: utilizar o site para fins ilícitos, tentar acessar áreas restritas, interferir no funcionamento do site ou coletar dados de outros usuários sem autorização.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">4. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site, incluindo textos, imagens, logotipos, ícones e design, é propriedade da Limas IT ou de seus licenciadores e é protegido pelas leis de propriedade intelectual. É vedada a reprodução, distribuição ou modificação sem autorização prévia.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">5. Isenção de Responsabilidade</h2>
            <p>As informações do site são fornecidas "como estão", sem garantias de qualquer natureza. A Limas IT não se responsabiliza por danos diretos ou indiretos decorrentes do uso das informações disponibilizadas no site.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">6. Links Externos</h2>
            <p>O site pode conter links para sites de terceiros. Esses links são fornecidos para conveniência e não implicam endosso. A Limas IT não controla o conteúdo de sites externos e não se responsabiliza por eles.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">7. Legislação Aplicável</h2>
            <p>Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais competentes da cidade de São Paulo, Estado de São Paulo.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">8. Contato</h2>
            <p>Para dúvidas sobre estes termos, entre em contato pelo e-mail <span className="font-bold text-blue-600">contato@limasit.com.br</span>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
