import * as React from "react";

import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";

import { Container } from "./Container";
import { Touchable } from "./Touchable";
import { Typography } from "./Typography";

/**
 * ButtonGroup is a linear set of segments, each of which function as a button that can display a different view/or perform a different action.
 * <div class="screenshots">
 *   <img src="screenshots/buttonGroup/buttonGroup.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import React, { useState } from 'react';
 * import { ButtonGroup } from '@bigbinary/neetoui-rn';
 *
 * export default function Main(){
 *  const buttonItems = ["Button1", "Button2"];
 *  const [activeButton, setActiveButton] = useState(buttonItems[0]);
 *
 *  return(
 *   <ButtonGroup
 *     buttonItems={buttonItems}
 *     onPress={setActiveButton}
 *     currentActiveBtn={activeButton}
 *    />
 *  );
 * }

 * ```
 */

export const ButtonGroup = ({
  activeColor = "background.grey600",
  inActiveColor = "background.white",
  buttonItems,
  onPress,
  currentActiveBtn,
  wrapperStyle = {},
  buttonStyle = {},
  buttonTextStyle = { ellipsizeMode: "tail", numberOfLines: 1 },
}) => (
  <Container
    alignSelf="center"
    border="1px solid"
    borderColor={activeColor}
    borderRadius={moderateScale(2)}
    flexDirection="row"
    justifyContent="space-between"
    my={moderateScale(3)}
    {...wrapperStyle}
  >
    {buttonItems.map(item => (
      <Touchable
        bg={item === currentActiveBtn ? activeColor : inActiveColor}
        key={item}
        p={moderateScale(2)}
        px={moderateScale(3)}
        onPress={() => {
          if (item !== currentActiveBtn) {
            onPress(item);
          }
        }}
        {...buttonStyle}
      >
        <Typography
          color={item === currentActiveBtn ? inActiveColor : activeColor}
          {...buttonTextStyle}
        >
          {item}
        </Typography>
      </Touchable>
    ))}
  </Container>
);

ButtonGroup.propTypes = {
  /**
   * Sets active color to the selected button in buttonGroup.
   */
  activeColor: PropTypes.string,
  /**
   * Sets inActive color to the unselected button in buttonGroup.
   */
  inActiveColor: PropTypes.string,
  /**
   * Returns the current selected item on button press.
   */
  onPress: PropTypes.func.isRequired,
  /**
   * Array of button text.
   */
  buttonItems: PropTypes.array.isRequired,
  /**
   * Sets current active button.
   */
  currentActiveBtn: PropTypes.string.isRequired,
  /**
   * Styling for main container.
   */
  wrapperStyle: PropTypes.object,
  /**
   * Styling for button text.
   */
  buttonTextStyle: PropTypes.object,
  /**
   * Styling for button.
   */
  buttonStyle: PropTypes.object,
};
