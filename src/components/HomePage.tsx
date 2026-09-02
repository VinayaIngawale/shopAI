import React from 'react';
import { useShop } from '../context/ShopContext';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { WorkflowSection } from './WorkflowSection';
import { Sparkles, TrendingUp, ArrowRight, Bot, Play, ShoppingCart, Target, CheckCircle2, Plus } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveTab, runAiDemo } = useShop();
  const featuredProduct = INITIAL_PRODUCTS.find(product => product.id === 'prod-nike-1');

  return (
    <div className="space-y-12 py-6">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#071D36] text-white p-8 sm:p-14 shadow-card border border-[#185B8C]/50">
        
        {/* Background Glowing Accents */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-[#123B66]/35 pointer-events-none"></div>
        <div className="absolute top-0 right-1/3 h-full w-px bg-white/10 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Heading, Description & Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Turn Intent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FACC15]">
                Into Orders.
              </span> <br />
              With ShopPilot.
            </h1>

            <p className="text-base sm:text-lg font-medium text-[#FFF9F0]/90 leading-relaxed max-w-2xl">
              Give every customer a helpful buying conversation. ShopPilot matches products to their budget, explains the fit, and suggests useful add-ons before checkout.
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

            <div className="grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-5">
              <div>
                <div className="text-xl font-black text-[#FACC15]">10k+</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">Products matched</div>
              </div>
              <div>
                <div className="text-xl font-black text-[#FACC15]">95%</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">Match accuracy</div>
              </div>
              <div>
                <div className="text-xl font-black text-[#FACC15]">24/7</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">Always available</div>
              </div>
            </div>

          </div>

          {/* Right Column: Simple AI Shopping Card Mockup */}
          <div className="lg:col-span-5">
            <div className="mb-3 flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#FACC15]">
              <span className="h-2 w-2 rounded-full bg-[#FACC15] animate-pulse"></span>
              Live sales assistant
            </div>
            <div className="bg-white rounded-3xl p-6 text-[#17211F] shadow-2xl border border-white/20 space-y-4 transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between border-b border-[#14532D]/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#14532D] text-[#FACC15] flex items-center justify-center shadow-sm">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-[#F97316]">Live shopper session</div>
                    <div className="text-sm font-black text-[#14532D]">Running essentials</div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black text-emerald-800">Active</span>
              </div>

              <div className="rounded-2xl bg-[#FFF9F0] p-4">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#17211F]/50">Customer brief</div>
                <p className="mt-1 text-sm font-black text-[#17211F]">Comfortable road shoes for 3 weekly runs</p>
                <div className="mt-3 flex gap-2 text-[10px] font-black">
                  <span className="rounded-lg bg-white px-2 py-1 text-[#14532D]">Budget ₹5,000</span>
                  <span className="rounded-lg bg-white px-2 py-1 text-[#14532D]">Road running</span>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-[#14532D]/15 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#F97316]">Best match</span>
                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" />95% fit</span>
                </div>

              {featuredProduct && (
                <div className="mt-3 flex items-center gap-3">
                  <img src={featuredProduct.image} alt={featuredProduct.name} className="h-16 w-16 rounded-xl object-contain bg-white" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-black text-[#14532D]">{featuredProduct.name}</div>
                    <div className="text-xs font-bold text-[#17211F]/60">₹{featuredProduct.price.toLocaleString('en-IN')} · {featuredProduct.rating}★</div>
                  </div>
                </div>
              )}
                <div className="mt-3 border-t border-[#14532D]/10 pt-3 text-[11px] font-bold text-[#17211F]/70">Responsive cushioning · within budget · road-ready outsole</div>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-[#14532D]">
                  <span>Basket builder</span><span>Expected ₹5,397</span>
                </div>
                <div className="mt-3 space-y-2 text-xs font-bold text-[#17211F]">
                  <div className="flex items-center justify-between"><span className="flex items-center gap-1"><Plus className="h-3 w-3 text-[#F97316]" />Running Socks</span><span>+₹499</span></div>
                  <div className="flex items-center justify-between"><span className="flex items-center gap-1"><Plus className="h-3 w-3 text-[#F97316]" />Water Bottle</span><span>+₹399</span></div>
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
