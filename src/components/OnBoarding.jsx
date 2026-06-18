import React, { useRef, useState } from "react";

import PropTypes from "prop-types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { moderateScale } from "@utils/scale";

import { Button } from "./Button";
import { Carousel } from "./Carousel";
import { Container } from "./Container";
import { Typography } from "./Typography";

/**
 *
 * <div class="screenshots">
 *   <img src="screenshots/onboarding/onboarding.png" />
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
 * import { moderateScale } from "@utils/scale";
 * import { OnBoarding } from "@bigbinary/neetoui-rn";
 *
 * export default function Main() {
 *
 *  return (
 *    <OnBoarding
 *      appLogo={Neeto}
 *      slides={[
 *          {title: "Welcome to neetoInovice", description: "Enter your daily ...", illustration:""},
 *          {title: "", description: "", illustration:""}
 *      ]}
 *      onComplete={() =>{ console.log("Completed");}}
 * />
 *  );
 * }
 * ```
 *
 */

export const OnBoarding = ({
  appLogo: AppLogo,
  slides,
  onComplete,
  logoWidth = moderateScale(150),
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onBoardingRef = useRef();
  const { bottom } = useSafeAreaInsets();

  const handleOnPress = () => {
    if (activeIndex !== slides.length - 1) {
      setTimeout(() => onBoardingRef.current?.snapToNext(), 250);
      setActiveIndex(onBoardingRef.current._activeItem);
    } else onComplete();
  };

  const renderItem = ({ item }) => (
    <Container flex={1} justifyContent="space-between">
      <Container
        alignItems="center"
        flex={1}
        justifyContent="center"
        mx={moderateScale(24)}
        my={moderateScale(12)}
      >
        {item.illustration}
      </Container>
      <Container
        alignItems="center"
        mx={moderateScale(24)}
        my={moderateScale(12)}
      >
        <Typography
          color="font.grey800"
          fontFamily="sf700"
          fontSize="4xl"
          textAlign="center"
        >
          {item.title}
        </Typography>
        <Typography
          color="font.grey500"
          fontFamily="sf400"
          fontSize="l"
          textAlign="center"
        >
          {item.description}
        </Typography>
      </Container>
    </Container>
  );

  return (
    <Container bg="background.white" flex={1}>
      <Container alignItems="center">
        <AppLogo width={logoWidth} />
      </Container>
      <Container alignItems="center" flex={1}>
        <Carousel
          carouselRef={onBoardingRef}
          itemArray={slides}
          renderItem={renderItem}
          onSnapToItem={index => {
            setActiveIndex(index);
          }}
        />
      </Container>
      <Container
        mb={bottom === 0 ? moderateScale(16) : 0}
        mx={moderateScale(24)}
      >
        <Button
          label={activeIndex !== slides.length - 1 ? "Next" : "Get Started"}
          onPress={handleOnPress}
        />
      </Container>
    </Container>
  );
};

OnBoarding.propTypes = {
  appLogo: PropTypes.func.isRequired,
  slides: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired,
  logoWidth: PropTypes.number,
};
