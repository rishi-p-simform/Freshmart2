import {
  CANCEL_ERROR,
  CLIENT_ERROR,
  CONNECTION_ERROR,
  NETWORK_ERROR,
  SERVER_ERROR,
  TIMEOUT_ERROR,
  type ApiErrorResponse
} from 'apisauce';
import axios from 'axios';
import { Strings } from '../constants';
import type { ErrorResponse } from '../types';
import { APIErrorType, APIErrorCategory } from './APIConfigTypes';

/**
 * Safely extracts error messages from various response payload structures to ensure loose coupling.
 */
export const extractErrorMessage = (data: any, defaultMessage: string): string  => {
  if (!data) return defaultMessage;
  if (typeof data === 'string') return data;

  // 1. Check data.message
  if (data.message) {
    if (typeof data.message === 'string') return data.message;
    if (Array.isArray(data.message) && data.message.length > 0) {
      return data.message.map((m: any) => (typeof m === 'string' ? m : JSON.stringify(m))).join(', ');
    }
  }

  // 2. Check data.error
  if (data.error) {
    if (typeof data.error === 'string') return data.error;
    if (typeof data.error === 'object') {
      if (typeof data.error.message === 'string') return data.error.message;
      if (typeof data.error.description === 'string') return data.error.description;
    }
  }

  // 3. Check data.error_description
  if (typeof data.error_description === 'string') {
    return data.error_description;
  }

  // 4. Check data.errors
  if (data.errors) {
    if (typeof data.errors === 'string') return data.errors;
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const firstError = data.errors[0];
      if (typeof firstError === 'string') return data.errors.join(', ');
      if (firstError && typeof firstError === 'object') {
        if (typeof firstError.message === 'string') return firstError.message;
        if (typeof firstError.msg === 'string') return firstError.msg;
      }
    }
    if (typeof data.errors === 'object') {
      const firstKey = Object.keys(data.errors)[0];
      if (firstKey) {
        const val = data.errors[firstKey];
        if (typeof val === 'string') return `${firstKey}: ${val}`;
        if (Array.isArray(val) && val.length > 0) return `${firstKey}: ${val[0]}`;
      }
    }
  }

  // 5. Fallback check for any string value in the root object
  if (typeof data === 'object') {
    if (typeof data.msg === 'string') return data.msg;
    if (typeof data.description === 'string') return data.description;
  }

  return defaultMessage;
}

/**
 * Safely extracts field validation errors from various response payload structures.
 */
export const extractErrorDetails = (data: any): Record<string, string | string[]> | undefined  => {
  if (!data || typeof data !== 'object') return undefined;

  // Check data.errors
  if (data.errors && typeof data.errors === 'object' && !Array.isArray(data.errors)) {
    return data.errors;
  }

  // Check data.details
  if (data.details && typeof data.details === 'object' && !Array.isArray(data.details)) {
    return data.details;
  }

  // If data.errors is an array of objects like [{ field: 'email', message: 'error' }]
  if (Array.isArray(data.errors)) {
    const details: Record<string, string[]> = {};
    data.errors.forEach((err: any) => {
      if (err && typeof err === 'object' && err.field && err.message) {
        const field = String(err.field);
        if (!details[field]) details[field] = [];
        details[field].push(String(err.message));
      }
    });
    if (Object.keys(details).length > 0) {
      return details;
    }
  }

  return undefined;
}

/**
 * Normalizes any server error response into a standard ErrorResponse structure.
 */
export const parseServerError = (
  response: ApiErrorResponse<any>,
  defaultMessage: string
): ErrorResponse  => {
  const status = response.status ?? 0;
  const problem = response.problem;

  let category = APIErrorCategory.UNKNOWN;
  let code = response.data?.code ?? String(problem ?? 'API_ERROR');

  if (problem === CANCEL_ERROR) {
    category = APIErrorCategory.CANCEL;
  } else if (problem === TIMEOUT_ERROR) {
    category = APIErrorCategory.TIMEOUT;
  } else if (problem === CONNECTION_ERROR || problem === NETWORK_ERROR) {
    category = APIErrorCategory.NETWORK;
  } else if (status === 401) {
    category = APIErrorCategory.UNAUTHORIZED;
  } else if (status === 403) {
    category = APIErrorCategory.FORBIDDEN;
  } else if (status === 404) {
    category = APIErrorCategory.NOT_FOUND;
  } else if (status === 422 || (status >= 400 && status < 500 && (response.data?.errors || response.data?.details))) {
    category = APIErrorCategory.VALIDATION;
  } else if (status >= 500) {
    category = APIErrorCategory.SERVER;
  } else if (status >= 400 && status < 500) {
    category = APIErrorCategory.VALIDATION;
  }

  const message = extractErrorMessage(response.data, defaultMessage);
  const details = extractErrorDetails(response.data);

  return {
    message,
    category,
    code,
    statusCode: status || undefined,
    details,
    raw: response.data
  };
}
