import React, { useState } from "react";

import { Container, ButtonGroup } from "@components";
import { theme } from "@theme";

const buttonItems = ["Button1", "Button2"];
const backgroundColors = Object.keys(theme.colors.background).map(
  color => `background.${color}`
);
const fontSizes = Object.keys(theme.fontSizes);

const ButtonGroupStories = {
  title: "Button Group",
  component: ButtonGroup,
  args: {
    buttonItems,
    currentActiveBtn: buttonItems[0],
    activeColor: backgroundColors[13],
    inActiveColor: backgroundColors[1],
    buttonStyle: { borderColor: backgroundColors[13] },
    wrapperStyle: { borderColor: backgroundColors[13] },
    buttonTextStyle: { fontSize: fontSizes[2] },
  },
  argTypes: {
    buttonItems: {
      separator: ",",
      control: { type: "array" },
    },
    activeColor: {
      options: backgroundColors,
      control: { type: "radio" },
    },
    inActiveColor: {
      options: backgroundColors,
      control: { type: "radio" },
    },
    buttonStyle: {
      control: { type: "object" },
    },
    buttonTextStyle: {
      control: { type: "object" },
    },
    wrapperStyle: {
      control: { type: "object" },
    },
  },
  parameters: {
    notes: `
ButtonGroup is a linear set of segments, each of which function as a button that can display a different view/or perform a different action.

![image](assets/screenshots/buttonGroup/buttonGroup.png)

## Usage

>import React, { useState } from 'react';
>import { ButtonGroup } from '@bigbinary/neetoui-rn';
>
>export default function Main(){
>  const buttonItems = ["Button1", "Button2"];
>  const [activeButton, setActiveButton] = useState(buttonItems[0]);
>
>  return(
>    <ButtonGroup
>     buttonItems={buttonItems}
>     onPress={setActiveButton}
>     currentActiveBtn={activeButton}
>    />)
>}
`,
  },
};

export default ButtonGroupStories;

export const ButtonGroupDemo = args => {
  const [activeButton, setActiveButton] = useState(args.buttonItems[0]);

  return (
    <Container>
      <ButtonGroup
        {...args}
        currentActiveBtn={activeButton}
        onPress={setActiveButton}
      />
    </Container>
  );
};

export const ButtonGroups = () => {
  const buttonItems1 = ["Button1", "Button2"];
  const buttonItems2 = ["Button1", "Button2", "Button3"];
  const buttonItems3 = ["Button1", "Button2", "Button3"];
  const [activeButton1, setActiveButton1] = useState(buttonItems1[0]);
  const [activeButton2, setActiveButton2] = useState(buttonItems2[0]);
  const [activeButton3, setActiveButton3] = useState(buttonItems3[2]);

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <Container my={2}>
        <ButtonGroup
          buttonItems={buttonItems1}
          currentActiveBtn={activeButton1}
          onPress={setActiveButton1}
        />
      </Container>
      <Container my={2}>
        <ButtonGroup
          buttonItems={buttonItems2}
          buttonStyle={{ border: theme.colors.font.grey600 }}
          currentActiveBtn={activeButton2}
          onPress={setActiveButton2}
        />
      </Container>
      <Container my={2}>
        <ButtonGroup
          activeColor={theme.colors.font.danger}
          buttonItems={buttonItems3}
          buttonStyle={{ border: theme.colors.font.grey600 }}
          currentActiveBtn={activeButton3}
          inActiveColor={theme.colors.font.grey200}
          wrapperStyle={{ borderColor: theme.colors.font.grey600 }}
          onPress={setActiveButton3}
        />
      </Container>
    </Container>
  );
};
