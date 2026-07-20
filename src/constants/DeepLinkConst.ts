export const domain: string = 'expoboilerplate.page.link';

export const bundleId: string = 'com.simform.expoboilerplate';

export const scheme: string = 'expoboilerplate://';

export const deepLinkPrefixes = ['expoboilerplate://', `${domain}//`, `https://${domain}`];

export enum DeepLink {
  // expoboilerplate://magic_link&lang=en&tenantId=austin-electrical-qqm76
  MagicLink = 'magic_link',
  // expoboilerplate://forgot_password&lang=en&tenantId=austin-electrical-qqm76
  ForgotPassword = 'forgot_password',
  // expoboilerplate://?toastMessage=<message content>
  ToastMessage = 'toastMessage',
  // expoboilerplate://?signin
  SignIn = 'signin',
  // expoboilerplate://?details
  Details = 'details'
}

/**
 * Regex for deep links
 */
export const DeepLinkRegex = {
  SignIn: /^signin?$/,
  Details: /^(\d*)?details\/?(\d*)?$/
};

export default DeepLink;
