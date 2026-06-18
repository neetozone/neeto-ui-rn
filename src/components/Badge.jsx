import React from "react";

import PropTypes from "prop-types";

import { moderateScale } from "@utils/scale";

import { Container } from "./Container";
import { Typography } from "./Typography";

/**
 *
 * This component supports below props categories from [styled-system ](/styled-system).
 * <ul>
 * <li>flexbox</li>
 * <li>space</li>
 * <li>border</li>
 * <li>color</li>
 * <li>layout</li>
 * </ul>
 *
 * <div class="screenshots">
 *   <img src="screenshots/badge/badges.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Badge, Container } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  return (
 *    <Container>
 *       <Badge
 *          content="test"
 *          size={moderateScale(32)}
 *          fontSize="12px"
 *          badgeColor="background.secondary"
 *          color="font.secondary"
 *        />
 *    </Container>
 *  );
 * }
 * ```
 *
 */

export const Badge = ({
  badgeColor = "background.base",
  content,
  size = moderateScale(21),
  fontSize = "xs",
  fontFamily = "sf400",
  color = "font.white",
  ...rest
}) =>
  size > 0 && (
    <Container
      alignItems="center"
      bg={badgeColor}
      borderRadius={moderateScale(15)}
      justifyContent="center"
      px={moderateScale(6)}
      py={moderateScale(2)}
      {...rest}
    >
      {!!content && (
        <Typography color={color} fontFamily={fontFamily} fontSize={fontSize}>
          {content}
        </Typography>
      )}
    </Container>
  );

Badge.propTypes = {
  /**
   * Custom badge content color.
   */
  color: PropTypes.string,
  /**
   * Custom badge background color.
   */
  badgeColor: PropTypes.string,
  /**
   * To change content of the badge
   */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Custom badge size.
   */
  size: PropTypes.number,
  /**
   * Custom font-size for badge content.
   */
  fontSize: PropTypes.string,
  /**
   * Custom font-family for badge content.
   */
  fontFamily: PropTypes.string,
};
