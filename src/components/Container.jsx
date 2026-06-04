import * as React from "react";

import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { flexbox, space, border, color, layout } from "styled-system";

const View = styled.View`
  ${flexbox}
  ${space}
  ${border}
  ${color}
  ${layout}
`;

export const Container = ({
  children,
  color = "background.primary",
  ...rest
}) => (
  <View color={color} {...rest}>
    {children}
  </View>
);

Container.propTypes = {
  ...propTypes.flexbox,
  ...propTypes.space,
  ...propTypes.border,
  ...propTypes.color,
  ...propTypes.layout,
  children: PropTypes.node,
};
