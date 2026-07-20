import type { User } from '../../redux';
import type { ThemeMode } from '../../theme';

export type ProfileScreenProps = Record<string, never>;

export interface ProfileHookReturnType {
  user: User | null;
  isDark: boolean;
  theme: ThemeMode;
  deleting: boolean;
  handleLogout: () => Promise<void>;
  handleDeleteAccount: () => void;
  toggleThemeSwitch: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}
