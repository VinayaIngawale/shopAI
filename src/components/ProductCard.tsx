import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, ShoppingCart, Sparkles, CheckCircle2, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  highlighted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, highlighted = false }) => {
  const { openUpsellModal, cart } = useShop();
  const [showDetails, setShowDetails] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const isInCart = cart.some(item => item.product.id === product.id);

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#F97316]/60 hover:shadow-[0_14px_30px_rgba(20,83,45,0.14)] hover:-translate-y-1 ${
        highlighted ? 'ring-2 ring-[#F97316] border-transparent scale-[1.01]' : 'border-[#0F3D2B]/10'
      }`}
    >
      <div>
        {/* Product Image & Badges */}
        <div className="relative h-48 w-full bg-[#FFF9F0] overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-[#14532D]/90 text-[#FACC15] text-xs font-black px-3 py-1.5 rounded-full backdrop-blur-md flex items-center space-x-1 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Match: {product.matchScore}%</span>
          </div>

          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 left-3 p-2 rounded-full bg-white/90 text-rose-500 shadow-sm hover:bg-white"
            aria-label={isFavorite ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#17211F] text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#FACC15] text-[#FACC15]" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#F97316] mb-1">
            {product.category}
          </div>
          <h3 className="text-lg font-black text-[#17211F] line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#17211F]/70 line-clamp-2 mb-4 leading-relaxed font-semibold">
            {product.description}
          </p>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-black text-[#F97316] hover:text-[#EA580C]"
          >
            {showDetails ? 'Hide details' : 'View details'}
          </button>
          {showDetails && product.features && (
            <ul className="mt-3 space-y-1 text-xs font-semibold text-[#17211F]/75">
              {product.features.map(feature => <li key={feature}>• {feature}</li>)}
            </ul>
          )}
        </div>
      </div>

      {/* Price & Add to Cart Button */}
      <div className="p-5 pt-0 border-t border-cream-100 mt-auto flex items-center justify-between">
        <div>
          <span className="text-xs text-[#17211F]/60 font-medium">Price</span>
          <div className="text-xl font-black text-[#14532D]">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
        </div>

        <button
          onClick={() => openUpsellModal(product)}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-extrabold text-sm transition-all shadow-sm ${
            isInCart
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-[#14532D] hover:bg-[#092E16] text-white hover:shadow-md'
          }`}
        >
          {isInCart ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>In Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
