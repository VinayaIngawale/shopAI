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

<<<<<<< HEAD
  const stopWords = new Set([
    'i', 'need', 'show', 'me', 'find', 'the', 'a', 'an', 'for', 'under', 'below',
    'less', 'than', 'with', 'within', 'budget', 'and', 'or', 'of', 'my', 'please',
    'products', 'product', 'items', 'item', 'looking', 'want', 'search', 'by', 'name'
  ]);
=======
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
>>>>>>> 86477a6c077573da535d9d546c2470fd9222c65e

  const normalizedPrompt = queryLower
    .replace(/[#]+/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();

  const queryTerms = normalizedPrompt
    .split(/\s+/)
    .filter(term => term.length > 2 && !stopWords.has(term));

  const gymKeywords = ['gym', 'fitness', 'workout', 'training', 'exercise', 'strength', 'muscle'];
  const isGymQuery = queryLower.includes('gym') || gymKeywords.some(keyword => queryLower.includes(keyword));

  const matches = INITIAL_PRODUCTS.filter(p => !p.isUpsell).filter(p => {
    const matchesBudget = budget === null || p.price <= budget;
    const normalizedProductName = p.name.toLowerCase();
    const searchableText = `${normalizedProductName} ${p.category} ${p.description}`.toLowerCase();

    const nameMatches =
      normalizedPrompt.includes(normalizedProductName) ||
      normalizedProductName.includes(normalizedPrompt) ||
      (queryTerms.length > 0 && queryTerms.every(term => normalizedProductName.includes(term)));

    const keywordMatches = queryTerms.length === 0 || queryTerms.some(term => searchableText.includes(term));

    const gymCategoryMatches = isGymQuery && (
      p.category.toLowerCase().includes('gym') ||
      p.category.toLowerCase().includes('fitness') ||
      p.category.toLowerCase().includes('apparel') ||
      p.category.toLowerCase().includes('recovery') ||
      p.category.toLowerCase().includes('nutrition') ||
      searchableText.includes('gym') ||
      searchableText.includes('workout') ||
      searchableText.includes('fitness')
    );

    return matchesBudget && (nameMatches || keywordMatches || gymCategoryMatches);
  });

<<<<<<< HEAD
  const defaultUpsells = INITIAL_PRODUCTS.filter(p => p.isUpsell).slice(0, 2);

  if (matches.length === 0) {
    const noMatchMessage = budget !== null
      ? `Sorry, I could not find any items under your budget of ₹${budget.toLocaleString('en-IN')}.`
      : 'Sorry, I could not find any matching products for your request.';

    return {
      messageText: noMatchMessage,
=======
  // Only use the general fallback when no budget constraint was requested.
  if (matches.length === 0 && budget === null) {
    matches = INITIAL_PRODUCTS.filter(p => !p.isUpsell).slice(0, 3);
  }

  const defaultUpsells = INITIAL_PRODUCTS.filter(p => p.isUpsell).slice(0, 2);

  if (matches.length === 0) {
    return {
      messageText: 'Item is not found under your requested budget.',
>>>>>>> 86477a6c077573da535d9d546c2470fd9222c65e
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
