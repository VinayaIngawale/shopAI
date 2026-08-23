import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';

export interface AISearchResult {
  messageText: string;
  matchedProducts: Product[];
  recommendedUpsells: Product[];
}

function extractBudget(query: string): number | null {
  const budgetMatch = query.match(/(?:under|below|less than|within|upto|up to)\s*(?:₹|rs\.?\s*)?([\d,]+)/i)
    || query.match(/(?:₹|rs\.?\s*)([\d,]+)/i);

  if (!budgetMatch) return null;

  const budget = Number(budgetMatch[1].replace(/,/g, ''));
  return Number.isFinite(budget) ? budget : null;
}

export async function processAICustomerQuery(userPrompt: string): Promise<AISearchResult> {
  const queryLower = userPrompt.toLowerCase();
  const budget = extractBudget(userPrompt);

  // Match running shoe queries while still honoring the requested budget.
  if (queryLower.includes('running') || queryLower.includes('shoes') || queryLower.includes('5000') || queryLower.includes('5,000')) {
    const runningShoes = INITIAL_PRODUCTS
      .filter(product => !product.isUpsell && product.category === 'Running Shoes')
      .filter(product => budget === null || product.price <= budget);

    if (runningShoes.length === 0) {
      return {
        messageText: 'Item is not found under your requested budget.',
        matchedProducts: [],
        recommendedUpsells: []
      };
    }

    const upsells = [
      INITIAL_PRODUCTS.find(p => p.id === 'upsell-socks-1')!,
      INITIAL_PRODUCTS.find(p => p.id === 'upsell-bottle-1')!
    ].filter(Boolean);

    return {
      messageText: 'I found these products based on your budget and requirements.',
      matchedProducts: runningShoes,
      recommendedUpsells: upsells
    };
  }

  // Dynamic Keyword Search across synthetic product catalog
  let matches = INITIAL_PRODUCTS.filter(p => !p.isUpsell).filter(p => {
    const matchesBudget = budget === null || p.price <= budget;
    const matchesKeyword = queryLower.split(' ').some(term =>
      term.length > 2 && (
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      )
    );
    return matchesBudget && matchesKeyword;
  });

  // Only use the general fallback when no budget constraint was requested.
  if (matches.length === 0 && budget === null) {
    matches = INITIAL_PRODUCTS.filter(p => !p.isUpsell).slice(0, 3);
  }

  const defaultUpsells = INITIAL_PRODUCTS.filter(p => p.isUpsell).slice(0, 2);

  if (matches.length === 0) {
    return {
      messageText: 'Item is not found under your requested budget.',
      matchedProducts: [],
      recommendedUpsells: []
    };
  }

  return {
    messageText: `I found ${matches.length} products based on your budget and requirements.`,
    matchedProducts: matches.slice(0, 3),
    recommendedUpsells: defaultUpsells
  };
}

export function getUpsellForProduct(product: Product): Product[] {
  if (product.category === 'Running Shoes' || product.id.includes('adidas') || product.id.includes('nike') || product.id.includes('puma')) {
    return [
      INITIAL_PRODUCTS.find(p => p.id === 'upsell-socks-1') || INITIAL_PRODUCTS[3],
      INITIAL_PRODUCTS.find(p => p.id === 'upsell-bottle-1') || INITIAL_PRODUCTS[4]
    ];
  }
  return INITIAL_PRODUCTS.filter(p => p.isUpsell).slice(0, 2);
}
