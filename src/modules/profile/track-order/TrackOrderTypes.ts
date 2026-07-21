import type { Order } from '../../../types';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface TrackOrderHookReturnType {
  order: Order | null;
  loading: boolean;
  refreshing: boolean;
  orderIdPrefix: string;
  activeAddress: any;
  homeLocation: LocationCoordinates;
  storeLocation: LocationCoordinates;
  routeCoordinates: LocationCoordinates[];
  openTel: () => Promise<void>;
  openSMS: () => Promise<void>;
  refresh: () => Promise<void>;
}
