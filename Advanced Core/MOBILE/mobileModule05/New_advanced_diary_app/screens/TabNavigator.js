import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserRound, Calendar } from 'lucide-react-native';

import { useTheme } from '../context/ThemeContext';
import EntriesListScreen from '../screens/EntriesListScreen';
import AgendaScreen from '../screens/AgendaScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors, isLandscape } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border,
          borderTopLeftRadius: 32, borderTopRightRadius: 32, position: 'absolute', height: isLandscape ? 50 : 70, paddingBottom: 10, paddingTop: 10,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500', },
      }} >

      <Tab.Screen name="Profile" component={EntriesListScreen}
        options={{ tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} />, }}
      />
      <Tab.Screen name="Agenda" component={AgendaScreen}
        options={{ tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />, }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
