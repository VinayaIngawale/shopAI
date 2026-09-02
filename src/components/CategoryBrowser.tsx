import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { ArrowLeft, Grid3x3, FolderOpen, Search } from 'lucide-react';

export const CategoryBrowser: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categorySearch, setCategorySearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('match');

  // Extract unique categories from products
  const categories = useMemo(() => {
    const categoryMap = new Map<string, { name: string; count: number; image: string }>();
    
    INITIAL_PRODUCTS.forEach(product => {
      if (!product.isUpsell) {
        const cat = product.category;
        if (!categoryMap.has(cat)) {
          categoryMap.set(cat, { name: cat, count: 0, image: product.image });
        }
        const catData = categoryMap.get(cat)!;
        catData.count += 1;
      }
    });

    return Array.from(categoryMap.values())
      .filter(category => category.name.toLowerCase().includes(categorySearch.toLowerCase()))
      .sort((a, b) => b.count - a.count);
  }, [categorySearch]);

  // Get products for selected category
  const selectedProducts = useMemo(() => {
    if (!selectedCategory) return [];
    const filtered = INITIAL_PRODUCTS.filter(p => {
      const matchesCategory = p.category === selectedCategory && !p.isUpsell;
      const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
      const matchesPrice = !maxPrice || p.price <= Number(maxPrice);
      return matchesCategory && matchesSearch && matchesPrice;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.matchScore - a.matchScore;
    });
  }, [selectedCategory, productSearch, maxPrice, sortBy]);

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
    'Gym': '💪',
    'Fitness Wearables': '⌚'
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
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#14532D]/60" />
            <input
              value={categorySearch}
              onChange={event => setCategorySearch(event.target.value)}
              placeholder="Search categories"
              className="w-full rounded-xl border border-[#14532D]/15 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-[#17211F] outline-none focus:ring-2 focus:ring-[#F97316]"
            />
          </div>
          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className="group bg-white hover:bg-[#FFF9F0] border-2 border-[#14532D]/10 hover:border-[#F97316] rounded-2xl p-4 sm:p-6 transition-all shadow-sm hover:shadow-lg transform hover:-translate-y-1 cursor-pointer text-center space-y-3"
              >
                <div className="h-28 sm:h-32 rounded-xl overflow-hidden bg-[#FFF9F0] group-hover:scale-[1.02] transition-transform">
                  <img src={category.image} alt={`${category.name} collection`} className="w-full h-full object-cover" />
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-[#14532D]/10 shadow-sm">
            <input
              value={productSearch}
              onChange={event => setProductSearch(event.target.value)}
              placeholder="Search products"
              className="rounded-xl border border-[#14532D]/15 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#F97316]"
            />
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={event => setMaxPrice(event.target.value)}
              placeholder="Max price (₹)"
              className="rounded-xl border border-[#14532D]/15 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#F97316]"
            />
            <select
              value={sortBy}
              onChange={event => setSortBy(event.target.value)}
              className="rounded-xl border border-[#14532D]/15 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#F97316]"
            >
              <option value="match">Best AI match</option>
              <option value="rating">Highest rating</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>
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
