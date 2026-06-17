import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import Partners from './components/Partners';
import Services from './components/Services';
import QuoteSimulator from './components/QuoteSimulator';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';

type Page = 'home' | 'privacy' | 'terms';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsAdminOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600/10 selection:text-blue-600">
      
      {currentPage === 'home' && (
        <>
          <Header 
            isAdminOpen={isAdminOpen} 
            onAdminToggle={() => setIsAdminOpen(!isAdminOpen)} 
          />

          <main className="flex-grow">
            {isAdminOpen ? (
              <AdminPanel />
            ) : (
              <>
                <Hero />
                <Advantages />
                <Partners />
                <Services />
                <QuoteSimulator />
              </>
            )}
          </main>

          <Footer onNavigate={navigateTo} />
          <WhatsAppButton />
          <CookieConsent />
        </>
      )}

      {currentPage === 'privacy' && (
        <>
          <main className="flex-grow">
            <PrivacyPolicy onBack={() => navigateTo('home')} />
          </main>
          <Footer onNavigate={navigateTo} />
        </>
      )}

      {currentPage === 'terms' && (
        <>
          <main className="flex-grow">
            <TermsOfUse onBack={() => navigateTo('home')} />
          </main>
          <Footer onNavigate={navigateTo} />
        </>
      )}
    </div>
  );
}
