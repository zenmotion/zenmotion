import { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { theme } from '@/constants/theme';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof theme.light | typeof theme.dark;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => setIsDark(!isDark);

  const value = {
    isDark,
    toggleTheme,
    colors: isDark ? theme.dark : theme.light,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}