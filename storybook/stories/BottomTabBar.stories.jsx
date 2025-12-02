import React, { useContext } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";

import { Typography, BottomTabBar } from "@components";

const BottomTabBarMetaData = {
  title: "BottomTabBar",
  component: BottomTabBar,
  argTypes: {},
  args: {},
  parameters: {
    notes: `
BottomTabBar is animated custom tabbar component which needs to used along with

[React Navigation & Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)

![image](assets/screenshots/bottomTabBar/bottomTabBar-1.png)

![image](assets/screenshots/bottomTabBar/bottomTabBar-2.png)


## Usage

>import * as React from 'react';
>import { Typography, BottomTabBar  } from '@bigbinary/neetoui-rn';
>import { NavigationContainer } from '@react-navigation/native';
>import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
>import { ThemeContext } from "styled-components/native";
>import { moderateScale } from "react-native-size-matters";
>
>const Tab = createBottomTabNavigator();
>
>const HomeScreen = () => {
>  return (
>   <Typography fontSize="14px">Home Screen</Typography>
>  )
>}
>
>const SettingsScreen = () => {
>   return (
>     <Typography fontSize="14px">Settings Screen</Typography>
>   )
> }

>export default function Main() {
>  const theme = useContext(ThemeContext);
>  return (
>    <Tab.Navigator
>      screenOptions={{
>        tabBarActiveTintColor: theme.colors.background.base,
>        tabBarInactiveTintColor: theme.colors.background.grey500,
>      }}
>      tabBar={props => <BottomTabBar {...props} />}
>    >
>      <Tab.Screen name="Home" component={HomeScreen}
>        options={{
>          customTabBarProps: {
>            icon: "home-5-line",
>            size: moderateScale(26),
>          },
>        }}
>      />
>      <Tab.Screen name="Settings" component={SettingsScreen}
>        options={{
>          customTabBarProps: {
>            icon: "user-3-line",
>            size: moderateScale(26),
>          },
>        }} />
>    </Tab.Navigator>
>  );
> }
`,
  },
};

export default BottomTabBarMetaData;

const Tab = createBottomTabNavigator();

const HomeScreen = () => <Typography fontSize="14px">Home Screen</Typography>;

const SettingsScreen = () => (
  <Typography fontSize="14px">Settings Screen</Typography>
);

const ProfileScreen = () => (
  <Typography fontSize="14px">ProfileScreen Screen</Typography>
);

export const BottomTabBarDemo = () => {
  const theme = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <BottomTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: theme.colors.background.base,
          tabBarInactiveTintColor: theme.colors.background.grey500,
        }}
      >
        <Tab.Screen
          component={HomeScreen}
          name="Home"
          options={{
            customTabBarProps: {
              icon: "home-5-line",
              size: 26,
            },
          }}
        />
        <Tab.Screen
          component={SettingsScreen}
          name="Settings"
          options={{
            title: "SettingsTitle",
            customTabBarProps: {
              icon: "user-3-line",
              size: 26,
            },
          }}
        />
        <Tab.Screen
          component={ProfileScreen}
          name="ProfileScreen"
          options={{
            tabBarLabel: "ProfileScreenLabel",
            customTabBarProps: {
              icon: "user-3-line",
              size: 26,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
