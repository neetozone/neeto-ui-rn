import React, { useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

import PropTypes from "prop-types";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { moderateScale } from "@utils/scale";

import { Container } from "./Container";
import { Typography } from "./Typography";

const TabElement = ({
  isFocused,
  onPress,
  label,
  tabBarActiveTintColor,
  tabBarInactiveTintColor,
  icon: Icon,
  size,
}) => {
  const offset = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    if (isFocused) {
      offset.value = withTiming(1, { duration: 500 });
    } else {
      offset.value = withTiming(0, { duration: 0 });
    }
  }, [isFocused]);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, [0, 1], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    }),
  }));

  const animatedStyles2 = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, [0, 0.9, 1], [0, 0.5, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    }),
    transform: [
      {
        scale: interpolate(offset.value, [0, 0.8, 1], [1, 1.2, 1], {
          extrapolateRight: Extrapolation.CLAMP,
        }),
      },
    ],
  }));

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container
        alignItems="center"
        borderColor="background.grey200"
        borderTopWidth={moderateScale(1)}
        flex={1}
      >
        <Container
          alignItems="center"
          height={moderateScale(35)}
          mb={moderateScale(4)}
          width={moderateScale(48)}
        >
          <Animated.View style={[styles.iconContainer, animatedStyles]}>
            <Icon
              size={size}
              color={
                isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor
              }
            />
          </Animated.View>
          <Animated.View style={[styles.iconContainer, animatedStyles2]}>
            <Icon
              size={size}
              color={
                isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor
              }
            />
          </Animated.View>
        </Container>
        <Typography
          color={isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor}
          fontFamily="sf500"
          fontSize="4xs"
        >
          {label}
        </Typography>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    margin: moderateScale(10),
  },
});

/**
 *
 * BottomTabBar is animated custom tabbar component which needs to used along with [React Navigation & Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)
 * <div class="screenshots">
 *   <img src="screenshots/bottomTabBar/bottomTabBar-1.png" />
 *   <img src="screenshots/bottomTabBar/bottomTabBar-2.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Typography, BottomTabBar  } from '@bigbinary/neetoui-rn';
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 * import { ThemeContext } from "styled-components/native";
 * import { moderateScale } from "@utils/scale";
 *
 * const Tab = createBottomTabNavigator();
 *
 * const HomeScreen = () => {
 *  return (
 *   <Typography fontSize="14px">Home Screen</Typography>
 *  )
 * }
 *
 * const SettingsScreen = () => {
 *   return (
 *     <Typography fontSize="14px">Settings Screen</Typography>
 *   )
 * }
 *
 * export default function Main() {
 *  const theme = useContext(ThemeContext);
 *  return (
 *    <Tab.Navigator
 *      screenOptions={{
 *        tabBarActiveTintColor: theme.colors.background.base,
 *        tabBarInactiveTintColor: theme.colors.background.grey500,
 *      }}
 *      tabBar={props => <BottomTabBar {...props} />}
 *    >
 *      <Tab.Screen name="Home" component={HomeScreen}
 *        options={{
 *          customTabBarProps: {
 *            icon: "home-5-line",
 *            size: moderateScale(26),
 *          },
 *        }}
 *      />
 *      <Tab.Screen name="Settings" component={SettingsScreen}
 *        options={{
 *          customTabBarProps: {
 *            icon: "user-3-line",
 *            size: moderateScale(26),
 *          },
 *        }} />
 *    </Tab.Navigator>
 *  );
 * }
 * ```
 *
 */

export const BottomTabBar = ({ state, descriptors, navigation }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Container
      bg="background.white"
      flexDirection="row"
      height={bottom === 0 ? moderateScale(63) : moderateScale(83)}
    >
      {state.routes.map(({ key, name }, index) => {
        const { options } = descriptors[key];
        const isFocused = state.index === index;
        const { icon, size } = options?.customTabBarProps || {};
        const { tabBarActiveTintColor, tabBarInactiveTintColor } = options;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name, merge: true });
          }
        };

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : name;

        return (
          <TabElement
            icon={icon}
            isFocused={isFocused}
            key={index}
            label={label}
            size={size}
            tabBarActiveTintColor={tabBarActiveTintColor}
            tabBarInactiveTintColor={tabBarInactiveTintColor}
            onPress={onPress}
          />
        );
      })}
    </Container>
  );
};

TabElement.propTypes = {
  isFocused: PropTypes.bool,
  onPress: PropTypes.func,
  label: PropTypes.string,
  tabBarActiveTintColor: PropTypes.string,
  tabBarInactiveTintColor: PropTypes.string,
  icon: PropTypes.elementType,
  size: PropTypes.number,
};

BottomTabBar.propTypes = {
  state: PropTypes.object,
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
};
