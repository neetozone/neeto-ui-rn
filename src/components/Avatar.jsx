import React from "react";
import { StyleSheet } from "react-native";

import PropTypes from "prop-types";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

import { Container } from "./Container";
import { Typography } from "./Typography";

/**
 * Avatars can be used to represent people in a graphical way.
 *
 * <div class="screenshots">
 *   <img src="screenshots/avatar/images.png" />
 *   <img src="screenshots/avatar/texts.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Typography, Avatar } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  return (
 *    <Container>
 *     <Avatar
 *      variant={"medium"}
 *      name="Oliver Smith"
 *      imageUrl="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"
 *     />
 *   </Container>
 *  );
 * }
 * ```
 */

export const Avatar = ({
  name,
  variant = "medium",
  bgColor = "background.lightBlue100",
  fontColor = "font.darkBlue100",
  imageUrl,
  ...rest
}) => {
  const opacity = useSharedValue(0);
  const acronym = name
    ?.split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "")
    .slice(0, 2);

  const getSizes = () => {
    switch (variant) {
      case "extra-small":
        return [moderateScale(24), moderateScale(8)];
      case "small":
        return [moderateScale(36), moderateScale(12)];
      case "medium":
        return [moderateScale(48), moderateScale(14)];
      default:
        return [moderateScale(48), moderateScale(14)];
    }
  };

  const [avatarSize, avatarFontSize] = getSizes();

  const profileImageStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    height: avatarSize,
    width: avatarSize,
    alignSelf: "center",
    borderRadius: avatarSize / 2,
  }));

  return (
    <Container
      bg={bgColor}
      borderRadius={avatarSize / 2}
      height={avatarSize}
      width={avatarSize}
      {...rest}
      flexDirection="row"
    >
      <Container style={styles.acronym}>
        <Typography
          color={fontColor}
          fontFamily="sf400"
          fontSize={avatarFontSize}
        >
          {acronym.toUpperCase()}
        </Typography>
      </Container>
      {imageUrl && (
        <Animated.Image
          source={{ uri: imageUrl }}
          style={profileImageStyle}
          onLoad={() => (opacity.value = 1)}
          {...rest}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  acronym: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

Avatar.defaultProps = {
  alignItems: "center",
  justifyContent: "center",
};

Avatar.propTypes = {
  /**
   * Name to obtain user initials to show as the text in the Avatar.
   */
  name: PropTypes.string,
  /**
   * variant of the avatar: `medium` or `small`
   */
  variant: PropTypes.oneOf(["medium", "small", "extra-small"]),
  /**
   * Custom color for the avatar.
   */
  bgColor: PropTypes.string,
  /**
   * Custom color for the text.
   */
  fontColor: PropTypes.string,
  /**
   * Image to display for the Avatar. It accepts a standard React Native Image source prop Or a function that returns an Image.
   */
  imageUrl: PropTypes.string,
};
