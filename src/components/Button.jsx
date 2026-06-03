import React, { useContext } from "react";

import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";
import { ThemeContext } from "styled-components/native";

import { Container } from "./Container";
import { Loader } from "./Loader";
import { Touchable } from "./Touchable";
import { Typography } from "./Typography";

// eslint-disable-next-line @bigbinary/neeto/no-dangling-constants
export const BUTTON_VARIANTS = Object.freeze({
  SOLID: "solid",
  SECONDARY: "secondary",
  TEXT: "text",
  DANGER: "danger",
  DANGER_INVERSE: "danger-inverse",
  DANGER_TEXT: "danger-text",
});

/**
 *
 * Buttons are touchable elements used to interact with the screen and to trigger an action.
 *
 * <div class="screenshots">
 *   <img src="screenshots/button/button.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button, Container } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  return (
 *    <Container>
 *      <Button my={moderateScale(9)} label="Button1" />
 *      <Button my={moderateScale(9)} disabled label="Disabled Button2" />
 *      <Button
 *        my={moderateScale(9)}
 *        LeftIcon={() => <Icon name="ri-add-line" color="white" size={moderateScale(16)} />}
 *        label="Left Icon Button"
 *      />
 *      <Button
 *        my={moderateScale(9)}
 *        RightIcon={() => <Icon name="ri-add-line" color="white" size={moderateScale(16)} />}
 *        label="Right Icon Button"
 *      />
 *      <Button my={moderateScale(9)} variant="text" label="Text Button" />
 *      <Button
 *        my={moderateScale(9)}
 *        variant="text"
 *        LeftIcon={() => (
 *          <Icon name="ri-add-line" color={theme.fonts.primary} size={moderateScale(16)} />
 *        )}
 *        label="Left Icon Text Button"
 *      />
 *      <Button
 *        my={moderateScale(9)}
 *        variant="text"
 *        RightIcon={() => (
 *          <Icon name="ri-add-line" color={theme.fonts.primary} size={moderateScale(16)} />
 *        )}
 *        label="Right Icon Text Button"
 *      />
 *    </Container>
 *  );
 * }
 * ```
 *
 */

export const Button = React.forwardRef(
  (
    {
      variant = "solid",
      label,
      labelStyle,
      RightIcon,
      LeftIcon,
      disabled,
      isLoading = false,
      loadingText = "",
      fontFamily,
      color,
      fontSize = "m",
      ...rest
    },
    ref
  ) => {
    const theme = useContext(ThemeContext);
    const width =
      variant === "text" || variant === "danger-text" ? null : "100%";

    const getButtonColors = () => {
      switch (variant) {
        case BUTTON_VARIANTS.SOLID:
          return {
            bg: theme.colors.background[disabled ? "grey400" : "base"],
            border: theme.colors.background[disabled ? "grey400" : "base"],
            color: theme.colors.background.white,
            ripple: "white",
          };
        case BUTTON_VARIANTS.SECONDARY:
          return {
            bg: "transparent",
            border: theme.colors.background.base,
            color: theme.colors.font.base,
            ripple: theme.colors.background.base,
          };
        case BUTTON_VARIANTS.TEXT:
          return {
            bg: "transparent",
            border: "transparent",
            color: theme.colors.font.primary,
            ripple: theme.colors.background.grey800,
          };
        case BUTTON_VARIANTS.DANGER:
          return {
            bg: theme.colors.background.danger,
            border: theme.colors.background.danger,
            color: theme.colors.background.white,
            ripple: "white",
          };
        case BUTTON_VARIANTS.DANGER_INVERSE:
          return {
            bg: theme.colors.background.white,
            border: theme.colors.background.danger,
            color: theme.colors.background.danger,
            ripple: theme.colors.background.grey800,
          };
        case BUTTON_VARIANTS.DANGER_TEXT:
          return {
            bg: "transparent",
            border: "transparent",
            color: theme.colors.background.danger,
            ripple: theme.colors.background.grey800,
          };
        default:
          return {
            bg: theme.colors.background[disabled ? "grey400" : "base"],
            border: theme.colors.background[disabled ? "grey400" : "base"],
            color: theme.colors.background.white,
            ripple: "white",
          };
      }
    };

    const renderOpacity = () => {
      if (
        [
          "text",
          "secondary",
          "danger",
          "danger-inverse",
          "danger-text",
        ].includes(variant) &&
        disabled
      ) {
        return 0.5;
      }

      return 1;
    };

    return (
      <Touchable
        alignItems="center"
        bg={getButtonColors().bg}
        borderColor={getButtonColors().border}
        borderRadius={moderateScale(8)}
        borderWidth={moderateScale(1)}
        disabled={disabled || isLoading}
        flexDirection="row"
        height={moderateScale(48)}
        justifyContent="center"
        opacity={renderOpacity()}
        px={width === null ? moderateScale(8) : undefined}
        ref={ref}
        rippleConfig={{ color: getButtonColors().ripple }}
        width={width}
        {...rest}
      >
        {isLoading ? (
          <Container flexDirection="row">
            <Loader color={getButtonColors().color} />
            {!!loadingText && (
              <Typography
                color={color || getButtonColors().color}
                fontFamily={fontFamily || theme.fonts.sf500}
                fontSize={fontSize}
                ml={moderateScale(8)}
                textAlign="center"
                {...labelStyle}
              >
                {loadingText}
              </Typography>
            )}
          </Container>
        ) : (
          <>
            {LeftIcon && <LeftIcon />}
            {label?.length > 0 && (
              <Typography
                color={color || getButtonColors().color}
                fontFamily={fontFamily || theme.fonts.sf500}
                fontSize={fontSize}
                ml={LeftIcon ? moderateScale(4) : 0}
                mr={RightIcon ? moderateScale(4) : 0}
                mx={moderateScale(2)}
                textAlign="center"
                {...labelStyle}
              >
                {label}
              </Typography>
            )}
            {RightIcon && <RightIcon />}
          </>
        )}
      </Touchable>
    );
  }
);

Button.propTypes = {
  ...propTypes.buttonStyle,
  ...propTypes.flexbox,
  ...propTypes.space,
  ...propTypes.border,
  ...propTypes.layout,
  ...propTypes.color,
  /**
   * Takes the text that needs to be displayed inside the button.
   */
  label: PropTypes.string,
  /**
   * Supported Type: 'text' | 'solid'
   * You can change the mode to adjust the styling.
   *  <ul>
   *    <li>text - flat button without background or outline.</li>
   *    <li>solid - button with a background color.</li>
   *  </ul>
   */
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
  /**
   * Enable or Disable the button.
   */
  disabled: PropTypes.bool,
  /**
   * Customize label style of the button.
   */
  labelStyle: PropTypes.object,
  /**
   * Render a component on the right side of the Label.
   */
  RightIcon: PropTypes.elementType,
  /**
   * Render a component on the left side of the Label.
   */
  LeftIcon: PropTypes.elementType,
  /**
   * To show loading indicator on the button.
   */
  isLoading: PropTypes.bool,
  /**
   * To show loading text along with the loading indicator on the button.
   */
  loadingText: PropTypes.string,
  fontFamily: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
};
Button.displayName = "Button";
