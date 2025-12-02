import React from "react";

import { Typography, Container } from "@components";

import { theme } from "../../src/theme";

const textStyles = ["header", "body", "subtext"];
const fontSizes = Object.keys(theme.fontSizes);
const fontColors = Object.keys(theme.colors.font).map(color => `font.${color}`);
const fonts = Object.keys(theme.fonts);
const textDecoration = [
  "none",
  "underline",
  "line-through",
  "underline line-through",
];
const textTransformation = ["none", "capitalize", "lowercase", "uppercase"];

const TypographyStories = {
  title: "Foundation/Typography",
  component: Typography,
  args: {
    textStyle: textStyles[0],
    fontSize: fontSizes[0],
    color: fontColors[0],
    fontFamily: fonts[0],
    text: "Typography",
    textDecoration: textDecoration[0],
    textTransform: textTransformation[0],
  },
  argTypes: {
    textStyle: {
      options: textStyles,
      control: {
        type: "select",
      },
    },
    fontSize: {
      options: fontSizes,
      control: {
        type: "select",
      },
    },
    color: {
      options: fontColors,
      control: {
        type: "select",
      },
    },
    fontFamily: {
      options: fonts,
      control: {
        type: "select",
      },
    },
    textDecoration: {
      options: textDecoration,
      control: {
        type: "select",
      },
    },
    textTransform: {
      options: textTransformation,
      control: {
        type: "select",
      },
    },
  },
  parameters: {
    layout: "padded",
    notes: `
Typography component is a primitive text component which is built on top of styled-system.

This component supports below props categories from [styled-system ](/styled-system).

- space
- layout
- flexbox
- typography
- color
- textStyle
\n

![image](assets/screenshots/typography/colors.png)

![image](assets/screenshots/typography/fontfamilies.png)

![image](assets/screenshots/typography/fontsizes.png)

![image](assets/screenshots/typography/textstyles.png)

## Usage

>import * as React from 'react';
>import { Typography, Container } from '@bigbinary/neetoui-rn';
>
>export default function Main() {
>  return (
>    <Container>
>     <Typography>
>         This is basic example of Typography
>      </Typography>
>     </Container>
>  );
> }
`,
  },
};
export default TypographyStories;

export const TypographyDemo = args => (
  <Container>
    <Typography {...args}>{args.text}</Typography>
  </Container>
);

export const TextStyles = () => (
  <Container>
    <Typography textStyle="header">Header</Typography>
    <Typography textStyle="body">Body</Typography>
    <Typography textStyle="subtext">Subtext</Typography>
  </Container>
);

export const FontSizes = () => (
  <Container>
    <Typography fontSize="3xs">3xs as 10px</Typography>
    <Typography fontSize="2xs">2xs as 12px</Typography>
    <Typography fontSize="xs">xs as 13px</Typography>
    <Typography fontSize="s">s as 14px</Typography>
    <Typography fontSize="m">m as 15px</Typography>
    <Typography fontSize="l">l as 16px</Typography>
    <Typography fontSize="xl">xl as 17px</Typography>
    <Typography fontSize="2xl">2xl as 18px</Typography>
    <Typography fontSize="3xl">3xl as 20px</Typography>
    <Typography fontSize="4xl">4xl as 22px</Typography>
    <Typography fontSize="5xl">5xl as 30px</Typography>
  </Container>
);

export const FontColors = () => (
  <Container>
    <Container backgroundColor="background.base">
      <Typography color="font.white" fontSize="3xl">
        White
      </Typography>
    </Container>
    <Typography color="font.base" fontSize="3xl">
      Base
    </Typography>
    <Typography fontSize="3xl">Primary</Typography>
    <Typography color="font.secondary" fontSize="3xl">
      Secondary
    </Typography>
    <Typography color="font.danger" fontSize="3xl">
      Danger
    </Typography>
    <Typography color="font.grey100" fontSize="3xl">
      Grey
    </Typography>
    <Typography color="font.grey100" fontSize="3xl">
      Grey 100
    </Typography>
    <Typography color="font.grey200" fontSize="3xl">
      Grey 200
    </Typography>
    <Typography color="font.grey300" fontSize="3xl">
      Grey 300
    </Typography>
    <Typography color="font.grey400" fontSize="3xl">
      Grey 400
    </Typography>
    <Typography color="font.grey500" fontSize="3xl">
      Grey 500
    </Typography>
    <Typography color="font.grey600" fontSize="3xl">
      Grey 600
    </Typography>
    <Typography color="font.grey700" fontSize="3xl">
      Grey 700
    </Typography>
    <Typography color="font.grey800" fontSize="3xl">
      Grey 800
    </Typography>
  </Container>
);

export const FontFamilies = () => (
  <Container>
    <Typography fontFamily="sf400" fontSize="3xl">
      SFProText Regular 400
    </Typography>
    <Typography fontFamily="sf500" fontSize="3xl">
      SFProText Medium 500
    </Typography>
    <Typography fontFamily="sf600" fontSize="3xl">
      SFProText SemiBold 600
    </Typography>
    <Typography fontFamily="sf700" fontSize="3xl">
      SFProText Bold 700
    </Typography>
  </Container>
);

export const TextDecoration = () => (
  <Container>
    <Typography fontSize="3xl" textDecoration="underline">
      Underline
    </Typography>
    <Typography fontSize="3xl" textDecoration="line-through">
      Line through
    </Typography>
    <Typography fontSize="3xl" textDecoration="underline line-through">
      Underline and line through
    </Typography>
  </Container>
);

export const TextTransformation = () => (
  <Container>
    <Typography fontSize="3xl" textTransform="uppercase">
      uppercase text
    </Typography>
    <Typography fontSize="3xl" textTransform="lowercase">
      lowercase text
    </Typography>
    <Typography fontSize="3xl" textTransform="capitalize">
      capitalized text
    </Typography>
  </Container>
);
