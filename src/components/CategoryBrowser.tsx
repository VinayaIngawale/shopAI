import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { ArrowLeft, Grid3x3, FolderOpen } from 'lucide-react';

export const CategoryBrowser: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories from products
  const categories = useMemo(() => {
    const categoryMap = new Map<string, { name: string; count: number; icon: string }>();
    
    INITIAL_PRODUCTS.forEach(product => {
      if (!product.isUpsell) {
        const cat = product.category;
        if (!categoryMap.has(cat)) {
          categoryMap.set(cat, { name: cat, count: 0, icon: '📦' });
        }
        const catData = categoryMap.get(cat)!;
        catData.count += 1;
      }
    });

    return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
  }, []);

  // Get products for selected category
  const selectedProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return INITIAL_PRODUCTS.filter(p => p.category === selectedCategory && !p.isUpsell);
  }, [selectedCategory]);

  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    'Running Shoes': '👟',
    'Laptops': '💻',
    'Mobiles': '📱',
    'Electrical': '⚡',
    'Accessories': '👜',
    'Home Appliances': '🏠',
    'Beauty Products': '💄',
    'Furniture': '🪑',
    'Toys': '🎮',
    'Gift Items': '🎁',
    'Gym': '💪'
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#14532D]/10 shadow-card">
        <div className="flex items-center space-x-3 mb-2">
          <Grid3x3 className="w-6 h-6 text-[#F97316]" />
          <span className="bg-emerald-100 text-[#14532D] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-300">
            Browse by Category
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#14532D]">
          Shop Our Collections
        </h1>
        <p className="text-sm font-semibold text-[#17211F]/70 mt-2">
          Browse products organized by category. Click any category to explore items.
        </p>
      </div>

      {!selectedCategory ? (
        <>
          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className="group bg-white hover:bg-[#FFF9F0] border-2 border-[#14532D]/10 hover:border-[#F97316] rounded-2xl p-4 sm:p-6 transition-all shadow-sm hover:shadow-lg transform hover:-translate-y-1 cursor-pointer text-center space-y-3"
              >
                <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
                  {categoryIcons[category.name] || '📦'}
                </div>
                <div>
                  <h3 className="font-bold text-[#14532D] text-sm sm:text-base line-clamp-2">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#17211F]/60 font-semibold mt-1">
                    {category.count} items
                  </p>
                </div>
              </button>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-[#14532D]/20">
              <FolderOpen className="w-12 h-12 text-[#14532D]/40 mx-auto mb-3" />
              <p className="text-[#17211F]/70 font-semibold">No categories available</p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Back Button & Category Title */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center space-x-2 text-[#14532D] hover:text-[#F97316] font-bold transition-colors bg-white px-4 py-2 rounded-xl border border-[#14532D]/10 hover:border-[#F97316]/30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Categories</span>
            </button>
            <div className="text-right">
              <h2 className="text-2xl font-black text-[#14532D]">
                {categoryIcons[selectedCategory] || '📦'} {selectedCategory}
              </h2>
              <p className="text-xs font-semibold text-[#17211F]/60 mt-1">
                {selectedProducts.length} products available
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {selectedProducts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-[#14532D]/20">
              <FolderOpen className="w-12 h-12 text-[#14532D]/40 mx-auto mb-3" />
              <p className="text-[#17211F]/70 font-semibold">No products in this category</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
