import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/WelcomeScreen';
import EntryDetailScreen from './screens/EntryDetailScreen';
import NewEntryScreen from './screens/NewEntryScreen';
import TabNavigator from './screens/TabNavigator';
const Stack = createStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5B8CFF',
    background: '#F5F7FA',
    card: '#FFFFFF',
    text: '#1C1C1E',
    border: '#E5E5EA',
    notification: '#FF6B6B',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
            shadowOpacity: 0,
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5EA',
          },
          headerTintColor: '#1C1C1E',
          headerTitleStyle: {
            fontWeight: '500',
          },
          cardStyle: { backgroundColor: '#F5F7FA' },
        }}
      >
        <Stack.Group>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainApp"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="EntryDetail"
            component={EntryDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="NewEntry" component={NewEntryScreen} options={{ title: 'New Entry' }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}