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

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600/10 selection:text-blue-600">
      
      {/* Universal header layout with live DB toggle capability */}
      <Header 
        isAdminOpen={isAdminOpen} 
        onAdminToggle={() => setIsAdminOpen(!isAdminOpen)} 
      />

      {/* Main content viewport */}
      <main className="flex-grow">
        {isAdminOpen ? (
          // Admin panel view (live Firestore records log)
          <AdminPanel />
        ) : (
          // Commercial site core pages
          <>
            <Hero />
            <Advantages />
            <Partners />
            <Services />
            <QuoteSimulator />
          </>
        )}
      </main>

      {/* Corporate footer block info */}
      <Footer />

      {/* Floating support widget */}
      <WhatsAppButton />
    </div>
  );
}
