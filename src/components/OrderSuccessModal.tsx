import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle, TrendingUp, ShoppingBag, Sparkles } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const {
    isOrderSuccessModalOpen,
    setIsOrderSuccessModalOpen,
    latestCompletedOrder,
    setActiveTab
  } = useShop();

  if (!isOrderSuccessModalOpen || !latestCompletedOrder) return null;

  const total = Number(latestCompletedOrder.product_price) + Number(latestCompletedOrder.upsell_price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17211F]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border border-emerald-500/20 transform transition-all">
        
        {/* Checkmark Badge */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>

        {/* Section 4 Title */}
        <h3 className="text-2xl sm:text-3xl font-black text-[#17211F] mb-1">
          🎉 Order Successful
        </h3>
        
        {/* Order # */}
        <p className="text-[#F97316] font-black text-sm mb-6 font-mono bg-orange-50 py-1 px-3 rounded-full inline-block border border-[#F97316]/20">
          Order #{latestCompletedOrder.id}
        </p>

        {/* Order Summary Box */}
        <div className="bg-[#FFF9F0] p-5 rounded-2xl border border-[#14532D]/10 mb-6 text-left space-y-3">
          <div className="flex justify-between items-center text-xs text-[#17211F]/70 font-semibold border-b border-[#14532D]/10 pb-2">
            <span>Customer: {latestCompletedOrder.customer_name}</span>
            <span className="text-emerald-700 font-bold">Status: Completed</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-bold text-[#17211F]">
              <span>Products:</span>
              <span className="text-right max-w-[200px] truncate">{latestCompletedOrder.product_name}</span>
            </div>
            
            {latestCompletedOrder.upsell_product_name && (
              <div className="flex justify-between text-[#F97316] font-bold border-t border-cream-200 pt-1">
                <span>AI Add-on:</span>
                <span>{latestCompletedOrder.upsell_product_name} (+₹{Number(latestCompletedOrder.upsell_price).toLocaleString('en-IN')})</span>
              </div>
            )}
          </div>

          {/* Section 4 Total */}
          <div className="border-t border-[#14532D]/10 pt-3 flex justify-between items-center">
            <span className="font-bold text-[#17211F] text-sm">Total</span>
            <span className="font-black text-2xl text-[#14532D]">
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>

          {Number(latestCompletedOrder.upsell_price) > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs font-bold text-emerald-900 flex items-center justify-between mt-2">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Upsell Revenue Added:</span>
              </span>
              <span>+₹{Number(latestCompletedOrder.upsell_price).toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="space-y-3">
          <button
            onClick={() => {
              setIsOrderSuccessModalOpen(false);
              setActiveTab('dashboard');
            }}
            className="w-full bg-[#14532D] hover:bg-[#092E16] text-white py-3.5 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <TrendingUp className="w-4 h-4 text-[#FACC15]" />
            <span>View Growth Dashboard</span>
          </button>

          <button
            onClick={() => {
              setIsOrderSuccessModalOpen(false);
              setActiveTab('ai-shopping');
            }}
            className="w-full bg-[#FFF9F0] hover:bg-cream-200 text-[#14532D] py-3 rounded-xl font-bold text-sm transition-colors border border-[#14532D]/10 flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#17211F]/70" />
            <span>Continue Shopping</span>
          </button>
        </div>

      </div>
    </div>
  );
};
