import create from 'zustand';
import { orderService } from '../services/orderService';

interface OrderState {
  orders: any[];
  addOrder: (order: any) => void;
  fetchOrders: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: async (order) => {
    const newOrder = await orderService.addOrder(order);
    set((state) => ({ orders: [...state.orders, newOrder] }));
  },
  fetchOrders: async () => {
    const orders = await orderService.getOrders();
    set({ orders });
  },
}));
