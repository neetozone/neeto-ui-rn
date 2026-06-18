import React, { useContext } from "react";

import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Calendar as RNCalender } from "react-native-calendars";
import { ThemeContext } from "styled-components/native";

import { moderateScale } from "@utils/scale";

/**
 *
 * Calendar component built on top of [react-native-calendars](https://github.com/wix/react-native-calendars) with our custom theme.
 *
 * <div class="screenshots">
 *   <img src="screenshots/calendar/calendar.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import dayjs from "dayjs";
 * import { Calendar } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  const [selectedDate, setSelectedDate] = useState(dayjs());
 *  return (
 *    <Calendar
 *      selectedDate={selectedDate}
 *      onDayPress={({ dateString }) => setSelectedDate(dateString)}
 *    />
 *  );
 * }
 * ```
 *
 * Checkout <a href=" https://www.npmjs.com/package/react-native-calendars">react-native-calendars</a> package for all the available props
 */

export const Calendar = ({ selectedDate, ...rest }) => {
  delete rest.markedDates;
  const theme = useContext(ThemeContext);
  const isCurrentDay = dayjs(selectedDate).isSame(dayjs(), "D");

  return (
    <RNCalender
      current={selectedDate}
      firstDay={1}
      key={selectedDate}
      markedDates={{
        [dayjs(selectedDate).format("YYYY-MM-DD")]: {
          selected: true,
        },
      }}
      theme={{
        arrowColor: theme.colors.font.primary,
        dotStyle: {
          height: 0,
          width: 0,
          marginTop: 0,
        },
        "stylesheet.calendar.header": {
          week: {
            marginVertical: moderateScale(10),
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            fontFamily: theme.fonts.sf600,
          },
          dayHeader: {
            flex: 1,
            textAlign: "center",
            fontFamily: theme.fonts.sf600,
            fontSize: theme.fontSizes.xs,
            color: theme.colors.font.grey500,
            textTransform: "uppercase",
          },
          monthText: {
            fontFamily: theme.fonts.sf400,
            fontSize: theme.fontSizes.l,
            color: theme.colors.font.primary,
          },
        },
        "stylesheet.day.basic": {
          base: {
            alignItems: "center",
            justifyContent: "center",
            height: moderateScale(26),
            width: moderateScale(26),
            borderRadius: moderateScale(5),
            borderWidth: moderateScale(1),
            borderColor: "transparent",
          },
          today: {
            borderColor: isCurrentDay
              ? "transparent"
              : theme.colors.border.base,
          },
          selected: {
            backgroundColor: theme.colors.background.purple100,
          },
          text: {
            fontFamily: theme.fonts.sf400,
            fontSize: theme.fontSizes.xs,
            color: theme.colors.font.primary,
            margin: 0,
            padding: 0,
          },
          todayText: {
            color: theme.colors.font.base,
          },
          selectedText: {
            fontFamily: theme.fonts.sf600,
            color: theme.colors.font.base,
          },
          disabledText: {
            color: theme.colors.font.grey400,
          },
        },
      }}
      {...rest}
    />
  );
};

Calendar.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(dayjs),
  ]),
};
