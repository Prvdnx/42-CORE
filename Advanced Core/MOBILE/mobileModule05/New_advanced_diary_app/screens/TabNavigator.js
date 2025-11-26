import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Calendar } from 'lucide-react-native';

import EntriesListScreen from '../screens/EntriesListScreen';
import AgendaScreen from '../screens/AgendaScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5B8CFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          position: 'absolute',
          height: 80,
          paddingBottom: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={EntriesListScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;