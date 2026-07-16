import { extractErrorMessage, extractErrorDetails, parseServerError } from '../APIErrorParser';
import { APIErrorCategory } from '../APIConfigTypes';
import type { ApiErrorResponse } from 'apisauce';

let passedTests = 0;
let failedTests = 0;

const assert = (condition: boolean, message: string) => {
  if (condition) {
    passedTests++;
    console.log(`✅ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`❌ FAIL: ${message}`);
  }
}

const assertDeepEqual = (actual: any, expected: any, message: string) => {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr === expectedStr) {
    passedTests++;
    console.log(`✅ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`❌ FAIL: ${message}\n  Expected: ${expectedStr}\n  Actual:   ${actualStr}`);
  }
}

console.log('Starting APIConfig Error Parsing & Normalization Unit Tests...\n');

// 1. extractErrorMessage tests
try {
  const defaultMsg = 'An unexpected error occurred';

  assert(
    extractErrorMessage(undefined, defaultMsg) === defaultMsg,
    'extractErrorMessage: should return default message if data is undefined'
  );

  assert(
    extractErrorMessage(null, defaultMsg) === defaultMsg,
    'extractErrorMessage: should return default message if data is null'
  );

  assert(
    extractErrorMessage('Direct error', defaultMsg) === 'Direct error',
    'extractErrorMessage: should return string directly if data is a string'
  );

  assert(
    extractErrorMessage({ message: 'User exists' }, defaultMsg) === 'User exists',
    'extractErrorMessage: should extract string from message field'
  );

  assert(
    extractErrorMessage({ message: ['Err 1', 'Err 2'] }, defaultMsg) === 'Err 1, Err 2',
    'extractErrorMessage: should join message field if it is an array'
  );

  assert(
    extractErrorMessage({ error: 'Auth failed' }, defaultMsg) === 'Auth failed',
    'extractErrorMessage: should extract string from error field'
  );

  assert(
    extractErrorMessage({ error: { message: 'Token expired' } }, defaultMsg) === 'Token expired',
    'extractErrorMessage: should extract message from nested error object'
  );

  assert(
    extractErrorMessage({ error_description: 'OAuth inactive' }, defaultMsg) === 'OAuth inactive',
    'extractErrorMessage: should extract message from error_description'
  );

  assert(
    extractErrorMessage({ errors: 'Text error' }, defaultMsg) === 'Text error',
    'extractErrorMessage: should extract string from errors field'
  );

  assert(
    extractErrorMessage({ errors: ['Error 1', 'Error 2'] }, defaultMsg) === 'Error 1, Error 2',
    'extractErrorMessage: should join array of strings in errors field'
  );

  assert(
    extractErrorMessage({ errors: [{ message: 'Email bad' }] }, defaultMsg) === 'Email bad',
    'extractErrorMessage: should extract message from array of error objects'
  );

  assert(
    extractErrorMessage({ errors: { email: 'Unique required' } }, defaultMsg) === 'email: Unique required',
    'extractErrorMessage: should extract from errors key-value object'
  );

  assert(
    extractErrorMessage({ msg: 'Fallback msg' }, defaultMsg) === 'Fallback msg',
    'extractErrorMessage: should extract from fallback msg field'
  );

} catch (err: any) {
  failedTests++;
  console.error('Exception during extractErrorMessage tests:', err);
}

// 2. extractErrorDetails tests
try {
  assertDeepEqual(
    extractErrorDetails(undefined),
    undefined,
    'extractErrorDetails: should return undefined for undefined input'
  );

  const errObj = { email: 'already taken', password: ['too weak'] };
  assertDeepEqual(
    extractErrorDetails({ errors: errObj }),
    errObj,
    'extractErrorDetails: should return errors object if it is key-value'
  );

  const detailObj = { code: 'invalid_code' };
  assertDeepEqual(
    extractErrorDetails({ details: detailObj }),
    detailObj,
    'extractErrorDetails: should return details object if it is key-value'
  );

  const errorsArray = [
    { field: 'email', message: 'invalid email format' },
    { field: 'password', message: 'too short' },
    { field: 'email', message: 'must not contain spaces' }
  ];
  assertDeepEqual(
    extractErrorDetails({ errors: errorsArray }),
    {
      email: ['invalid email format', 'must not contain spaces'],
      password: ['too short']
    },
    'extractErrorDetails: should parse array of error objects into grouped keys'
  );

} catch (err: any) {
  failedTests++;
  console.error('Exception during extractErrorDetails tests:', err);
}

// 3. parseServerError tests
try {
  const cancelResponse: ApiErrorResponse<any> = {
    ok: false,
    problem: 'CANCEL_ERROR',
    status: undefined,
    data: null,
    originalError: null as any
  };
  const parsedCancel = parseServerError(cancelResponse, 'Cancelled');
  assert(parsedCancel.category === APIErrorCategory.CANCEL, 'parseServerError: CANCEL_ERROR category');
  assert(parsedCancel.message === 'Cancelled', 'parseServerError: CANCEL_ERROR message');
  assert(parsedCancel.statusCode === undefined, 'parseServerError: CANCEL_ERROR statusCode undefined');

  const timeoutResponse: ApiErrorResponse<any> = {
    ok: false,
    problem: 'TIMEOUT_ERROR',
    status: undefined,
    data: null,
    originalError: null as any
  };
  const parsedTimeout = parseServerError(timeoutResponse, 'Timed out');
  assert(parsedTimeout.category === APIErrorCategory.TIMEOUT, 'parseServerError: TIMEOUT_ERROR category');

  const unauthorizedResponse: ApiErrorResponse<any> = {
    ok: false,
    problem: 'CLIENT_ERROR',
    status: 401,
    data: { message: 'Token expired' },
    originalError: null as any
  };
  const parsedAuth = parseServerError(unauthorizedResponse, 'Unauthorized');
  assert(parsedAuth.category === APIErrorCategory.UNAUTHORIZED, 'parseServerError: 401 category');
  assert(parsedAuth.message === 'Token expired', 'parseServerError: 401 message');
  assert(parsedAuth.statusCode === 401, 'parseServerError: 401 statusCode');

  const forbiddenResponse: ApiErrorResponse<any> = {
    ok: false,
    problem: 'CLIENT_ERROR',
    status: 403,
    data: { error: 'Access denied' },
    originalError: null as any
  };
  const parsedForbidden = parseServerError(forbiddenResponse, 'Forbidden');
  assert(parsedForbidden.category === APIErrorCategory.FORBIDDEN, 'parseServerError: 403 category');
  assert(parsedForbidden.message === 'Access denied', 'parseServerError: 403 message');

  const notFoundResponse: ApiErrorResponse<any> = {
    ok: false,
    problem: 'CLIENT_ERROR',
    status: 404,
    data: { error: { message: 'Resource not found' } },
    originalError: null as any
  };
  const parsedNotFound = parseServerError(notFoundResponse, 'Not Found');
  assert(parsedNotFound.category === APIErrorCategory.NOT_FOUND, 'parseServerError: 404 category');
  assert(parsedNotFound.message === 'Resource not found', 'parseServerError: 404 message');

  const validationResponse: ApiErrorResponse<any> = {
    ok: false,
    problem: 'CLIENT_ERROR',
    status: 422,
    data: {
      message: 'Invalid input',
      errors: {
        email: ['Required field']
      }
    },
    originalError: null as any
  };
  const parsedValidation = parseServerError(validationResponse, 'Validation failed');
  assert(parsedValidation.category === APIErrorCategory.VALIDATION, 'parseServerError: 422 category');
  assert(parsedValidation.message === 'Invalid input', 'parseServerError: 422 message');
  assertDeepEqual(parsedValidation.details, { email: ['Required field'] }, 'parseServerError: 422 details');

  const serverResponse: ApiErrorResponse<any> = {
    ok: false,
    problem: 'SERVER_ERROR',
    status: 500,
    data: { error: 'DB disconnect' },
    originalError: null as any
  };
  const parsedServer = parseServerError(serverResponse, 'Internal server error');
  assert(parsedServer.category === APIErrorCategory.SERVER, 'parseServerError: 500 category');
  assert(parsedServer.message === 'DB disconnect', 'parseServerError: 500 message');

} catch (err: any) {
  failedTests++;
  console.error('Exception during parseServerError tests:', err);
}

console.log(`\nTest Summary: ${passedTests} passed, ${failedTests} failed.`);
if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
