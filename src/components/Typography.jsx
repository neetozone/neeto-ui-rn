import * as React from "react";
import { Platform } from "react-native";

import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  space,
  layout,
  flexbox,
  typography,
  color,
  textStyle,
  position,
  system,
} from "styled-system";

import { theme } from "../theme";

export const Text = styled.Text`
  ${textStyle}
  ${space}
  ${layout}
  ${flexbox}
  ${typography}
  ${color}
  ${position}
  ${system({
    textDecoration: {
      property: "textDecoration",
      cssProperty: "textDecoration",
    },
    textTransform: { property: "textTransform", cssProperty: "textTransform" },
  })}
  ${Platform.select({
    android: `
      include-font-padding: false;
      text-align-vertical: center;
    `,
    ios: "",
  })}
`;

/**
 * Typography component is a primitive text component which is built on top of styled-system.
 *
 * This component supports below props categories from [styled-system ](/styled-system).
 *
 * <ul>
 * <li>space</li>
 * <li>layout</li>
 * <li>flexbox</li>
 * <li>typography</li>
 * <li>color</li>
 * <li>textStyle</li>
 * </ul>
 *
 * <div class="screenshots">
 *   <img src="screenshots/typography/colors.png" />
 *   <img src="screenshots/typography/fontfamilies.png" />
 * </div>
 *
 * <div class="screenshots">
 *   <img src="screenshots/typography/fontsizes.png" />
 *   <img src="screenshots/typography/textstyles.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Typography, Container } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  return (
 *    <Container>
 *     <Typography>
 *         This is basic example of Typography
 *      </Typography>
 *     </Container>
 *  );
 * }
 * ```
 *
 * @extends StyledSystems props /styled-system
 */

export const Typography = ({
  children,
  fontSize,
  lineHeightMultiplier = 1.3,
  style,
  ...rest
}) => {
  const parseSize = size => {
    if (typeof size === "number") return size;

    if (typeof size === "string") {
      // Check if it's a theme token
      const themeSize = theme.fontSizes[size];
      if (themeSize !== undefined) {
        return themeSize;
      }

      const parsed = parseFloat(size);

      return isNaN(parsed) ? theme.fontSizes.s : parsed;
    }

    return theme.fontSizes.s;
  };

  const calculatedLineHeight = React.useMemo(() => {
    const size = parseSize(fontSize || rest.fontSize || theme.fontSizes.s);

    return Math.floor(size * lineHeightMultiplier);
  }, [fontSize, rest.fontSize, lineHeightMultiplier]);

  return (
    <Text
      android_hyphenationFrequency="full"
      fontSize={fontSize}
      textBreakStrategy="simple"
      {...rest}
      style={[
        Platform.OS === "android" && {
          lineHeight: calculatedLineHeight,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

Typography.propTypes = {
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.flexbox,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.textStyle,
  children: PropTypes.node,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineHeightMultiplier: PropTypes.number,
  style: PropTypes.object,
};

Typography.defaultProps = {
  textStyle: "defaultTextStyle",
  lineHeightMultiplier: 1.3,
};
