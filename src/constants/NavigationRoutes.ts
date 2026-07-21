/**
 * An enum of the possible route paths in the application.
 */
export enum ROUTES {
  Home = '/home',
  Explore = '/explore',
  Cart = '/cart',
  Profile = '/profile',
  DetailsProduct = '/products/detailsProduct',
  ProductDetails = '/products/[id]',
  SignIn = '/signin',
  SignUp = '/signup',
  VerifyEmail = '/verify-email',
  Location = '/location',
  AddAddress = '/addAddress',
  Search = '/search',
  OrderHistory = '/(protected)/(tabs)/profile/orders',
  TrackOrder = '/(protected)/trackOrder',
  Checkout = '/(protected)/(tabs)/cart/checkout',
  Payment = '/(protected)/(tabs)/cart/payment',
  Confirmation = '/(protected)/(tabs)/cart/confirmation'
}
