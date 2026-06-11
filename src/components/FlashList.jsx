import React, { useCallback, useContext, useEffect } from "react";
import { Dimensions, RefreshControl } from "react-native";

import { FlashList as ShopifyFlashList } from "@shopify/flash-list";
import PropTypes from "prop-types";
import ContentLoader, { Rect } from "react-content-loader/native";
import Animated, {
  cancelAnimation,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
import { ThemeContext } from "styled-components/native";

import { useRefreshByUser } from "@hooks";

const { width } = Dimensions.get("screen");
const Placeholder = () => {
  const theme = useContext(ThemeContext);

  return (
    <ContentLoader
      backgroundColor={theme.colors.lightgrey}
      foregroundColor={theme.colors.grey300}
      height={moderateScale(60)}
      marginHorizontal={moderateScale(15)}
      viewBox={`0 0 ${moderateScale(400)} ${moderateScale(50)}`}
      width={moderateScale(400)}
    >
      <Rect
        height={moderateScale(50)}
        rx={moderateScale(5)}
        ry={moderateScale(5)}
        width={width - moderateScale(30)}
        x="0"
      />
    </ContentLoader>
  );
};

export const FlashList = React.forwardRef(
  (
    {
      animationDuration = 2000,
      SkeletonComponent,
      placeHolderItemCount = 10,
      isLoading = false,
      data = [],
      onRefresh = () => {},
      onEndReached = () => {},
      keyExtractor,
      ...rest
    },
    ref
  ) => {
    const dummyData = Array.apply(null, Array(placeHolderItemCount));

    const { isRefetchingByUser, refetchByUser } = useRefreshByUser(onRefresh);

    return (
      <FadeInFlatList
        SkeletonComponent={SkeletonComponent}
        animationDuration={animationDuration}
        data={isLoading ? dummyData : data}
        extraData={{ isLoading, placeHolderItemCount }}
        isLoading={isLoading}
        key={isLoading}
        placeHolderItemCount={placeHolderItemCount}
        ref={ref}
        keyExtractor={(item, index) =>
          isLoading || !keyExtractor
            ? index.toString()
            : keyExtractor(item, index)
        }
        refreshControl={
          onRefresh && (
            <RefreshControl
              refreshing={isRefetchingByUser}
              onRefresh={refetchByUser}
            />
          )
        }
        {...rest}
        onEndReached={isLoading ? undefined : onEndReached}
      />
    );
  }
);

FlashList.displayName = "FlashList";

const FadeInFlatList = React.forwardRef(
  (
    {
      renderItem: originalRenderItem,
      animationDuration,
      isLoading = false,
      SkeletonComponent,
      ...props
    },
    ref
  ) => {
    const value = useSharedValue(0);

    const FadeInComponent = useCallback(({ index, children }) => {
      const inputRange = [index - 1, index, index + 1, index + 2];
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const animatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(
          value.value,
          inputRange,
          [0, 0.6, 1, 1],
          Extrapolation.CLAMP
        ),
        transform: [
          {
            translateX: interpolate(
              value.value,
              inputRange,
              [25, 15, 10, 0],
              Extrapolation.CLAMP
            ),
          },
        ],
      }));

      return <Animated.View style={animatedStyles}>{children}</Animated.View>;
    }, []);

    const Item = ({ item }) =>
      item?.extraData?.isLoading ? (
        <FadeInComponent index={item.index}>
          {SkeletonComponent || <Placeholder />}
        </FadeInComponent>
      ) : (
        <FadeInComponent index={item.index}>
          {originalRenderItem(item)}
        </FadeInComponent>
      );

    Item.propTypes = {
      item: PropTypes.object,
    };

    const shouldAnimate = animationDuration > 0;

    const renderItem = item => {
      if (isLoading || item.index < props.placeHolderItemCount) {
        return <Item item={item} />;
      }

      return shouldAnimate ? (
        <FadeInComponent index={item.index}>
          {originalRenderItem(item)}
        </FadeInComponent>
      ) : (
        originalRenderItem(item)
      );
    };

    useEffect(() => {
      value.value = 0;
      value.value = withSequence(
        withTiming(20, {
          duration: animationDuration,
        }),
        withTiming(10000, {
          duration: 0,
        })
      );

      return () => {
        cancelAnimation(value);
      };
    }, [animationDuration, value, isLoading]);

    return <ShopifyFlashList ref={ref} {...props} renderItem={renderItem} />;
  }
);

FadeInFlatList.displayName = "FadeInFlatList";

FlashList.propTypes = {
  SkeletonComponent: PropTypes.element,
  animationDuration: PropTypes.number,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  placeHolderItemCount: PropTypes.number,
  onRefresh: PropTypes.func,
  onEndReached: PropTypes.func,
  keyExtractor: PropTypes.func,
};

FadeInFlatList.propTypes = FlashList.propTypes;
