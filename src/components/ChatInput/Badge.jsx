import React from "react";

import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";

import { Container } from "../Container";
import { Typography } from "../Typography";

export const Badge = ({ text, isNoteOptionSelected }) => (
  <Container
    alignSelf="flex-start"
    bg={isNoteOptionSelected ? "white" : "background.oldLace"}
    borderRadius={moderateScale(20)}
    flexDirection="row"
    flexGrow={0}
    px={moderateScale(4)}
  >
    <Typography fontSize="3xs">{text}</Typography>
  </Container>
);

Badge.propTypes = {
  text: PropTypes.string,
  isNoteOptionSelected: PropTypes.bool,
};
