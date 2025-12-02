import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Typography, SegmentedTopBar } from "@components";

const SegmentedTopBarMetaData = {
  title: "SegmentedTopBar",
  component: SegmentedTopBar,
  argTypes: {},
  args: {},
  parameters: {
    notes: `
A Segment Picker component that provides toggling between two or more views.

![image](assets/screenshots/toptabbar/toptabbar-1.png)

![image](assets/screenshots/toptabbar/toptabbar-2.png)

## Usage

>import * as React from 'react';
>import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
>import { NavigationContainer } from "@react-navigation/native";
>
>import { SegmentedTopBar } from '@bigbinary/neetoui-rn';
>
>const Tab = createMaterialTopTabNavigator();
>
>export default function Main(){
>  return (
>    <NavigationContainer>
>      <Tab.Navigator tabBar={props => <SegmentedTopBar {...props} />} >
>        <Tab.Screen
>          name="Home"
>          component={HomeScreen}
>        />
>
>        <Tab.Screen
>          name="Settings"
>          component={SettingsScreen}
>        />
>      </Tab.Navigator>
>    </NavigationContainer>
>  );
> }
`,
  },
};

export default SegmentedTopBarMetaData;

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => <Typography fontSize="14px">Home Screen</Typography>;

const SettingsScreen = () => (
  <Typography fontSize="14px">Settings Screen</Typography>
);

const ProfileScreen = () => (
  <Typography fontSize="14px">ProfileScreen</Typography>
);

export const SegmentedTopBarDemo = () => (
  <NavigationContainer>
    <Tab.Navigator tabBar={props => <SegmentedTopBar {...props} />}>
      <Tab.Screen component={HomeScreen} name="Home" />
      <Tab.Screen
        component={SettingsScreen}
        name="Settings"
        options={{
          title: "SettingsTitle",
        }}
      />
      <Tab.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          tabBarLabel: "ProfileScreenLabel",
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);
