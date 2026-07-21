import { defineProGuardRules, getEnvironmentConfig } from './buildconfig';

/* eslint-disable require-jsdoc */
const defineConfig = ({ config }) => {
  let APP_ENV = process.env.APP_ENV || process.env.NODE_ENV || 'development';

  const { appName, bundleIdentifier } = getEnvironmentConfig(APP_ENV);

  return {
    ...config,
    name: appName,
    slug: 'Freshmart2', // The slug must remain consistent
    scheme: 'freshmart2',
    version: config.version || '1.0.0',
    userInterfaceStyle: 'automatic',
    ios: {
      ...config.ios,
      bundleIdentifier: bundleIdentifier,
      infoPlist: {
        ...(config.ios?.infoPlist || {}),
        LSApplicationQueriesSchemes: ['mailto']
      }
    },
    android: {
      ...config.android,
      package: bundleIdentifier,
      permissions: [
        ...(config.android?.permissions || [])
      ],
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      }
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000'
          }
        }
      ],
      'expo-localization',
      'expo-asset',
      'expo-font',
      [
        'expo-build-properties',
        {
          android: {
            minSdkVersion: 30,
            enableProguardInReleaseBuilds: true,
            extraProguardRules: defineProGuardRules(bundleIdentifier)
          },
          ios: {
            deploymentTarget: '16.0'
          }
        }
      ],
      [
        'react-native-permissions',
        {
          iosPermissions: ['Camera']
        }
      ],
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission: 'We need your location to deliver groceries.'
        }
      ],
      [
        'expo-maps',
        {
          googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      ]
    ],
    extra: {
      ...config.extra,
      APP_ENV,
      ...process.env,
    }
  };
};

export default defineConfig;
