# 🛍️ ShopPilot AI

### AI-Powered E-Commerce & Business Growth Platform

ShopPilot AI is a modern AI-powered e-commerce platform designed to make online shopping more intelligent while helping sellers understand and improve their business performance.

The platform combines **AI-powered product recommendations, online shopping, cart management, sales tracking, and business growth analytics** into a single application.

---

## 🚀 Project Overview

Traditional e-commerce platforms mainly focus on displaying products and completing purchases. ShopPilot AI goes one step further by using Artificial Intelligence to create a more personalized shopping experience and provide useful insights for sellers.

The application provides two major experiences:

### 🛒 For Customers

* Browse products and categories
* Explore an AI-powered shopping experience
* Add products to cart
* Receive AI-based product/upselling recommendations
* Complete an order
* View order success confirmation

### 📊 For Sellers

* View business growth statistics
* Track sales
* Add new sales
* View sales history
* Analyze revenue and performance
* Use dashboards to understand business growth

---

## ✨ Key Features

### 🤖 AI-Powered Recommendations

ShopPilot AI provides intelligent product recommendations to encourage customers to discover complementary products and improve their shopping experience.

The project integrates the **Google Generative AI SDK** for AI functionality.

---

### 🛍️ Smart Shopping

Customers can browse available products through a clean and responsive shopping interface.

Features include:

* Product browsing
* Category-based navigation
* Product cards
* Product pricing
* Add-to-cart functionality
* AI-powered upselling
* Shopping cart management

---

### 🧠 AI Upselling

When a customer selects a product, the application can present an **AI-powered upsell/recommendation interface** suggesting additional products.

This helps:

* Improve product discovery
* Increase average order value
* Provide personalized shopping suggestions

---

### 🛒 Shopping Cart

The application includes a global shopping cart that allows users to:

* Add products
* View selected products
* Manage cart items
* Review their order
* Proceed through the order flow

---

### 📈 Business Growth Dashboard

The seller/business side includes a growth dashboard for monitoring important business information.

The dashboard provides:

* Revenue information
* Sales statistics
* Growth indicators
* Sales visualization
* Recent business activity

Charts and data visualization are implemented using **Recharts**.

---

### 💰 Sales Management

ShopPilot AI provides dedicated views for business sales management:

* Add Sale
* Sales History
* Revenue tracking
* Sales records

This allows sellers to maintain a better understanding of their business performance.

---

### 📂 Category Browser

Products can be explored through category-based navigation, making it easier for customers to find relevant products.

---

## 🏗️ Application Structure

The main application is organized into reusable React components.

```text
shopAI/
│
├── src/
│   ├── components/
│   │   ├── Navbar
│   │   ├── HomePage
│   │   ├── ShoppingPage
│   │   ├── GrowthDashboard
│   │   ├── AddSaleView
│   │   ├── SalesHistoryView
│   │   ├── CategoryBrowser
│   │   ├── UpsellModal
│   │   ├── CartModal
│   │   ├── OrderSuccessModal
│   │   └── DemoOverlay
│   │
│   ├── context/
│   │   └── ShopContext
│   │
│   ├── data/
│   │
│   ├── lib/
│   │   └── supabase.ts
│   │
│   ├── services/
│   │   └── aiService.ts
│   │
│   ├── types/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── dist/
├── package.json
├── package-lock.json
├── supabase_schema.sql
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── index.html
```

The repository's `src` directory contains separate `components`, `context`, `data`, `lib`, `services`, and `types` sections, along with the main application files.

---

## 🛠️ Tech Stack

| Technology               | Purpose                           |
| ------------------------ | --------------------------------- |
| **React 18**             | Frontend UI development           |
| **TypeScript**           | Type-safe application development |
| **Vite**                 | Development server and build tool |
| **Tailwind CSS**         | Responsive UI styling             |
| **Supabase**             | Database/backend services         |
| **Google Generative AI** | AI-powered features               |
| **Recharts**             | Business charts and analytics     |
| **Lucide React**         | UI icons                          |
| **React Context API**    | Application state management      |

These technologies are reflected in the project's `package.json` dependencies and development dependencies.

---

## 🧩 Main Application Modules

### 1. Home Page

The home page introduces the ShopPilot AI platform and provides navigation to the shopping and business features.

---

### 2. AI Shopping

The AI shopping section provides the customer-facing shopping experience.

Users can:

```text
Browse Products
      ↓
Select Product
      ↓
Add to Cart
      ↓
AI Recommendation
      ↓
Review Cart
      ↓
Place Order
```

---

### 3. Growth Dashboard

The Growth Dashboard is designed for sellers/business owners.

```text
Sales Data
    ↓
Business Analytics
    ↓
Revenue Visualization
    ↓
Growth Insights
```

---

### 4. Add Sale

Sellers can record new sales through the Add Sale interface.

---

### 5. Sales History

The Sales History section provides a record of previously entered sales.

---

### 6. Category Browser

The Category Browser allows users to explore products according to their categories.

---

### 7. Cart & Order System

The application contains dedicated modal components for:

* Shopping cart
* AI upselling
* Order success

The main `App.tsx` integrates these global modals with the application.

---

## 🗄️ Database

The project contains a `supabase_schema.sql` file for the application's Supabase database structure.

Supabase is accessed through:

```text
src/lib/supabase.ts
```

The project therefore separates database connectivity from the main UI components.

---

## 🤖 AI Architecture

The AI functionality is separated into its own service:

```text
src/services/aiService.ts
```

This keeps AI-related logic separate from the user-interface components.

The project uses Google's Generative AI SDK:

```text
@google/generative-ai
```

as defined in the project's dependencies.

---

## ⚙️ Installation

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/VinayaIngawale/shopAI.git
```

### 2. Navigate to the Project

```bash
cd shopAI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Vite will start the development server and provide a local URL.

---

## 🏭 Production Build

To create a production build:

```bash
npm run build
```

The project runs TypeScript checking followed by the Vite production build.

To preview the production build:

```bash
npm run preview
```

---

## 🔐 Environment Variables

If your local configuration requires Supabase or Google Generative AI credentials, create a `.env` file in the project root.

Example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

> Never commit private API keys or secret credentials to GitHub.

---

## 📱 User Flow

```text
                    ┌─────────────────┐
                    │   ShopPilot AI  │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
       ┌──────▼──────┐              ┌──────▼──────┐
       │   Customer  │              │    Seller   │
       │   Shopping  │              │  Dashboard  │
       └──────┬──────┘              └──────┬──────┘
              │                             │
       Browse Products               View Analytics
              │                             │
       Product Selection              Add Sales
              │                             │
       AI Recommendation              Sales History
              │                             │
          Add to Cart                  Revenue Data
              │
          Place Order
```

---

## 🎯 Objectives

The main objectives of ShopPilot AI are:

1. Provide a modern e-commerce shopping experience.
2. Use AI to improve product recommendations.
3. Help customers discover relevant products.
4. Provide sellers with business performance insights.
5. Combine shopping and business analytics in one platform.
6. Build a responsive and user-friendly interface.

---

## 🔮 Future Enhancements

Possible future improvements include:

* User authentication
* Personalized recommendations based on purchase history
* AI chatbot for shopping assistance
* Advanced sales forecasting
* Inventory management
* Payment gateway integration
* Order tracking
* Seller authentication and roles
* Real-time analytics
* Product review and rating system
* Mobile application
* AI-based demand prediction

---

## 📸 Screenshots

Add screenshots of the application here.

Example:

```markdown
## Home Page

![Home Page]<img width="1582" height="890" alt="home png" src="https://github.com/user-attachments/assets/883cad05-31a1-4a33-b457-391e22017c26" />


## AI Shopping

![AI Shopping]<img width="1382" height="905" alt="shopping png" src="https://github.com/user-attachments/assets/5ab0aba5-b8ba-4682-8266-2406e259d1a3" />


## Seller Dashboard

![Dashboard]<img width="1510" height="910" alt="dashboard png" src="https://github.com/user-attachments/assets/9da3e7f7-23b1-4170-8bdf-6dce7a137057" />


## Shopping Cart

![Shopping Cart]<img width="1601" height="910" alt="cart png" src="https://github.com/user-attachments/assets/4d342aa8-a683-450c-bc2f-22b2038ad760" />

```

---

## 📊 Project Highlights

### Customer Side

✅ AI-powered shopping
✅ Product categories
✅ Product recommendations
✅ Shopping cart
✅ Order flow
✅ Responsive interface

### Seller Side

✅ Growth dashboard
✅ Sales tracking
✅ Sales history
✅ Revenue visualization
✅ Business analytics

### Technical Side

✅ React + TypeScript
✅ Vite
✅ Tailwind CSS
✅ Supabase
✅ Google Generative AI
✅ Recharts
✅ Component-based architecture

---

## 👩‍💻 Author

**Vinaya Ingawale**

GitHub: [VinayaIngawale](https://github.com/VinayaIngawale)

Project Repository: [shopAI](https://github.com/VinayaIngawale/shopAI)

---

## 📄 License

This project is developed for educational and project demonstration purposes.

---

⭐ If you find this project useful, consider giving the repository a star!
