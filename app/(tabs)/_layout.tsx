import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'library' : 'library-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
        }}
      />
        <Tabs.Screen
            name="community"
            options={{
                title: 'Community',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'storefront' : 'storefront-outline'} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="pets"
            options={{
                title: 'My Pets',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'paw' : 'paw-outline'} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="settings"
            options={{
                title: 'Settings',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'options' : 'options-outline'} color={color} />
                ),
            }}
        />
    </Tabs>
  );
}
