/**
 * A list of all the possible toolkit actions that can be taken by the user.
 * @type {Object}
 */
export default Object.freeze({
  signin: 'auth/signin',
  login: 'auth/login',
  signup: 'auth/signup',
  logout: 'auth/logout',
  fetchProfile: 'user/fetchProfile',
  deleteAccount: 'user/deleteAccount',
  verifySignup: 'auth/verifySignup',
  resendConfirmation: 'auth/resendConfirmation'
});


