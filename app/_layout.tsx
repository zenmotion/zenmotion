import { useEffect, useState } from 'react';
import { Stack, router, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout() {
  useFrameworkReady();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const [authChecked, setAuthChecked] = useState(false);
  const segments = useSegments();

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      const isAuthRoute = segments[0] === '(auth)';
      if (!user && !isAuthRoute) {
        router.replace('/(auth)/login');
      }
      setAuthChecked(true);
    });
  }, [segments]);

  if (!fontsLoaded || !authChecked) return null;

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
