import React from "react";
import { Platform } from "react-native";

import { Loader, Alert, Container, Touchable, Typography } from "@components";
import { theme } from "@theme";

const LoaderStories = {
  title: "Loaders",
  component: Loader,
  parameters: {
    notes: `
Component is used to show a loading indication to user.

![image](assets/screenshots/loaders/loaders.png)

## Usage

>import * as React from 'react';
>import { Container, Loader } from '@bigbinary/neetoui-rn';
>export default function Main() {
>  return (
>    <Container>
>      <Loader size='l'/>
>    </Container>
>  )
>}
`,
  },
};

export default LoaderStories;

export const Loaders = () => {
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
    <Container flex={1} justifyContent="space-around">
      <Alert />
      <Container flex={1} flexDirection="row" justifyContent="space-around">
        <Loader color={theme.colors.font.grey400} />
        <Loader color={theme.colors.font.grey600} size="m" />
        <Loader color={theme.colors.font.grey800} size="l" />
      </Container>
      <Container alignItems="center" flex={1} justifyContent="space-around">
        <Touchable
          borderColor="border.grey800"
          borderRadius={5}
          borderWidth={1}
          height={28}
          justifyContent="center"
          width={100}
        >
          <Loader color={theme.colors.font.grey800} />
        </Touchable>
        <Touchable
          borderColor="border.grey600"
          borderRadius={5}
          borderWidth={1}
          height={40}
          justifyContent="center"
          width={120}
        >
          <Loader color={theme.colors.font.grey600} size="m" />
        </Touchable>
        <Touchable
          borderColor="border.grey400"
          borderRadius={5}
          borderWidth={1}
          height={52}
          justifyContent="center"
          width={140}
        >
          <Loader color={theme.colors.font.grey400} size="l" />
        </Touchable>
      </Container>
    </Container>
  );
};
