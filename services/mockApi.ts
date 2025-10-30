interface OrderDetails {
  orderNumber: string;
  status: 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'NOT_FOUND';
  estimatedDelivery?: string;
  items?: { name: string; quantity: number }[];
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
