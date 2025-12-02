import React, { useState } from "react";

import { Container, CheckBox } from "@components";

const CheckBoxStories = {
  title: "Checkbox",
  component: CheckBox,
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    checked: {
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
    checked: false,
    label: "Checkbox demo",
  },
  parameters: {
    notes: `
This component supports below props categories from styled-system.

- flexbox
- space
- border
- layout
- color
- buttonStyle

![image](assets/screenshots/checkbox/checkbox.png)

## Usage

>import * as React from "react";
>import { moderateScale } from "react-native-size-matters";
>import { Container, CheckBox } from "@bigbinary/neetoui-rn";
>
>export default function Main() {
>  const [checked, setChecked] = useState(true);
>
>  return (
>    <Container>
>      <CheckBox
>        mt={moderateScale(2)}
>        checked={checked1}
>        onSelect={() => setChecked1(prev => !prev)}
>        label="Checkbox"
>      />
>      <CheckBox
>        mt={moderateScale(3)}
>        checked={checked2}
>        onSelect={() => setChecked2(prev => !prev)}
>        label="Checkbox"
>      />
>      <CheckBox mt={moderateScale(3)} disabled label="Disabled checkbox" />
>    </Container>
>  );
> }
`,
  },
};

export default CheckBoxStories;

export const CheckBoxDemo = args => {
  const { checked, disabled, label } = args;

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <CheckBox
        checked={checked}
        disabled={disabled}
        label={label}
        onSelect={() => {}}
      />
    </Container>
  );
};

export const CheckBoxComponent = () => {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);

  return (
    <Container>
      <CheckBox
        checked={checked1}
        label={`Checkbox marked as ${!checked1 ? "un" : ""}checked`}
        mt={2}
        onSelect={() => setChecked1(prev => !prev)}
      />
      <CheckBox
        checked={checked2}
        label={`Checkbox marked as ${!checked2 ? "un" : ""}checked`}
        mt={3}
        onSelect={() => setChecked2(prev => !prev)}
      />
      <CheckBox disabled label="Disabled checkbox" mt={3} />
      <CheckBox
        checked
        disabled
        label="Disabled checkbox marked as checked"
        mt={3}
      />
    </Container>
  );
};
