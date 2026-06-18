import React, { useContext } from "react";

import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components/native";

import AppleLogo from "@assets/icons/apple-logo.svg";
import GoogleLogo from "@assets/icons/google-logo.svg";
import { moderateScale } from "@utils/scale";

import { Container } from "./Container";
import { Loader } from "./Loader";
import { Touchable } from "./Touchable";
import { Typography } from "./Typography";

/**
 *
 * Buttons are touchable elements used to interact with the screen and to trigger an action.
 *
 * <div class="screenshots">
 *   <img src="screenshots/socialButton/socialButtons.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Container, SocialButton } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  return (
 *    <Container>
 *      <SocialButton variant="apple" my={moderateScale(9)} />
 *      <SocialButton variant="google" />
 *    </Container>
 *  );
 * }
 * ```
 *
 */

export const SocialButton = ({
  variant,
  disabled,
  labelStyle,
  isLoading,
  ...rest
}) => {
  const theme = useContext(ThemeContext);
  const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

  return (
    <Touchable
      alignItems="center"
      bg="transparent"
      borderColor={theme.colors.border.grey800}
      borderRadius={moderateScale(8)}
      borderWidth={moderateScale(1)}
      disabled={disabled}
      height={moderateScale(48)}
      justifyContent="center"
      rippleConfig={{ color: theme.colors.background.grey800 }}
      width="100%"
      {...rest}
    >
      {isLoading ? (
        <Loader color={theme.colors.background.grey800} />
      ) : (
        <>
          <Container left={moderateScale(17)} position="absolute">
            {variant === "apple" && <AppleLogo />}
            {variant === "google" && <GoogleLogo />}
          </Container>
          <Typography
            color={theme.colors.font.primary}
            fontFamily={theme.fonts.sf500}
            fontSize="m"
            {...labelStyle}
          >
            Continue with {capitalize(variant)}
          </Typography>
        </>
      )}
    </Touchable>
  );
};

SocialButton.propTypes = {
  ...propTypes.buttonStyle,
  ...propTypes.flexbox,
  ...propTypes.space,
  ...propTypes.border,
  ...propTypes.layout,
  ...propTypes.color,
  /**
   * Supported Type: 'apple' | 'google'
   */
  variant: PropTypes.oneOf(["apple", "google"]),
  /**
   * Enable or Disable the button
   */
  disabled: PropTypes.bool,
  /**
   * Customize label style of the button
   */
  labelStyle: PropTypes.object,
  /**
   * Button loading status
   */
  isLoading: PropTypes.bool,
};
