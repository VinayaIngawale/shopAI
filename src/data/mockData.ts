import { Product, GrowthStats, DbOrder } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Featured Running Shoes (Prompt Section 2)
  {
    id: 'prod-nike-1',
    name: 'Nike Run Pro',
    price: 4499,
    rating: 4.6,
    matchScore: 95,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    category: 'Running Shoes',
    description: 'High-performance responsive cushioning for marathoners and daily outdoor runners.',
    features: ['Zoom Air Cushioning', 'Flyknit Breathable Mesh', 'Durable Rubber Outsole'],
    suggestedUpsells: ['upsell-socks-1', 'upsell-bottle-1']
  },
  {
    id: 'prod-adidas-1',
    name: 'Adidas RunFlex',
    price: 4799,
    rating: 4.7,
    matchScore: 93,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    category: 'Running Shoes',
    description: 'Flexible ultra-lightweight running shoe with energy-returning Boost technology.',
    features: ['Boost Midsole', 'Continental Rubber Grip', 'Engineered Mesh Upper'],
    suggestedUpsells: ['upsell-socks-1', 'upsell-bottle-1']
  },
  {
    id: 'prod-puma-1',
    name: 'Puma Velocity',
    price: 3999,
    rating: 4.5,
    matchScore: 91,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80',
    category: 'Running Shoes',
    description: 'All-distance running shoes engineered for speed, durability, and comfort.',
    features: ['NITRO Foam Cushioning', 'PUMAGRIP Outsole', 'Reflective Accents'],
    suggestedUpsells: ['upsell-socks-1', 'upsell-bottle-1']
  },

  // 2. Prompt Section 3 Upsell Products
  {
    id: 'upsell-socks-1',
    name: 'Running Socks',
    price: 499,
    rating: 4.8,
    matchScore: 98,
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
    description: 'Anti-blister cushioned performance socks engineered for long-distance runners.',
    isUpsell: true
  },
  {
    id: 'upsell-bottle-1',
    name: 'Water Bottle',
    price: 399,
    rating: 4.7,
    matchScore: 96,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
    description: 'BPA-free quick-squeeze sport hydration flask with leak-proof cap.',
    isUpsell: true
  },

  // 3. Additional Synthetic Catalog (Total 25+ products)
  {
    id: 'prod-4',
    name: 'Asics Gel-Nimbus 25',
    price: 5299,
    rating: 4.8,
    matchScore: 89,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    category: 'Running Shoes',
    description: 'Maximum shock absorption and cloud-like soft landing for marathon training.',
    suggestedUpsells: ['upsell-socks-1']
  },
  {
    id: 'prod-5',
    name: 'Reebok Floatride Energy',
    price: 4199,
    rating: 4.4,
    matchScore: 87,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
    category: 'Running Shoes',
    description: 'Lightweight everyday trainer with high energy return foam.',
    suggestedUpsells: ['upsell-bottle-1']
  },
  {
    id: 'prod-15',
    name: 'New Balance Fresh Foam 1080',
    price: 5799,
    rating: 4.8,
    matchScore: 90,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    category: 'Running Shoes',
    description: 'Soft, supportive daily trainer designed for comfortable long-distance runs.',
    features: ['Fresh Foam X Midsole', 'Breathable Knit Upper', 'Heel Cushioning'],
    suggestedUpsells: ['upsell-socks-1', 'upsell-bottle-1']
  },
  {
    id: 'prod-16',
    name: 'Skechers Go Run Ride',
    price: 2899,
    rating: 4.3,
    matchScore: 86,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80',
    category: 'Running Shoes',
    description: 'Affordable lightweight running shoes with responsive cushioning for daily training.',
    features: ['Responsive Foam', 'Mesh Upper', 'Flexible Traction'],
    suggestedUpsells: ['upsell-socks-1']
  },
  {
    id: 'prod-17',
    name: 'Decathlon Jogflow 100',
    price: 2499,
    rating: 4.2,
    matchScore: 84,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    category: 'Running Shoes',
    description: 'Comfortable beginner running shoe with reliable grip for road and treadmill workouts.',
    features: ['Soft Foam Cushioning', 'Road Grip Sole', 'Lightweight Build'],
    suggestedUpsells: ['upsell-bottle-1']
  },
  {
    id: 'prod-18',
    name: 'Brooks Ghost 15',
    price: 6499,
    rating: 4.7,
    matchScore: 92,
    image: 'https://images.unsplash.com/photo-1556637640-2c80d3201be8?auto=format&fit=crop&w=600&q=80',
    category: 'Running Shoes',
    description: 'Smooth, balanced road runner with dependable cushioning for everyday mileage.',
    features: ['DNA Loft Cushioning', 'Segmented Crash Pad', 'Durable Outsole'],
    suggestedUpsells: ['upsell-socks-1', 'upsell-bottle-1']
  },
  {
    id: 'prod-19',
    name: 'ASICS Novablast 4',
    price: 7299,
    rating: 4.8,
    matchScore: 94,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80',
    category: 'Running Shoes',
    description: 'High-energy performance trainer built for fast sessions and responsive daily runs.',
    features: ['FF BLAST Plus Foam', 'Engineered Woven Upper', 'AHAR Rubber Outsole'],
    suggestedUpsells: ['upsell-socks-1', 'upsell-bottle-1']
  },
  {
    id: 'prod-6',
    name: 'Garmin Forerunner 55',
    price: 14999,
    rating: 4.9,
    matchScore: 97,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    category: 'Fitness Wearables',
    description: 'GPS running smartwatch with personalized daily suggested workouts and VO2 max tracking.',
    suggestedUpsells: ['upsell-strap-1']
  },
  {
    id: 'prod-7',
    name: 'Fitbit Charge 6',
    price: 9999,
    rating: 4.6,
    matchScore: 92,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80',
    category: 'Fitness Wearables',
    description: 'Advanced fitness tracker with Built-in GPS, 40+ exercise modes, and YouTube Music controls.',
    suggestedUpsells: ['upsell-strap-1']
  },
  {
    id: 'prod-20',
    name: 'Samsung Galaxy Fit3',
    price: 3999,
    rating: 4.5,
    matchScore: 91,
    image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?auto=format&fit=crop&w=600&q=80',
    category: 'Fitness Wearables',
    description: 'Slim fitness band with sleep tracking, heart-rate monitoring, and a bright AMOLED display.',
    features: ['AMOLED Display', 'Sleep Coaching', '5ATM Water Resistance'],
    suggestedUpsells: ['upsell-strap-1']
  },
  {
    id: 'prod-21',
    name: 'Amazfit Bip 5',
    price: 5499,
    rating: 4.4,
    matchScore: 89,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    category: 'Fitness Wearables',
    description: 'Large-screen fitness smartwatch with GPS, health tracking, and long battery life.',
    features: ['Built-in GPS', 'Health Monitoring', 'Up to 10-Day Battery'],
    suggestedUpsells: ['upsell-strap-1']
  },
  {
    id: 'prod-22',
    name: 'Noise ColorFit Pulse 4',
    price: 2999,
    rating: 4.2,
    matchScore: 85,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80',
    category: 'Fitness Wearables',
    description: 'Budget-friendly smartwatch with activity tracking, heart-rate alerts, and workout modes.',
    features: ['Activity Tracking', 'Heart-Rate Alerts', 'Multiple Sports Modes'],
    suggestedUpsells: ['upsell-strap-1']
  },
  {
    id: 'prod-23',
    name: 'Apple Watch SE',
    price: 24999,
    rating: 4.8,
    matchScore: 95,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=600&q=80',
    category: 'Fitness Wearables',
    description: 'Smart fitness watch with advanced workout metrics, crash detection, and seamless iPhone integration.',
    features: ['Workout Metrics', 'Crash Detection', 'Heart Health Notifications'],
    suggestedUpsells: ['upsell-strap-1']
  },
  {
    id: 'prod-24',
    name: 'Polar Pacer Pro',
    price: 18999,
    rating: 4.7,
    matchScore: 93,
    image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=600&q=80',
    category: 'Fitness Wearables',
    description: 'Lightweight training watch with precise GPS, recovery insights, and guided running plans.',
    features: ['Training Load', 'Recovery Tracking', 'Precision GPS'],
    suggestedUpsells: ['upsell-strap-1']
  },
  {
    id: 'prod-8',
    name: 'Under Armour SpeedFit Shorts',
    price: 1899,
    rating: 4.5,
    matchScore: 90,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    category: 'Apparel',
    description: 'Ultra-light, stretch-woven fabric for totally uninhibited movement during sprints.',
    suggestedUpsells: ['upsell-socks-1']
  },
  {
    id: 'prod-9',
    name: 'Nike Dri-FIT Running Tee',
    price: 1499,
    rating: 4.6,
    matchScore: 91,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    category: 'Apparel',
    description: 'Moisture-wicking sweat repellent short-sleeve shirt with mesh airflow panels.',
    suggestedUpsells: ['upsell-towel-1']
  },
  {
    id: 'prod-10',
    name: 'JBL Endurance Peak 3 Earbuds',
    price: 6999,
    rating: 4.7,
    matchScore: 94,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    category: 'Electronics',
    description: 'IP68 waterproof wireless sport earbuds with twist-lock secure ear hook design.',
    suggestedUpsells: ['upsell-armband-1']
  },
  {
    id: 'prod-11',
    name: 'Shokz OpenRun Bone Conduction Headphones',
    price: 11999,
    rating: 4.8,
    matchScore: 96,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    category: 'Electronics',
    description: 'Open-ear safety Bluetooth headset with 8-hour battery for outdoor runners.',
    suggestedUpsells: ['upsell-armband-1']
  },
  {
    id: 'prod-12',
    name: 'Hydration Running Vest 5L',
    price: 3499,
    rating: 4.7,
    matchScore: 93,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
    description: 'Ergonomic trail vest with dual soft flask pockets and phone stash zip compartment.',
    suggestedUpsells: ['upsell-gel-1']
  },
  {
    id: 'prod-13',
    name: 'ProForm Speed Foam Roller',
    price: 1299,
    rating: 4.5,
    matchScore: 88,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    category: 'Recovery',
    description: 'Deep-tissue muscle recovery foam roller for post-run tightness relief.',
    suggestedUpsells: ['upsell-gel-1']
  },
  {
    id: 'prod-14',
    name: 'FastFuel Energy Gel Pack (10x)',
    price: 999,
    rating: 4.8,
    matchScore: 95,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    category: 'Nutrition',
    description: 'Rapid carbohydrate & electrolyte replenishment gel for marathon endurance.',
    isUpsell: true
  },
  {
    id: 'upsell-towel-1',
    name: 'Microfiber Gym Towel',
    price: 299,
    rating: 4.6,
    matchScore: 94,
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
    description: 'Quick-dry antibacterial cooling sport towel.',
    isUpsell: true
  },
  {
    id: 'upsell-armband-1',
    name: 'Neoprene Running Armband',
    price: 599,
    rating: 4.5,
    matchScore: 92,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
    description: 'Sweatproof touch-screen phone armband holster for runners.',
    isUpsell: true
  },
  {
    id: 'upsell-strap-1',
    name: 'Silicone Replacement Band',
    price: 699,
    rating: 4.7,
    matchScore: 90,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
    description: 'Breathable sports silicone band clip.',
    isUpsell: true
  },
  {
    id: 'upsell-gel-1',
    name: 'Electrolyte Hydration Tablets (20x)',
    price: 449,
    rating: 4.9,
    matchScore: 97,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    category: 'Nutrition',
    description: 'Effervescent sugar-free electrolyte drink mix.',
    isUpsell: true
  }
];

// Initial Growth Dashboard Metrics matching Section 5
export const INITIAL_GROWTH_STATS: GrowthStats = {
  totalRevenue: 350000,
  aiOrders: 72,
  conversionRate: 7.8,
  upsellRevenue: 48500,
  totalAttempts: 923,
  completedOrdersCount: 72,
  withoutAiRevenue: 280000,
  withAiRevenue: 350000,
  revenueGrowthPercentage: 25.0
};

// Synthetic Customer Roster (20 customers)
export const SYNTHETIC_CUSTOMERS = [
  { name: 'Anish Sharma', email: 'anish.s@example.com' },
  { name: 'Priya Patel', email: 'priya.p@example.com' },
  { name: 'Rohan Mehta', email: 'rohan.m@example.com' },
  { name: 'Sneha Verma', email: 'sneha.v@example.com' },
  { name: 'Vikas Rao', email: 'vikas.r@example.com' },
  { name: 'Kavita Nair', email: 'kavita.n@example.com' },
  { name: 'Aarav Gupta', email: 'aarav.g@example.com' },
  { name: 'Diya Reddy', email: 'diya.r@example.com' },
  { name: 'Aditya Singh', email: 'aditya.s@example.com' },
  { name: 'Ananya Joshi', email: 'ananya.j@example.com' },
  { name: 'Kabir Malhotra', email: 'kabir.m@example.com' },
  { name: 'Isha Deshmukh', email: 'isha.d@example.com' },
  { name: 'Manish Kumar', email: 'manish.k@example.com' },
  { name: 'Ritu Saxena', email: 'ritu.s@example.com' },
  { name: 'Siddharth Iyer', email: 'siddharth.i@example.com' },
  { name: 'Neha Choudhury', email: 'neha.c@example.com' },
  { name: 'Tarun Banerjee', email: 'tarun.b@example.com' },
  { name: 'Pooja Bhatt', email: 'pooja.b@example.com' },
  { name: 'Gaurav Gill', email: 'gaurav.g@example.com' },
  { name: 'Shweta Kapoor', email: 'shweta.k@example.com' }
];

// Initial Synthetic Orders to generate baseline statistics & charts
export const INITIAL_SYNTHETIC_ORDERS: DbOrder[] = [
  {
    id: 'SP-1001',
    customer_name: 'Anish Sharma',
    customer_email: 'anish.s@example.com',
    product_name: 'Adidas RunFlex',
    product_price: 4799,
    upsell_product_name: 'Running Socks',
    upsell_price: 499,
    order_status: 'Completed',
    ai_assisted: true,
    created_at: '2026-08-23T10:15:00Z'
  },
  {
    id: 'SP-1002',
    customer_name: 'Priya Patel',
    customer_email: 'priya.p@example.com',
    product_name: 'Nike Run Pro',
    product_price: 4499,
    upsell_product_name: 'Water Bottle',
    upsell_price: 399,
    order_status: 'Completed',
    ai_assisted: true,
    created_at: '2026-08-23T09:30:00Z'
  },
  {
    id: 'SP-1003',
    customer_name: 'Rohan Mehta',
    customer_email: 'rohan.m@example.com',
    product_name: 'Puma Velocity',
    product_price: 3999,
    upsell_product_name: 'Running Socks',
    upsell_price: 499,
    order_status: 'Completed',
    ai_assisted: true,
    created_at: '2026-08-22T16:45:00Z'
  },
  {
    id: 'SP-1004',
    customer_name: 'Sneha Verma',
    customer_email: 'sneha.v@example.com',
    product_name: 'Garmin Forerunner 55',
    product_price: 14999,
    upsell_product_name: 'Silicone Replacement Band',
    upsell_price: 699,
    order_status: 'Completed',
    ai_assisted: true,
    created_at: '2026-08-22T14:20:00Z'
  },
  {
    id: 'SP-1005',
    customer_name: 'Vikas Rao',
    customer_email: 'vikas.r@example.com',
    product_name: 'Asics Gel-Nimbus 25',
    product_price: 5299,
    upsell_product_name: null,
    upsell_price: 0,
    order_status: 'Completed',
    ai_assisted: false,
    created_at: '2026-08-21T11:10:00Z'
  }
];
