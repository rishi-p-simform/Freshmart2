# Graph Report - .  (2026-07-17)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 565 nodes · 738 edges · 85 communities (36 shown, 49 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.66)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b2bc26a7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Colors.ts
- deny
- Store.ts
- user.selectors.ts
- CommonUtils.ts
- CustomInput.tsx
- APIConfig.ts
- devDependencies
- usePermission.ts
- VerifyEmailScreen.tsx
- CustomTabBar.tsx
- index.ts
- dependencies
- CustomButton.tsx
- Strings.ts
- tsconfig.json
- CustomHeader.tsx
- SigninTypes.ts
- SignupTypes.ts
- withCustomSigning.js
- SigninForm.tsx
- SignupForm.tsx
- getReactotronEnhancer
- i18.ts
- eslint.config.js
- _layout.tsx
- axios
- axois
- post-task-check.js
- expo
- expo-build-properties
- expo-constants
- expo-font
- @expo-google-fonts/plus-jakarta-sans
- expo-haptics
- expo-linear-gradient
- expo-linking
- expo-router
- expo-splash-screen
- expo-status-bar
- expo-symbols
- expo-system-ui
- @expo/vector-icons
- expo-web-browser
- formik
- i18next
- lodash
- react
- react-dom
- react-i18next
- react-native
- react-native-gesture-handler
- react-native-mmkv
- react-native-nitro-modules
- react-native-permissions
- react-native-reanimated
- react-native-safe-area-context
- react-native-screens
- react-native-toast-message
- react-native-web
- react-native-worklets
- @react-navigation/bottom-tabs
- reactotron-react-native
- reactotron-redux
- redux-persist
- @reduxjs/toolkit
- yup
- useAppSelector

## God Nodes (most connected - your core abstractions)
1. `deny` - 30 edges
2. `useDeepCompareEffect()` - 7 edges
3. `useMultiplePermissions()` - 7 edges
4. `parseServerError()` - 7 edges
5. `scripts` - 7 edges
6. `checkDeps()` - 6 edges
7. `useDeepCompareCallback()` - 6 edges
8. `useSinglePermissions()` - 6 edges
9. `CustomButton()` - 6 edges
10. `RootStateType` - 6 edges

## Surprising Connections (you probably didn't know these)
- `CustomTabBar()` --indirect_call--> `textColor()`  [INFERRED]
  src/components/custom-tab-bar/CustomTabBar.tsx → src/components/custom-button/CustomButtonStyles.ts
- `DetailScreen()` --calls--> `useTheme()`  [EXTRACTED]
  src/modules/details/DetailsScreen.tsx → src/hooks/useTheme.ts
- `Text()` --indirect_call--> `textVariantsStyles()`  [INFERRED]
  src/components/text/Text.tsx → src/components/text/TextStyles.ts
- `applicationStyles()` --calls--> `scale()`  [EXTRACTED]
  src/theme/ApplicationStyles.ts → src/theme/Metrics.tsx
- `CustomButton()` --indirect_call--> `buttonDefaultStyles()`  [INFERRED]
  src/components/custom-button/CustomButton.tsx → src/components/custom-button/CustomButtonStyles.ts

## Import Cycles
- 3-file cycle: `src/redux/Store.ts -> src/redux/auth/index.ts -> src/redux/auth/auth.selectors.ts -> src/redux/Store.ts`
- 3-file cycle: `src/redux/Store.ts -> src/redux/user/index.ts -> src/redux/user/user.selectors.ts -> src/redux/Store.ts`

## Communities (85 total, 49 thin omitted)

### Community 0 - "Colors.ts"
Cohesion: 0.06
Nodes (29): DeepLink, deepLinkPrefixes, DeepLinkRegex, ROUTES, useHeaderHeight(), useStatusBarHeight(), useTheme(), DetailScreen() (+21 more)

### Community 1 - "deny"
Cohesion: 0.06
Nodes (34): hooks, Stop, permissions, deny, $schema, Read(*.aab), Read(*.apk), Read(*.app) (+26 more)

### Community 2 - "Store.ts"
Cohesion: 0.09
Nodes (22): login, logout, resendConfirmation, signup, verifySignup, AuthSelectors, AuthSelectorsType, authSlice (+14 more)

### Community 3 - "user.selectors.ts"
Cohesion: 0.11
Nodes (17): SigninScreen(), useSignin(), SignupScreen(), useSignup(), ProfileScreen(), styles(), AuthActions, deleteAccount (+9 more)

### Community 4 - "CommonUtils.ts"
Cohesion: 0.09
Nodes (16): ErrorResponse, UserResponse, cleanArray(), cleanUndefOrNull(), formatNumber(), formatString(), isNullOrWhiteSpace(), checkAndGetParams() (+8 more)

### Community 5 - "CustomInput.tsx"
Cohesion: 0.12
Nodes (16): AnimatedPressable, CustomInput, styleSheet(), CustomInputDefaultProps, CustomInputProps, Text(), fontSizeStyles, fontWeightStyles (+8 more)

### Community 6 - "APIConfig.ts"
Cohesion: 0.13
Nodes (16): ApiConfig, APIDispatch, authorizedAPI, createAsyncThunkWithCancelToken(), handleCatchError(), handleError(), TODO: You can add global condition for token expired or internet issue like belo, ResponseBound (+8 more)

### Community 7 - "devDependencies"
Cohesion: 0.07
Nodes (26): eslint, eslint-config-expo, devDependencies, eslint, eslint-config-expo, @react-navigation/devtools, @types/jest, @types/lodash (+18 more)

### Community 8 - "usePermission.ts"
Cohesion: 0.16
Nodes (19): checkDeps(), useDeepCompareMemoize(), useDeepCompareCallback(), useDeepCompareEffect(), defaultOption, getPermissionResult(), GetPermissionResultReturnType, PermissionRationale (+11 more)

### Community 9 - "VerifyEmailScreen.tsx"
Cohesion: 0.14
Nodes (10): OTPInput(), styleSheet(), OTPInputProps, useVerifyEmail(), VerifyEmailScreen(), styleSheet(), VerifyEmailHookReturnType, VerifyEmailRouteParamList (+2 more)

### Community 10 - "CustomTabBar.tsx"
Cohesion: 0.17
Nodes (6): CustomTabBar(), TABS_CONFIG, styles(), CustomTabBarProps, TabConfig, styles()

### Community 12 - "dependencies"
Cohesion: 0.18
Nodes (12): apisauce, expo-image, expo-localization, dependencies, apisauce, expo-image, expo-localization, @react-navigation/elements (+4 more)

### Community 13 - "CustomButton.tsx"
Cohesion: 0.42
Nodes (8): CustomButton(), activityIndicatorColor(), buttonDefaultStyles(), buttonVariantStyles(), getTextVariant(), textColor(), CustomButtonProps, CustomButtonVariant

### Community 14 - "Strings.ts"
Cohesion: 0.17
Nodes (10): APIError, Auth, Cart, Details, Explore, Home, KeyStringValueMap, Profile (+2 more)

### Community 15 - "tsconfig.json"
Cohesion: 0.18
Nodes (10): expo/tsconfig.base, ./src/modules, **/*.ts, **/*.tsx, compilerOptions, paths, strict, extends (+2 more)

### Community 16 - "CustomHeader.tsx"
Cohesion: 0.29
Nodes (5): BackButton, styles(), CustomHeaderPropsType, defaultProps, HeaderAction

### Community 17 - "SigninTypes.ts"
Cohesion: 0.32
Nodes (4): SigninFormPropsType, SigninFormValues, SigninHookReturnType, SigninRouteParamList

### Community 18 - "SignupTypes.ts"
Cohesion: 0.38
Nodes (3): SignupFormPropsType, SignupFormValues, SignupHookReturnType

### Community 19 - "withCustomSigning.js"
Cohesion: 0.40
Nodes (5): fs, modifyGradleFiles(), path, withCustomSigning(), { withDangerousMod }

## Knowledge Gaps
- **180 isolated node(s):** `{ execSync }`, `$schema`, `Read(.env*)`, `Read(credentials.json)`, `Read(ios/tmp.xcconfig)` (+175 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **49 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `axios`, `axois`, `expo`, `expo-build-properties`, `expo-constants`, `expo-font`, `@expo-google-fonts/plus-jakarta-sans`, `expo-haptics`, `expo-linear-gradient`, `expo-linking`, `expo-router`, `expo-splash-screen`, `expo-status-bar`, `expo-symbols`, `expo-system-ui`, `@expo/vector-icons`, `expo-web-browser`, `formik`, `i18next`, `lodash`, `react`, `react-dom`, `react-i18next`, `react-native`, `react-native-gesture-handler`, `react-native-mmkv`, `react-native-nitro-modules`, `react-native-permissions`, `react-native-reanimated`, `react-native-safe-area-context`, `react-native-screens`, `react-native-toast-message`, `react-native-web`, `react-native-worklets`, `@react-navigation/bottom-tabs`, `reactotron-react-native`, `reactotron-redux`, `redux-persist`, `@reduxjs/toolkit`, `yup`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `useVerifyEmail()` connect `VerifyEmailScreen.tsx` to `user.selectors.ts`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `{ execSync }`, `$schema`, `Read(.env*)` to the rest of the system?**
  _180 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Colors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.058069381598793365 - nodes in this community are weakly interconnected._
- **Should `deny` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `Store.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0928030303030303 - nodes in this community are weakly interconnected._
- **Should `user.selectors.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1053763440860215 - nodes in this community are weakly interconnected._