import React, { useState } from "react";

import dayjs from "dayjs";

import { Calendar } from "@components";

const CalendarStories = {
  title: "Calendar",
  component: Calendar,
  parameters: {
    notes: `
Calendar component built on top of

[react-native-calendars](https://github.com/wix/react-native-calendars) with our custom theme.

![image](assets/screenshots/calendar/calendar.png)

## Usage

>import * as React from 'react';
>import dayjs from "dayjs";
>import { Calendar } from '@bigbinary/neetoui-rn';



>export default function Main() {
>  const [selectedDate, setSelectedDate] = useState(dayjs());
>  return (
>    <Calendar
>     selectedDate={selectedDate} onDayPress={({ dateString }) => setSelectedDate(dateString)}
>    />
>  );
> }

Checkout [react-native-calendars](https://github.com/wix/react-native-calendars)

package for all the available props
`,
  },
};

export default CalendarStories;

export const Calendars = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  return (
    <Calendar
      selectedDate={selectedDate}
      onDayPress={({ dateString }) => setSelectedDate(dateString)}
    />
  );
};
