/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-supabase-url.supabase.co' &&
  !supabaseUrl.includes('your-supabase')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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

const LOCAL_STORAGE_KEY = 'sellwise_ai_orders_v1';

// Local storage persistent fallback helpers
export const getLocalOrders = (): DbOrder[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to parse local orders', err);
    return [];
  }
};

export const saveLocalOrders = (orders: DbOrder[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save local orders', err);
  }
};

// Unified Data Access Service for Supabase with local persistent fallback
export const ordersService = {
  async fetchOrders(): Promise<DbOrder[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching from Supabase, falling back to local:', error);
        return getLocalOrders();
      }
      return (data as DbOrder[]) || [];
    } else {
      return getLocalOrders();
    }
  },

  async addOrder(orderData: Omit<DbOrder, 'id' | 'created_at'>): Promise<DbOrder> {
    const newOrder: DbOrder = {
      ...orderData,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `ord_${Date.now()}_${Math.floor(Math.random()*1000)}`,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          customer_name: orderData.customer_name,
          customer_email: orderData.customer_email,
          product_name: orderData.product_name,
          product_price: orderData.product_price,
          upsell_product_name: orderData.upsell_product_name || null,
          upsell_price: orderData.upsell_price || 0,
          order_status: orderData.order_status,
          ai_assisted: orderData.ai_assisted,
          created_at: newOrder.created_at
        }])
        .select()
        .single();

      if (error) {
        console.error('Error inserting into Supabase, saving locally:', error);
        const current = getLocalOrders();
        const updated = [newOrder, ...current];
        saveLocalOrders(updated);
        return newOrder;
      }
      return data as DbOrder;
    } else {
      const current = getLocalOrders();
      const updated = [newOrder, ...current];
      saveLocalOrders(updated);
      return newOrder;
    }
  },

  async deleteOrder(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting from Supabase:', error);
      }
    }
    
    // Also delete from local state
    const current = getLocalOrders();
    const updated = current.filter(o => o.id !== id);
    saveLocalOrders(updated);
    return true;
  }
};
