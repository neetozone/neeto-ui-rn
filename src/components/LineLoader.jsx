import React from "react";

import PropTypes from "prop-types";
import ContentLoader, { Rect } from "react-content-loader/native";

import { moderateScale } from "@utils/scale";

import { theme } from "../theme";

export const LineLoader = ({
  isLoading,
  backgroundColor = theme.colors.background.primary,
  foregroundColor = theme.colors.background.base,
  height = moderateScale(3),
}) => (
  <ContentLoader
    animate={isLoading}
    backgroundColor={backgroundColor}
    foregroundColor={foregroundColor}
    height={height}
    interval={0}
    key={isLoading}
    speed={1}
    width="100%"
  >
    <Rect height={height} width="100%" x={0} y={0} />
  </ContentLoader>
);

LineLoader.propTypes = {
  /**
   * Shows loader when true.
   */
  isLoading: PropTypes.bool,
  /**
   * Custom background color of loader.
   */
  backgroundColor: PropTypes.string,
  /**
   * Custom foreground color of loader.
   */
  foregroundColor: PropTypes.string,
  /**
   * Height of loader.
   */
  height: PropTypes.number,
};
