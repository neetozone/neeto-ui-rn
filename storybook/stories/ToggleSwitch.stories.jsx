import React, { useState } from "react";

import { Container, ToggleSwitch } from "@components";

const ToggleSwitchStories = {
  title: "ToggleSwitches",
  component: ToggleSwitch,
  args: {
    disabled: false,
  },
  argTypes: {
    onValueChange: {
      action: "pressed the button",
    },
  },
  parameters: {
    notes: `
ToggleSwitch component is a simple switch toggle component describes what is being switched ON/OFF.

![image](assets/screenshots/toggleswitch/switchstyles.png)

## Usage

>import * as React, {useState} from 'react';
>import { Typography, Container } from '@bigbinary/neetoui-rn';
>
>export default function Main() {
>  const [switchOne, setSwitchOne] = useState(true);
>
> return (
>    <Container>
>     <ToggleSwitch
>      value={switchOne}
>      setValue={() => setSwitchOne(prevValue => !prevValue)}
>     />
>   </Container>
>  );
> }
`,
  },
};

export default ToggleSwitchStories;

export const ToggleSwitchDemo = args => {
  const [demoSwitch, setDemoSwitch] = useState(true);

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <ToggleSwitch
        {...args}
        value={demoSwitch}
        onValueChange={() => setDemoSwitch(prevValue => !prevValue)}
      />
    </Container>
  );
};

export const ToggleSwitches = () => {
  const [switchOne, setSwitchOne] = useState(false);
  const [switchTwo, setSwitchTwo] = useState(true);
  const [switchThree, setSwitchThree] = useState(true);

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <Container my={3}>
        <ToggleSwitch
          value={switchOne}
          onValueChange={() => setSwitchOne(prevValue => !prevValue)}
        />
      </Container>
      <Container my={3}>
        <ToggleSwitch
          value={switchTwo}
          onValueChange={() => setSwitchTwo(prevValue => !prevValue)}
        />
      </Container>
      <Container my={3}>
        <ToggleSwitch disabled value />
      </Container>
      <Container my={3}>
        <ToggleSwitch disabled value={false} />
      </Container>
      <Container my={3}>
        <ToggleSwitch
          value={switchThree}
          onValueChange={() => setSwitchThree(prevValue => !prevValue)}
        />
      </Container>
    </Container>
  );
};
