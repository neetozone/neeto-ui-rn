import * as React from "react";

import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";

import { theme } from "@theme";

import { Touchable } from "./Touchable";

/**
 * FAB component is a floating action button which represents the primary action in an application and is built on top of styled-system.
 *
 * This component supports below props categories from [styled-system ](/styled-system).
 *
 * <ul>
 * <li>space</li>
 * <li>layout</li>
 * <li>flexbox</li>
 * <li>color</li>
 * <li>textStyle</li>
 * <li>buttonStyle</li>
 * </ul>
 *
 * <div class="screenshots">
 *   <img src="screenshots/fab/buttonstyles.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { FAB, Container, Typography } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  return (
 *    <Container>
 *        <FAB
 *          Icon={() => {
 *            return <Typography>🔔</Typography>;
 *          }}
 *        />
 *     </Container>
 *  );
 * }
 * ```
 *
 * @extends StyledSystems props /styled-system
 */

// eslint-disable-next-line @bigbinary/neeto/no-dangling-constants
export const FAB = ({
  Icon,
  bg,
  disabled,
  variant = "solid",
  onPress,
  size = moderateScale(56),
  alignItems = "center",
  justifyContent = "center",
  borderRadius = moderateScale(28),
  ...rest
}) => {
  const shadowStyle = {
    shadowColor: theme.colors.background.grey800,
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
    elevation: 5,
  };

  let style = rest.style || {};
  if (disabled) {
    style = { ...style, opacity: 0.5 };
  }

  return (
    <Touchable
      {...(variant !== "inverse" ? { bg } : {})}
      disabled={disabled}
      style={[style, shadowStyle]}
      variant={variant}
      onPress={onPress}
      {...(variant !== "inverse" ? { borderColor: bg } : {})}
      alignItems={alignItems}
      borderRadius={borderRadius}
      justifyContent={justifyContent}
      size={size}
      {...rest}
    >
      <Icon />
    </Touchable>
  );
};

FAB.propTypes = {
  ...propTypes.flexbox,
  ...propTypes.position,
  ...propTypes.space,
  ...propTypes.border,
  ...propTypes.layout,
  ...propTypes.color,
  /**
   * Icon to display for the Button.
   */
  Icon: PropTypes.elementType.isRequired,
  /**
   * Function to execute on press.
   */
  onPress: PropTypes.func.isRequired,
  /**
   * String to set background color.
   */
  bg: PropTypes.string,
  /**
   * Boolean to disable button.
   */
  disabled: PropTypes.bool,
  variant: PropTypes.string,
};
