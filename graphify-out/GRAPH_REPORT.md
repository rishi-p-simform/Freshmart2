# Graph Report - .  (2026-07-16)

## Corpus Check
- 154 files · ~209,124 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 451 nodes · 792 edges · 55 communities (15 shown, 40 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App Core & Redux Store
- Theme & UI Components
- API & Utilities
- Build & Configuration
- Shared UI Components
- Constants & Deep Linking
- Custom Hooks & Storage
- Signup & Navigation
- Dependencies & Packages
- Feature Screens & Routing
- TypeScript Config
- External Libraries
- Custom Signing Script
- App Configuration
- Linting Config
- Package Dependency 15
- Package Dependency 16
- Package Dependency 17
- Package Dependency 18
- Package Dependency 19
- Package Dependency 20
- Package Dependency 21
- Package Dependency 22
- Package Dependency 23
- Package Dependency 24
- Package Dependency 25
- Package Dependency 26
- Package Dependency 27
- Package Dependency 28
- Package Dependency 29
- Package Dependency 30
- Package Dependency 31
- Package Dependency 32
- Package Dependency 33
- Package Dependency 34
- Package Dependency 35
- Package Dependency 36
- Package Dependency 37
- Package Dependency 38
- Package Dependency 39
- Package Dependency 40
- Package Dependency 41
- Package Dependency 42
- Package Dependency 43
- Package Dependency 44
- Package Dependency 45
- Package Dependency 46
- Package Dependency 47
- Package Dependency 48
- Package Dependency 49
- Package Dependency 50
- Package Dependency 51
- Package Dependency 52

## God Nodes (most connected - your core abstractions)
1. `deny` - 30 edges
2. `useTheme()` - 29 edges
3. `scale()` - 22 edges
4. `ThemeMode` - 14 edges
5. `applicationStyles()` - 13 edges
6. `ErrorResponse` - 9 edges
7. `AuthActions` - 8 edges
8. `useAppSelector` - 8 edges
9. `scripts` - 7 edges
10. `CustomButton()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `defineConfig()` --calls--> `defineProGuardRules()`  [EXTRACTED]
  app.config.js → buildconfig.js
- `defineConfig()` --calls--> `getEnvironmentConfig()`  [EXTRACTED]
  app.config.js → buildconfig.js
- `DetailScreen()` --calls--> `useTheme()`  [EXTRACTED]
  src/modules/details/DetailsScreen.tsx → src/hooks/useTheme.ts
- `TabsLayout()` --calls--> `useTheme()`  [EXTRACTED]
  src/app/(protected)/(tabs)/_layout.tsx → src/hooks/useTheme.ts
- `ProtectedLayout()` --calls--> `useTheme()`  [EXTRACTED]
  src/app/(protected)/_layout.tsx → src/hooks/useTheme.ts

## Import Cycles
- 3-file cycle: `src/redux/Store.ts -> src/redux/auth/index.ts -> src/redux/auth/AuthSelector.ts -> src/redux/Store.ts`

## Communities (55 total, 40 thin omitted)

### Community 0 - "App Core & Redux Store"
Cohesion: 0.07
Nodes (34): App(), RootNavigator(), ThemedNavigator(), PublicLayout(), getReactotronEnhancer(), reactotron, ROUTES, useTheme() (+26 more)

### Community 1 - "Theme & UI Components"
Cohesion: 0.10
Nodes (29): DetailsHeaderLeft(), ProtectedLayout(), HomeTabIcon(), ProfileTabIcon(), TabIconProps, TabsLayout(), CustomHeader(), styles() (+21 more)

### Community 2 - "API & Utilities"
Cohesion: 0.09
Nodes (29): ApiConfig, APIDispatch, apiWithCancelToken(), authorizedAPI, createAsyncThunkWithCancelToken(), handleCatchError(), handleClientError(), handleError() (+21 more)

### Community 3 - "Build & Configuration"
Cohesion: 0.06
Nodes (34): hooks, Stop, permissions, deny, $schema, Read(*.aab), Read(*.apk), Read(*.app) (+26 more)

### Community 4 - "Shared UI Components"
Cohesion: 0.12
Nodes (15): CustomButton(), activityIndicatorColor(), buttonDefaultStyles(), buttonVariantStyles(), getTextVariant(), textColor(), CustomButtonProps, CustomButtonVariant (+7 more)

### Community 5 - "Constants & Deep Linking"
Cohesion: 0.09
Nodes (18): DeepLink, deepLinkPrefixes, DeepLinkRegex, APIError, Auth, Details, Home, KeyStringValueMap (+10 more)

### Community 6 - "Custom Hooks & Storage"
Cohesion: 0.16
Nodes (19): checkDeps(), useDeepCompareMemoize(), useDeepCompareCallback(), useDeepCompareEffect(), defaultOption, getPermissionResult(), GetPermissionResultReturnType, PermissionRationale (+11 more)

### Community 7 - "Signup & Navigation"
Cohesion: 0.13
Nodes (12): SignupForm(), SignupFormPropsType, isRemainingToFillForm(), SignupScreen(), SignupFormValues, SignupHookReturnType, TODO: You can call the signup API here and handle the response accordingly., useSignup() (+4 more)

### Community 8 - "Dependencies & Packages"
Cohesion: 0.09
Nodes (22): eslint, eslint-config-expo, devDependencies, eslint, eslint-config-expo, @react-navigation/devtools, @types/react, typescript (+14 more)

### Community 10 - "TypeScript Config"
Cohesion: 0.15
Nodes (12): expo-env.d.ts, expo/tsconfig.base, .expo/types/**/*.ts, ./src/modules, **/*.ts, **/*.tsx, compilerOptions, paths (+4 more)

### Community 11 - "External Libraries"
Cohesion: 0.18
Nodes (11): expo-splash-screen, expo-system-ui, dependencies, expo-splash-screen, expo-system-ui, react-native-mmkv, react-native-screens, @reduxjs/toolkit (+3 more)

### Community 12 - "Custom Signing Script"
Cohesion: 0.40
Nodes (5): fs, modifyGradleFiles(), path, withCustomSigning(), { withDangerousMod }

### Community 13 - "App Configuration"
Cohesion: 0.80
Nodes (3): defineConfig(), defineProGuardRules(), getEnvironmentConfig()

## Knowledge Gaps
- **141 isolated node(s):** `{ execSync }`, `$schema`, `Read(.env*)`, `Read(credentials.json)`, `Read(ios/tmp.xcconfig)` (+136 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `External Libraries` to `Dependencies & Packages`, `Package Dependency 15`, `Package Dependency 16`, `Package Dependency 17`, `Package Dependency 19`, `Package Dependency 20`, `Package Dependency 21`, `Package Dependency 22`, `Package Dependency 23`, `Package Dependency 24`, `Package Dependency 25`, `Package Dependency 26`, `Package Dependency 27`, `Package Dependency 28`, `Package Dependency 29`, `Package Dependency 30`, `Package Dependency 31`, `Package Dependency 32`, `Package Dependency 33`, `Package Dependency 34`, `Package Dependency 35`, `Package Dependency 36`, `Package Dependency 37`, `Package Dependency 38`, `Package Dependency 39`, `Package Dependency 40`, `Package Dependency 41`, `Package Dependency 42`, `Package Dependency 43`, `Package Dependency 44`, `Package Dependency 45`, `Package Dependency 46`, `Package Dependency 47`, `Package Dependency 48`, `Package Dependency 49`, `Package Dependency 50`, `Package Dependency 51`, `Package Dependency 52`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `useTheme()` connect `App Core & Redux Store` to `Theme & UI Components`, `Shared UI Components`, `Feature Screens & Routing`, `Signup & Navigation`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `scale()` connect `Theme & UI Components` to `Shared UI Components`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `{ execSync }`, `$schema`, `Read(.env*)` to the rest of the system?**
  _141 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Core & Redux Store` be split into smaller, more focused modules?**
  _Cohesion score 0.06829573934837092 - nodes in this community are weakly interconnected._
- **Should `Theme & UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.09696969696969697 - nodes in this community are weakly interconnected._
- **Should `API & Utilities` be split into smaller, more focused modules?**
  _Cohesion score 0.08943089430894309 - nodes in this community are weakly interconnected._