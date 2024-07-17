const API_URL = 'https://api.example.com'; // Replace with your actual API URL

interface Order {
  id: string;
  product: string;
  quantity: number;
  // Add other fields as needed
}

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return response.json();
  },
  addOrder: async (order: Order): Promise<Order> => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error('Failed to add order');
    }
    return response.json();
  },
};
