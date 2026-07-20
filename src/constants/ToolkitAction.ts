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
  resendConfirmation: 'auth/resendConfirmation',
  fetchAddresses: 'address/fetchAddresses',
  createAddress: 'address/createAddress',
  updateAddress: 'address/updateAddress',
  deleteAddress: 'address/deleteAddress',
  setDefaultAddress: 'address/setDefaultAddress',
  fetchCategories: 'category/fetchCategories',
  fetchCategoryDetail: 'category/fetchCategoryDetail',
  refresh: 'auth/refresh',
  fetchProducts: 'products/fetchProducts',
  searchProducts: 'products/searchProducts',
  fetchProductDetail: 'products/fetchProductDetail',
  getCart: 'cart/getCart',
  clearCart: 'cart/clearCart',
  addToCart: 'cart/addToCart',
  updateCartItem: 'cart/updateCartItem',
  removeFromCart: 'cart/removeFromCart'
});
