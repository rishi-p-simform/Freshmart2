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
  resendConfirmation: '/api/v1/auth/email/resend-confirmation',
  addresses: '/api/v1/user/addresses',
  categories: '/api/v1/categories',
  refresh: '/api/v1/auth/refresh',
  products: '/api/v1/products',
  productsSearch: '/api/v1/products/search',
  productDetail: '/api/v1/products/', // {id} will be appended
  cart: '/api/v1/cart/',
  cartItems: '/api/v1/cart/items',
  orders: '/api/v1/orders',
  cancelOrder: '/api/v1/orders/'
});
