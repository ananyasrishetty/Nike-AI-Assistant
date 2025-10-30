interface OrderDetails {
  orderNumber: string;
  status: 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'NOT_FOUND';
  estimatedDelivery?: string;
  items?: { name: string; quantity: number }[];
}

export interface Product {
    name: string;
    category: string;
    description: string;
    bestFor: string[];
}
  
export interface ProductFinderResult {
    sport: string;
    recommendations: Product[];
}

const mockOrders: Record<string, OrderDetails> = {
  '#NIKE12345': {
    orderNumber: '#NIKE12345',
    status: 'SHIPPED',
    estimatedDelivery: 'June 28, 2024',
    items: [
      { name: 'Nike Air Max Dn', quantity: 1 },
      { name: 'Nike Sportswear Tech Fleece', quantity: 1 },
    ],
  },
  '#NIKE67890': {
    orderNumber: '#NIKE67890',
    status: 'PROCESSING',
    estimatedDelivery: 'July 2, 2024',
    items: [{ name: 'Nike Invincible 3', quantity: 1 }],
  },
  '#NIKE55555': {
    orderNumber: '#NIKE55555',
    status: 'DELIVERED',
    estimatedDelivery: 'June 20, 2024',
    items: [{ name: 'Jordan Tatum 2 "Vortex"', quantity: 1 }],
  },
};

const mockProducts: Record<string, Product[]> = {
    'running': [
      { name: 'Nike Pegasus 41', category: 'Footwear', description: 'A responsive ride with a springy feel, perfect for everyday running.', bestFor: ['Road Running', 'Daily Training'] },
      { name: 'Nike Invincible 3', category: 'Footwear', description: 'Maximum cushioning for a soft and supportive feel on your longest runs.', bestFor: ['Long Distance', 'Recovery Runs'] },
      { name: 'Nike Dri-FIT ADV AeroSwift Running Singlet', category: 'Apparel', description: 'Lightweight and breathable, designed for race day performance.', bestFor: ['Racing', 'Hot Weather'] },
    ],
    'basketball': [
      { name: 'LeBron XXI', category: 'Footwear', description: 'Engineered for power and control on the court, with Zoom Air cushioning.', bestFor: ['Indoor Courts', 'Competitive Play'] },
      { name: 'Nike G.T. Cut 3', category: 'Footwear', description: 'Designed for quick cuts and creating separation from defenders.', bestFor: ['Guards', 'Quick Players'] },
      { name: 'Nike Dri-FIT Elite Basketball Shorts', category: 'Apparel', description: 'Sweat-wicking fabric with a design that allows for full range of motion.', bestFor: ['Practice', 'Games'] },
    ],
    'training': [
       { name: 'Nike Metcon 9', category: 'Footwear', description: 'The gold standard for weight training, offering stability and durability.', bestFor: ['Weightlifting', 'Cross-Training'] },
       { name: 'Nike Pro Dri-FIT Tights', category: 'Apparel', description: 'A supportive base layer that keeps you cool and dry during intense workouts.', bestFor: ['Gym Workouts', 'High-Intensity Training'] },
    ]
};

export const getOrderStatus = async (orderNumber: string): Promise<OrderDetails> => {
  console.log(`Searching for order: ${orderNumber}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const order = mockOrders[orderNumber.toUpperCase()];

  if (order) {
    return order;
  }

  return {
    orderNumber: orderNumber,
    status: 'NOT_FOUND',
  };
};

export const findProduct = async (sport: string): Promise<ProductFinderResult> => {
    console.log(`Searching for products for: ${sport}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const lowercaseSport = sport.toLowerCase();
    const recommendations = mockProducts[lowercaseSport] || [];
  
    return {
        sport: sport,
        recommendations: recommendations,
    };
};