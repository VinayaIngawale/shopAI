import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { DbOrder } from '../types';
import { DollarSign, ShoppingBag, TrendingUp, Sparkles, ArrowUpRight, BarChart3, PlusCircle, Bot, Trash2, Eye, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export const GrowthDashboard: React.FC = () => {
  const { growthStats, dbOrders, deleteOrder, refreshOrders, isLoadingOrders, setActiveTab } = useShop();

  const [selectedOrder, setSelectedOrder] = useState<DbOrder | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this order record? Metrics will update.')) {
      setDeletingId(id);
      try {
        await deleteOrder(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Section 5: 4 Cards
  const statCards = [
    {
      title: 'Revenue',
      value: `₹${growthStats.totalRevenue.toLocaleString('en-IN')}`,
      subtext: '+25% Growth with AI',
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      iconBg: 'bg-[#14532D] text-[#FACC15]'
    },
    {
      title: 'AI Orders',
      value: growthStats.aiOrders,
      subtext: 'AI Agent Assisted Sales',
      icon: ShoppingBag,
      color: 'bg-orange-50 text-orange-900 border-orange-200',
      iconBg: 'bg-[#F97316] text-white'
    },
    {
      title: 'Conversion',
      value: `${growthStats.conversionRate}%`,
      subtext: 'High Intent Conversion',
      icon: TrendingUp,
      color: 'bg-amber-50 text-amber-900 border-amber-200',
      iconBg: 'bg-[#FACC15] text-[#17211F]'
    },
    {
      title: 'Upsell Revenue',
      value: `₹${growthStats.upsellRevenue.toLocaleString('en-IN')}`,
      subtext: 'Smart Add-on Suggestions',
      icon: Sparkles,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      iconBg: 'bg-[#14532D] text-white'
    }
  ];

  // Section 5 Bar Chart: Revenue With AI vs Without AI
  const comparisonChartData = [
    {
      name: 'Revenue Comparison',
      'Without AI': growthStats.withoutAiRevenue,
      'With AI': growthStats.totalRevenue
    }
  ];

  return (
    <div className="space-y-8 py-6">
      
      {/* Dashboard Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#14532D]/10 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#14532D] text-[#FACC15] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Growth & Revenue Analytics
            </span>
            {isLoadingOrders && (
              <span className="text-xs font-bold text-[#F97316] animate-pulse">Syncing data...</span>
            )}
          </div>
          <h1 className="text-3xl font-black text-[#14532D] mt-2">
            Simple Growth Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#17211F]/70 mt-1">
            Real-time business performance powered by ShopPilot AI recommendations and upsells.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={refreshOrders}
            className="p-2.5 rounded-2xl bg-[#FFF9F0] hover:bg-cream-200 border border-[#14532D]/10 text-[#14532D] transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${isLoadingOrders ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setActiveTab('ai-shopping')}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-3 rounded-2xl font-extrabold text-sm shadow-md transition-all flex items-center space-x-2"
          >
            <Bot className="w-5 h-5" />
            <span>Try AI Agent</span>
          </button>
        </div>
      </div>

      {/* 5. 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-[#14532D]/10 shadow-card hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#17211F]/70 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center font-bold shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-[#17211F] tracking-tight">
                  {card.value}
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-1 flex items-center space-x-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{card.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 5 Chart + Highlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart: Revenue With AI vs Without AI */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-[#14532D]/10 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-cream-200 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-[#F97316]" />
                <h2 className="text-xl font-extrabold text-[#14532D]">
                  Revenue With AI vs Without AI
                </h2>
              </div>
              <p className="text-xs text-[#17211F]/70 font-semibold mt-1">
                Comparison showing base sales versus AI boosted total revenue
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FDF1DC" />
                <XAxis dataKey="name" stroke="#17211F" fontSize={12} tickLine={false} />
                <YAxis stroke="#17211F" fontSize={12} tickLine={false} tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#FFF9F0', borderRadius: '16px', border: '1px solid #14532D' }}
                />
                <Legend />
                <Bar dataKey="Without AI" fill="#F97316" radius={[8, 8, 0, 0]} barSize={60} />
                <Bar dataKey="With AI" fill="#14532D" radius={[8, 8, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section 5 Highlight Card: +25% Revenue Growth */}
        <div className="bg-gradient-to-br from-[#14532D] via-[#14532D] to-[#092E16] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden border border-[#14532D]">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp className="w-40 h-40" />
          </div>

          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center space-x-1.5 bg-[#FACC15] text-[#17211F] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Growth Impact</span>
            </div>
            
            <h3 className="text-3xl font-black tracking-tight text-white pt-2">
              Revenue Growth
            </h3>

            <div className="text-5xl font-black text-[#FACC15] tracking-tight">
              +{growthStats.revenueGrowthPercentage}%
            </div>

            <p className="text-xs text-[#FFF9F0]/80 font-medium leading-relaxed">
              ShopPilot AI boosts revenue by understanding budget constraints, delivering personalized recommendations, and upselling high-margin accessories.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2 relative z-10">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#FFF9F0]/70">Without AI Baseline:</span>
              <span className="text-white">₹{growthStats.withoutAiRevenue.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs font-extrabold text-[#FACC15]">
              <span>With ShopPilot AI:</span>
              <span>₹{growthStats.totalRevenue.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Orders History Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#14532D]/10 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-cream-200 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-[#14532D]">
              Recent Orders Log
            </h3>
            <p className="text-xs text-[#17211F]/70 font-semibold mt-0.5">
              Live orders recorded during interactive AI shopping sessions.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('ai-shopping')}
            className="bg-[#14532D] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-[#FACC15]" />
            <span>Test New AI Order</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFF9F0] border-b border-[#14532D]/10 text-[11px] font-black uppercase text-[#17211F]/70 tracking-wider">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product Purchased</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">AI Assisted</th>
                <th className="py-3 px-4 text-right">Upsell</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200 text-xs font-semibold text-[#17211F]">
              {dbOrders.slice(0, 6).map(ord => {
                const total = Number(ord.product_price) + Number(ord.upsell_price);
                return (
                  <tr key={ord.id} className="hover:bg-[#FFF9F0]/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#14532D]">{ord.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-[#14532D]">{ord.customer_name}</div>
                      <div className="text-[11px] text-[#17211F]/60">{ord.customer_email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold">{ord.product_name}</div>
                      {ord.upsell_product_name && (
                        <div className="text-[10px] text-[#F97316] font-medium">
                          + {ord.upsell_product_name}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-[#14532D]">
                      ₹{total.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-black text-[10px]">
                        Yes 🟢
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-amber-700">
                      {Number(ord.upsell_price) > 0 ? `₹${Number(ord.upsell_price).toLocaleString('en-IN')}` : '₹0'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1 text-[#17211F]/70 hover:text-[#14532D]"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ord.id)}
                          disabled={deletingId === ord.id}
                          className="p-1 text-rose-600 hover:text-rose-800"
                          title="Delete Order"
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
      </div>

      {/* Details View Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#17211F]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#14532D]/10">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <h3 className="text-lg font-black text-[#14532D]">Order Details ({selectedOrder.id})</h3>
              <button onClick={() => setSelectedOrder(null)} className="font-bold text-lg px-2">✕</button>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-[#17211F]/70">Customer:</span>
                <span className="font-bold text-[#14532D]">{selectedOrder.customer_name} ({selectedOrder.customer_email})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#17211F]/70">Main Product:</span>
                <span>{selectedOrder.product_name} (₹{Number(selectedOrder.product_price).toLocaleString('en-IN')})</span>
              </div>
              {selectedOrder.upsell_product_name && (
                <div className="flex justify-between text-[#F97316]">
                  <span>Smart Upsell:</span>
                  <span>{selectedOrder.upsell_product_name} (+₹{Number(selectedOrder.upsell_price).toLocaleString('en-IN')})</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#17211F]/70">Status:</span>
                <span className="font-bold text-emerald-700">Completed 🟢</span>
              </div>
            </div>

            <div className="bg-[#14532D] text-white p-3.5 rounded-2xl flex justify-between items-center font-bold text-sm">
              <span>Total Revenue:</span>
              <span className="text-[#FACC15]">₹{(Number(selectedOrder.product_price) + Number(selectedOrder.upsell_price)).toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-[#FFF9F0] hover:bg-cream-200 text-[#14532D] font-bold py-2.5 rounded-xl text-xs border border-[#14532D]/10"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
