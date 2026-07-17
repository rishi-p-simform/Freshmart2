import { extractErrorMessage, extractErrorDetails, parseServerError } from '../APIErrorParser';
import { APIErrorCategory } from '../APIConfigTypes';
import type { ApiErrorResponse } from 'apisauce';

describe('APIConfig Error Parsing & Normalization', () => {
  const defaultMsg = 'An unexpected error occurred';

  describe('extractErrorMessage', () => {
    test('should return default message if data is null or undefined', () => {
      expect(extractErrorMessage(undefined, defaultMsg)).toBe(defaultMsg);
      expect(extractErrorMessage(null, defaultMsg)).toBe(defaultMsg);
    });

    test('should return the string directly if data is a string', () => {
      expect(extractErrorMessage('Direct server error string', defaultMsg)).toBe('Direct server error string');
    });

    test('should extract from message field (string and array)', () => {
      expect(extractErrorMessage({ message: 'User already exists' }, defaultMsg)).toBe('User already exists');
      expect(extractErrorMessage({ message: ['Name is required', 'Age must be positive'] }, defaultMsg)).toBe('Name is required, Age must be positive');
    });

    test('should extract from error field (string and object)', () => {
      expect(extractErrorMessage({ error: 'Auth failed' }, defaultMsg)).toBe('Auth failed');
      expect(extractErrorMessage({ error: { message: 'Token expired' } }, defaultMsg)).toBe('Token expired');
      expect(extractErrorMessage({ error: { description: 'Missing header' } }, defaultMsg)).toBe('Missing header');
    });

    test('should extract from error_description field', () => {
      expect(extractErrorMessage({ error_description: 'OAuth token inactive' }, defaultMsg)).toBe('OAuth token inactive');
    });

    test('should extract from errors field (string, array of strings, array of objects, key-value)', () => {
      expect(extractErrorMessage({ errors: 'Some error text' }, defaultMsg)).toBe('Some error text');
      expect(extractErrorMessage({ errors: ['Error one', 'Error two'] }, defaultMsg)).toBe('Error one, Error two');
      expect(extractErrorMessage({ errors: [{ message: 'Email bad' }] }, defaultMsg)).toBe('Email bad');
      expect(extractErrorMessage({ errors: [{ msg: 'Password weak' }] }, defaultMsg)).toBe('Password weak');
      expect(extractErrorMessage({ errors: { email: 'Must be unique' } }, defaultMsg)).toBe('email: Must be unique');
      expect(extractErrorMessage({ errors: { email: ['Is required', 'Too short'] } }, defaultMsg)).toBe('email: Is required');
    });

    test('should extract from fallback fields like msg or description', () => {
      expect(extractErrorMessage({ msg: 'Fallback message' }, defaultMsg)).toBe('Fallback message');
      expect(extractErrorMessage({ description: 'Fallback description' }, defaultMsg)).toBe('Fallback description');
    });

    test('should fallback to default message if no recognized keys exist', () => {
      expect(extractErrorMessage({ random_key: 'random value' }, defaultMsg)).toBe(defaultMsg);
    });
  });

  describe('extractErrorDetails', () => {
    test('should return undefined if data is invalid or empty', () => {
      expect(extractErrorDetails(undefined)).toBeUndefined();
      expect(extractErrorDetails(null)).toBeUndefined();
      expect(extractErrorDetails('String')).toBeUndefined();
    });

    test('should return errors object if it is a key-value object', () => {
      const errObj = { email: 'already taken', password: ['too weak'] };
      expect(extractErrorDetails({ errors: errObj })).toEqual(errObj);
    });

    test('should return details object if it is a key-value object', () => {
      const detailObj = { code: 'invalid_code' };
      expect(extractErrorDetails({ details: detailObj })).toEqual(detailObj);
    });

    test('should parse array of error objects with field and message keys', () => {
      const errorsArray = [
        { field: 'email', message: 'invalid email format' },
        { field: 'password', message: 'too short' },
        { field: 'email', message: 'must not contain spaces' }
      ];
      expect(extractErrorDetails({ errors: errorsArray })).toEqual({
        email: ['invalid email format', 'must not contain spaces'],
        password: ['too short']
      });
    });
  });

  describe('parseServerError', () => {
    test('should parse CANCEL_ERROR correct category and details', () => {
      const mockResponse: ApiErrorResponse<any> = {
        ok: false,
        problem: 'CANCEL_ERROR',
        status: undefined,
        data: null,
        originalError: null as any
      };
      const parsed = parseServerError(mockResponse, 'Request cancelled');
      expect(parsed.category).toBe(APIErrorCategory.CANCEL);
      expect(parsed.message).toBe('Request cancelled');
      expect(parsed.statusCode).toBeUndefined();
    });

    test('should parse TIMEOUT_ERROR correct category and details', () => {
      const mockResponse: ApiErrorResponse<any> = {
        ok: false,
        problem: 'TIMEOUT_ERROR',
        status: undefined,
        data: null,
        originalError: null as any
      };
      const parsed = parseServerError(mockResponse, 'Request timed out');
      expect(parsed.category).toBe(APIErrorCategory.TIMEOUT);
      expect(parsed.message).toBe('Request timed out');
    });

    test('should parse NETWORK_ERROR correct category and details', () => {
      const mockResponse: ApiErrorResponse<any> = {
        ok: false,
        problem: 'NETWORK_ERROR',
        status: undefined,
        data: null,
        originalError: null as any
      };
      const parsed = parseServerError(mockResponse, 'Network connection lost');
      expect(parsed.category).toBe(APIErrorCategory.NETWORK);
    });

    test('should parse status 401 as UNAUTHORIZED', () => {
      const mockResponse: ApiErrorResponse<any> = {
        ok: false,
        problem: 'CLIENT_ERROR',
        status: 401,
        data: { message: 'Token has expired' },
        originalError: null as any
      };
      const parsed = parseServerError(mockResponse, 'Unauthorized access');
      expect(parsed.category).toBe(APIErrorCategory.UNAUTHORIZED);
      expect(parsed.message).toBe('Token has expired');
      expect(parsed.statusCode).toBe(401);
    });

    test('should parse status 403 as FORBIDDEN', () => {
      const mockResponse: ApiErrorResponse<any> = {
        ok: false,
        problem: 'CLIENT_ERROR',
        status: 403,
        data: { error: 'Insufficient permissions' },
        originalError: null as any
      };
      const parsed = parseServerError(mockResponse, 'Forbidden');
      expect(parsed.category).toBe(APIErrorCategory.FORBIDDEN);
      expect(parsed.message).toBe('Insufficient permissions');
    });

    test('should parse status 404 as NOT_FOUND', () => {
      const mockResponse: ApiErrorResponse<any> = {
        ok: false,
        problem: 'CLIENT_ERROR',
        status: 404,
        data: { message: 'Entity not found' },
        originalError: null as any
      };
      const parsed = parseServerError(mockResponse, 'Not Found');
      expect(parsed.category).toBe(APIErrorCategory.NOT_FOUND);
      expect(parsed.message).toBe('Entity not found');
    });

    test('should parse status 422 as VALIDATION', () => {
      const mockResponse: ApiErrorResponse<any> = {
        ok: false,
        problem: 'CLIENT_ERROR',
        status: 422,
        data: {
          message: 'Validation failed',
          errors: {
            email: ['Invalid email address']
          }
        },
        originalError: null as any
      };
      const parsed = parseServerError(mockResponse, 'Validation Error');
      expect(parsed.category).toBe(APIErrorCategory.VALIDATION);
      expect(parsed.message).toBe('Validation failed');
      expect(parsed.details).toEqual({ email: ['Invalid email address'] });
    });

    test('should parse status 500 as SERVER', () => {
      const mockResponse: ApiErrorResponse<any> = {
        ok: false,
        problem: 'SERVER_ERROR',
        status: 500,
        data: { error: 'Internal database query failure' },
        originalError: null as any
      };
      const parsed = parseServerError(mockResponse, 'Server Error');
      expect(parsed.category).toBe(APIErrorCategory.SERVER);
      expect(parsed.message).toBe('Internal database query failure');
    });
  });
});
