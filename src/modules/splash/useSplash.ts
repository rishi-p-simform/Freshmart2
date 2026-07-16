import { useEffect } from 'react';
import type { SplashHookReturnType } from './SplashTypes';

/**
 * Custom hook for Splash screen logic.
 * Handles the 2500ms timeout before triggering the onFinish callback.
 * 
 * @param {() => void} onFinish - Callback triggered when the splash animation/duration completes.
 * @returns {SplashHookReturnType} An empty object representing hook return values.
 */
export const useSplash = (onFinish: () => void): SplashHookReturnType => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return {};
};
