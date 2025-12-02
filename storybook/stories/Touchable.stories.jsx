import React from "react";

import { Touchable, Typography } from "@components";

export const TouchableDemo = args => (
  <Touchable
    alignItems="center"
    bg="background.secondary"
    height="30px"
    justifyContent="center"
    rippleConfig={{ containerBorderRadius: 50 }}
    width="100px"
    {...args}
  >
    <Typography fontSize="14px">Touchable</Typography>
  </Touchable>
);

const TouchableMetaData = {
  title: "Touchable",
  component: TouchableDemo,
  argTypes: {},
  args: {},
  parameters: {
    notes: `
Touchable component is a wrapper over Ripple.

This component supports below props categories from styled-system.

- flexbox
- space
- border
- layout
- color
- buttonStyle
\n
## Usage

>import * as React from 'react';
>import { Touchable, Typography } from '@bigbinary/neetoui-rn';
>
>export default function Main() {
>  return (
>     <Touchable
>       bg="background.primary"
>       width="100px"
>       height="30px"
>       rippleConfig={{
>          opacity: 0.09,
>          duration: 600,
>          containerBorderRadius: moderateScale(50),
>       }}
>     >
>       <Typography fontSize="10px">This is wrapped in Touchable component</Typography>
>     </Touchable>
>  );
> }
`,
  },
};

export default TouchableMetaData;

export const Touchables = () => (
  <>
    <Touchable
      alignItems="center"
      bg="background.secondary"
      height="30px"
      justifyContent="center"
      rippleConfig={{ containerBorderRadius: 50 }}
      width="100px"
    >
      <Typography fontSize="14px">Touchable</Typography>
    </Touchable>
    <Touchable
      alignItems="center"
      bg="background.secondary"
      elevation={10}
      height="30px"
      justifyContent="center"
      mt={10}
      rippleConfig={{ containerBorderRadius: 50 }}
      width="200px"
    >
      <Typography fontSize="14px">Touchable with elevation</Typography>
    </Touchable>
  </>
);
