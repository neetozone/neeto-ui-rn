import React, { useRef } from "react";
import { TouchableWithoutFeedback as RNTouchableWithoutFeedback } from "react-native";

import PropTypes from "prop-types";

const TouchableWithoutFeedback = ({ onPress, onPressIn, ...props }) => {
  const _touchActivatePositionRef = useRef(null);

  function _onPressIn(e) {
    const { pageX, pageY } = e.nativeEvent;

    _touchActivatePositionRef.current = {
      pageX,
      pageY,
    };

    onPressIn?.(e);
  }

  function _onPress(e) {
    const { pageX, pageY } = e.nativeEvent;

    const absX = Math.abs(_touchActivatePositionRef?.current?.pageX - pageX);
    const absY = Math.abs(_touchActivatePositionRef?.current?.pageY - pageY);

    const dragged = absX > 2 || absY > 2;
    if (!dragged) {
      onPress?.(e);
    }
  }

  return (
    <RNTouchableWithoutFeedback
      onPress={_onPress}
      onPressIn={_onPressIn}
      {...props}
    >
      {props.children}
    </RNTouchableWithoutFeedback>
  );
};

TouchableWithoutFeedback.propTypes = {
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default TouchableWithoutFeedback;
