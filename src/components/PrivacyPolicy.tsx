import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center space-x-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-10 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao site</span>
        </button>

        <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight">Políticas de Privacidade</h1>
        <p className="text-xs text-slate-400 font-mono mt-2">Última atualização: Junho 2026</p>

        <div className="mt-10 space-y-8 text-sm text-slate-600 leading-relaxed font-medium">
          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">1. Informações que Coletamos</h2>
            <p>A Limas IT coleta apenas as informações necessárias para o funcionamento dos nossos serviços, incluindo: dados de identificação da empresa (razão social, CNPJ), dados de contato (nome, e-mail, telefone) e informações sobre a infraestrutura de TI descritas no formulário de contato.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">2. Uso das Informações</h2>
            <p>As informações coletadas são utilizadas exclusivamente para: entrar em contato sobre propostas comerciais, prestar os serviços contratados, enviar informações sobre soluções relevantes para sua empresa e cumprir obrigações legais e regulatórias.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">3. Compartilhamento de Dados</h2>
            <p>A Limas IT não vende, aluga ou compartilha informações pessoais com terceiros para fins de marketing. Os dados podem ser compartilhados apenas com parceiros tecnológicos quando necessário para a execução dos serviços contratados, sempre mediante acordos de confidencialidade.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">4. Segurança dos Dados</h2>
            <p>Empregamos medidas técnicas e administrativas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia, controle de acesso e monitoramento contínuo dos nossos sistemas.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">5. Retenção de Dados</h2>
            <p>Os dados são mantidos pelo tempo necessário para cumprir as finalidades para as quais foram coletados ou conforme exigido pela legislação aplicável, incluindo a Lei Geral de Proteção de Dados (LGPD).</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">6. Seus Direitos</h2>
            <p>De acordo com a LGPD, você tem direito a: acessar seus dados, corrigir dados incompletos ou desatualizados, solicitar a exclusão de seus dados, solicitar a portabilidade dos dados e revogar o consentimento a qualquer momento.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-slate-800 mb-3">7. Contato</h2>
            <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco pelo e-mail <span className="font-bold text-blue-600">contato@limasit.com.br</span>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
