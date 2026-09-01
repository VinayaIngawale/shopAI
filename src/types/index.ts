export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  matchScore: number;
  image: string;
  category: string;
  description: string;
  features?: string[];
  suggestedUpsells?: string[];
  isUpsell?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAsUpsell?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  products?: Product[];
  recommendedUpsells?: Product[];
  selectedProduct?: Product;
  timestamp: string;
}

export interface GrowthStats {
  totalRevenue: number;
  aiOrders: number;
  conversionRate: number;
  upsellRevenue: number;
  totalAttempts: number;
  completedOrdersCount: number;
  withoutAiRevenue: number;
  withAiRevenue: number;
  revenueGrowthPercentage: number;
}

export interface RevenueChartPoint {
  period: string;
  revenue: number;
  aiRevenue: number;
  nonAiRevenue: number;
  withoutAi: number;
  withAi: number;
}

export interface DbOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  product_name: string;
  product_price: number;
  upsell_product_name: string | null;
  upsell_price: number;
  order_status: 'Completed' | 'Pending' | 'Cancelled';
  ai_assisted: boolean;
  created_at: string;
}

export type ActiveTab = 'home' | 'ai-shopping' | 'dashboard' | 'add-sale' | 'sales-history' | 'categories';

