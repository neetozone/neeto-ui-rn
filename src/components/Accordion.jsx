import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { Animated, StyleSheet } from "react-native";

import { Down } from "@bigbinary/neeto-icons-rn";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components/native";
import {
  buttonStyle,
  flexbox,
  space,
  border,
  color,
  layout,
} from "styled-system";

import { moderateScale } from "@utils/scale";

import { Container } from "./Container";

const TouchableOpacity = styled.TouchableOpacity`
  ${buttonStyle}
  ${flexbox}
  ${space}
  ${border}
  ${color}
  ${layout}
`;

const AccordionBody = ({ isExpanded, children }) => {
  const animationController = useRef(
    new Animated.Value(isExpanded ? 1 : 0)
  ).current;

  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    Animated.timing(animationController, {
      duration: 300,
      toValue: isExpanded ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const bodyContentHeight = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, viewHeight],
  });

  const getLayout = event => {
    const height = event.nativeEvent.layout.height;
    setViewHeight(height);
  };

  return (
    <Animated.View style={{ height: bodyContentHeight, overflow: "hidden" }}>
      <Container position="absolute" width="100%" onLayout={getLayout}>
        {children}
      </Container>
    </Animated.View>
  );
};

/**
 * A component used to display an expandable list item.
 *
 * <div class="screenshots">
 *   <img src="screenshots/accordion/accordion.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Container, Accordion } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  return (
 *    <Container>
 *     <Accordion
 *         header={() => (
 *           <Container flexDirection="row" alignItems="center">
 *             <Typography bg="#00BA8829" color="font.primary" p={moderateScale(1)}>
 *               Open
 *             </Typography>
 *             <Typography px={moderateScale(2)}>Low</Typography>
 *           </Container>
 *         )}
 *         iconProp={{
 *           IconLabel: () => (
 *             <Typography color="font.danger">Collapse</Typography>
 *           ),
 *           iconColor: theme.colors.font.danger,
 *         }}
 *       >
 *         <Container my={moderateScale(2)} p={moderateScale(3)} bg="background.grey100" borderRadius={moderateScale(8)}>
 *           <Typography color="font.primary">Body Content</Typography>
 *         </Container>
 *       </Accordion>
 *    </Container>
 *  );
 * }
 * ```
 *
 */

export const Accordion = React.forwardRef(
  (
    {
      header,
      noBorder = false,
      iconProp = {},
      onStateChanged,
      children,
      position = "bottom",
      shouldShowToggle = true,
      headerContainerProps,
      ...rest
    },
    ref
  ) => {
    const { Label, size, color } = iconProp;
    const theme = useContext(ThemeContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const animationController = useRef(
      new Animated.Value(isExpanded ? 1 : 0)
    ).current;

    useEffect(() => {
      Animated.timing(animationController, {
        duration: 300,
        toValue: isExpanded ? 1 : 0,
        useNativeDriver: false,
      }).start(() => {
        !!onStateChanged && onStateChanged(isExpanded);
      });
    }, [isExpanded]);

    const handleAnimation = () => {
      setIsExpanded(!isExpanded);
    };

    useImperativeHandle(ref, () => ({
      toggleAccordion: handleAnimation,
      openAccordion: () => setIsExpanded(true),
      closeAccordion: () => setIsExpanded(false),
    }));

    const arrowAngle = animationController.interpolate({
      inputRange: [0, 1],
      outputRange: ["0rad", `${Math.PI}rad`],
    });

    const marginTop = animationController.interpolate({
      inputRange: [0, 1],
      outputRange: [moderateScale(10), moderateScale(-2)],
    });

    return (
      <Container
        {...(!noBorder && {
          borderColor: "border.grey400",
          borderWidth: moderateScale(1),
          borderRadius: moderateScale(8),
        })}
        padding={moderateScale(12)}
        width="100%"
        {...rest}
      >
        {position === "top" && (
          <AccordionBody isExpanded={isExpanded}>{children}</AccordionBody>
        )}
        <TouchableOpacity
          style={styles.accordionContainer}
          onPress={() => {
            handleAnimation();
          }}
          {...headerContainerProps}
        >
          {!!header && <Container flexGrow={1}>{header()}</Container>}
          {!!shouldShowToggle && (
            <Container
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
              minHeight={moderateScale(40)}
            >
              {Label && <Label />}
              <Animated.View
                style={{
                  alignItems: "center",
                  marginTop,
                  transform: [{ rotateZ: arrowAngle }],
                }}
              >
                <Down
                  color={color ?? theme.colors.font.grey700}
                  size={size ?? moderateScale(40)}
                />
              </Animated.View>
            </Container>
          )}
        </TouchableOpacity>
        {position === "bottom" && (
          <AccordionBody isExpanded={isExpanded}>{children}</AccordionBody>
        )}
      </Container>
    );
  }
);

AccordionBody.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  children: PropTypes.element,
};

Accordion.propTypes = {
  /**
   * Render a component on the header.
   */
  header: PropTypes.func,
  /**
   * Customize header container
   */
  headerContainerProps: PropTypes.object,
  /**
   * Renders the child component passed in the body of the accordion.
   */
  children: PropTypes.node,
  /**
   * Takes a boolean value based on which border is shown.
   */
  noBorder: PropTypes.bool,
  /**
   * Function that returns the current state.
   */
  onStateChanged: PropTypes.func,
  /**
   * Takes an object based on which the icon to expand/collapse can be customized.
   * Label: Takes a component.
   * size: Used to update the icon size.
   * name: Used to update the default arrow icon.
   * color: Used to update the default color of the icon.
   */
  iconProp: PropTypes.shape({
    name: PropTypes.string,
    Label: PropTypes.elementType,
    size: PropTypes.number,
    color: PropTypes.string,
  }),
  /**
   * Determine whether the body should show at the top or bottom
   */
  position: PropTypes.string,
  /**
   * Can be set to false if custom toggle UI action item needs to be passed.
   */
  shouldShowToggle: PropTypes.bool,
};

const styles = StyleSheet.create({
  accordionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

Accordion.displayName = "Accordion";
