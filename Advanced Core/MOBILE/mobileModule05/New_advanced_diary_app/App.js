import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { OverlayProvider } from './context/OverlayContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import WelcomeScreen from './screens/WelcomeScreen';
import TabNavigator from './screens/TabNavigator';

const Stack = createStackNavigator();

const AppContent = () => {
  const { theme, colors } = useTheme();
  const { user, loading } = useAuth();

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme === 'light' ? AppLightTheme : AppDarkTheme}>
      <Stack.Navigator>
        {user ? ( <Stack.Screen name="MainApp" component={TabNavigator} options={{ headerShown: false }} />
        ) : ( <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} /> )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <OverlayProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </OverlayProvider>
    </ThemeProvider>
  );
}
