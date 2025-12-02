import React from "react";

import { Badge, Container, Typography } from "@components";

import { theme } from "../../src/theme";

const fontSizes = Object.keys(theme.fontSizes);
const fontColors = Object.keys(theme.colors.font).map(color => `font.${color}`);
const fonts = Object.keys(theme.fonts);

const BadgeMetaData = {
  title: "Badge",
  component: Badge,
  args: {
    content: "test",
    size: 36,
    fontSize: fontSizes[0],
    badgeColor: "background.base",
    color: fontColors[0],
    fontFamily: fonts[0],
  },
  argTypes: {
    content: {
      control: {
        type: "text",
      },
    },
    size: {
      control: {
        type: "number",
      },
    },
    fontSize: {
      options: fontSizes,
      control: {
        type: "select",
      },
    },
    badgeColor: {
      options: fontColors,
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
  },
  parameters: {
    notes: `
This component supports below props categories from styled-system.

- flexbox
- space
- border
- color
- layout

![image](assets/screenshots/badge/badges.png)

## Usage

>import * as React from 'react';
>import { Badge, Container } from '@bigbinary/neetoui-rn';
>
>export default function Main() {
>return (
>    <Container>
>       <Badge
>          content="test"
>          size={moderateScale(32)}
>          fontSize="12px"
>          badgeColor="background.secondary"
>          color="font.secondary"
>        />
>    </Container>
>  );
> }
`,
  },
};

export default BadgeMetaData;

export const Badges = () => (
  <Container alignItems="center" flex={1} justifyContent="center">
    <Container flex={1} justifyContent="center">
      <Container alignItems="center" flexDirection="row" mb={4} px={2}>
        <Badge content={3} size={32} />
        <Typography fontSize="l" px={2}>
          Custom size 32.
        </Typography>
      </Container>
      <Container alignItems="center" flexDirection="row" mb={4} px={2}>
        <Badge content={3} fontSize="16px" size={32} />
        <Typography fontSize="l" px={2}>
          Custom fontSize
        </Typography>
      </Container>
      <Container alignItems="center" flexDirection="row" mb={4} px={2}>
        <Badge
          badgeColor="background.secondary"
          color="font.secondary"
          content="test"
          fontSize="12px"
          size={32}
        />
        <Typography fontSize="l" px={2}>
          Custom background color
        </Typography>
      </Container>
      <Container alignItems="center" flexDirection="row" mb={4} px={2}>
        <Badge color="font.danger" content="test" fontSize="12px" size={32} />
        <Typography fontSize="l" px={2}>
          Custom font color
        </Typography>
      </Container>
      <Container alignItems="center" flexDirection="row" mb={4} px={2}>
        <Badge content="test" fontFamily="sf700" fontSize="12px" size={32} />
        <Typography fontSize="l" px={2}>
          Custom font family
        </Typography>
      </Container>
      <Container alignItems="center" flexDirection="row" mb={4} px={2}>
        <Badge content="Comment" fontFamily="sf700" fontSize="12px" />
        <Typography fontSize="l" px={2}>
          Long Text
        </Typography>
      </Container>
    </Container>
  </Container>
);

export const BadgeDemo = args => (
  <Container alignItems="center" justifyContent="center">
    <Typography>Default</Typography>
    <Badge {...args} />
  </Container>
);
