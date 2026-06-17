import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuoteRequest } from '../types';
import { saveQuoteRequest } from '../firebase';
import { Check, ArrowRight, ShieldCheck, HelpCircle, Loader2, Calendar, FileCheck2, Info } from 'lucide-react';

export default function QuoteSimulator() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form states
  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [companySize, setCompanySize] = useState<QuoteRequest['companySize']>('small');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');

  const sizes = [
    { value: 'small', label: 'Pequena (até 15 estações)', desc: 'Para escritórios locais e startups que necessitam de estabilidade e segurança inteligente essencial.' },
    { value: 'medium', label: 'Média (16 a 50 estações)', desc: 'Para empresas em crescimento que precisam de cabeamento profissional e backup certificado.' },
    { value: 'large', label: 'Grande (51 a 200 estações)', desc: 'Datacenters virtuais dedicados, firewalls corporativos redundantes e alta disponibilidade.' },
    { value: 'enterprise', label: 'Corporativa (acima de 200)', desc: 'Ambiente completo de suporte nível SLA de alto nível, interconectividade óptica de fibra e nuvens redundantes.' }
  ];

  const needsList = [
    { id: 'security', name: 'Cybersegurança Avançada', desc: 'Sistemas de firewall redundantes, IPS e defesa de dispositivos.', priceFactor: 250 },
    { id: 'connectivity', name: 'Interconexão de Redes', desc: 'Cabeamento óptico estruturado e links Wi-Fi dedicados.', priceFactor: 180 },
    { id: 'cloud', name: 'Cloud & Virtualização', desc: 'Virtualização com VMware e espelhamento em nuvem Azure.', priceFactor: 350 },
    { id: 'backup', name: 'Backup & Desastres (Veeam)', desc: 'Loops de backup blindados à prova de ransomware.', priceFactor: 220 }
  ];

  // Price calculations based on select components
  const calculatePrice = () => {
    let basePrice = 0;
    if (companySize === 'small') basePrice = 750;
    else if (companySize === 'medium') basePrice = 1650;
    else if (companySize === 'large') basePrice = 3450;
    else if (companySize === 'enterprise') basePrice = 6900;

    const extraFactor = needsList
      .filter(n => selectedNeeds.includes(n.id))
      .reduce((sum, n) => sum + n.priceFactor, 0);

    const sizeMultiplier = companySize === 'small' ? 1 : companySize === 'medium' ? 1.3 : companySize === 'large' ? 1.8 : 2.5;

    return Math.round(basePrice + (extraFactor * sizeMultiplier));
  };

  const handleNeedToggle = (id: string) => {
    if (selectedNeeds.includes(id)) {
      setSelectedNeeds(selectedNeeds.filter(item => item !== id));
    } else {
      setSelectedNeeds([...selectedNeeds, id]);
    }
  };

  const currentPrice = calculatePrice();

  const handleNextStep = () => {
    if (step === 1) {
      if (!companyName.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
        alert('Por favor, preencha todos os dados de contato obrigatórios.');
        return;
      }
      if (!email.includes('@')) {
        alert('Por favor, forneça um e-mail válido.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const docId = await saveQuoteRequest({
        companyName,
        contactName,
        email,
        phone,
        companySize,
        infrastructureNeeds: selectedNeeds,
        additionalDetails: notes,
        estimatedMonthly: currentPrice
      });
      setSubmittedId(docId);
      setStep(4); // completion step
    } catch (err) {
      alert('Houve um erro salvando sua simulação no banco Firestore. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setCompanyName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setCompanySize('small');
    setSelectedNeeds([]);
    setNotes('');
    setSubmittedId(null);
  };

  return (
    <section id="simulator" className="relative py-28 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,rgba(15,23,42,0.03)_0%,transparent_100%)] opacity-100"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">Simulação Transparente</span>
          <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight mt-2">
            Simulador de Orçamento de TI
          </h2>
          <p className="text-slate-500 mt-3 text-sm max-w-lg mx-auto font-medium leading-relaxed">
            Selecione as necessidades da sua empresa e receba uma estimativa calculada dinamicamente. Os dados informados serão salvos de forma segura em tempo real no banco do provedor.
          </p>
        </div>

        {/* Step-by-Step wizard Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          
          {/* Tracker Progress Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
            <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
              {step < 4 ? `Passo ${step} de 3` : 'Simulação Completa'}
            </span>
            
            {/* Dots UI */}
            {step < 4 && (
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === s ? 'w-8 bg-blue-600' : s < step ? 'w-1.5 bg-blue-500' : 'w-1.5 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              
              {/* Step 1: Corporate Details */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-display font-bold text-slate-800">Identificação da Empresa</h3>
                    <p className="text-xs text-slate-400 mt-1">Insira os dados cadastrais básicos para iniciarmos o dimensionamento.</p>
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

                  {/* Navigation Control */}
                  <div className="pt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
                    >
                      <span>Porte & Escala</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Size & Scope selection */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-display font-bold text-slate-800">Escala Operacional</h3>
                    <p className="text-xs text-slate-400 mt-1">Selecione o tamanho atual do parque tecnológico da sua empresa.</p>
                  </div>

                  {/* Operational Size Selector cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sizes.map((sz) => {
                      const isSelected = companySize === sz.value;
                      return (
                        <button
                          key={sz.value}
                          type="button"
                          onClick={() => setCompanySize(sz.value as any)}
                          className={`text-left p-5 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/50 border-blue-600 text-slate-900'
                              : 'bg-slate-50/50 border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display font-bold text-sm tracking-tight">{sz.label}</span>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-2 font-medium leading-relaxed">{sz.desc}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Controls */}
                  <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-8">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="text-xs font-mono font-medium text-slate-500 hover:text-slate-800 px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl transition-all cursor-pointer"
                    >
                      ← Voltar
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
                    >
                      <span>Escolher Soluções</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Specific solutions selection */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-display font-bold text-slate-800">Módulos Estratégicos</h3>
                    <p className="text-xs text-slate-400 mt-1">Selecione as camadas tecnológicas prioritárias para o ecossistema.</p>
                  </div>

                  {/* Needs list selection columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {needsList.map((need) => {
                      const isSelected = selectedNeeds.includes(need.id);
                      return (
                        <button
                          key={need.id}
                          type="button"
                          onClick={() => handleNeedToggle(need.id)}
                          className={`text-left p-5 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/50 border-blue-600 text-slate-900'
                              : 'bg-slate-50/50 border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                          }`}
                        >
                          <div className="flex items-start justify-between space-x-3">
                            <div className="flex-1">
                              <span className="font-display font-bold text-sm tracking-tight block">{need.name}</span>
                              <span className="text-[11px] text-slate-500 font-medium mt-1 block leading-relaxed">{need.desc}</span>
                            </div>
                            <div className={`mt-0.5 w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Text field notes comments */}
                  <div className="flex flex-col space-y-2 mt-4">
                    <label htmlFor="notes" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Observações Adicionais (Opcional)</label>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder="Ex: Desejo focar na solução da Faronics para computadores de recepção médica ou Fortinet para firewall principal."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-slate-400"
                    />
                  </div>

                  {/* Dynamic Meter calculator inline block */}
                  <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded bg-blue-50 text-blue-600 border border-blue-200 mt-0.5">
                        <Info className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block font-bold">Estimativa Mensal Base</span>
                        <span className="text-xs text-slate-500 font-medium leading-snug">Calculado dinamicamente com base nas camadas e porte selecionado.</span>
                      </div>
                    </div>
                    <div className="text-right sm:text-right">
                      <span className="text-3xl font-black font-display text-slate-900">R$ {currentPrice.toLocaleString('pt-BR')}</span>
                      <span className="text-xs text-slate-500 font-mono block font-bold">/mês estimativo</span>
                    </div>
                  </div>

                  {/* Navigation controls */}
                  <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-8">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="text-xs font-mono font-medium text-slate-500 hover:text-slate-800 px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl transition-all cursor-pointer"
                    >
                      ← Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 bg-orange-505 bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-7 py-4 rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Gravando no Banco...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4.5 h-4.5 text-white" />
                          <span>Finalizar & Salvar no Firestore</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Finished simulation with dynamic tracking ID */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="inline-flex w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 items-center justify-center animate-bounce mb-2">
                    <FileCheck2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-extrabold text-slate-900">Simulação Gravada com Sucesso!</h3>
                    <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-semibold">
                       Sua infraestrutura estimada foi consolidada com sucesso e salva na nuvem Firestore sob a base do projeto.
                    </p>
                  </div>

                  {/* Calculated summary and ID box */}
                  <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">ID DA REQUISIÇÃO (FIRESTORE)</span>
                      <span className="text-xs font-mono font-bold text-blue-600">{submittedId}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Empresa</span>
                        <span className="text-xs font-bold text-slate-800 truncate block">{companyName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Porte</span>
                        <span className="text-xs font-bold text-slate-800 block capitalize">{companySize === 'small' ? 'Pequeno' : companySize === 'medium' ? 'Médio' : companySize === 'large' ? 'Grande' : 'Corporativo'}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center bg-blue-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                      <span className="text-xs text-slate-500 font-semibold">Estimativa Mensal:</span>
                      <span className="text-xl font-black text-blue-600 font-display">R$ {currentPrice.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs font-mono font-bold border border-slate-200 hover:border-slate-350 bg-slate-100 hover:bg-slate-200 px-5 py-3 rounded-xl text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                    >
                      Fazer Nova Simulação
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </form>

        </div>

      </div>
    </section>
  );
}
