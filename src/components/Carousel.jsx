import React, { useState } from "react";
import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";

import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";
import CarouselParent, { Pagination } from "react-native-snap-carousel";

import { Container } from "./Container";

const { width } = Dimensions.get("screen");

/**
 *
 * <div class="screenshots">
 *   <img src="screenshots/carousel/carousel.png" />
 * </div>
 *
 * This component supports below props categories from [styled-system ](/styled-system).
 * <ul>
 * <li>flexbox</li>
 * <li>space</li>
 * <li>border</li>
 * <li>layout</li>
 * <li>color</li>
 * <li>buttonStyle</li>
 * </ul>
 *
 *  ## Usage
 * ```js
 * import * as React from "react";
 * import { moderateScale } from "react-native-size-matters";
 * import { Carousel } from "@bigbinary/neetoui-rn";
 *
 * export default function Main() {
 *
 *  return (
 *    <Carousel itemArray={[{url:"https://picsum.photos/200"}]} />
 *  );
 * }
 * ```
 *
 */

export const Carousel = ({
  itemArray,
  renderItem,
  carouselRef,
  onSnapToItem,
  containerStyle = {},
}) => {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Container flex={1} {...containerStyle}>
      <CarouselParent
        data={itemArray}
        itemWidth={width}
        ref={carouselRef}
        renderItem={renderItem}
        sliderWidth={width}
        onSnapToItem={index => {
          onSnapToItem(index);
          setActiveIndex(index);
        }}
      />
      <Pagination
        activeDotIndex={activeIndex}
        dotContainerStyle={styles.dotContainerStyle}
        dotStyle={styles.dotStyle}
        dotsLength={itemArray.length}
        inactiveDotOpacity={moderateScale(1)}
        inactiveDotScale={moderateScale(1)}
        inactiveDotStyle={styles.inactiveDotStyle}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    height: width / moderateScale(1.8),
    width: width / moderateScale(1.8),
    resizeMode: "contain",
    borderRadius: moderateScale(20),
  },
  indicator: {
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(20),
    marginHorizontal: moderateScale(5),
    backgroundColor: "#49545C",
    borderColor: "#FFFFFF",
    borderWidth: moderateScale(2),
  },
  dotStyle: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    marginHorizontal: moderateScale(4),
    backgroundColor: "#2F3941",
  },
  inactiveDotStyle: {
    backgroundColor: "#D9D9D9",
  },
  dotContainerStyle: { marginHorizontal: 0 },
});

Carousel.propTypes = {
  itemArray: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  onSnapToItem: PropTypes.func,
  carouselRef: PropTypes.object,
  containerStyle: PropTypes.object,
};
