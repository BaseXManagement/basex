const API_URL = 'https://api.example.com'; // Replace with your actual API URL

interface Delivery {
  id: string;
  date: string;
  status: string;
  // Add other fields as needed
}

export const deliveryService = {
  getDeliveries: async (): Promise<Delivery[]> => {
    const response = await fetch(`${API_URL}/deliveries`);
    if (!response.ok) {
      throw new Error('Failed to fetch deliveries');
    }
    return response.json();
  },
  addDelivery: async (delivery: Delivery): Promise<Delivery> => {
    const response = await fetch(`${API_URL}/deliveries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(delivery),
    });
    if (!response.ok) {
      throw new Error('Failed to add delivery');
    }
    return response.json();
  },
};
