import { Redirect } from 'expo-router';
import React from 'react';
import { ROUTES } from '../constants';
import { AuthSelectors, useAppSelector } from '../redux';
/**
 * The App Component
 * Auth-aware router gate that redirects users based on login state:
 * - Authenticated users → redirected to `/home` (protected tab).
 * - Unauthenticated users → redirected to `/signin` (public auth flow).
 * @returns {React.ReactElement} A Redirect component to the appropriate entry screen.
 */
const App = (): React.ReactElement  => {
  const isLoggedIn = useAppSelector(AuthSelectors.getIsAuthenticated);

  if (isLoggedIn) {
    return <Redirect href={ROUTES.Home} />;
  }

  return <Redirect href={ROUTES.SignIn} />;
}

export default App;
