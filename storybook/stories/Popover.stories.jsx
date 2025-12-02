import React, { useContext } from "react";
import { Text } from "react-native";

import { Search } from "@bigbinary/neeto-icons-rn";
import { ThemeContext } from "styled-components/native";

import { Container, Button, Toast, Popover } from "@components";

const PopoverStories = {
  title: "PopOver",
  component: Popover,
  argTypes: {},
  args: {},
  parameters: {
    notes: `
A Lightweight Popover component over

[react-native-popover-view](https://www.npmjs.com/package/react-native-popover-view)

which can be rendered with array of data or with custom body.

![image](assets/screenshots/popover/popover.png)

## Usage

>import * as React from 'react';
>import { Text } from "react-native";
>import { Container, Button, Popover } from '@bigbinary/neetoui-rn';
>import { ThemeContext } from "styled-components/native";
>
>export default function Main(){
>   const theme = useContext(ThemeContext);
>   const data = [
>     {
>       label: "Search Product",
>       Icon: () => {
>         return (
>           <Icon
>             name="ri-search-line"
>             size={moderateScale(20)}
>             color={theme.colors.background.grey800}
>           />
>         );
>       },
>       onPress: () => {
>         alert("Clicked here");
>       },
>     },
>     {
>       label: "Create Product",
>       Icon: () => {
>         return (
>           <Icon
>             name="ri-search-line"
>             size={moderateScale(20)}
>             color={theme.colors.background.grey800}
>           />
>        );
>       },
>       onPress: () => {
>         alert("Clicked here");
>       },
>     },
>   ];
>
>  return (
>    <Container flex={1} alignItems="center" justifyContent="center">
>      <Container p={moderateScale(2)}>
>       <Popover data={data} from={<Button label="With Data" />} />
>      </Container>
>      <Container p={moderateScale(2)}>
>      <Popover from={<Button label="With Custom Popup Content" />}>
>
>          <Container bg="background.white" flex={1}>
>            <Text>This is the contents of the popover</Text>
>          </Container>
>        </Popover>
>      </Container>
>
>      <Container p={moderateScale(2)}>
>        <Popover
>          data={data}
>          from={<Button label="With Custom Popup Content and data" />}
>        >
>          <Container bg="background.white" flex={1}>
>            <Text>This is the contents of the popover</Text>
>          </Container>
>        </Popover>
>      </Container>
>    </Container>
>  );
> }
`,
  },
};

export default PopoverStories;

export const Popovers = () => {
  const theme = useContext(ThemeContext);

  const data = [
    {
      label: "Search Product",
      Icon: () => <Search color={theme.colors.background.grey800} size={20} />,
      onPress: () => {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Clicked on `Search Product`",
        });
      },
    },
    {
      label: "Create Product",
      Icon: () => <Search color={theme.colors.background.grey800} size={20} />,
      onPress: () => {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Clicked on `Create Product`",
        });
      },
    },
  ];

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <Toast />
      <Container p={2}>
        <Popover data={data} from={<Button label="With Data" />} />
      </Container>
      <Container p={2}>
        <Popover from={<Button label="With Custom Popup Content" />}>
          <Container bg="background.white" flex={1}>
            <Text>This is the contents of the popover</Text>
          </Container>
        </Popover>
      </Container>
      <Container p={2}>
        <Popover
          data={data}
          from={<Button label="With Custom Popup Content and data" />}
        >
          <Container bg="background.white" flex={1}>
            <Text>This is the contents of the popover</Text>
          </Container>
        </Popover>
      </Container>
    </Container>
  );
};
