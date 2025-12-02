import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

import PropTypes from "prop-types";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

import { theme } from "@theme";

const springConfig = {
  mass: 1,
  damping: 18,
  stiffness: 100,
  overshootClamping: false,
  restSpeedThreshold: 0.5,
  restDisplacementThreshold: 0.5,
};

const spacing = moderateScale(6);

export const Indicator = ({ measure }) => {
  const firstRender = useRef(true);
  const translateX = useSharedValue(0);
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    if (!measure) return;

    const { x, width } = measure;

    if (firstRender.current) {
      if (translateX.value === 0 && x > 0) {
        translateX.value = x + spacing / 2;
      }

      if (animatedWidth.value === 0 && width > 0) {
        animatedWidth.value = width - spacing;
      }

      firstRender.current = false;
    } else {
      // Cancel any ongoing animations first
      cancelAnimation(translateX);
      cancelAnimation(animatedWidth);

      translateX.value = withSpring(x + spacing / 2, springConfig);
      animatedWidth.value = withSpring(width - spacing, springConfig);
    }
  }, [measure]);

  const tabTranslateAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: animatedWidth.value,
  }));

  // Guard against undefined measure
  if (
    !measure ||
    typeof measure.x !== "number" ||
    typeof measure.width !== "number" ||
    typeof measure.height !== "number"
  ) {
    return null;
  }

  const { height } = measure;

  return (
    <Animated.View
      style={[
        styles.movingSegmentStyle,
        { height: height - spacing },
        tabTranslateAnimatedStyles,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  movingSegmentStyle: {
    position: "absolute",
    top: spacing / 2,
    borderRadius: moderateScale(6),
    backgroundColor: theme.colors.background.primary,
    shadowColor: theme.colors.background.grey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

Indicator.propTypes = {
  measure: PropTypes.shape({
    x: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};
