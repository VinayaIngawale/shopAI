import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, Plus, Check, ShoppingBag, ArrowRight } from 'lucide-react';

export const UpsellModal: React.FC = () => {
  const {
    isUpsellModalOpen,
    closeUpsellModal,
    selectedProductForUpsell,
    upsellProducts,
    addToCart,
    cart,
    setIsCartOpen
  } = useShop();

  if (!isUpsellModalOpen || !selectedProductForUpsell) return null;

  const isMainInCart = cart.some(item => item.product.id === selectedProductForUpsell.id);

  const handleAddMainProduct = () => {
    if (!isMainInCart) {
      addToCart(selectedProductForUpsell);
    }
  };

  const handleAddUpsell = (upsellProduct: typeof upsellProducts[0]) => {
    addToCart(upsellProduct, true);
  };

  const potentialUpsellTotal = upsellProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17211F]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#14532D]/10 transform transition-all">
        
        {/* Modal Header */}
        <div className="bg-[#FFF9F0] p-6 border-b border-[#14532D]/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#14532D] flex items-center justify-center text-[#FACC15]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-lg text-[#14532D]">AI Recommendation</h3>
              <p className="text-xs text-[#17211F]/70 font-medium">Smart add-on suggestion for maximum value</p>
            </div>
          </div>
          <button
            onClick={closeUpsellModal}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#17211F] hover:bg-cream-200 transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Main Product Banner (Section 3) */}
        <div className="p-6 space-y-6">
          <div className="bg-[#FFF9F0] p-4 rounded-2xl border border-[#14532D]/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedProductForUpsell.image}
                  alt={selectedProductForUpsell.name}
                  className="w-14 h-14 object-cover rounded-xl shadow-sm"
                />
                <div>
                  <h4 className="font-black text-[#17211F] text-base">
                    {selectedProductForUpsell.name} — ₹{selectedProductForUpsell.price.toLocaleString('en-IN')}
                  </h4>
                  <div className="text-xs font-bold text-emerald-800 flex items-center space-x-1 mt-0.5">
                    <span>AI says:</span>
                    <span className="italic">“This product matches your budget and running requirement.”</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddMainProduct}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 shrink-0 transition-all ${
                  isMainInCart
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-[#14532D] text-white hover:bg-[#092E16]'
                }`}
              >
                {isMainInCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{isMainInCart ? 'Added' : 'Add Product'}</span>
              </button>
            </div>
          </div>

          {/* You May Also Like Section (Section 3) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-[#17211F] text-base flex items-center space-x-2">
                <span>You may also like</span>
              </h4>
            </div>

            <div className="space-y-3">
              {upsellProducts.map(upsell => {
                const isAlreadyInCart = cart.some(item => item.product.id === upsell.id);
                return (
                  <div
                    key={upsell.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl border border-cream-200 hover:border-[#F97316]/30 bg-white transition-all shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={upsell.image}
                        alt={upsell.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <span className="font-bold text-[#17211F] text-sm">{upsell.name}</span>
                        <div className="text-xs font-extrabold text-[#14532D]">
                          ₹{upsell.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddUpsell(upsell)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1 ${
                        isAlreadyInCart
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-[#F97316] text-white hover:bg-[#EA580C] shadow-sm'
                      }`}
                    >
                      {isAlreadyInCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add {upsell.name.split(' ')[0]}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Potential Upsell Highlight (Section 3) */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-[#F97316]/30 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#F97316] animate-bounce" />
              <div>
                <span className="text-xs font-bold text-[#17211F]/70 uppercase tracking-wider block">Smart Upsell Potential</span>
                <span className="font-black text-[#17211F] text-sm">Potential Upsell: ₹{potentialUpsellTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <span className="bg-[#F97316] text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
              ₹{potentialUpsellTotal}
            </span>
          </div>

          {/* Bottom Action */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => {
                handleAddMainProduct();
                upsellProducts.forEach(u => handleAddUpsell(u));
                closeUpsellModal();
                setIsCartOpen(true);
              }}
              className="flex-1 bg-[#14532D] hover:bg-[#092E16] text-white py-3.5 px-4 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#FACC15]" />
              <span>Add All to Cart & View</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
