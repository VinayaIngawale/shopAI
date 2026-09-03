import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Bot, TrendingUp, Sparkles, Home, Play, Grid3x3, ShoppingBag, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, runAiDemo, cart, setIsCartOpen } = useShop();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectTab = (tab: 'home' | 'ai-shopping' | 'dashboard' | 'categories') => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F8F5]/90 backdrop-blur-md border-b border-[#0F3D2B]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-11 h-11 rounded-2xl bg-[#0F3D2B] flex items-center justify-center text-[#FACC15] shadow-sm transform hover:scale-105 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-2xl tracking-tight text-[#0F3D2B]">
                  ShopPilot <span className="text-[#F97316]">AI</span>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links: Home | AI Shopping | Growth Dashboard | Demo */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-white/90 p-1.5 rounded-2xl border border-[#0F3D2B]/10 shadow-none">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-[#0F3D2B] text-white shadow-sm'
                  : 'text-[#17211F] hover:text-[#0F3D2B] hover:bg-[#F3F7F4]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-shopping')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'ai-shopping'
                  ? 'bg-[#0F3D2B] text-white shadow-sm'
                  : 'text-[#17211F] hover:text-[#0F3D2B] hover:bg-[#F3F7F4]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FACC15]" />
              <span>AI Shopping</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'categories'
                  ? 'bg-[#0F3D2B] text-white shadow-sm'
                  : 'text-[#17211F] hover:text-[#0F3D2B] hover:bg-[#F3F7F4]'
              }`}
            >
              <Grid3x3 className="w-4 h-4 text-[#F97316]" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#0F3D2B] text-white shadow-sm'
                  : 'text-[#17211F] hover:text-[#0F3D2B] hover:bg-[#F3F7F4]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#F97316]" />
              <span>Growth Dashboard</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold text-[#17211F] hover:text-[#0F3D2B] hover:bg-[#F3F7F4] transition-all"
              title="Open shopping cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#F97316]" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="min-w-5 h-5 px-1 rounded-full bg-[#F97316] text-white text-[10px] font-black flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={runAiDemo}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-extrabold bg-[#F97316] hover:bg-[#EA580C] text-white shadow-sm transition-all transform hover:scale-105"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Demo</span>
            </button>
          </nav>

          {/* Right Status */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="md:hidden relative p-2.5 rounded-xl bg-white border border-[#0F3D2B]/10 text-[#0F3D2B]"
              title="Open shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#F97316] text-white text-[9px] font-black flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white border border-[#0F3D2B]/10 text-[#0F3D2B]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
        {isMobileMenuOpen && (
          <nav className="md:hidden grid grid-cols-2 gap-2 pb-4">
            <button onClick={() => selectTab('home')} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#14532D]"><Home className="w-4 h-4" /> Home</button>
            <button onClick={() => selectTab('ai-shopping')} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#14532D]"><Sparkles className="w-4 h-4 text-[#FACC15]" /> AI Shopping</button>
            <button onClick={() => selectTab('categories')} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#14532D]"><Grid3x3 className="w-4 h-4 text-[#F97316]" /> Categories</button>
            <button onClick={() => selectTab('dashboard')} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#14532D]"><TrendingUp className="w-4 h-4 text-[#F97316]" /> Growth</button>
            <button onClick={() => { runAiDemo(); setIsMobileMenuOpen(false); }} className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-3 py-2 text-sm font-bold text-white"><Play className="w-4 h-4 fill-current" /> Demo</button>
          </nav>
        )}
      </div>
    </header>
  );
};
