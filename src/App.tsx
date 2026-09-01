import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ShoppingPage } from './components/ShoppingPage';
import { GrowthDashboard } from './components/GrowthDashboard';
import { AddSaleView } from './components/AddSaleView';
import { SalesHistoryView } from './components/SalesHistoryView';
import { CategoryBrowser } from './components/CategoryBrowser';
import { UpsellModal } from './components/UpsellModal';
import { CartModal } from './components/CartModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { DemoOverlay } from './components/DemoOverlay';
import { Bot } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useShop();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFF9F0] text-[#17211F] selection:bg-[#F97316] selection:text-white">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'ai-shopping' && <ShoppingPage />}
          {activeTab === 'dashboard' && <GrowthDashboard />}
          {activeTab === 'add-sale' && <AddSaleView />}
          {activeTab === 'sales-history' && <SalesHistoryView />}
          {activeTab === 'categories' && <CategoryBrowser />}
        </main>
      </div>

      {/* Global Footer */}
      <footer className="bg-white border-t border-[#14532D]/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-[#14532D] text-[#FACC15] flex items-center justify-center font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-[#14532D] text-sm">ShopPilot AI</span>
            </div>
          </div>

          <div className="text-xs font-semibold text-[#17211F]/70 flex items-center space-x-2">
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <UpsellModal />
      <CartModal />
      <OrderSuccessModal />
      <DemoOverlay />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
