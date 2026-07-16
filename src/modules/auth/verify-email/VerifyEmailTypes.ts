import { RouteProp } from '@react-navigation/native';

export type VerifyEmailRouteParamList = {
  VerifyEmail: { email: string };
};

export type VerifyEmailRouteProp = RouteProp<VerifyEmailRouteParamList, 'VerifyEmail'>;

export interface VerifyEmailHookReturnType {
  code: string;
  setCode: (code: string) => void;
  onSubmit: () => void;
  onResend: () => void;
  onOpenEmail: () => void;
  timer: number;
  isLoading: boolean;
  email: string | undefined;
}
