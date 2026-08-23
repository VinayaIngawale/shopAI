import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, CheckCircle, Sparkles } from 'lucide-react';

export const CartModal: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, saveCurrentCartAsOrder } = useShop();
  const [customerName, setCustomerName] = useState('Hackathon Customer');
  const [customerEmail, setCustomerEmail] = useState('demo@shoppilot.ai');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0 || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await saveCurrentCartAsOrder(customerName || 'ShopPilot Customer', customerEmail || 'demo@shoppilot.ai');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#17211F]/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between transform transition-transform animate-slide-in">
        
        {/* Cart Header */}
        <div className="p-6 bg-[#FFF9F0] border-b border-[#14532D]/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#14532D] flex items-center justify-center text-[#FACC15] shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xl text-[#14532D]">Shopping Cart</h3>
              <p className="text-xs font-semibold text-[#17211F]/70">{cart.length} item(s) selected</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-[#17211F]/70 hover:bg-cream-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Item List (Section 4) */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#17211F]/60 py-12">
              <ShoppingBag className="w-16 h-16 text-[#14532D]/20 mb-4" />
              <p className="font-bold text-lg text-[#17211F]">Your cart is empty</p>
              <p className="text-xs text-[#17211F]/70 mt-1 max-w-xs">Ask ShopPilot AI to recommend products or add items from the catalog.</p>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-cream-200 bg-white shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                    <div>
                      <h4 className="font-bold text-[#17211F] text-sm">{item.product.name}</h4>
                      <div className="text-sm font-black text-[#14532D] mt-0.5">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                      {item.addedAsUpsell && (
                        <span className="inline-flex items-center space-x-1 bg-orange-50 text-[#F97316] border border-[#F97316]/20 text-[10px] font-black px-2 py-0.5 rounded-full mt-1">
                          <Sparkles className="w-3 h-3 text-[#F97316]" />
                          <span>AI Add-on</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Customer Inputs for Simulated Checkout */}
              <div className="bg-[#FFF9F0] p-4 rounded-2xl border border-[#14532D]/10 space-y-3 pt-3">
                <div className="text-xs font-black text-[#14532D] uppercase">Customer Checkout Info</div>
                <div>
                  <label className="block text-[11px] font-bold text-[#17211F]/70 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-cream-200 text-xs font-bold text-[#17211F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#17211F]/70 mb-1">Customer Email</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-cream-200 text-xs font-bold text-[#17211F]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Section 4 Footer: Total & Proceed to Checkout Button */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#FFF9F0] border-t border-[#14532D]/10 space-y-4">
            <div className="flex justify-between items-center text-[#17211F]">
              <span className="font-extrabold text-base">Total</span>
              <span className="font-black text-2xl text-[#14532D]">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-4 rounded-2xl font-black text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5 text-[#FACC15]" />
              <span>{isSubmitting ? 'Processing Order...' : 'Proceed to Checkout'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
