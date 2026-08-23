import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { Play, Pause, X, ChevronRight, Sparkles } from 'lucide-react';

export const DemoOverlay: React.FC = () => {
  const {
    isDemoRunning,
    stopAiDemo,
    demoStep,
    nextDemoStep,
    setActiveTab,
    addToCart,
    openUpsellModal,
    closeUpsellModal,
    setIsCartOpen,
    saveCurrentCartAsOrder
  } = useShop();

  const [isPlaying, setIsPlaying] = React.useState(true);

  // Automated step timer controller (Prompt Section 7)
  useEffect(() => {
    if (!isDemoRunning || !isPlaying) return;

    const timer = setTimeout(() => {
      if (demoStep === 1) {
        // Step 1: Open AI Shopping page
        setActiveTab('ai-shopping');
        nextDemoStep();
      } else if (demoStep === 2) {
        // Step 2: Customer selects Adidas RunFlex (₹4,799)
        const adidas = INITIAL_PRODUCTS.find(p => p.id === 'prod-adidas-1') || INITIAL_PRODUCTS[1];
        openUpsellModal(adidas);
        nextDemoStep();
      } else if (demoStep === 3) {
        // Step 3: AI recommends socks (Running Socks — ₹499) and customer adds socks
        const adidas = INITIAL_PRODUCTS.find(p => p.id === 'prod-adidas-1') || INITIAL_PRODUCTS[1];
        const socks = INITIAL_PRODUCTS.find(p => p.id === 'upsell-socks-1') || INITIAL_PRODUCTS[3];
        addToCart(adidas);
        addToCart(socks, true);
        closeUpsellModal();
        setIsCartOpen(true);
        nextDemoStep();
      } else if (demoStep === 4) {
        // Step 4: Checkout succeeds (Total ₹5,298)
        saveCurrentCartAsOrder('Demo Runner', 'demo.runner@example.com');
        nextDemoStep();
      } else if (demoStep === 5) {
        // Step 5: Dashboard updates dynamically with +₹5,298 Revenue, +1 AI Order, +₹499 Upsell
        setActiveTab('dashboard');
        nextDemoStep();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isDemoRunning, demoStep, isPlaying]);

  if (!isDemoRunning) return null;

  const demoStepsList = [
    { title: '1. Customer Request', desc: '“I need running shoes under ₹5,000.”' },
    { title: '2. AI Searches', desc: 'AI returns Nike Run Pro, Adidas RunFlex, Puma Velocity' },
    { title: '3. Selects Product', desc: 'Customer selects Adidas RunFlex (₹4,799)' },
    { title: '4. AI Upsell', desc: 'AI recommends Running Socks (₹499)' },
    { title: '5. Add & Checkout', desc: 'Socks added, Order #SP1024 succeeds (₹5,298)' },
    { title: '6. Dashboard Update', desc: 'Revenue +₹5,298 | AI Order +1 | Upsell +₹499' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-[#17211F] text-white rounded-3xl p-6 shadow-2xl border-2 border-[#F97316] animate-slide-in">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b border-[#344743] pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#F97316] animate-ping"></span>
          <span className="font-extrabold text-sm text-[#FACC15] uppercase tracking-wider flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-[#FACC15]" />
            <span>Interactive AI Demo Flow</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-[#23312E] hover:bg-[#344743] text-white transition-colors"
            title={isPlaying ? 'Pause Demo' : 'Play Demo'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={stopAiDemo}
            className="p-2 rounded-xl bg-[#23312E] hover:bg-rose-950 text-rose-400 transition-colors"
            title="Close Demo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="grid grid-cols-6 gap-1.5 mb-4">
        {demoStepsList.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx + 1 <= demoStep ? 'bg-[#F97316]' : 'bg-[#344743]'
            }`}
          />
        ))}
      </div>

      {/* Active Step Content */}
      <div className="bg-[#23312E] p-4 rounded-2xl border border-[#344743] flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] font-black text-[#F97316] uppercase">
            Step {demoStep} of 6
          </div>
          <div className="font-extrabold text-sm text-white">
            {demoStepsList[demoStep - 1]?.title}
          </div>
          <div className="text-xs text-[#FFF9F0]/80 mt-0.5 font-medium">
            {demoStepsList[demoStep - 1]?.desc}
          </div>
        </div>

        <button
          onClick={nextDemoStep}
          disabled={demoStep >= 6}
          className="p-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-30 text-white font-bold text-xs flex items-center space-x-1 shadow-md shrink-0"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Live Delta Summary Badge (Prompt Section 7) */}
      {demoStep >= 5 && (
        <div className="bg-emerald-950 border border-emerald-500/40 p-3 rounded-2xl flex items-center justify-around text-xs font-black text-emerald-300">
          <div>Revenue +₹5,298</div>
          <div>AI Order +1</div>
          <div>Upsell Revenue +₹499</div>
        </div>
      )}

    </div>
  );
};
