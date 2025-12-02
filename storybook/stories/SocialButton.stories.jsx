import React from "react";

import { SocialButton, Container } from "@components";

const ButtonMetaData = {
  title: "SocialButtons",
  component: SocialButton,
  parameters: {
    notes: `
Buttons are touchable elements used to interact with the screen and to trigger an action.

![image](assets/screenshots/socialButton/socialButtons.png)

## Usage

>import * as React from 'react';
>import { Container, SocialButton } from '@bigbinary/neetoui-rn';
>
>export default function Main() {
>  return (
>    <Container>
>      <SocialButton variant="apple" my={moderateScale(9)} />
>      <SocialButton variant="google" />
>    </Container>
>  );
> }
`,
  },
};

export default ButtonMetaData;

export const SocialButtons = () => (
  <Container alignItems="center" flex={1}>
    <SocialButton my={9} variant="apple" />
    <SocialButton variant="google" />
  </Container>
);
