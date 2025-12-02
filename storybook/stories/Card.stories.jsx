import React from "react";

import { Card, Typography } from "@components";

export const CardDemo = args => (
  <Card
    bg="background.danger"
    elevation={5}
    height="100px"
    width="100px"
    {...args}
  />
);

const CardMetaData = {
  title: "Card",
  component: CardDemo,
  argTypes: {},
  args: {},
  parameters: {
    notes: `
This component is wrapper over Container component.

This component supports below props categories from styled-system. \n\n

- flexbox
- space
- border
- color
- layout

![image](assets/screenshots/card/shadows.png)

## Usage

>import * as React from 'react';
>import { Card, Typography } from '@bigbinary/neetoui-rn';
>
>export default function Main() {
> return (
>   <Card height="100px" width="100px" bg="background.danger" elevation={moderateScale(8)}>
>     <Typography fontSize="14px">Card</Typography>
>   </Card>
>  );
>}
`,
  },
};

export default CardMetaData;

export const Cards = () => (
  <>
    <Card bg="background.danger" elevation={5} height="100px" width="100px">
      <Typography fontSize="14px">Card</Typography>
    </Card>
    <Card bg="background.danger" height="100px" mt={10} width="100px">
      <Typography fontSize="14px">Card</Typography>
    </Card>
    <Card
      bg="background.danger"
      elevation={20}
      height="100px"
      mt={10}
      width="100px"
    >
      <Typography fontSize="14px">Card</Typography>
    </Card>
  </>
);
