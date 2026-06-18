import * as React from "react";

import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { flexbox, space, color, layout } from "styled-system";

import { moderateScale } from "@utils/scale";

/**
 *
 * Divider is a separator line that can be used between two different sections.
 *
 * <div class="screenshots">
 *   <img src="screenshots/divider/divider.png" />
 * </div>
 *
 *   ## Usage
 * ```js
 * import * as React from 'react';
 * import { Divider } from '@bigbinary/neetoui-rn';
 *
 * export default function Main(){
 *  return (
 *   <Container>
 *     <Divider orientation="vertical" thickness={moderateScale(1)}/>
 *   </Container>
 *  );
 * }
 * ```
 *
 */

const View = styled.View`
  ${flexbox}
  ${space}
  ${color}
  ${layout}
`;

export const Divider = ({
  thickness = moderateScale(1),
  orientation = "horizontal",
  bg = "background.grey400",
  ...rest
}) => {
  const isHorizontal = orientation === "horizontal";
  const lineStyles = isHorizontal
    ? {
        ...rest,
        height: thickness,
      }
    : {
        ...rest,
        width: thickness,
        flex: 1,
      };

  return thickness > 0 && <View bg={bg} {...lineStyles} />;
};

Divider.propTypes = {
  ...propTypes.flexbox,
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.layout,
  /**
   * To specify whether the line needs to horizontal or vertical
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * To specify the thickness of divider
   */
  thickness: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * To specify the color of divider
   */
  bg: PropTypes.string,
};
