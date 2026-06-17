import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2, CheckCircle, ChevronDown } from 'lucide-react';

export default function QuoteSimulator() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');

  const services = [
    'Defesa e Cybersegurança Corporativa',
    'Redes e Cabeamento Estruturado',
    'Datacenter, Nuvem e Virtualização',
    'Recuperação, Backup e Disponibilidade'
  ];

  useEffect(() => {
    const readService = () => {
      const saved = localStorage.getItem('selectedService');
      if (saved) {
        const matched = services.find(s => s.toLowerCase() === saved.toLowerCase());
        if (matched) setService(matched);
        localStorage.removeItem('selectedService');
      }
    };
    readService();
    window.addEventListener('hashchange', readService);
    return () => window.removeEventListener('hashchange', readService);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim() || !contactName.trim() || !email.trim() || !phone.trim() || !service) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    const subject = encodeURIComponent(`Solicitação de Orçamento - ${companyName}`);
    const body = encodeURIComponent(
      `DADOS DA EMPRESA\n` +
      `Empresa: ${companyName}\n` +
      `Contato: ${contactName}\n` +
      `E-mail: ${email}\n` +
      `Telefone: ${phone}\n\n` +
      `SERVIÇO DESEJADO\n` +
      `${service}\n\n` +
      `OBSERVAÇÕES\n` +
      `${notes || 'Nenhuma observação adicional.'}`
    );

    window.location.href = `mailto:limasitsite@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const resetForm = () => {
    setCompanyName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setService('');
    setNotes('');
    setSubmitted(false);
  };

  return (
    <section id="simulator" className="relative py-28 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,rgba(15,23,42,0.03)_0%,transparent_100%)] opacity-100"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">Fale com a gente</span>
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight mt-2">
            Solicite uma Proposta Personalizada
          </h2>
          <p className="text-slate-500 mt-3 text-sm max-w-lg mx-auto font-medium leading-relaxed">
            Preencha seus dados e selecione o serviço desejado. Nossa equipe entrará em contato com uma proposta sob medida para sua empresa.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-10"
            >
              <div className="inline-flex w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-extrabold text-slate-900">Solicitação Enviada!</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-semibold">
                  Seu cliente de e-mail foi aberto com os dados preenchidos. Envie o e-mail para concluir o envio.
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-mono font-bold border border-slate-200 bg-slate-100 hover:bg-slate-200 px-5 py-3 rounded-xl text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
              >
                Nova Solicitação
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">

                <div className="mb-4">
                  <h3 className="text-xl font-display font-bold text-slate-800">Dados para Contato</h3>
                  <p className="text-xs text-slate-400 mt-1">Preencha as informações abaixo para enviarmos sua proposta.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="companyName" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Nome da Empresa *</label>
                    <input
                      id="companyName"
                      type="text"
                      required
                      placeholder="Ex: TechCorp Brasil LTDA"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="contactName" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Nome do Contato *</label>
                    <input
                      id="contactName"
                      type="text"
                      required
                      placeholder="Ex: Carlos Silva"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">E-mail Corporativo *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="Ex: contato@techcorp.com.br"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="phone" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Telefone / WhatsApp *</label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="Ex: (11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="service" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Serviço Desejado *</label>
                  <div className="relative">
                    <select
                      id="service"
                      required
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none cursor-pointer placeholder:text-slate-400"
                    >
                      <option value="" disabled>Selecione o serviço</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="notes" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Observações (Opcional)</label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Descreva brevemente sua necessidade ou dúvida..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-slate-400"
                  />
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-4 rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Solicitação</span>
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </div>

              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
