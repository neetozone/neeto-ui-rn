import React, { PureComponent } from "react";
import {
  View,
  Animated,
  Easing,
  Platform,
  I18nManager,
  StyleSheet,
} from "react-native";

import PropTypes from "prop-types";

import { moderateScale } from "@utils/scale";

import TouchableWithoutFeedback from "./TouchableWithoutFeedback";

const radius = moderateScale(10);

export class Ripple extends PureComponent {
  static defaultProps = {
    ...TouchableWithoutFeedback.defaultProps,

    rippleColor: "rgb(0, 0, 0)",
    rippleOpacity: 0.3,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    rippleSequential: false,
    rippleFades: true,
    rippleOutsideContainer: false,
    disabled: false,

    onRippleAnimation: (animation, onComplete) => animation.start(onComplete),
  };

  static propTypes = {
    ...Animated.View.propTypes,
    ...TouchableWithoutFeedback.propTypes,

    children: PropTypes.node.isRequired,
    rippleColor: PropTypes.string,
    rippleOpacity: PropTypes.number,
    rippleDuration: PropTypes.number,
    rippleSize: PropTypes.number,
    rippleContainerBorderRadius: PropTypes.number,
    rippleCentered: PropTypes.bool,
    rippleSequential: PropTypes.bool,
    rippleFades: PropTypes.bool,
    rippleOutsideContainer: PropTypes.bool,
    disabled: PropTypes.bool,

    onRippleAnimation: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);

    this.renderRipple = this.renderRipple.bind(this);

    this.unique = 0;
    this.mounted = false;

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    const { onLayout } = this.props;

    if ("function" === typeof onLayout) {
      onLayout(event);
    }

    this.setState({ width, height });
  }

  onPress(event) {
    const { ripples } = this.state;
    const { onPress, rippleSequential } = this.props;

    if (!rippleSequential || !ripples.length) {
      if ("function" === typeof onPress) {
        requestAnimationFrame(() => onPress(event));
      }

      this.startRipple(event);
    }
  }

  onLongPress(event) {
    const { onLongPress } = this.props;

    if ("function" === typeof onLongPress) {
      requestAnimationFrame(() => onLongPress(event));
    }

    this.startRipple(event);
  }

  onPressIn(event) {
    const { onPressIn } = this.props;

    if ("function" === typeof onPressIn) {
      onPressIn(event);
    }
  }

  onPressOut(event) {
    const { onPressOut } = this.props;

    if ("function" === typeof onPressOut) {
      onPressOut(event);
    }
  }

  onAnimationEnd() {
    if (this.mounted) {
      this.setState(({ ripples }) => ({ ripples: ripples.slice(1) }));
    }
  }

  startRipple(event) {
    const { width, height } = this.state;
    const { rippleDuration, rippleCentered, rippleSize, onRippleAnimation } =
      this.props;

    const w2 = 0.5 * width;
    const h2 = 0.5 * height;

    const { locationX, locationY } = rippleCentered
      ? { locationX: w2, locationY: h2 }
      : event.nativeEvent;

    const offsetX = Math.abs(w2 - locationX);
    const offsetY = Math.abs(h2 - locationY);

    const size =
      rippleSize > 0
        ? 0.5 * rippleSize
        : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    const ripple = {
      unique: this.unique++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      size,
    };

    const animation = Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    });

    onRippleAnimation(animation, this.onAnimationEnd);

    this.setState(({ ripples }) => ({ ripples: ripples.concat(ripple) }));
  }

  renderRipple({ unique, progress, locationX, locationY, size }) {
    const { rippleColor, rippleOpacity, rippleFades } = this.props;

    const rippleStyle = {
      top: locationY - radius,
      [I18nManager.isRTL ? "right" : "left"]: locationX - radius,
      backgroundColor: rippleColor,

      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / radius, size / radius],
          }),
        },
      ],

      opacity: rippleFades
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [rippleOpacity, 0],
          })
        : rippleOpacity,
    };

    return <Animated.View key={unique} style={[styles.ripple, rippleStyle]} />;
  }

  render() {
    const { ripples } = this.state;
    const {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      children,
      rippleContainerBorderRadius,
      rippleOutsideContainer,
      testID,
      nativeID,
      accessible,
      accessibilityHint,
      accessibilityLabel,
      ...props
    } = this.props;

    const touchableProps = {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      testID,
      accessible,
      accessibilityHint,
      accessibilityLabel,
      onLayout: this.onLayout,
      onPress: this.onPress,
      onLongPress: this.onLongPress,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,

      ...("web" !== Platform.OS ? { nativeID } : null),
    };

    const containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    return (
      <TouchableWithoutFeedback {...touchableProps}>
        <Animated.View {...props} collapsable={false} pointerEvents="box-only">
          {children}
          <View
            style={[styles.container(rippleOutsideContainer), containerStyle]}
          >
            {ripples.map(this.renderRipple)}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: rippleOutsideContainer => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    overflow: rippleOutsideContainer ? "visible" : "hidden",
  }),
  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: "hidden",
    position: "absolute",
  },
});
