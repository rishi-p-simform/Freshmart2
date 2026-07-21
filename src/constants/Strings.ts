import { I18n } from '../translations';

/**
 * An object that represents a mapping of keys to string values.
 * @interface
 */
interface KeyStringValueMap {
  [key: string]: string;
}

/**
 * Freezes an object conforming to the KeyStringValueMap interface.
 * @function
 * @param {T} strings - The object to be frozen.
 * @returns {T} The frozen object.
 */
const freezeStringsObject = <T extends KeyStringValueMap>(strings: T): T => Object.freeze(strings);

/**
 * An object that contains all of the possible error messages that can be returned by the API.
 * @readonly
 * @enum {string}
 */
const APIError = freezeStringsObject({
  somethingWentWrong: I18n.t('apiError:somethingWentWrong'),
  networkError: I18n.t('apiError:networkError'),
  serverError: I18n.t('apiError:serverError'),
  timeoutError: I18n.t('apiError:timeoutError'),
  clientError: I18n.t('apiError:clientError'),
  cancelError: I18n.t('apiError:cancelError'),
  connectionError: I18n.t('apiError:connectionError'),
  unexpectedError: I18n.t('apiError:unexpectedError'),
  cancelSagaError: I18n.t('apiError:cancelSagaError'),
  error: I18n.t('apiError:error'),
  permissionIsUnavailable: I18n.t('apiError:permissionIsUnavailable'),
  permissionTypeIsUndefined: I18n.t('apiError:permissionTypeIsUndefined')
});

/**
 * A collection of error messages for the Yup validation schema.
 * @type {Object}
 */
const YupError = freezeStringsObject({
  requireNameError: I18n.t('yupError:requireNameError'),
  requireEmailError: I18n.t('yupError:requireEmailError'),
  invalidEmailError: I18n.t('yupError:invalidEmailError'),
  requirePasswordError: I18n.t('yupError:requirePasswordError'),
  requireConfirmPasswordError: I18n.t('yupError:requireConfirmPasswordError'),
  mismatchPasswordError: I18n.t('yupError:mismatchPasswordError'),
  requireTermsError: I18n.t('yupError:requireTermsError'),
  lengthPasswordError: I18n.t('yupError:lengthPasswordError'),
  lowercasePasswordError: I18n.t('yupError:lowercasePasswordError'),
  uppercasePasswordError: I18n.t('yupError:uppercasePasswordError'),
  specialPasswordError: I18n.t('yupError:specialPasswordError'),
  digitPasswordError: I18n.t('yupError:digitPasswordError')
});

const Home = freezeStringsObject({
  homeScreenTitle: I18n.t('home:title'),
  details: I18n.t('home:details'),
  signIn: I18n.t('home:signIn'),
  lightTheme: I18n.t('home:lightTheme'),
  darkTheme: I18n.t('home:darkTheme'),
  categories: I18n.t('home:categories'),
  bestSellers: I18n.t('home:bestSellers'),
  seeAll: I18n.t('home:seeAll')
});

const Details = freezeStringsObject({
  detailsScreenTitle: I18n.t('details:title')
});

const Auth = freezeStringsObject({
  hintName: I18n.t('auth:hintName'),
  hintEmail: I18n.t('auth:hintEmail'),
  hintPassword: I18n.t('auth:hintPassword'),
  lblName: I18n.t('auth:lblName'),
  lblEmail: I18n.t('auth:lblEmail'),
  lblPassword: I18n.t('auth:lblPassword'),
  lblConfirmPassword: I18n.t('auth:lblConfirmPassword'),
  btnSignIn: I18n.t('auth:btnSignIn'),
  btnSignUp: I18n.t('auth:btnSignUp'),
  signInTitle: I18n.t('auth:signInTitle'),
  signInSubtitle: I18n.t('auth:signInSubtitle'),
  signUpTitle: I18n.t('auth:signUpTitle'),
  signUpSubtitle: I18n.t('auth:signUpSubtitle'),
  noAccountLabel: I18n.t('auth:noAccountLabel'),
  hasAccountLabel: I18n.t('auth:hasAccountLabel'),
  signUpAction: I18n.t('auth:signUpAction'),
  signInAction: I18n.t('auth:signInAction'),
  forgotPassword: I18n.t('auth:forgotPassword'),
  orContinueWith: I18n.t('auth:orContinueWith'),
  btnGoogle: I18n.t('auth:btnGoogle'),
  newHereLabel: I18n.t('auth:newHereLabel'),
  agreeTo: I18n.t('auth:agreeTo'),
  termsOfService: I18n.t('auth:termsOfService'),
  and: I18n.t('auth:and'),
  privacyPolicy: I18n.t('auth:privacyPolicy'),
  verifyEmailTitle: I18n.t('auth:verifyEmailTitle'),
  verifyEmailSentTo: I18n.t('auth:verifyEmailSentTo'),
  verifyEmailEnterCode: I18n.t('auth:verifyEmailEnterCode'),
  verifyEmailResendIn: I18n.t('auth:verifyEmailResendIn'),
  verifyEmailVerifyContinue: I18n.t('auth:verifyEmailVerifyContinue'),
  verifyEmailOr: I18n.t('auth:verifyEmailOr'),
  verifyEmailMagicLink: I18n.t('auth:verifyEmailMagicLink'),
  verifyEmailMagicLinkSub: I18n.t('auth:verifyEmailMagicLinkSub'),
  verifyEmailOpenApp: I18n.t('auth:verifyEmailOpenApp')
});

const Profile = freezeStringsObject({
  title: I18n.t('profile:title'),
  btnLogout: I18n.t('profile:btnLogout'),
  btnDeleteAccount: I18n.t('profile:btnDeleteAccount'),
  deleteAccountConfirmTitle: I18n.t('profile:deleteAccountConfirmTitle'),
  deleteAccountConfirmMessage: I18n.t('profile:deleteAccountConfirmMessage'),
  btnCancel: I18n.t('profile:btnCancel'),
  btnConfirmDelete: I18n.t('profile:btnConfirmDelete')
});

const Explore = freezeStringsObject({
  title: I18n.t('explore:title')
});

const Cart = freezeStringsObject({
  title: I18n.t('cart:title'),
  emptyTitle: I18n.t('cart:emptyTitle'),
  emptyDescription: I18n.t('cart:emptyDescription'),
  startShopping: I18n.t('cart:startShopping'),
  applyCoupon: I18n.t('cart:applyCoupon'),
  apply: I18n.t('cart:apply'),
  subtotalMrp: I18n.t('cart:subtotalMrp'),
  delivery: I18n.t('cart:delivery'),
  free: I18n.t('cart:free'),
  discount: I18n.t('cart:discount'),
  total: I18n.t('cart:total'),
  proceedToCheckout: I18n.t('cart:proceedToCheckout')
});

const Splash = freezeStringsObject({
  title: I18n.t('splash:title'),
  subtitle: I18n.t('splash:subtitle')
});

const Location = freezeStringsObject({
  setDeliveryLocation: I18n.t('location:setDeliveryLocation'),
  deliveryLocationSubtitle: I18n.t('location:deliveryLocationSubtitle'),
  addressLine1Label: I18n.t('location:addressLine1Label'),
  addressLine1Placeholder: I18n.t('location:addressLine1Placeholder'),
  addressLine2Label: I18n.t('location:addressLine2Label'),
  addressLine2Placeholder: I18n.t('location:addressLine2Placeholder'),
  cityLabel: I18n.t('location:cityLabel'),
  cityPlaceholder: I18n.t('location:cityPlaceholder'),
  stateLabel: I18n.t('location:stateLabel'),
  statePlaceholder: I18n.t('location:statePlaceholder'),
  pincodeLabel: I18n.t('location:pincodeLabel'),
  pincodePlaceholder: I18n.t('location:pincodePlaceholder'),
  saveAs: I18n.t('location:saveAs'),
  useCurrentLocation: I18n.t('location:useCurrentLocation'),
  confirmLocation: I18n.t('location:confirmLocation')
});

const Products = freezeStringsObject({
  noImage: I18n.t('products:noImage'),
  add: I18n.t('products:add'),
  noProductsFound: I18n.t('products:noProductsFound'),
  searchPlaceholder: I18n.t('products:searchPlaceholder'),
  productsTitle: I18n.t('products:productsTitle'),
  items: I18n.t('products:items'),
  item: I18n.t('products:item'),
  dataFetchingCompleted: I18n.t('products:dataFetchingCompleted')
});

const Checkout = freezeStringsObject({
  title: I18n.t('checkout:title'),
  deliveryAddress: I18n.t('checkout:deliveryAddress'),
  addNewAddress: I18n.t('checkout:addNewAddress'),
  deliverySlot: I18n.t('checkout:deliverySlot'),
  proceedToPayment: I18n.t('checkout:proceedToPayment')
});

const Payment = freezeStringsObject({
  title: I18n.t('payment:title'),
  selectPaymentMethod: I18n.t('payment:selectPaymentMethod'),
  orderSummary: I18n.t('payment:orderSummary'),
  delivery: I18n.t('payment:delivery'),
  free: I18n.t('payment:free'),
  total: I18n.t('payment:total'),
  placeOrder: I18n.t('payment:placeOrder'),
  placingOrder: I18n.t('payment:placingOrder'),
  upi: I18n.t('payment:upi'),
  upiSubtitle: I18n.t('payment:upiSubtitle'),
  card: I18n.t('payment:card'),
  cardSubtitle: I18n.t('payment:cardSubtitle'),
  cod: I18n.t('payment:cod'),
  codSubtitle: I18n.t('payment:codSubtitle')
});

const Confirmation = freezeStringsObject({
  title: I18n.t('confirmation:title'),
  orderPlaced: I18n.t('confirmation:orderPlaced'),
  orderConfirmedDesc: I18n.t('confirmation:orderConfirmedDesc'),
  orderNumber: I18n.t('confirmation:orderNumber'),
  estimatedTime: I18n.t('confirmation:estimatedTime'),
  trackMyOrder: I18n.t('confirmation:trackMyOrder'),
  continueShopping: I18n.t('confirmation:continueShopping')
});

const TrackOrder = freezeStringsObject({
  title: I18n.t('trackOrder:title'),
  deliveryPartner: I18n.t('trackOrder:deliveryPartner'),
  deliveryPartnerRole: I18n.t('trackOrder:deliveryPartnerRole'),
  orderPlaced: I18n.t('trackOrder:orderPlaced'),
  confirmed: I18n.t('trackOrder:confirmed'),
  packing: I18n.t('trackOrder:packing'),
  outForDelivery: I18n.t('trackOrder:outForDelivery'),
  delivered: I18n.t('trackOrder:delivered'),
  cancelled: I18n.t('trackOrder:cancelled'),
  estTime: I18n.t('trackOrder:estTime'),
  unsupportedPlatform: I18n.t('trackOrder:unsupportedPlatform'),
  unsupportedPlatformMsg: I18n.t('trackOrder:unsupportedPlatformMsg'),
  errorTitle: I18n.t('trackOrder:errorTitle'),
  smsError: I18n.t('trackOrder:smsError'),
  telError: I18n.t('trackOrder:telError')
});

/**
 * Exporting all the strings in one object..
 * Separate string object like Home, Details & Auth etc...
 * base on your modules dir structure
 * @type {Object.<string, Record<string, string>>}
 */
export default Object.freeze({
  APIError,
  YupError,
  Home,
  Details,
  Auth,
  Profile,
  Explore,
  Cart,
  Splash,
  Location,
  Products,
  Checkout,
  Payment,
  Confirmation,
  TrackOrder
});
