export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar_url: string | null;
  role: string;
  is_active: boolean;
  onboarding_completed: boolean;
  created_at: string;
  message?: string;
}

export interface UserState {
  profile: User | null;
  loading: boolean;
  error: string | null;
}

export interface DeleteAccountResponse {
  success: boolean;
  data: {
    message: string;
  };
  message?: string;
}
