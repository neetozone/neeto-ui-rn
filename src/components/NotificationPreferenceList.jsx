import React from "react";

import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";

import { Container } from "./Container";
import { Divider } from "./Divider";
import { Loader } from "./Loader";
import { ToggleSwitch } from "./ToggleSwitch";
import { Typography } from "./Typography";

/**
 *
 * Buttons are touchable elements used to interact with the screen and to trigger an action.
 *
 * <div class="screenshots">
 *   <img src="screenshots/notificationPreferenceList/notificationPreferenceList.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Container, NotificationPreferenceList } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  const [data, setData] = useState([]);
 *
 *  const handleSwitch = (item, index) => {
 *    setData(prevData => {
 *      const newData = [...prevData];
 *      newData[index].enabled = !newData[index].enabled;
 *      return newData;
 *    });
 *  };

 *  useEffect(() => {
 *    setData([
 *      {
 *        label: "Preference 1",
 *        enabled: true,
 *        onSwitch: handleSwitch,
 *      },
 *      {
 *        label: "Preference 2",
 *        enabled: true,
 *        onSwitch: handleSwitch,
 *      },
 *      {
 *        label: "Preference 3",
 *        enabled: false,
 *        onSwitch: handleSwitch,
 *      },
 *      {
 *        label: "Preference 4",
 *        enabled: false,
 *        onSwitch: handleSwitch,
 *      },
 *      {
 *        label: "Preference 5",
 *        enabled: false,
 *        onSwitch: handleSwitch,
 *        LeftIcon: () => (
 *          <Icon
 *            name="ri-notification-2-line"
 *            size={moderateScale(20)}
 *            color={theme.colors.font.secondary}
 *          />
 *        ),
 *      },
 *    ]);
 *  }, []);

 *  return (
 *    <Container flex={1} alignItems="center" justifyContent="center">
 *      {data && <NotificationPreferenceList data={data} />}
 *    </Container>
 *  );
 * }
 * ```
 *
 */

const lineHeight = moderateScale(22);
export const NotificationPreferenceList = ({
  isLoading,
  data,
  itemWrapperProps,
  itemContainerProps,
  labelContainerProps,
  labelProps,
  title,
  titleProps,
  ...rest
}) => (
  <Container width="100%">
    <Container
      alignItems="center"
      flexDirection="row"
      pb={moderateScale(8)}
      pt={moderateScale(20)}
    >
      {!!title && (
        <Typography
          color="font.grey600"
          fontSize="m"
          lineHeight={`${lineHeight}px`}
          {...titleProps}
        >
          {title}
        </Typography>
      )}
      {isLoading && (
        <Container
          height={lineHeight}
          justifyContent="center"
          mx={moderateScale(8)}
        >
          <Loader />
        </Container>
      )}
    </Container>
    <Container
      bg="background.secondary"
      borderRadius={moderateScale(8)}
      {...rest}
    >
      {data?.map((item, index) => {
        const { label, enabled, onSwitch, LeftIcon } = item;
        const isLastItem = index === data.length - 1;

        return (
          <Container key={index} px={moderateScale(16)} {...itemWrapperProps}>
            <Container
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
              py={moderateScale(12)}
              {...itemContainerProps}
            >
              <Container
                alignItems="center"
                flex={1}
                flexDirection="row"
                {...labelContainerProps}
              >
                {LeftIcon && (
                  <Container mr={moderateScale(8)}>
                    <LeftIcon />
                  </Container>
                )}
                <Typography
                  flex={1}
                  fontSize="l"
                  mr={moderateScale(8)}
                  {...labelProps}
                >
                  {label}
                </Typography>
              </Container>
              <ToggleSwitch
                value={enabled}
                onValueChange={() => onSwitch(item, index)}
              />
            </Container>
            {!isLastItem && <Divider bg="background.grey300" />}
          </Container>
        );
      })}
    </Container>
  </Container>
);

NotificationPreferenceList.propTypes = {
  /**
   * Array of preference list
   */
  data: PropTypes.array.isRequired,
  /**
   * Customize outer container for each item
   */
  itemWrapperProps: PropTypes.object,
  /**
   * Customize inner container for each item
   */
  itemContainerProps: PropTypes.object,
  /**
   * Customize container for each item label
   */
  labelContainerProps: PropTypes.object,
  /**
   * Customize item label
   */
  labelProps: PropTypes.object,
  /**
   * Title value.
   */
  title: PropTypes.string,
  /**
   * Customize title style.
   */
  titleProps: PropTypes.string,
  /**
   * Show loader
   */
  isLoading: PropTypes.bool,
};
