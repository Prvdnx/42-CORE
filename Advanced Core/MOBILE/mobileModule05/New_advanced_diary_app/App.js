import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import WelcomeScreen from './screens/WelcomeScreen';
import EntryDetailScreen from './screens/EntryDetailScreen';
import NewEntryScreen from './screens/NewEntryScreen';
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
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: colors.card, shadowOpacity: 0, elevation: 0,
                      borderBottomWidth: 1, borderBottomColor: colors.border,},
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '500', },
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Group>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainApp" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="EntryDetail" component={EntryDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NewEntry" component={NewEntryScreen} options={{ title: 'New Entry' }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}