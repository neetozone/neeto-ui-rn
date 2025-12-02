import React from "react";

import { Container, Avatar, Typography } from "@components";

import { theme } from "../../src/theme";

const name = "Oliver Smith";
const fontColors = Object.keys(theme.colors.font).map(color => `font.${color}`);
const variants = ["small", "medium"];
const bgColors = Object.keys(theme.colors.background).map(
  color => `background.${color}`
);

const AvatarStories = {
  title: "Avatars",
  component: Avatar,
  args: {
    name,
    variant: variants[0],
    fontColor: fontColors[0],
    bgColor: bgColors[0],
    imageUrl: "",
  },
  argTypes: {
    variant: {
      options: variants,
      control: {
        type: "select",
      },
    },
    fontColor: {
      options: fontColors,
      control: {
        type: "select",
      },
    },
    bgColor: {
      options: bgColors,
      control: {
        type: "select",
      },
    },
  },
  parameters: {
    notes: `
Avatars can be used to represent people in a graphical way.

![image](assets/screenshots/avatar/images.png)

![image](assets/screenshots/avatar/texts.png)

## Usage

>import * as React from 'react';
>import { Typography, Avatar } from '@bigbinary/neetoui-rn';
>
>export default function Main() {
>  return (
>    <Container>
>      <Avatar
>        variant={"medium"}
>        name="Oliver Smith"
>      />
>   </Container>
>  );
> }
`,
  },
};
export default AvatarStories;

export const AvatarDemo = args => (
  <Container alignItems="center" flex={1} justifyContent="center">
    <Avatar {...args} />
  </Container>
);

export const TextSizes = () => (
  <Container alignItems="center" flex={1} justifyContent="center">
    <Container alignItems="center" flexDirection="row">
      <Avatar margin={2} name="John Doe" />
      <Typography fontSize="xl">Medium</Typography>
    </Container>
    <Container alignItems="center" flexDirection="row">
      <Avatar name="John Doe" variant="small" />
      <Typography fontSize="xl">Small</Typography>
    </Container>
  </Container>
);

export const ImageSizes = () => (
  <Container alignItems="center" flex={1} justifyContent="center">
    <Container alignItems="center" flexDirection="row">
      <Avatar imageUrl="https://picsum.photos/100" name="John Doe" />
      <Typography fontSize="xl">Medium</Typography>
    </Container>
    <Container alignItems="center" flexDirection="row">
      <Avatar
        imageUrl="https://picsum.photos/100"
        name="John Doe"
        variant="extra-small"
      />
      <Typography fontSize="2xs">Extra Small</Typography>
    </Container>
    <Container alignItems="center" flexDirection="row">
      <Avatar
        imageUrl="https://picsum.photos/100"
        name="John Doe"
        variant="small"
      />
      <Typography fontSize="xl">Small</Typography>
    </Container>
    <Container alignItems="center" flexDirection="row">
      <Avatar imageUrl="broken url test" name="John Doe" />
      <Typography fontSize="l">Broken image url</Typography>
    </Container>
  </Container>
);
