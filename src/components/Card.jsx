import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";
import { flexbox, space, border, color, layout } from "styled-system";

import { theme } from "@theme";

import { getShadowStyles } from "../utils";

const StyledTouchableOpacity = styled(TouchableOpacity)`
  ${flexbox}
  ${space}
  ${border}
  ${color}
  ${layout}
`;

/**
 * This component is wrapper over Container component.
 * This component supports below props categories from [styled-system ](/styled-system).
 *
 *
 * <ul>
 * <li>flexbox</li>
 * <li>space</li>
 * <li>border</li>
 * <li>color</li>
 * <li>layout</li>
 * </ul>
 *
 * <div class="screenshots">
 *   <img src="screenshots/card/shadows.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Card, Typography } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  return (
 *     <Card height="100px" width="100px" bg="background.danger" elevation={moderateScale(8)}>
 *       <Typography fontSize="14px">Card</Typography>
 *     </Card>
 *  );
 * }
 * ```
 *
 */

export const Card = ({ children, elevation, ...rest }) => {
  const shadowStyles = elevation ? getShadowStyles(elevation) : {};

  const cardStyles = { ...styles.defaultShadows, ...shadowStyles };

  return (
    <StyledTouchableOpacity
      activeOpacity={rest.onPress ? 0.2 : 1}
      style={cardStyles}
      {...rest}
    >
      {children}
    </StyledTouchableOpacity>
  );
};

Card.propTypes = {
  /**
   * To change the shadow styles based on elevation.
   * Valid elevation values (0-21).
   */
  elevation: PropTypes.number,
  children: PropTypes.node,
};

export const styles = StyleSheet.create({
  defaultShadows: {
    shadowColor: theme.colors.background.grey800,
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
    elevation: 5,
  },
});
