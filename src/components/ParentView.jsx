import React, { useContext } from "react";
import { Keyboard, StatusBar } from "react-native";

import PropTypes from "prop-types";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";

import { Container } from "./Container";

import { useKeyboard } from "../hooks/useKeyboard";

/**
 *ParentView wraps the children with SafeAreaView.
 *
 *  ## Usage
 * ```js
 * import * as React from "react";
 * import { moderateScale } from "@utils/scale";
 * import { Typography, ParentView } from "@bigbinary/neetoui-rn";
 *
 *export default function Main() {
 *  return (
 *    <ParentView>
 *        <Typography> This is wrapped in ParentView</Typography>
 *    </ParentView>
 *  );
 *}
 *
 * ```
 */

export const ParentView = ({
  barStyle = "light-content",
  children,
  backgroundColor,
  bg,
  topInset = true,
  rightInset = true,
  leftInset = true,
  bottomInset = true,
  shouldDismissKeyboardOnTap = true,
  ...rest
}) => {
  const theme = useContext(ThemeContext);
  const keyboardHeight = useKeyboard();

  const safeAreaViewProps = {
    edges: [
      ...(topInset ? ["top"] : []),
      ...(rightInset ? ["right"] : []),
      ...(leftInset ? ["left"] : []),
    ],
  };

  const newBackgroundColor =
    backgroundColor || bg || theme.colors.background.parentView;

  const statusBarColors = {
    default: theme.colors.background.white,
    "dark-content": theme.colors.background.white,
    "light-content": theme.colors.background.base,
  };

  const statusBarColor =
    statusBarColors[barStyle] || statusBarColors["default"];

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      flex={1}
      {...safeAreaViewProps}
      style={{ backgroundColor: statusBarColor }}
    >
      <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} />
      <Container
        {...(shouldDismissKeyboardOnTap
          ? {
              onTouchStart: e => {
                if (
                  keyboardHeight &&
                  e?.target?._internalFiberInstanceHandleDEV?.elementType?.indexOf(
                    "TextInput"
                  ) === -1
                ) {
                  Keyboard.dismiss();
                }
              },
            }
          : {})}
        backgroundColor={newBackgroundColor}
        flex={1}
        {...rest}
        {...(bottomInset && { pb: insets.bottom })}
      >
        {children}
      </Container>
    </SafeAreaView>
  );
};

ParentView.propTypes = {
  /**
   * Sets the color of the status bar text.
   */
  barStyle: PropTypes.string,
  children: PropTypes.node,
  /**
   * Sets the background color
   */
  backgroundColor: PropTypes.string,
  /**
   * Sets the background color
   */
  bg: PropTypes.string,
  /**
   * Sets Top Inset
   */
  topInset: PropTypes.bool,
  /**
   * Sets Right Inset
   */
  rightInset: PropTypes.bool,
  /**
   * Sets Left Inset
   */
  leftInset: PropTypes.bool,
  /**
   * Sets Bottom Inset
   */
  bottomInset: PropTypes.bool,
  /**
   * Dismiss keyboard on tap
   */
  shouldDismissKeyboardOnTap: PropTypes.bool,
};
