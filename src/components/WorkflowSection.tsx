import React from 'react';
import { MessageSquare, Search, Sparkles, ShoppingBag, TrendingUp, ArrowRight } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Understand',
      desc: 'Customer tells AI what they need.',
      icon: MessageSquare,
      color: 'bg-[#14532D] text-[#FACC15]'
    },
    {
      num: '2',
      title: 'Search',
      desc: 'AI finds suitable products.',
      icon: Search,
      color: 'bg-[#F97316] text-white'
    },
    {
      num: '3',
      title: 'Recommend',
      desc: 'AI recommends the best products.',
      icon: Sparkles,
      color: 'bg-emerald-700 text-white'
    },
    {
      num: '4',
      title: 'Upsell',
      desc: 'AI suggests relevant additional products.',
      icon: ShoppingBag,
      color: 'bg-[#FACC15] text-[#17211F]'
    },
    {
      num: '5',
      title: 'Grow',
      desc: 'Business measures additional revenue.',
      icon: TrendingUp,
      color: 'bg-[#14532D] text-[#FACC15]'
    }
  ];

  return (
    <section className="py-12 bg-[#FFF9F0] rounded-3xl border border-[#14532D]/10 p-6 sm:p-10 my-8 shadow-soft">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-[#F97316] bg-orange-50 px-3 py-1 rounded-full border border-[#F97316]/20">
          Agentic Commerce Engine
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#14532D] mt-3">
          How ShopPilot AI Works
        </h2>
        <p className="text-sm font-semibold text-[#17211F]/70 mt-2">
          From customer intent understanding to measurable revenue growth
        </p>
      </div>

      {/* 5 Steps Horizontal Flow (Section 6) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative flex flex-col items-center">
              
              {/* Step Card */}
              <div className="bg-white p-6 rounded-2xl border border-[#14532D]/10 shadow-card hover:shadow-lg transition-all w-full h-full flex flex-col items-center text-center group transform hover:-translate-y-1">
                
                {/* Step Number & Icon */}
                <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>

                <div className="text-xs font-black uppercase text-[#F97316] mb-1">
                  Step {step.num}
                </div>
                <h3 className="font-extrabold text-lg text-[#17211F] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#17211F]/70 leading-relaxed font-semibold">
                  {step.desc}
                </p>
              </div>

              {/* Arrow Connector (visible on medium+ screens) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#F97316] bg-white rounded-full p-1 border border-[#F97316]/30 shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
