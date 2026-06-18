import React, { useEffect } from "react";

import PropTypes from "prop-types";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  withRepeat,
  Easing,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { theme } from "@theme";
import { moderateScale } from "@utils/scale";

import { Container } from "./Container";

// eslint-disable-next-line @bigbinary/neeto/no-dangling-constants
const LOADER_WIDTH = {
  s: parseInt(moderateScale(18)),
  m: parseInt(moderateScale(24)),
  l: parseInt(moderateScale(36)),
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 ** Component is used to show a loading indication to user.
 *
 * * <div class="screenshots">
 *   <img src="screenshots/loaders/loaders.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Container, Loader } from '@bigbinary/neetoui-rn';
 * export default function Main() {
 *  return (
 *    <Container>
 *      <Loader size='l'/>
 *    </Container>
 *  )
 * }
 * ```
 *
 */

export const Loader = ({
  color = theme.colors.background.lightBlue400,
  size = "s",
}) => {
  const progress = useSharedValue(0);
  const width = LOADER_WIDTH[size];
  const stroke_width = width * 0.15;
  const radius = (width - stroke_width) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(2, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: -interpolate(
      progress.value,
      [0, 1, 2],
      [0, circumference, circumference * 2]
    ),
  }));

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 2], [0, 420]);

    return {
      width,
      height: width,
      alignItems: "center",
      justifyContent: "center",
      transform: [{ rotate: `${scale}deg` }],
    };
  });

  return (
    <Container alignItems="center" justifyContent="center">
      <Animated.View style={animatedStyles}>
        <Svg fill="none" height={width} width={width}>
          <AnimatedCircle
            animatedProps={animatedProps}
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke={color}
            strokeDasharray={circumference}
            strokeLinecap="round"
            strokeWidth={stroke_width}
          />
        </Svg>
      </Animated.View>
    </Container>
  );
};

Loader.propTypes = {
  /**
   * Size variant to select the width of the loader.
   */
  size: PropTypes.oneOf(["s", "m", "l"]),
  /**
   * Color variant to select the color from the available options.
   */
  color: PropTypes.string,
};
