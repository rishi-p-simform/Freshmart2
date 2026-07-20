/**
 * Represents the response from an API request.
 */
export interface ErrorResponse {
  message: string;
  category?: string; // 'VALIDATION' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'SERVER' | 'NETWORK' | 'TIMEOUT' | 'CANCEL' | 'UNKNOWN'
  code?: string;
  statusCode?: number;
  details?: Record<string, string | string[]>;
  raw?: any;
}
