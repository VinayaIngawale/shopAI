import React from 'react';
import { useShop } from '../context/ShopContext';
import { Bot, TrendingUp, Sparkles, Home, Play, Grid3x3 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, runAiDemo } = useShop();

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F0]/90 backdrop-blur-md border-b border-[#14532D]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-11 h-11 rounded-2xl bg-[#14532D] flex items-center justify-center text-[#FACC15] shadow-md transform hover:scale-105 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-2xl tracking-tight text-[#14532D]">
                  ShopPilot <span className="text-[#F97316]">AI</span>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links: Home | AI Shopping | Growth Dashboard | Demo */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-white/90 p-1.5 rounded-2xl border border-[#14532D]/10 shadow-sm">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-[#14532D] text-white shadow-sm'
                  : 'text-[#17211F] hover:text-[#14532D] hover:bg-[#FFF9F0]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-shopping')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'ai-shopping'
                  ? 'bg-[#14532D] text-white shadow-sm'
                  : 'text-[#17211F] hover:text-[#14532D] hover:bg-[#FFF9F0]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FACC15]" />
              <span>AI Shopping</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'categories'
                  ? 'bg-[#14532D] text-white shadow-sm'
                  : 'text-[#17211F] hover:text-[#14532D] hover:bg-[#FFF9F0]'
              }`}
            >
              <Grid3x3 className="w-4 h-4 text-[#F97316]" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#14532D] text-white shadow-sm'
                  : 'text-[#17211F] hover:text-[#14532D] hover:bg-[#FFF9F0]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#F97316]" />
              <span>Growth Dashboard</span>
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
          <div className="flex items-center space-x-3 sm:space-x-4" />

        </div>
      </div>
    </header>
  );
};
