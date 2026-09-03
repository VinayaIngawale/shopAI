import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Send, Bot, User } from 'lucide-react';

export const ShoppingPage: React.FC = () => {
  const {
    chatMessages,
    sendChatMessage,
    isAiThinking,
    cart,
    setIsCartOpen,
    saveCurrentCartAsOrder
  } = useShop();

  const [inputText, setInputText] = useState('');
  const [isSavingSale, setIsSavingSale] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAiThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isAiThinking) return;
    sendChatMessage(inputText.trim());
    setInputText('');
  };

  const samplePrompts = [
    'I need running shoes under ₹5,000.',
    'Show me fitness wearables under ₹10,000.',
    'I need wireless sports earbuds.'
  ];

  const handleQuickCheckout = async () => {
    setIsSavingSale(true);
    try {
      await saveCurrentCartAsOrder('Simulated Hackathon Customer', 'customer@example.com');
    } finally {
      setIsSavingSale(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      
      {/* Page Header */}
      <div className="bg-[#F5F7F4] p-6 sm:p-8 rounded-2xl border border-[#0F3D2B]/10 shadow-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 text-[#14532D] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-300">
              Agentic Shopping Assistant
            </span>
            <span className="text-xs text-[#17211F]/70 font-semibold">Gemini AI Powered</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14532D] mt-2">
            AI Shopping Assistant
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#17211F]/80 mt-1">
            Tell ShopPilot AI what you need — product matches and smart add-ons appear instantly.
          </p>
        </div>

        {/* Quick Sample Prompts */}
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendChatMessage(prompt)}
              className="bg-[#F1F6F2] hover:bg-[#E5EEE7] text-[#0F3D2B] border border-[#0F3D2B]/10 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-none"
            >
              “{prompt}”
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Stream */}
      <div className="space-y-6">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col space-y-4 ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* Message Bubble */}
            <div className={`flex items-start space-x-3 max-w-2xl ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#F97316] text-white'
                    : 'bg-[#14532D] text-[#FACC15]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Text Bubble */}
              <div
                className={`p-4 rounded-2xl text-sm font-bold shadow-none ${
                  msg.sender === 'user'
                    ? 'bg-[#F97316] text-white rounded-tr-none'
                    : 'bg-[#F5F7F4] text-[#17211F] border border-[#0F3D2B]/10 rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <div
                  className={`text-[10px] mt-1 font-medium ${
                    msg.sender === 'user' ? 'text-white/80' : 'text-[#17211F]/60'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>

            {/* AI Product Cards Grid (Prompt Section 2) */}
            {msg.products && msg.products.length > 0 && (
              <div className="w-full space-y-4 pt-2 pl-0 sm:pl-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {msg.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}

        {/* AI Thinking Spinner */}
        {isAiThinking && (
          <div className="flex items-center space-x-3 bg-[#F5F7F4] p-4 rounded-2xl border border-[#0F3D2B]/10 max-w-xs shadow-none">
            <Bot className="w-5 h-5 text-[#14532D] animate-spin" />
            <span className="text-xs font-extrabold text-[#14532D]">
              ShopPilot AI is matching products & add-ons...
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSubmit} className="sticky bottom-6 z-30">
        <div className="bg-[#F5F7F4] p-2.5 rounded-2xl border border-[#0F3D2B]/10 shadow-none flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask for products (e.g. 'I need running shoes under ₹5,000')..."
            className="flex-1 px-4 py-3 bg-white rounded-xl text-[#17211F] font-bold placeholder-[#17211F]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2B] border border-[#0F3D2B]/10"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isAiThinking}
            className="bg-[#14532D] hover:bg-[#092E16] disabled:opacity-50 text-white p-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center"
          >
            <Send className="w-5 h-5 text-[#FACC15]" />
          </button>
        </div>
      </form>

    </div>
  );
};
