import { Platform } from 'react-native';

export const theme = {
  light: {
    background: '#ffffff',
    surface: '#f8fafc',
    primary: '#6366f1',
    secondary: '#818cf8',
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    border: '#e2e8f0',
    error: '#ef4444',
    success: '#22c55e',
    card: {
      background: '#ffffff',
      shadow: Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
        web: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
      }),
    },
  },
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    primary: '#818cf8',
    secondary: '#a5b4fc',
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
    },
    border: '#334155',
    error: '#f87171',
    success: '#4ade80',
    card: {
      background: '#1e293b',
      shadow: Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
        web: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
        },
      }),
    },
  },
};

export const fonts = {
  heading: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semibold: 'Poppins_600SemiBold',
  },
  body: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
};