import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, ChatMessage, GrowthStats, ActiveTab, DbOrder } from '../types';
import { INITIAL_PRODUCTS, INITIAL_GROWTH_STATS, INITIAL_SYNTHETIC_ORDERS } from '../data/mockData';
import { processAICustomerQuery, getUpsellForProduct } from '../services/aiService';
import { ordersService } from '../lib/supabase';

interface SaveOrderInput {
  customer_name: string;
  customer_email: string;
  product_name: string;
  product_price: number;
  upsell_product_name?: string | null;
  upsell_price?: number;
  order_status: 'Completed' | 'Pending' | 'Cancelled';
  ai_assisted: boolean;
}

interface ShopContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cart: CartItem[];
  addToCart: (product: Product, addedAsUpsell?: boolean) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Upsell Modal
  isUpsellModalOpen: boolean;
  selectedProductForUpsell: Product | null;
  openUpsellModal: (product: Product) => void;
  closeUpsellModal: () => void;
  upsellProducts: Product[];

  // Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => Promise<void>;
  isAiThinking: boolean;

  // Supabase Database & Growth Stats
  dbOrders: DbOrder[];
  growthStats: GrowthStats;
  isLoadingOrders: boolean;
  saveNewOrder: (input: SaveOrderInput) => Promise<DbOrder>;
  deleteOrder: (id: string) => Promise<void>;
  refreshOrders: () => Promise<void>;

  // AI Shopping Assistant Cart / Checkout
  latestCompletedOrder: DbOrder | null;
  isOrderSuccessModalOpen: boolean;
  setIsOrderSuccessModalOpen: (open: boolean) => void;
  saveCurrentCartAsOrder: (customerName?: string, customerEmail?: string) => Promise<DbOrder | null>;

  // Demo Mode
  isDemoRunning: boolean;
  demoStep: number;
  runAiDemo: () => void;
  stopAiDemo: () => void;
  nextDemoStep: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('shoppilot-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('shoppilot-cart', JSON.stringify(cart));
  }, [cart]);

  // Upsell state
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState<boolean>(false);
  const [selectedProductForUpsell, setSelectedProductForUpsell] = useState<Product | null>(null);
  const [upsellProducts, setUpsellProducts] = useState<Product[]>([]);

  // Initial prompt chat message (Prompt Requirement 2)
  const initialShoes = INITIAL_PRODUCTS.filter(p => ['prod-nike-1', 'prod-adidas-1', 'prod-puma-1'].includes(p.id));
  const initialUpsells = INITIAL_PRODUCTS.filter(p => ['upsell-socks-1', 'upsell-bottle-1'].includes(p.id));

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'I need running shoes under ₹5,000.',
      timestamp: '10:00 AM'
    },
    {
      id: 'msg-2',
      sender: 'ai',
      text: 'I found these products based on your budget and requirements.',
      products: initialShoes,
      recommendedUpsells: initialUpsells,
      timestamp: '10:00 AM'
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Supabase Live Orders State initialized with rich synthetic dataset
  const [dbOrders, setDbOrders] = useState<DbOrder[]>(INITIAL_SYNTHETIC_ORDERS);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);
  const [growthStats, setGrowthStats] = useState<GrowthStats>(INITIAL_GROWTH_STATS);
  const [latestCompletedOrder, setLatestCompletedOrder] = useState<DbOrder | null>(null);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState<boolean>(false);

  // Interactive Demo state
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(0);

  // Recalculate KPIs dynamically based on baseline + DB orders
  const calculateGrowthStats = (orders: DbOrder[]): GrowthStats => {
    // Calculate added revenue & orders beyond synthetic base
    const extraCompleted = orders.filter(o => o.order_status === 'Completed' && !INITIAL_SYNTHETIC_ORDERS.some(iso => iso.id === o.id));
    
    const extraRevenue = extraCompleted.reduce(
      (sum, o) => sum + (Number(o.product_price) || 0) + (Number(o.upsell_price) || 0),
      0
    );

    const extraAiOrders = extraCompleted.filter(o => o.ai_assisted).length;
    const extraUpsellRev = extraCompleted.reduce((sum, o) => sum + (Number(o.upsell_price) || 0), 0);

    const totalRevenue = INITIAL_GROWTH_STATS.totalRevenue + extraRevenue;
    const aiOrders = INITIAL_GROWTH_STATS.aiOrders + extraAiOrders;
    const upsellRevenue = INITIAL_GROWTH_STATS.upsellRevenue + extraUpsellRev;
    const withAiRevenue = totalRevenue;
    const withoutAiRevenue = INITIAL_GROWTH_STATS.withoutAiRevenue;
    const revenueGrowthPercentage = Number((((withAiRevenue - withoutAiRevenue) / withoutAiRevenue) * 100).toFixed(1));

    return {
      totalRevenue,
      aiOrders,
      conversionRate: 7.8,
      upsellRevenue,
      totalAttempts: 923 + orders.length,
      completedOrdersCount: 72 + extraCompleted.length,
      withoutAiRevenue,
      withAiRevenue,
      revenueGrowthPercentage
    };
  };

  const refreshOrders = useCallback(async () => {
    setIsLoadingOrders(true);
    try {
      const fetched = await ordersService.fetchOrders();
      if (fetched && fetched.length > 0) {
        // Merge Supabase fetched orders with synthetic fallback
        const combined = [...fetched, ...INITIAL_SYNTHETIC_ORDERS.filter(iso => !fetched.some(f => f.id === iso.id))];
        setDbOrders(combined);
        setGrowthStats(calculateGrowthStats(combined));
      } else {
        setDbOrders(INITIAL_SYNTHETIC_ORDERS);
        setGrowthStats(INITIAL_GROWTH_STATS);
      }
    } catch (err) {
      console.warn('Using local synthetic store:', err);
      setDbOrders(INITIAL_SYNTHETIC_ORDERS);
      setGrowthStats(INITIAL_GROWTH_STATS);
    } finally {
      setIsLoadingOrders(false);
    }
  }, []);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const saveNewOrder = async (input: SaveOrderInput): Promise<DbOrder> => {
    const fallbackId = `SP-${1024 + dbOrders.length}`;
    let created: DbOrder;
    try {
      created = await ordersService.addOrder({
        customer_name: input.customer_name,
        customer_email: input.customer_email,
        product_name: input.product_name,
        product_price: Number(input.product_price) || 0,
        upsell_product_name: input.upsell_product_name || null,
        upsell_price: Number(input.upsell_price) || 0,
        order_status: input.order_status,
        ai_assisted: input.ai_assisted
      });
    } catch (err) {
      console.warn('Supabase save fallback to local memory:', err);
      created = {
        id: fallbackId,
        customer_name: input.customer_name,
        customer_email: input.customer_email,
        product_name: input.product_name,
        product_price: Number(input.product_price) || 0,
        upsell_product_name: input.upsell_product_name || null,
        upsell_price: Number(input.upsell_price) || 0,
        order_status: input.order_status,
        ai_assisted: input.ai_assisted,
        created_at: new Date().toISOString()
      };
      setDbOrders(prev => [created, ...prev]);
      setGrowthStats(prev => calculateGrowthStats([created, ...dbOrders]));
    }

    await refreshOrders();
    return created;
  };

  const deleteOrder = async (id: string): Promise<void> => {
    try {
      await ordersService.deleteOrder(id);
    } catch (err) {
      setDbOrders(prev => prev.filter(o => o.id !== id));
    }
    await refreshOrders();
  };

  const addToCart = (product: Product, addedAsUpsell: boolean = false) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, addedAsUpsell }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openUpsellModal = (product: Product) => {
    setSelectedProductForUpsell(product);
    const upsells = getUpsellForProduct(product);
    setUpsellProducts(upsells);
    setIsUpsellModalOpen(true);
  };

  const closeUpsellModal = () => {
    setIsUpsellModalOpen(false);
    setSelectedProductForUpsell(null);
  };

  const sendChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => {
      const updated = [...prev, userMsg];
      return updated.slice(-6);
    });
    setIsAiThinking(true);

    try {
      const res = await processAICustomerQuery(text);
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: res.messageText,
        products: res.matchedProducts,
        recommendedUpsells: res.recommendedUpsells,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => {
        const updated = [...prev, aiMsg];
        return updated.slice(-6);
      });
    } finally {
      setIsAiThinking(false);
    }
  };

  const saveCurrentCartAsOrder = async (
    customerName: string = 'AI Customer',
    customerEmail: string = 'customer@example.com'
  ): Promise<DbOrder | null> => {
    if (cart.length === 0) return null;

    const mainItems = cart.filter(i => !i.addedAsUpsell);
    const upsellItems = cart.filter(i => i.addedAsUpsell);

    const productName = mainItems.map(i => `${i.product.name}${i.quantity > 1 ? ` (x${i.quantity})` : ''}`).join(', ') || 'Adidas RunFlex';
    const productPrice = mainItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0) || 4799;

    const upsellProductName = upsellItems.map(i => i.product.name).join(', ') || null;
    const upsellPrice = upsellItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    const createdOrder = await saveNewOrder({
      customer_name: customerName,
      customer_email: customerEmail,
      product_name: productName,
      product_price: productPrice,
      upsell_product_name: upsellProductName,
      upsell_price: upsellPrice,
      order_status: 'Completed',
      ai_assisted: true
    });

    setLatestCompletedOrder(createdOrder);
    setCart([]);
    setIsCartOpen(false);
    setIsOrderSuccessModalOpen(true);
    return createdOrder;
  };

  const runAiDemo = () => {
    setIsDemoRunning(true);
    setDemoStep(1);
  };

  const stopAiDemo = () => {
    setIsDemoRunning(false);
    setDemoStep(0);
  };

  const nextDemoStep = () => {
    setDemoStep(prev => prev + 1);
  };

  return (
    <ShopContext.Provider
      value={{
        activeTab,
        setActiveTab,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isUpsellModalOpen,
        selectedProductForUpsell,
        openUpsellModal,
        closeUpsellModal,
        upsellProducts,
        chatMessages,
        sendChatMessage,
        isAiThinking,
        dbOrders,
        growthStats,
        isLoadingOrders,
        saveNewOrder,
        deleteOrder,
        refreshOrders,
        latestCompletedOrder,
        isOrderSuccessModalOpen,
        setIsOrderSuccessModalOpen,
        saveCurrentCartAsOrder,
        isDemoRunning,
        demoStep,
        runAiDemo,
        stopAiDemo,
        nextDemoStep
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
