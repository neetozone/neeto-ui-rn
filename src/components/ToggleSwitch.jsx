import React, { useContext, useEffect, useRef } from "react";
import { Animated } from "react-native";

import { Check, Close } from "@bigbinary/neeto-icons-rn";
import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";
import { ThemeContext } from "styled-components/native";

import { Container } from "./Container";
import { Touchable } from "./Touchable";

/**
 * ToggleSwitch component is a simple switch toggle component describes what is being switched ON/OFF.
 *
 * <div class="screenshots">
 *   <img src="screenshots/toggleswitch/switchstyles.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React, {useState} from 'react';
 * import { Typography, Container } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  const [switchOne, setSwitchOne] = useState(true);
 *
 *  return (
 *    <Container>
 *     <ToggleSwitch
 *      value={switchOne}
 *      setValue={() => setSwitchOne(prevValue => !prevValue)}
 *     />
 *   </Container>
 *  );
 * }
 * ```
 */

export const ToggleSwitch = ({ value, onValueChange, disabled }) => {
  const theme = useContext(ThemeContext);
  const animatedPosition = useRef(
    new Animated.Value(value ? moderateScale(1) : 0)
  ).current;

  useEffect(() => {
    startAnimation();
  }, [value]);

  const startAnimation = () => {
    Animated.timing(animatedPosition, {
      toValue: value ? moderateScale(24) : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const containerBg = value
    ? theme.colors.background.success
    : "background.grey300";

  const iconColor = value
    ? theme.colors.background.success
    : theme.colors.font.grey500;

  const Icon = value ? Check : Close;

  return (
    <Touchable
      bg={containerBg}
      borderRadius={moderateScale(75)}
      disabled={disabled}
      height={moderateScale(28)}
      hitSlop={10}
      justifyContent="center"
      opacity={disabled ? 0.5 : 1}
      px={moderateScale(5)}
      width={moderateScale(50)}
      onPress={() => onValueChange(!value)}
    >
      <Animated.View style={{ transform: [{ translateX: animatedPosition }] }}>
        <Container
          alignItems="center"
          bg="background.white"
          borderRadius={moderateScale(10)}
          height={moderateScale(16)}
          justifyContent="center"
          width={moderateScale(16)}
        >
          <Icon
            color={iconColor}
            size={moderateScale(16)}
            viewBox={value ? "0 0 25 27" : "0 0 25 25"}
          />
        </Container>
      </Animated.View>
    </Touchable>
  );
};

ToggleSwitch.propTypes = {
  /**
   * Value of the switch, true means 'on', false means 'off'.
   */
  value: PropTypes.bool.isRequired,
  /**
   * Callback called with the new value when it changes.
   */
  onValueChange: PropTypes.func,
  /**
   * Disable toggling the switch.
   */
  disabled: PropTypes.bool,
};
