import React from "react";

import { Close } from "@bigbinary/neeto-icons-rn";
import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";

import { Container } from "./Container";
import { Touchable } from "./Touchable";
import { Typography } from "./Typography";

const variantStyleObj = {
  solid: {
    bg: "background.grey200",
  },
  outlined: {
    bg: "background.white",
    border: "1px solid",
    borderColor: "border.grey200",
  },
};

/**
 *
 * Chips are compact elements that represent an input, attribute, or action.
 *
 * <div class="screenshots">
 *   <img src="screenshots/chip/chip.png" />
 * </div>
 *
 *   ## Usage
 * ```js
 * import * as React from 'react';
 * import { Chip, Container, Typography } from '@bigbinary/neetoui-rn';
 *
 * export default function Main(){
 *  return (
 *   <Container>
 *     <Chip
 *      label="Outlined Chip"
 *      LeftIcon={() => <Typography>📣</Typography>}
 *      variant="outlined"
 *      onChipPress={() => {
 *       alert("Chip pressed");
 *      }}
 *      onClose={() => {
 *        alert("On Close clicked");
 *       }}
 *    />
 *   </Container>
 *  );
 * }
 * ```
 *
 */

const commonContainerStyle = {
  alignItems: "center",
  borderRadius: moderateScale(20),
  flexDirection: "row",
};

export const Chip = ({
  label,
  LeftIcon,
  variant = "outlined",
  labelColor = "font.primary",
  closeIconBackground = "background.grey500",
  closeIconColor = "white",
  onClose,
  onChipPress,
  isDisabled = false,
  closeIconSize = moderateScale(14),
  closeIcon: CloseIcon = Close,
  closeIconProps = { viewBox: "0 0 25 25" },
  containerStyle,
  closeIconContainerStyle,
}) => (
  <Container
    {...commonContainerStyle}
    {...(variant && variantStyleObj[variant])}
    {...(isDisabled && { opacity: 0.5 })}
    {...containerStyle}
    m={0}
    p={0}
  >
    <Touchable
      disabled={!onChipPress || isDisabled}
      overflow="hidden"
      px={moderateScale(4)}
      py={moderateScale(2)}
      onPress={onChipPress}
      {...commonContainerStyle}
      {...containerStyle}
    >
      {LeftIcon && <LeftIcon />}
      <Typography color={labelColor} fontFamily="sf400" mx={moderateScale(2)}>
        {label}
      </Typography>
    </Touchable>
    {onClose && (
      <Container
        bg={closeIconBackground}
        borderRadius={closeIconSize}
        m={moderateScale(3)}
        p={moderateScale(1)}
        {...closeIconContainerStyle}
      >
        <Touchable disabled={isDisabled} onPress={onClose}>
          <CloseIcon
            color={closeIconColor}
            size={closeIconSize}
            {...closeIconProps}
          />
        </Touchable>
      </Container>
    )}
  </Container>
);

Chip.propTypes = {
  /**
   * Takes the text that needs to be displayed inside the chip.
   */
  label: PropTypes.string.isRequired,
  /**
   * Expects a component. Used to set left Icon or Avatar.
   */
  LeftIcon: PropTypes.elementType,
  /**
   * Supported variant: 'outlined' | 'solid'
   */
  variant: PropTypes.string,
  /**
   * Sets chip text color.
   */
  labelColor: PropTypes.string,
  /**
   * Sets close Icon background color.
   */
  closeIconBackground: PropTypes.string,
  /**
   * Sets close Icon color.
   */
  closeIconColor: PropTypes.string,
  /**
   * Expects a function to execute on close icon press. The close icon appears only when the onClose prop is specified.
   */
  onClose: PropTypes.func,
  /**
   * Used to set the size of the close icon.
   */
  closeIconSize: PropTypes.number,
  /**
   * Close icon can be specified if default one needs to changed. Only supports neeto-icons.
   */
  closeIcon: PropTypes.elementType,
  /**
   * Add additional customization to close icon.
   */
  closeIconProps: PropTypes.object,
  /**
   * Expects a function to execute on chip press.
   */
  onChipPress: PropTypes.func,
  /**
   * Whether the chip is disabled. A disabled chip has a overlay and onPress is not called on touch.
   */
  isDisabled: PropTypes.bool,
  containerStyle: PropTypes.object,
  closeIconContainerStyle: PropTypes.object,
};
