import React, { useState } from "react";

import { Container, RadioButton } from "@components";

const RadioButtonStories = {
  title: "RadioButton",
  component: RadioButton,
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    selected: {
      control: {
        type: "boolean",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    disabled: false,
    selected: false,
    label: "Radio button demo",
  },
  parameters: {
    notes: `

![image](assets/screenshots/radioButton/radioButton.png)

This component supports below props categories from styled-system.

- flexbox
- space
- border
- layout
- color
- buttonStyle
\n

## Usage

>import * as React from "react";
>import { moderateScale } from "react-native-size-matters";
>import { Container, RadioButton } from "@bigbinary/neetoui-rn";
>
>export default function Main() {
>  const [selected1, setSelected1] = useState(true);
>  const [selected2, setSelected2] = useState(false);
>
>  return (
>    <Container>
>      <RadioButton
>        mt={moderateScale(2)}
>        selected={selected1}
>        onSelect={() => setSelected1(prev => !prev)}
>        label="Radio button"
>      />
>      <RadioButton
>        mt={moderateScale(3)}
>        selected={selected2}
>        onSelect={() => setSelected2(prev => !prev)}
>        label="Radio button"
>      />
>      <RadioButton mt={moderateScale(3)} disabled label="Disabled Radio button" />
>    </Container>
>  );
> }
`,
  },
};

export default RadioButtonStories;

export const RadioButtonDemo = args => {
  const { selected, disabled, label } = args;

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <RadioButton
        disabled={disabled}
        label={label}
        selected={selected}
        onSelect={() => {}}
      />
    </Container>
  );
};

export const RadioButtonComponent = () => {
  const [selected1, setSelected1] = useState(true);
  const [selected2, setSelected2] = useState(false);

  return (
    <Container>
      <RadioButton
        label={`Radio button marked as ${!selected1 ? "un" : ""}selected`}
        mt={2}
        selected={selected1}
        onSelect={() => setSelected1(prev => !prev)}
      />
      <RadioButton
        label={`Radio button marked as ${!selected2 ? "un" : ""}selected`}
        mt={3}
        selected={selected2}
        onSelect={() => setSelected2(prev => !prev)}
      />
      <RadioButton disabled label="Disabled radio button" mt={3} />
      <RadioButton
        disabled
        selected
        label="Disabled and selected radio button"
        mt={3}
      />
    </Container>
  );
};
