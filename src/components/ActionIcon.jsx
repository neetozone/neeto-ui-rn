import React from "react";

import PropTypes from "prop-types";

import { theme } from "@theme";
import { moderateScale } from "@utils/scale";

import { Loader } from "./Loader";
import { Touchable } from "./Touchable";
import { Typography } from "./Typography";

export const ActionIcon = ({
  isLoading = false,
  icon: Icon,
  onPress,
  size = moderateScale(24),
  color = theme.colors.font.grey800,
  disabled = false,
  label,
  iconProps,
  ...rest
}) => (
  <Touchable
    alignItems="center"
    aspectRatio={1}
    disabled={disabled || isLoading}
    height={moderateScale(40)}
    justifyContent="center"
    maxHeight={moderateScale(64)}
    maxWidth={moderateScale(64)}
    opacity={disabled ? 0.5 : 1}
    onPress={onPress}
    {...rest}
  >
    {isLoading ? <Loader /> : <Icon color={color} size={size} {...iconProps} />}
    {!!label && (
      <Typography
        color="font.grey600"
        fontFamily="sf400"
        fontSize="4xs"
        mt={moderateScale(2)}
      >
        {label}
      </Typography>
    )}
  </Touchable>
);

ActionIcon.propTypes = {
  /**
   * The icon that should be displayed
   */
  icon: PropTypes.elementType,
  /**
   * The Func that should be triggered on click of the action icon
   */
  onPress: PropTypes.func,
  /** To customize the size of the icon
   */
  size: PropTypes.number,
  /** To customize the color of the icon
   */
  color: PropTypes.string,
  /** To set the disabled state
   */
  disabled: PropTypes.bool,
  /** The label that should be displayed next to the icon
   */
  label: PropTypes.string,
  /** To display the loading state
   */
  isLoading: PropTypes.bool,
  /** To additionally customize the icon
   */
  iconProps: PropTypes.object,
};
