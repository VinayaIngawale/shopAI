import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';

export interface AISearchResult {
  messageText: string;
  matchedProducts: Product[];
  recommendedUpsells: Product[];
}

function normalizeForMatch(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function levenshteinDistance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

function getSimilarityScore(a: string, b: string): number {
  const left = normalizeForMatch(a);
  const right = normalizeForMatch(b);

  if (!left || !right) return 0;
  if (left === right) return 1;
  if (left.includes(right) || right.includes(left)) return 0.9;

  const termSignature = left.replace(/[aeiou]/g, '');
  const wordSignature = right.replace(/[aeiou]/g, '');
  if (termSignature === wordSignature) return 0.86;
  if (wordSignature.includes(termSignature) || termSignature.includes(wordSignature)) return 0.8;

  const maxLen = Math.max(left.length, right.length);
  if (maxLen === 0) return 0;

  const distance = levenshteinDistance(left, right);
  const score = 1 - distance / maxLen;
  return score > 0 ? score : 0;
}

function hasApproximateNameMatch(term: string, productName: string): boolean {
  const normalizedTerm = normalizeForMatch(term);
  if (!normalizedTerm) return false;

  const candidateWords = productName
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return candidateWords.some((word) => {
    const score = getSimilarityScore(normalizedTerm, normalizeForMatch(word));
    return score >= 0.7;
  });
}

function getProductMatchScore(queryText: string, product: Product): number {
  const queryTerms = queryText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((term) => term.length > 1 && !['i', 'need', 'show', 'me', 'find', 'the', 'a', 'an', 'for', 'under', 'below', 'less', 'than', 'with', 'within', 'budget', 'and', 'or', 'of', 'my', 'please', 'products', 'product', 'items', 'item', 'looking', 'want', 'search', 'by', 'name'].includes(term));

  const searchableText = `${product.name} ${product.category} ${product.description}`.toLowerCase();

  let best = 0;

  queryTerms.forEach((term) => {
    const termScore = Math.max(
      getSimilarityScore(term, product.name),
      ...searchableText.split(/[^a-z0-9]+/).filter(Boolean).map((word) => getSimilarityScore(term, word))
    );

    if (termScore > best) best = termScore;
  });

  return best;
}

function extractBudget(query: string): number | null {
  const budgetMatch =
    query.match(
      /(?:under|below|less than|within|upto|up to)\s*(?:₹|rs\.?\s*)?([\d,]+)/i
    ) ||
    query.match(/(?:₹|rs\.?\s*)([\d,]+)/i);

  if (!budgetMatch) return null;

  const budget = Number(budgetMatch[1].replace(/,/g, ''));

  return Number.isFinite(budget) ? budget : null;
}

export async function processAICustomerQuery(
  userPrompt: string
): Promise<AISearchResult> {
  const queryLower = userPrompt.toLowerCase();
  const budget = extractBudget(userPrompt);

  const stopWords = new Set([
    'i',
    'need',
    'show',
    'me',
    'find',
    'the',
    'a',
    'an',
    'for',
    'under',
    'below',
    'less',
    'than',
    'with',
    'within',
    'budget',
    'and',
    'or',
    'of',
    'my',
    'please',
    'products',
    'product',
    'items',
    'item',
    'looking',
    'want',
    'search',
    'by',
    'name',
  ]);

  const normalizedPrompt = queryLower
    .replace(/[#]+/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();

  const aliasMap: Record<string, string[]> = {
    phne: ['phone', 'iphone'],
    lptop: ['laptop'],
    lapop: ['laptop'],
    tddy: ['teddy'],
    tedy: ['teddy'],
    shose: ['shoes'],
    shoe: ['shoes'],
    sunglases: ['sunglasses'],
    sunglass: ['sunglasses'],
    moble: ['mobile'],
    phnoe: ['phone'],
    lapto: ['laptop'],
  };

  const expandedPrompt = normalizedPrompt
    .split(/\s+/)
    .flatMap((term) => {
      const key = normalizeForMatch(term);
      const matches = aliasMap[key] ?? [];
      return [term, ...matches];
    })
    .join(' ');

  const queryTerms = expandedPrompt
    .split(/\s+/)
    .filter((term) => term.length > 2 && !stopWords.has(term));

  const gymKeywords = [
    'gym',
    'fitness',
    'workout',
    'training',
    'exercise',
    'strength',
    'muscle',
  ];

  const laptopKeywords = ['laptop', 'notebook', 'pc', 'ultrabook'];
  const mobileKeywords = ['mobile', 'phone', 'smartphone', 'android', 'iphone', 'galaxy'];
  const electricalKeywords = ['electrical', 'electronics', 'charger', 'power bank', 'speaker', 'bulb', 'lamp', 'adapter', 'fan', 'smart home', 'tv', 'toothbrush', 'hair dryer', 'rice cooker', 'induction', 'desk lamp'];
  const accessoryKeywords = ['accessory', 'accessories', 'bag', 'backpack', 'case', 'sunglasses', 'cable', 'hub', 'organizer', 'travel', 'charger'];
  const homeApplianceKeywords = ['home appliance', 'home appliances', 'appliance', 'fan', 'heater', 'purifier', 'air fryer', 'mixer', 'grinder', 'kitchen'];
  const beautyKeywords = ['beauty', 'beauty products', 'cosmetic', 'cosmetics', 'skincare', 'serum', 'foundation', 'lipstick', 'makeup', 'moisturizer', 'mascara', 'perfume', 'fragrance'];
  const furnitureKeywords = ['furniture', 'chair', 'table', 'sofa', 'desk', 'wardrobe', 'cabinet', 'shelf', 'bed'];
  const toyKeywords = ['toy', 'toys', 'plaything', 'stuffed animal', 'remote control car', 'blocks', 'teddy', 'plush', 'bear', 'puzzle', 'board game', 'train', 'robot'];
  const giftKeywords = ['gift', 'gifts', 'gift item', 'gift items', 'present', 'hamper', 'gift box', 'wrapped gift', 'bouquet', 'chocolate', 'mug', 'watch'];

  const queryLowerExpanded = expandedPrompt.toLowerCase();

  const isGymQuery =
    queryLowerExpanded.includes('gym') ||
    gymKeywords.some((keyword) => queryLowerExpanded.includes(keyword));

  const isLaptopQuery =
    laptopKeywords.some((keyword) => queryLowerExpanded.includes(keyword));

  const isMobileQuery =
    mobileKeywords.some((keyword) => queryLowerExpanded.includes(keyword));

  const isElectricalQuery =
    electricalKeywords.some((keyword) => queryLowerExpanded.includes(keyword));

  const isAccessoryQuery =
    accessoryKeywords.some((keyword) => queryLowerExpanded.includes(keyword));

  const isHomeApplianceQuery =
    homeApplianceKeywords.some((keyword) => queryLowerExpanded.includes(keyword));

  const isBeautyQuery =
    beautyKeywords.some((keyword) => queryLowerExpanded.includes(keyword));

  const isFurnitureQuery =
    furnitureKeywords.some((keyword) => queryLowerExpanded.includes(keyword));

  const isToyQuery =
    toyKeywords.some((keyword) => queryLowerExpanded.includes(keyword));

  const isGiftQuery =
    giftKeywords.some((keyword) => queryLowerExpanded.includes(keyword));

  let matches = INITIAL_PRODUCTS
    .filter((p) => !p.isUpsell)
    .filter((p) => {
      const matchesBudget =
        budget === null || p.price <= budget;

      const normalizedProductName = p.name.toLowerCase();

      const searchableText =
        `${normalizedProductName} ${p.category} ${p.description}`.toLowerCase();

      const nameMatches =
        normalizedPrompt.includes(normalizedProductName) ||
        normalizedProductName.includes(normalizedPrompt) ||
        (queryTerms.length > 0 &&
          queryTerms.every((term) =>
            normalizedProductName.includes(term) || hasApproximateNameMatch(term, p.name)
          ));

      const keywordMatches =
        queryTerms.length === 0 ||
        queryTerms.some((term) =>
          searchableText.includes(term) || hasApproximateNameMatch(term, p.name)
        );

      const fuzzyMatchScore = getProductMatchScore(normalizedPrompt, p);
      const fuzzyMatch = fuzzyMatchScore >= 0.69;

      const gymCategoryMatches =
        isGymQuery &&
        (
          p.category.toLowerCase().includes('gym') ||
          p.category.toLowerCase().includes('fitness') ||
          p.category.toLowerCase().includes('nutrition') ||
          searchableText.includes('gym') ||
          searchableText.includes('workout') ||
          searchableText.includes('fitness')
        );

      const laptopCategoryMatches =
        isLaptopQuery &&
        (
          p.category.toLowerCase().includes('laptop') ||
          searchableText.includes('laptop') ||
          searchableText.includes('notebook') ||
          searchableText.includes('pc')
        );

      const mobileCategoryMatches =
        isMobileQuery &&
        (
          p.category.toLowerCase().includes('mobile') ||
          searchableText.includes('mobile') ||
          searchableText.includes('phone') ||
          searchableText.includes('smartphone') ||
          searchableText.includes('android') ||
          searchableText.includes('iphone')
        );

      const electricalCategoryMatches =
        isElectricalQuery &&
        (
          p.category.toLowerCase().includes('electrical') ||
          p.category.toLowerCase().includes('electronics') ||
          searchableText.includes('charger') ||
          searchableText.includes('speaker') ||
          searchableText.includes('power bank') ||
          searchableText.includes('bulb') ||
          searchableText.includes('adapter') ||
          searchableText.includes('smart home')
          || searchableText.includes('tv')
          || searchableText.includes('toothbrush')
          || searchableText.includes('hair dryer')
          || searchableText.includes('rice cooker')
          || searchableText.includes('induction')
        );

      const accessoryCategoryMatches =
        isAccessoryQuery &&
        (
          p.category.toLowerCase().includes('accessory') ||
          searchableText.includes('bag') ||
          searchableText.includes('backpack') ||
          searchableText.includes('case') ||
          searchableText.includes('sunglasses') ||
          searchableText.includes('cable') ||
          searchableText.includes('hub') ||
          searchableText.includes('organizer')
        );

      const homeApplianceCategoryMatches =
        isHomeApplianceQuery &&
        (
          p.category.toLowerCase().includes('home appliance') ||
          searchableText.includes('air fryer') ||
          searchableText.includes('purifier') ||
          searchableText.includes('heater') ||
          searchableText.includes('fan') ||
          searchableText.includes('mixer') ||
          searchableText.includes('grinder') ||
          searchableText.includes('kitchen')
        );

      const beautyCategoryMatches =
        isBeautyQuery &&
        (
          p.category.toLowerCase().includes('beauty') ||
          searchableText.includes('serum') ||
          searchableText.includes('foundation') ||
          searchableText.includes('lipstick') ||
          searchableText.includes('makeup') ||
          searchableText.includes('skincare') ||
          searchableText.includes('cosmetic')
          || searchableText.includes('moisturizer')
          || searchableText.includes('mascara')
          || searchableText.includes('perfume')
        );

      const furnitureCategoryMatches =
        isFurnitureQuery &&
        (
          p.category.toLowerCase().includes('furniture') ||
          searchableText.includes('chair') ||
          searchableText.includes('table') ||
          searchableText.includes('sofa') ||
          searchableText.includes('desk') ||
          searchableText.includes('wardrobe') ||
          searchableText.includes('cabinet') ||
          searchableText.includes('shelf') ||
          searchableText.includes('bed')
        );

      const toyCategoryMatches =
        isToyQuery &&
        (
          p.category.toLowerCase().includes('toy') ||
          searchableText.includes('toy') ||
          searchableText.includes('blocks') ||
          searchableText.includes('teddy') ||
          searchableText.includes('plush') ||
          searchableText.includes('bear') ||
          searchableText.includes('stuffed') ||
          searchableText.includes('car')
          || searchableText.includes('puzzle')
          || searchableText.includes('game')
          || searchableText.includes('train')
          || searchableText.includes('robot')
        );

      const giftCategoryMatches =
        isGiftQuery &&
        (
          p.category.toLowerCase().includes('gift') ||
          searchableText.includes('gift') ||
          searchableText.includes('present') ||
          searchableText.includes('hamper') ||
          searchableText.includes('candle') ||
          searchableText.includes('frame')
          || searchableText.includes('bouquet')
          || searchableText.includes('chocolate')
          || searchableText.includes('mug')
          || searchableText.includes('watch')
        );

      const exactCategoryMatch =
        gymCategoryMatches || laptopCategoryMatches || mobileCategoryMatches || electricalCategoryMatches || accessoryCategoryMatches || homeApplianceCategoryMatches || beautyCategoryMatches || furnitureCategoryMatches || toyCategoryMatches || giftCategoryMatches;

      return (
        matchesBudget &&
        (exactCategoryMatch || nameMatches || keywordMatches || fuzzyMatch)
      );
    });

  // Special handling for running shoe queries
  if (
    queryLower.includes('running') ||
    queryLower.includes('shoes') ||
    queryLower.includes('5000') ||
    queryLower.includes('5,000')
  ) {
    const runningShoes = INITIAL_PRODUCTS
      .filter(
        (product) =>
          !product.isUpsell &&
          product.category === 'Running Shoes'
      )
      .filter(
        (product) =>
          budget === null || product.price <= budget
      );

    if (runningShoes.length > 0) {
      matches = runningShoes;
    }
  }

  if (isLaptopQuery || queryLower.includes('laptop') || queryLower.includes('notebook') || queryLower.includes('pc')) {
    const laptops = INITIAL_PRODUCTS
      .filter((product) => !product.isUpsell && product.category === 'Laptops')
      .filter((product) => budget === null || product.price <= budget);

    if (laptops.length > 0) {
      matches = laptops;
    }
  }

  if (isMobileQuery || queryLower.includes('mobile') || queryLower.includes('phone') || queryLower.includes('smartphone')) {
    const mobiles = INITIAL_PRODUCTS
      .filter((product) => !product.isUpsell && product.category === 'Mobiles')
      .filter((product) => budget === null || product.price <= budget);

    if (mobiles.length > 0) {
      matches = mobiles;
    }
  }

  if (isElectricalQuery || queryLower.includes('electrical') || queryLower.includes('charger') || queryLower.includes('speaker') || queryLower.includes('power bank')) {
    const electricalItems = INITIAL_PRODUCTS
      .filter((product) => !product.isUpsell && product.category === 'Electrical')
      .filter((product) => budget === null || product.price <= budget);

    if (electricalItems.length > 0) {
      matches = electricalItems;
    }
  }

  if (isAccessoryQuery || queryLower.includes('accessory') || queryLower.includes('accessories') || queryLower.includes('bag') || queryLower.includes('charger')) {
    const accessories = INITIAL_PRODUCTS
      .filter((product) => !product.isUpsell && product.category === 'Accessories')
      .filter((product) => budget === null || product.price <= budget);

    if (accessories.length > 0) {
      matches = accessories;
    }
  }

  if (isHomeApplianceQuery || queryLower.includes('appliance') || queryLower.includes('air fryer') || queryLower.includes('purifier') || queryLower.includes('heater') || queryLower.includes('fan')) {
    const homeAppliances = INITIAL_PRODUCTS
      .filter((product) => !product.isUpsell && product.category === 'Home Appliances')
      .filter((product) => budget === null || product.price <= budget);

    if (homeAppliances.length > 0) {
      matches = homeAppliances;
    }
  }

  if (isBeautyQuery || queryLower.includes('beauty') || queryLower.includes('cosmetic') || queryLower.includes('serum') || queryLower.includes('foundation') || queryLower.includes('lipstick')) {
    const beautyProducts = INITIAL_PRODUCTS
      .filter((product) => !product.isUpsell && product.category === 'Beauty Products')
      .filter((product) => budget === null || product.price <= budget);

    if (beautyProducts.length > 0) {
      matches = beautyProducts;
    }
  }

  if (isFurnitureQuery || queryLower.includes('furniture') || queryLower.includes('chair') || queryLower.includes('table') || queryLower.includes('sofa') || queryLower.includes('wardrobe')) {
    const furnitureProducts = INITIAL_PRODUCTS
      .filter((product) => !product.isUpsell && product.category === 'Furniture')
      .filter((product) => budget === null || product.price <= budget);

    if (furnitureProducts.length > 0) {
      matches = furnitureProducts;
    }
  }

  if (isToyQuery || queryLower.includes('toy') || queryLower.includes('toys') || queryLower.includes('blocks') || queryLower.includes('teddy')) {
    const toyProducts = INITIAL_PRODUCTS
      .filter((product) => !product.isUpsell && product.category === 'Toys')
      .filter((product) => budget === null || product.price <= budget);

    if (toyProducts.length > 0) {
      matches = toyProducts;
    }
  }

  if (isGiftQuery || queryLower.includes('gift') || queryLower.includes('gifts') || queryLower.includes('present') || queryLower.includes('hamper')) {
    const giftProducts = INITIAL_PRODUCTS
      .filter((product) => !product.isUpsell && product.category === 'Gift Items')
      .filter((product) => budget === null || product.price <= budget);

    if (giftProducts.length > 0) {
      matches = giftProducts;
    }
  }

  // General fallback only for completely empty input; otherwise return a true not-found.
  if (matches.length === 0 && budget === null && normalizedPrompt.length === 0) {
    matches = INITIAL_PRODUCTS
      .filter((p) => !p.isUpsell)
      .slice(0, 3);
  }

  const defaultUpsells = INITIAL_PRODUCTS
    .filter((p) => p.isUpsell)
    .slice(0, 2);

  if (matches.length === 0) {
    const noMatchMessage =
      budget !== null
        ? `Sorry, I could not find any items under your budget of ₹${budget.toLocaleString(
            'en-IN'
          )}.`
        : 'Sorry, I could not find any matching products for your request.';

    return {
      messageText: noMatchMessage,
      matchedProducts: [],
      recommendedUpsells: [],
    };
  }

  return {
    messageText: `I found ${matches.length} products based on your budget and requirements.`,
    matchedProducts: matches.slice(0, 3),
    recommendedUpsells: defaultUpsells,
  };
}

export function getUpsellForProduct(
  product: Product
): Product[] {
  const candidateIds = product.suggestedUpsells || [];

  const matchedUpsells = candidateIds
    .map((id) => INITIAL_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  if (matchedUpsells.length >= 2) {
    return matchedUpsells.slice(0, 2);
  }

  const fallbackIds = {
    'Running Shoes': ['upsell-socks-1', 'upsell-bottle-1'],
    'Laptops': ['upsell-laptop-bag-1', 'upsell-mouse-1'],
    'Mobiles': ['upsell-phone-case-1', 'upsell-charger-1'],
    'Fitness Wearables': ['upsell-strap-1', 'upsell-armband-1'],
    'Accessories': ['upsell-case-1', 'upsell-usb-cable-1'],
    'Electrical': ['upsell-smart-plug-1', 'upsell-usb-cable-1'],
    'Home Appliances': ['upsell-filter-1', 'upsell-air-freshener-1'],
    'Beauty Products': ['upsell-skin-mist-1', 'upsell-makeup-brush-1'],
    'Furniture': ['upsell-cushion-set-1', 'upsell-desk-mat-1'],
    'Toys': ['upsell-toy-set-1', 'upsell-gift-box-1'],
    'Gift Items': ['upsell-card-1', 'upsell-wrap-1'],
    'Gym': ['upsell-gym-bottle-1', 'upsell-dumbbell-1'],
    'Nutrition': ['upsell-gel-1', 'upsell-towel-1']
  }[product.category] || ['upsell-case-1', 'upsell-usb-cable-1'];

  const fallbackUpsells = fallbackIds
    .map((id) => INITIAL_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return fallbackUpsells.length > 0 ? fallbackUpsells.slice(0, 2) : INITIAL_PRODUCTS.filter((p) => p.isUpsell).slice(0, 2);
}