import React, { forwardRef, useCallback } from "react";
import { View, StyleSheet } from "react-native";

import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";

import { Typography, Touchable } from "@components";

export const Tab = forwardRef(
  ({ label, value, navigation, flex, count }, ref) => {
    const handleOnPress = useCallback(
      () => navigation.navigate(value),
      [navigation, value]
    );

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          {
            flex,
            minWidth: count !== undefined ? moderateScale(56) : undefined,
          },
        ]}
      >
        <Touchable
          alignItems="center"
          flex={1}
          justifyContent="center"
          onPress={handleOnPress}
        >
          <Typography
            fontFamily="sf600"
            fontSize="xs"
            numberOfLines={1}
            textAlign="center"
          >
            {label}
          </Typography>
          {count !== undefined && (
            <Typography
              fontFamily="sf500"
              fontSize="xs"
              numberOfLines={1}
              textAlign="center"
            >
              ({count})
            </Typography>
          )}
        </Touchable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

Tab.displayName = "Tab";

Tab.propTypes = {
  flex: PropTypes.number,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  navigation: PropTypes.object,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Tab.defaultProps = {
  flex: 1,
};
