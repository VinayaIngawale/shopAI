import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PlusCircle, Check, AlertCircle, ShoppingBag, Sparkles, ArrowLeft } from 'lucide-react';

export const AddSaleView: React.FC = () => {
  const { saveNewOrder, setActiveTab } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [upsellProductName, setUpsellProductName] = useState('');
  const [upsellPrice, setUpsellPrice] = useState('');
  const [orderStatus, setOrderStatus] = useState<'Completed' | 'Pending' | 'Cancelled'>('Completed');
  const [aiAssisted, setAiAssisted] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validation
    if (!customerName.trim()) {
      setErrorMsg('Customer Name is required');
      return;
    }
    if (!customerEmail.trim()) {
      setErrorMsg('Customer Email is required');
      return;
    }
    if (!productName.trim()) {
      setErrorMsg('Product Name is required');
      return;
    }
    const pPrice = parseFloat(productPrice);
    if (isNaN(pPrice) || pPrice < 0) {
      setErrorMsg('Please enter a valid Product Price (>= 0)');
      return;
    }

    const uPrice = upsellPrice.trim() !== '' ? parseFloat(upsellPrice) : 0;
    if (isNaN(uPrice) || uPrice < 0) {
      setErrorMsg('Please enter a valid Upsell Price (>= 0)');
      return;
    }

    setIsSubmitting(true);

    try {
      await saveNewOrder({
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        product_name: productName.trim(),
        product_price: pPrice,
        upsell_product_name: upsellProductName.trim() || null,
        upsell_price: uPrice,
        order_status: orderStatus,
        ai_assisted: aiAssisted
      });

      setSuccessMsg('Sale saved successfully to database!');

      // Reset form
      setCustomerName('');
      setCustomerEmail('');
      setProductName('');
      setProductPrice('');
      setUpsellProductName('');
      setUpsellPrice('');
      setOrderStatus('Completed');
      setAiAssisted(true);

      // Automatically redirect to Dashboard after a short delay
      setTimeout(() => {
        setActiveTab('dashboard');
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save sale to Supabase.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-primary-900/10 shadow-card">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-500 text-white flex items-center justify-center shadow-md">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-primary-900">Add New Sale</h1>
            <p className="text-xs font-semibold text-dark-700 mt-0.5">
              Submit a real sale record to Supabase database. Metrics update dynamically.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center space-x-2 text-xs font-bold text-dark-700 hover:text-primary-900 bg-cream-100 px-3 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-primary-900/10 shadow-card">
        
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-bold flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center space-x-2">
            <Check className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Customer Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-primary-900 uppercase tracking-wider border-b border-cream-200 pb-2">
              1. Customer Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-dark-900 mb-1">
                  Customer Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-primary-900/20 text-dark-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-cream-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-dark-900 mb-1">
                  Customer Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-primary-900/20 text-dark-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-cream-50/50"
                />
              </div>
            </div>
          </div>

          {/* Main Product Section */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-black text-primary-900 uppercase tracking-wider border-b border-cream-200 pb-2 flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-secondary-500" />
              <span>2. Main Product Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-extrabold text-dark-900 mb-1">
                  Product Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asus ROG Gaming Phone 7"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-primary-900/20 text-dark-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-cream-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-dark-900 mb-1">
                  Product Price (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  placeholder="e.g. 30000"
                  value={productPrice}
                  onChange={e => setProductPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-primary-900/20 text-dark-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-cream-50/50"
                />
              </div>
            </div>
          </div>

          {/* Upsell Section */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-black text-primary-900 uppercase tracking-wider border-b border-cream-200 pb-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>3. Smart Upsell (Optional)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-extrabold text-dark-900 mb-1">
                  Upsell Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. ThermoCooling Phone Fan"
                  value={upsellProductName}
                  onChange={e => setUpsellProductName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-primary-900/20 text-dark-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-cream-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-dark-900 mb-1">
                  Upsell Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 1000"
                  value={upsellPrice}
                  onChange={e => setUpsellPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-primary-900/20 text-dark-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-cream-50/50"
                />
              </div>
            </div>
          </div>

          {/* Order Status & AI Assistance */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-black text-primary-900 uppercase tracking-wider border-b border-cream-200 pb-2">
              4. Status & AI Attribute
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-dark-900 mb-1">
                  Order Status <span className="text-rose-500">*</span>
                </label>
                <select
                  value={orderStatus}
                  onChange={e => setOrderStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-primary-900/20 text-dark-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-cream-50/50"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <p className="text-[11px] text-dark-700 mt-1 font-medium">
                  Note: Revenue & Upsells calculate only from <strong>Completed</strong> orders.
                </p>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-dark-900 mb-1">
                  AI Assisted? <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center space-x-4 mt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="aiAssisted"
                      checked={aiAssisted === true}
                      onChange={() => setAiAssisted(true)}
                      className="w-4 h-4 text-secondary-500 focus:ring-secondary-500"
                    />
                    <span className="text-sm font-bold text-dark-900">Yes (AI Assisted)</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="aiAssisted"
                      checked={aiAssisted === false}
                      onChange={() => setAiAssisted(false)}
                      className="w-4 h-4 text-secondary-500 focus:ring-secondary-500"
                    />
                    <span className="text-sm font-bold text-dark-900">No (Standard)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-900 hover:bg-primary-950 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 text-base"
            >
              {isSubmitting ? (
                <span>Saving to Supabase...</span>
              ) : (
                <>
                  <Check className="w-5 h-5 text-accent-400" />
                  <span>Save Sale</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
