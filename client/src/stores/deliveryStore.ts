import create from 'zustand';
import { deliveryService } from '../services/deliveryService';

interface DeliveryState {
  deliveries: any[];
  addDelivery: (delivery: any) => void;
  fetchDeliveries: () => void;
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
  deliveries: [],
  addDelivery: async (delivery) => {
    const newDelivery = await deliveryService.addDelivery(delivery);
    set((state) => ({ deliveries: [...state.deliveries, newDelivery] }));
  },
  fetchDeliveries: async () => {
    const deliveries = await deliveryService.getDeliveries();
    set({ deliveries });
  },
}));
