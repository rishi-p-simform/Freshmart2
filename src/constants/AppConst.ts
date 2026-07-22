/**
 * Application numeric and system constants.
 * Use these constants instead of hardcoded magic numbers.
 */
export const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20
});

export const API_TIMEOUT = Object.freeze({
  DEFAULT: 120000 // 120 seconds
});

export const ANIMATION_DURATION = Object.freeze({
  FAST: 200,
  NORMAL: 500,
  MEDIUM: 600,
  SLOW: 800
});

export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
});

export const STEPPER = Object.freeze({
  MIN_STEP: 1,
  MAX_STEP: 3
});

export const SKELETON = Object.freeze({
  PULSE_OPACITY: 0.8,
  INFINITE_REPEAT: -1
});

export const CART_CONSTANTS = Object.freeze({
  FREE_DELIVERY_THRESHOLD: 500,
  DEFAULT_DELIVERY_FEE: 49,
  PERCENTAGE_MULTIPLIER: 100,
  DEFAULT_PAYMENT_OPTION_ID: 3
});

export default Object.freeze({
  PAGINATION,
  API_TIMEOUT,
  ANIMATION_DURATION,
  HTTP_STATUS,
  STEPPER,
  SKELETON,
  CART_CONSTANTS
});
