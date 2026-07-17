/**
 * A constant freezing object that contains the paths to the API endpoint url.
 * @type {Object}
 */
export default Object.freeze({
  signin: '/api/v1/auth/email/login',
  login: '/api/v1/auth/email/login',
  signup: '/api/v1/auth/email/signup',
  logout: '/api/v1/auth/logout',
  me: '/api/v1/user/profile',
  deleteAccount: '/api/v1/user/account',
  verifySignup: '/api/v1/auth/email/verify-signup',
  resendConfirmation: '/api/v1/auth/email/resend-confirmation'
});


