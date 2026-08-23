import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { DbOrder } from '../types';
import { Trash2, Eye, ShoppingBag, Sparkles, CheckCircle, Clock, XCircle, Bot, User, ArrowLeft, RefreshCw } from 'lucide-react';

export const SalesHistoryView: React.FC = () => {
  const { dbOrders, deleteOrder, refreshOrders, isLoadingOrders, setActiveTab } = useShop();

  const [selectedOrder, setSelectedOrder] = useState<DbOrder | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this sale? Metrics will recalculate automatically.')) {
      setDeletingId(id);
      try {
        await deleteOrder(id);
        if (selectedOrder?.id === id) {
          setSelectedOrder(null);
        }
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  const renderStatusBadge = (status: DbOrder['order_status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center space-x-1 text-xs font-extrabold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center space-x-1 text-xs font-extrabold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center space-x-1 text-xs font-extrabold bg-rose-100 text-rose-900 px-2.5 py-1 rounded-full border border-rose-300">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-primary-900/10 shadow-card">
        <div>
          <span className="bg-primary-900 text-accent-400 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Database Log
          </span>
          <h1 className="text-3xl font-black text-primary-900 mt-2">Recent Sales</h1>
          <p className="text-xs sm:text-sm font-semibold text-dark-700 mt-1">
            Live orders stored in Supabase. Deleting orders will automatically update dashboard KPIs.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={refreshOrders}
            disabled={isLoadingOrders}
            className="flex items-center space-x-2 bg-cream-100 hover:bg-cream-200 text-primary-900 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border border-primary-900/10"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingOrders ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setActiveTab('add-sale')}
            className="flex items-center space-x-2 bg-primary-900 hover:bg-primary-950 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md"
          >
            <span>+ Add New Sale</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-primary-900/10 shadow-card overflow-hidden">
        {dbOrders.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cream-100 text-primary-900 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 text-primary-900" />
            </div>
            <h3 className="text-xl font-extrabold text-primary-900">No sales recorded yet</h3>
            <p className="text-xs text-dark-700 font-semibold max-w-sm mx-auto">
              Sales added via the Add Sale page or completed through AI Shopping Assistant will appear here in real-time.
            </p>
            <button
              onClick={() => setActiveTab('add-sale')}
              className="bg-secondary-500 hover:bg-secondary-600 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-md"
            >
              Add First Sale
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream-100/70 border-b border-primary-900/10 text-[11px] font-black uppercase text-dark-700 tracking-wider">
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6 text-right">Amount</th>
                  <th className="py-4 px-6 text-center">AI Assisted</th>
                  <th className="py-4 px-6 text-right">Upsell</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200 text-sm font-semibold text-dark-900">
                {dbOrders.map(order => {
                  const totalAmount = Number(order.product_price) + Number(order.upsell_price);
                  return (
                    <tr key={order.id} className="hover:bg-cream-50/60 transition-colors">
                      
                      {/* Customer */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary-900/10 text-primary-900 flex items-center justify-center font-bold text-xs">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-extrabold text-primary-900">{order.customer_name}</div>
                            <div className="text-xs text-dark-700">{order.customer_email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-dark-900">{order.product_name}</div>
                        {order.upsell_product_name && (
                          <div className="text-xs text-secondary-600 font-medium flex items-center space-x-1 mt-0.5">
                            <Sparkles className="w-3 h-3" />
                            <span>+ {order.upsell_product_name}</span>
                          </div>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-6 text-right font-black text-primary-900">
                        {formatCurrency(totalAmount)}
                      </td>

                      {/* AI Assisted */}
                      <td className="py-4 px-6 text-center">
                        {order.ai_assisted ? (
                          <span className="inline-flex items-center space-x-1 text-xs font-extrabold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full">
                            <Bot className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Yes</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                            No
                          </span>
                        )}
                      </td>

                      {/* Upsell */}
                      <td className="py-4 px-6 text-right font-extrabold text-amber-700">
                        {Number(order.upsell_price) > 0 ? formatCurrency(Number(order.upsell_price)) : '₹0'}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        {renderStatusBadge(order.order_status)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-dark-700 hover:text-primary-900 hover:bg-cream-100 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(order.id)}
                            disabled={deletingId === order.id}
                            className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-all"
                            title="Delete Sale"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details View Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-dark-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-primary-900/10">
            <div className="flex items-center justify-between border-b border-cream-200 pb-4">
              <h3 className="text-xl font-black text-primary-900">Sale Record Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-dark-700 hover:text-dark-900 font-bold text-xl px-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm font-semibold">
              <div className="bg-cream-50 p-4 rounded-2xl border border-cream-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-dark-700">Order ID:</span>
                  <span className="font-mono text-xs text-dark-900">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-700">Customer Name:</span>
                  <span className="font-extrabold text-primary-900">{selectedOrder.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-700">Customer Email:</span>
                  <span className="text-dark-900">{selectedOrder.customer_email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-700">Created At:</span>
                  <span className="text-dark-900">{new Date(selectedOrder.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-cream-200">
                  <span>Main Product:</span>
                  <span className="font-extrabold text-dark-900">{selectedOrder.product_name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cream-200">
                  <span>Product Price:</span>
                  <span className="font-extrabold text-primary-900">{formatCurrency(Number(selectedOrder.product_price))}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cream-200">
                  <span>Upsell Product:</span>
                  <span className="font-bold text-secondary-600">{selectedOrder.upsell_product_name || 'None'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cream-200">
                  <span>Upsell Price:</span>
                  <span className="font-extrabold text-amber-700">{formatCurrency(Number(selectedOrder.upsell_price))}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cream-200">
                  <span>Order Status:</span>
                  <span>{renderStatusBadge(selectedOrder.order_status)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>AI Assisted:</span>
                  <span className="font-bold">{selectedOrder.ai_assisted ? 'Yes 🟢' : 'No ⚪'}</span>
                </div>
              </div>

              <div className="bg-primary-900 text-white p-4 rounded-2xl flex justify-between items-center font-black">
                <span>Total Amount:</span>
                <span className="text-xl text-accent-400">
                  {formatCurrency(Number(selectedOrder.product_price) + Number(selectedOrder.upsell_price))}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-cream-100 hover:bg-cream-200 text-primary-900 font-extrabold py-2.5 rounded-xl transition-all text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
