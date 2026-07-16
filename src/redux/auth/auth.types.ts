export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  message?: string;
}

export interface SignupResponse {
  success: boolean;
  message?: string;
  data: {
    message: string;
  };
}


export interface VerifySignupResponse {
  success: boolean;
  message?: string;
  data: {
    session: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
      token_type: string;
    };
  };
}

export interface ResendConfirmationResponse {
  success: boolean;
  message?: string;
  data: {
    message: string;
  };
}
