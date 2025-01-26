import { View, Text, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '@/constants';

type Props = {
  label: string;
  icon: ImageSourcePropType;
  color: string;
  focused: boolean;
};

const TabBarIcon = ({ label, icon, color }: Props) => {
  return (
    <View className="justify-center items-center w-32">
      <Image
        source={icon}
        className="h-6 w-6"
        resizeMode="contain"
        tintColor={color}
      />
      <Text
        className={`text-xs font-pregula}`}
        style={{
          color: color,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          height: 80,
          paddingTop: 12,
          backgroundColor: '#161622',
          borderTopColor: '#FF0000',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={icons.home}
              color={color}
              focused={focused}
              label="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={icons.plus}
              color={color}
              focused={focused}
              label="Create"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={icons.profile}
              color={color}
              focused={focused}
              label="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
