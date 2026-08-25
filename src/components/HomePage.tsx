import React from 'react';
import { useShop } from '../context/ShopContext';
import { WorkflowSection } from './WorkflowSection';
import { Sparkles, TrendingUp, ArrowRight, Bot, Play, ShoppingCart } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveTab, runAiDemo } = useShop();

  return (
    <div className="space-y-12 py-6">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#14532D] via-[#14532D] to-[#092E16] text-white p-8 sm:p-14 shadow-card border border-[#14532D]/20">
        
        {/* Background Glowing Accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F97316]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Heading, Description & Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Shop Smarter. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FACC15]">
                Sell More.
              </span> <br />
              With AI.
            </h1>

            <p className="text-base sm:text-lg font-medium text-[#FFF9F0]/90 leading-relaxed max-w-2xl">
              ShopPilot AI understands what customers want, recommends the right products, and suggests relevant add-ons to increase sales.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActiveTab('ai-shopping')}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2 text-base"
              >
                <Sparkles className="w-5 h-5 text-[#FACC15]" />
                <span>Try AI Agent</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <button
                onClick={() => setActiveTab('dashboard')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-4 rounded-2xl transition-all flex items-center space-x-2 text-base"
              >
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>View Growth</span>
              </button>

              <button
                onClick={runAiDemo}
                className="bg-[#FACC15] hover:bg-yellow-400 text-[#17211F] font-extrabold px-6 py-4 rounded-2xl shadow-md transition-all flex items-center space-x-2 text-base transform hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>▶ Run AI Demo</span>
              </button>
            </div>

          </div>

          {/* Right Column: Simple AI Shopping Card Mockup */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 text-[#17211F] shadow-2xl border border-white/20 space-y-4 transform hover:scale-[1.02] transition-transform">
              
              {/* AI Greeting Card */}
              <div className="bg-[#FFF9F0] p-4 rounded-2xl border border-[#14532D]/10 flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#14532D] text-[#FACC15] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#14532D]">ShopPilot AI</div>
                  <p className="text-sm font-semibold text-[#17211F] mt-0.5">
                    👋 Hi! What are you looking for today?
                  </p>
                </div>
              </div>

              {/* Customer Message */}
              <div className="bg-orange-50 border border-[#F97316]/20 p-4 rounded-2xl ml-6 text-right">
                <span className="text-xs font-bold text-[#F97316] block mb-1">Customer</span>
                <p className="text-sm font-bold text-[#17211F]">
                  “I need running shoes under ₹5,000.”
                </p>
              </div>

              {/* AI Response Card */}
              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></div>
                  <span className="text-xs font-extrabold text-[#14532D]">ShopPilot AI Response:</span>
                </div>
                
                <p className="text-sm font-extrabold text-[#14532D]">
                  “I found 3 options that match your budget.”
                </p>

                <div className="text-[11px] font-bold text-emerald-800 flex items-center space-x-1 pt-1 border-t border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Nike Run Pro, Adidas RunFlex, Puma Velocity</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('ai-shopping')}
                className="w-full bg-[#14532D] hover:bg-[#092E16] text-white font-extrabold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center space-x-2 shadow-md"
              >
                <ShoppingCart className="w-4 h-4 text-[#FACC15]" />
                <span>Test Interactive Shopping Chat</span>
              </button>

            </div>
          </div>

        </div>

      </section>

      {/* 6. Simple AI Workflow Section */}
      <WorkflowSection />

    </div>
  );
};
