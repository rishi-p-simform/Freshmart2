import type { Order } from '../../../types';

export interface OrderHistoryTab {
  id: string;
  title: string;
}

export interface OrderHistoryHookReturnType {
  orders: Order[];
  loading: boolean;
  refreshing: boolean;
  loadingMore: boolean;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  loadInitial: () => void;
  loadMore: () => void;
  refresh: () => void;
  reorder: (order: Order) => Promise<any>;
}
