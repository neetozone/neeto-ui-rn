import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

import { Notification } from "@bigbinary/neeto-icons-rn";
import { ThemeContext } from "styled-components/native";

import { NotificationPreferenceList, Container, Typography } from "@components";

const NotificationPreferenceListMetaData = {
  title: "NotificationPreferenceList",
  component: NotificationPreferenceList,
  parameters: {
    notes: `
Buttons are touchable elements used to interact with the screen and to trigger an action.

![image](assets/screenshots/notificationPreferenceList/notificationPreferenceList.png)

## Usage

>import * as React from 'react';
>import { Container, NotificationPreferenceList } from '@bigbinary/neetoui-rn';

>export default function Main() {
>  const [data, setData] = useState([]);
>
>  const handleSwitch = (item, index) => {
>    setData(prevData => {
>      const newData = [...prevData];
>      newData[index].enabled = !newData[index].enabled;
>      return newData;
>    });
>  };
>
>  useEffect(() => {
>    setData([
>      {
>        label: "Preference 1",
>        enabled: true,
>        onSwitch: handleSwitch,
>      },
>      {
>        label: "Preference 2",
>        enabled: true,
>       onSwitch: handleSwitch,
>      },
>      {
>        label: "Preference 3",
>        enabled: false,
>        onSwitch: handleSwitch,
>      },
>      {
>        label: "Preference 4",
>        enabled: false,
>        onSwitch: handleSwitch,
>      },
>      {
>        label: "Preference 5",
>        enabled: false,
>        onSwitch: handleSwitch,
>        LeftIcon: () => (
>          <Icon
>            name="ri-notification-2-line"
>            size={moderateScale(20)}
>            color={theme.colors.font.secondary}
>          />
>        ),
>      },
>    ]);
>  }, []);
>
>  return (
>    <Container flex={1} alignItems="center" justifyContent="center">
>      {data && <NotificationPreferenceList data={data} />}
>    </Container>
>  );
> }
`,
  },
};

export default NotificationPreferenceListMetaData;

export const NotificationPreferenceListComponent = () => {
  const [data, setData] = useState([]);
  const theme = useContext(ThemeContext);

  const handleSwitch = (_item, index) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index].enabled = !newData[index].enabled;

      return newData;
    });
  };

  useEffect(() => {
    setData([
      {
        label: "Preference 1",
        enabled: true,
        onSwitch: handleSwitch,
      },
      {
        label: "Preference 2",
        enabled: true,
        onSwitch: handleSwitch,
      },
      {
        label: "Preference 3",
        enabled: false,
        onSwitch: handleSwitch,
      },
      {
        label: "Preference 4",
        enabled: false,
        onSwitch: handleSwitch,
      },
      {
        label: "Preference 5",
        enabled: false,
        onSwitch: handleSwitch,
        LeftIcon: () => (
          <Notification color={theme.colors.font.secondary} size={20} />
        ),
      },
    ]);
  }, []);

  if (Platform.OS === "web") {
    return (
      <Container alignItems="center" flex={1} justifyContent="center">
        <Typography>
          This story is disabled on web due to animation compatibility issues.
        </Typography>
      </Container>
    );
  }

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      {data && (
        <NotificationPreferenceList
          isLoading
          data={data}
          title="Notifications"
        />
      )}
    </Container>
  );
};
