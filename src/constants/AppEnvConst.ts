import ExpoConstants from 'expo-constants';

/**
 * A constant freezing object that contains the app value.
 * @type {Object}
 */
export default Object.freeze({
  mobile: 'Mobile',
  isDevelopment:
    __DEV__ ||
    (process.env.EXPO_PUBLIC_ENVIRONMENT ??
      ExpoConstants.expoConfig?.extra?.EXPO_PUBLIC_ENVIRONMENT ??
      'development') === 'development',
  environment:
    process.env.EXPO_PUBLIC_ENVIRONMENT ??
    ExpoConstants.expoConfig?.extra?.EXPO_PUBLIC_ENVIRONMENT ??
    'development',
  sentryUrl:
    process.env.EXPO_PUBLIC_SENTRY_URL ??
    ExpoConstants.expoConfig?.extra?.EXPO_PUBLIC_SENTRY_URL ??
    '',
  apiUrl:
    process.env.EXPO_PUBLIC_API_URL ?? ExpoConstants.expoConfig?.extra?.EXPO_PUBLIC_API_URL ?? ''
});
