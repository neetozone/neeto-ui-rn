import React from "react";

import { Container, Chip, Typography } from "@components";
import { theme } from "@theme";

const variants = ["outlined", "solid"];
const labelColors = Object.keys(theme.colors.font).map(
  color => `font.${color}`
);

const iconBackground = Object.keys(theme.colors.background).map(
  color => `background.${color}`
);

const ChipStories = {
  title: "Chip",
  component: Chip,
  args: {
    variant: variants[0],
    label: "Chip Component",
    isDisabled: false,
    labelColor: labelColors[0],
    closeIconBackground: iconBackground[1],
    closeIconColor: "white",
    closeIconSize: 14,
    containerStyle: {
      padding: 10,
      backgroundColor: theme.colors.background.grey100,
    },
    closeIconContainerStyle: {
      backgroundColor: theme.colors.background.base,
    },
  },
  argTypes: {
    variant: {
      options: variants,
      control: {
        type: "select",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    onClose: {
      onClick: { action: "Close icon clicked" },
    },
    onChipPress: {
      onClick: { action: "Chip pressed" },
    },
    containerStyle: {
      control: {
        type: "object",
      },
    },
    closeIconContainerStyle: {
      control: {
        type: "object",
      },
    },
    labelColor: {
      options: labelColors,
      control: { type: "select" },
    },
    closeIconBackground: {
      options: iconBackground,
      control: {
        type: "select",
      },
    },
    closeIconColor: {
      control: {
        type: "text",
      },
    },
    closeIconSize: {
      control: {
        type: "number",
      },
    },
  },
  parameters: {
    notes: `
Chips are compact elements that represent an input, attribute, or action.

![image](assets/screenshots/chip/chip.png)

## Usage

>import * as React from 'react';
>import { Chip, Container, Typography } from '@bigbinary/neetoui-rn';
>
>export default function Main(){
>  return (
>   <Container>
>     <Chip
>      label="Outlined Chip"
>      LeftIcon={() => <Typography>📣</Typography>}
>      variant="outlined"
>      onChipPress={() => {
>       alert("Chip pressed");
>      }}
>      onClose={() => {
>        alert("On Close clicked");
>       }}
>    />
>   </Container>
>  );
> }
`,
  },
};

export default ChipStories;

export const ChipDemo = args => (
  <Container alignItems="center" flex={1} justifyContent="center">
    <Chip {...args} />
  </Container>
);

export const Chips = () => (
  <Container alignItems="center" flex={1} justifyContent="center">
    <Container my={1}>
      <Chip
        LeftIcon={() => <Typography>📣</Typography>}
        label="Solid chip with icon"
        variant="solid"
        onClose={() => {
          alert("On Close clicked");
        }}
      />
    </Container>
    <Container my={1}>
      <Chip
        LeftIcon={() => <Typography>📣</Typography>}
        label="Outlined chip with icon"
        variant="outlined"
        onClose={() => {
          alert("On Close clicked");
        }}
      />
    </Container>
    <Container my={1}>
      <Chip
        isDisabled
        LeftIcon={() => <Typography>📣</Typography>}
        label="Solid chip disabled"
        variant="solid"
        onClose={() => {
          alert("On Close clicked");
        }}
      />
    </Container>
    <Container my={1}>
      <Chip
        isDisabled
        LeftIcon={() => <Typography>📣</Typography>}
        label="Outlined chip disabled"
        variant="outlined"
        onChipPress={() => {
          alert("Chip pressed");
        }}
        onClose={() => {
          alert("On Close clicked");
        }}
      />
    </Container>
    <Container my={1}>
      <Chip
        label="Outlined chip"
        variant="outlined"
        onClose={() => {
          alert("On Close clicked");
        }}
      />
    </Container>
    <Container my={1}>
      <Chip
        label="Solid chip"
        variant="solid"
        onClose={() => {
          alert("On Close clicked");
        }}
      />
    </Container>
    <Container my={1}>
      <Chip
        label="Default Chip"
        variant="solid"
        onChipPress={() => {
          alert("Chip pressed");
        }}
      />
    </Container>
  </Container>
);
