import React, { useState } from "react";

import { Container, OtpInputs, Typography } from "@components";

import { theme } from "../../src/theme";

const OtpInputsMeta = {
  title: "OtpInputs",
  component: OtpInputs,
  parameters: {
    notes: `
One-Time password input component.

![image](assets/screenshots/otp/otp.png)

## Usage

>import * as React from 'react';
>import { Container, OtpInputs, Typography} from '@bigbinary/neetoui-rn';

>export default function Main() {
  const [code, setCode] = useState("");
  return (
    <Container flex={1} justifyContent="center" alignItems="center">
      <OtpInputs code={code} numberOfInputs={6} handleChange={setCode} />
      <Typography py={moderateScale(10)} fontSize="xl">
        Your entered otp code is {code}
      </Typography>
    </Container>
  );
  `,
  },
};
export default OtpInputsMeta;

export const OtpInputsDemo = () => {
  const [code, setCode] = useState("");
  const [code2, setCode2] = useState("");

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <OtpInputs code={code} handleChange={setCode} numberOfInputs={6} />
      <Typography fontSize="xl" py={10}>
        Your entered OTP is {code}
      </Typography>
      <Container
        alignItems="center"
        bg="background.grey300"
        justifyContent="center"
        p={2}
      >
        <Typography fontSize="l" py={10}>
          With Custom Styles
        </Typography>
        <OtpInputs
          code={code2}
          containerStyles={{ backgroundColor: theme.colors.background.base }}
          handleChange={setCode2}
          numberOfInputs={6}
          textStyles={{
            color: theme.colors.font.white,
          }}
        />
      </Container>
    </Container>
  );
};
