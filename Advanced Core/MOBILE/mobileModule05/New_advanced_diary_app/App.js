import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { OverlayProvider } from './context/OverlayContext';

import WelcomeScreen from './screens/WelcomeScreen';
import TabNavigator from './screens/TabNavigator';

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <SignedIn>
          <Stack.Screen name="MainApp" component={TabNavigator} />
        </SignedIn>
        <SignedOut>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </SignedOut>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// This object tells Clerk how to securely store the session token.
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

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ThemeProvider>
        <OverlayProvider>
          <AppContent />
        </OverlayProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
