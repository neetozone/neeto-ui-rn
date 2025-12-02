import React, { useRef } from "react";
import { StyleSheet } from "react-native";

import PropTypes from "prop-types";
import OriginalPopover from "react-native-popover-view";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";
import { flexbox, space, border, color, layout } from "styled-system";

import { Divider } from "./Divider";
import { Typography } from "./Typography";

export const TouchableOpacity = styled.TouchableOpacity`
  ${space}
  ${border}
  ${color}
  ${flexbox}
  ${layout}
`;

const PopOverItem = ({
  item,
  onPress,
  fontFamily,
  fontSize,
  shouldShowDivider,
}) => {
  const { Icon, label, labelProps } = item;

  return (
    <>
      <TouchableOpacity
        alignItems="center"
        flexDirection="row"
        p={moderateScale(2)}
        px={moderateScale(8)}
        py={moderateScale(8)}
        onPress={onPress}
      >
        <Icon />
        <Typography
          fontColor="font.primary"
          fontFamily={fontFamily}
          fontSize={fontSize}
          px={moderateScale(2)}
          {...labelProps}
        >
          {label}
        </Typography>
      </TouchableOpacity>
      {shouldShowDivider && (
        <Divider backgroundColor="background.grey200" mx={moderateScale(8)} />
      )}
    </>
  );
};

PopOverItem.propTypes = {
  shouldShowDivider: PropTypes.bool,
  item: PropTypes.object,
  onPress: PropTypes.func,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      "3xs",
      "2xs",
      "xs",
      "s",
      "m",
      "l",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
    ]),
  ]),
};

/**
 *
 * A Lightweight Popover component over [react-native-popover-view](https://www.npmjs.com/package/react-native-popover-view)  which can be rendered with array of data or with custom body.
 *
 * <div class="screenshots">
 *   <img src="screenshots/popover/popover.png" />
 * </div>
 *
 *   ## Usage
 * ```js
 * import * as React from 'react';
 * import { Text } from "react-native";
 * import { Container, Button, Popover } from '@bigbinary/neetoui-rn';
 * import { ThemeContext } from "styled-components/native";
 *
 * export default function Main(){
 *   const theme = useContext(ThemeContext);
 *   const data = [
 *     {
 *       label: "Search Product",
 *       Icon: () => {
 *         return (
 *           <Icon
 *             name="ri-search-line"
 *             size={moderateScale(20)}
 *             color={theme.colors.background.grey800}
 *           />
 *         );
 *       },
 *       onPress: () => {
 *         alert("Clicked here");
 *       },
 *     },
 *     {
 *       label: "Create Product",
 *       Icon: () => {
 *         return (
 *           <Icon
 *             name="ri-search-line"
 *             size={moderateScale(20)}
 *             color={theme.colors.background.grey800}
 *           />
 *         );
 *       },
 *       onPress: () => {
 *         alert("Clicked here");
 *       },
 *     },
 *   ];
 *
 *  return (
 *    <Container flex={1} alignItems="center" justifyContent="center">
 *      <Container p={moderateScale(2)}>
 *        <Popover data={data} from={<Button label="With Data" />} />
 *      </Container>
 *      <Container p={moderateScale(2)}>
 *      <Popover from={<Button label="With Custom Popup Content" />}>
 *
 *          <Container bg="background.white" flex={1}>
 *            <Text>This is the contents of the popover</Text>
 *          </Container>
 *        </Popover>
 *      </Container>
 *
 *      <Container p={moderateScale(2)}>
 *        <Popover
 *          data={data}
 *          from={<Button label="With Custom Popup Content and data" />}
 *        >
 *          <Container bg="background.white" flex={1}>
 *            <Text>This is the contents of the popover</Text>
 *          </Container>
 *        </Popover>
 *      </Container>
 *    </Container>
 *  );
 * }
 * ```
 */

export const Popover = ({
  children,
  data,
  fontFamily = null,
  fontSize = "l",
  ...rest
}) => {
  const popoverRef = useRef();
  const onPressItemRef = useRef(() => {});

  return (
    <OriginalPopover
      popoverStyle={styles.popoverStyle}
      ref={popoverRef}
      onCloseComplete={() => onPressItemRef.current()}
      onOpenStart={() => {
        onPressItemRef.current = () => {};
      }}
      {...rest}
    >
      {data?.map((item, index) => (
        <PopOverItem
          fontFamily={fontFamily}
          fontSize={fontSize}
          item={item}
          key={index}
          shouldShowDivider={index !== data.length - 1}
          onPress={() => {
            popoverRef?.current?.setState({ isVisible: false });
            onPressItemRef.current = item.onPress;
          }}
        />
      ))}
      {children}
    </OriginalPopover>
  );
};

Popover.propTypes = {
  children: PropTypes.node,
  /**
   * Data should be array of
   * {
   *  label: "This would be label of button",
   *  Icon: "Icon to be shown prior to label",
   *  onPress: "Handler to be called onPress"
   * }.
   */
  data: PropTypes.array,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["xs", "s", "m", "l", "xl", "xxl"]),
  ]),
};

const styles = StyleSheet.create({
  popoverStyle: {
    borderRadius: moderateScale(10),
    padding: moderateScale(5),
  },
});
