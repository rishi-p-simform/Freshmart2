import { ROUTES } from './NavigationRoutes';

export interface ProfileTab {
  id: number;
  icon: string;
  title: string;
  colorLight: string;
  colorDark: string;
  route?: ROUTES;
}

export const profileTabs: ProfileTab[] = [
  {
    id: 1,
    icon: '👤',
    title: 'Personal Info',
    colorLight: '#EFF6FF',
    colorDark: '#1E293B'
  },
  {
    id: 2,
    icon: '📍',
    title: 'Saved Addresses',
    colorLight: '#FFF7ED',
    colorDark: '#332010',
    route: ROUTES.Location
  },
  {
    id: 3,
    icon: '💳',
    title: 'Payment Methods',
    colorLight: '#F0FDF4',
    colorDark: '#0B291A'
  },
  {
    id: 4,
    icon: '📦',
    title: 'Orders',
    colorLight: '#EFF6FF',
    colorDark: '#1E293B',
    route: ROUTES.Cart
  }
];
