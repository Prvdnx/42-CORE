import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store';
import { useFonts, Kalam_400Regular } from '@expo-google-fonts/kalam';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { OverlayProvider } from './context/OverlayContext';
import { EntriesProvider } from './context/EntriesContext';

import WelcomeScreen from './screens/WelcomeScreen';
import AuthOptionsScreen from './screens/AuthOptionsScreen';
import TabNavigator from './screens/TabNavigator';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const AppContent = () => {
  const { theme, colors } = useTheme();

  const AppLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  const AppDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer theme={theme === 'light' ? AppLightTheme : AppDarkTheme}>
      <SignedIn>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainApp" component={TabNavigator} />
        </Stack.Navigator>
      </SignedIn>
      <SignedOut>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="AuthOptions" component={AuthOptionsScreen} />
        </Stack.Navigator>
      </SignedOut>
    </NavigationContainer>
  );
};

// tells Clerk how to securely store the session token.
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

import { useAssets } from 'expo-asset';

export default function App() {
  const [fontsLoaded] = useFonts({ Kalam_400Regular });
  const [assets] = useAssets([require('./assets/images/pexels-ken-cheung.jpg')]);

  React.useEffect(() => {
    if (fontsLoaded && assets) { SplashScreen.hideAsync(); }
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) { return null; }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider>
        <EntriesProvider>
          <OverlayProvider>
            <AppContent />
          </OverlayProvider>
        </EntriesProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
