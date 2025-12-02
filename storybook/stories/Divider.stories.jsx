import React from "react";

import { Container, Typography, Divider } from "@components";

import { theme } from "../../src/theme";

const orientations = ["horizontal", "vertical"];
const bgColors = Object.keys(theme.colors.background).map(
  color => `background.${color}`
);

const DividerStories = {
  title: "Dividers",
  component: Divider,
  args: {
    orientation: orientations[0],
    thickness: 10,
    bg: bgColors[4],
  },
  argTypes: {
    orientation: {
      options: orientations,
      control: { type: "select" },
    },
    thickness: {
      control: { type: "number" },
    },
    bg: {
      options: bgColors,
      control: {
        type: "select",
      },
    },
  },
  parameters: {
    notes: `
Divider is a separator line that can be used between two different sections.

![image](assets/screenshots/divider/divider.png)

## Usage

>import * as React from 'react';
>import { Divider } from '@bigbinary/neetoui-rn';
>
>export default function Main(){
>  return (
>   <Container>
>     <Divider orientation="vertical" thickness={moderateScale(1)}/>
>   </Container>
>  );
> }
`,
  },
};

export default DividerStories;

export const DividerDemo = args => (
  <Container flex={1}>
    <Divider {...args} />
  </Container>
);

export const Dividers = () => (
  <Container
    alignItems="center"
    flex={1}
    flexDirection="row"
    justifyContent="center"
  >
    <Container flex={5} justifyContent="center">
      <Divider bg="background.danger" orientation="horizontal" thickness={5} />
      <Typography>Horizontal Line</Typography>
    </Container>
    <Container flex={5} mx={20}>
      <Divider bg="background.danger" orientation="vertical" thickness={5} />
      <Typography>Vertical Line</Typography>
    </Container>
  </Container>
);
