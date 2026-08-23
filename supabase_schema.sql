-- Supabase Database Schema for SellWise AI

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price NUMERIC NOT NULL DEFAULT 0,
  upsell_product_name TEXT,
  upsell_price NUMERIC NOT NULL DEFAULT 0,
  order_status TEXT NOT NULL CHECK (order_status IN ('Completed', 'Pending', 'Cancelled')),
  ai_assisted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) and allow public read/write for demo app
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON orders FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON orders FOR DELETE USING (true);
