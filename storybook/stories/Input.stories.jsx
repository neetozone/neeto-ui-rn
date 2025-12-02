import React from "react";

import { EmailSent, Down } from "@bigbinary/neeto-icons-rn";

import { Input, Container, Typography } from "@components";

import { theme } from "../../src/theme";

const keyBoardTypes = [
  "default",
  "email-address",
  "numeric",
  "ascii-capable",
  "decimal-pad",
  "number-pad",
  "phone-pad",
  "web-search",
];

const InputDemo = args => {
  const [value, setValue] = React.useState(args.value);

  return <Input {...args} value={value} onChangeText={setValue} />;
};

const InputMetaData = {
  title: "Input",
  component: InputDemo,
  argTypes: {
    keyboardType: {
      options: keyBoardTypes,
      control: {
        type: "select",
      },
    },
    value: {
      control: {
        type: "text",
      },
    },
    errorMessage: {
      control: {
        type: "text",
      },
    },
    autoFocus: {
      options: [true, false],
      control: {
        type: "boolean",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    inputProps: {
      secureTextEntry: {
        options: [true, false],
        control: {
          type: "boolean",
        },
      },
    },
  },
  args: {
    label: "Email",
    keyboardType: keyBoardTypes[0],
    value: "oliver@example.com",
    disabled: false,
    autoFocus: false,
    errorMessage: "",
    inputProps: {
      secureTextEntry: false,
    },
  },
  parameters: {
    notes: `
Input component allow users to input custom text entries with a keyboard.

This component supports below props categories from styled-system.

- flexbox
- space
- border
- buttonStyle
- brandLeft
- typography

![image](assets/screenshots/inputs/inputs.png)

## Usage

>import * as React from 'react';
>import { Input, Container } from '@bigbinary/neetoui-rn';
>export default function Main() {
>   return (
>     <Container>
>      <Input value="Oliver Smith" onChangeText={()=>{}} label="Name" />
>   </Container>
> );
>}
`,
  },
};

export default InputMetaData;

export const Inputs = () => (
  <>
    <Container mb={20}>
      <Typography py={2}>Default Input</Typography>
      <Input label="Email" value="" onChangeText={() => {}} />
    </Container>
    <Container mb={20}>
      <Typography py={2}>Without Label</Typography>
      <Input value="" onChangeText={() => {}} />
    </Container>
    <Container mb={20}>
      <Typography py={2}>Focused Input</Typography>
      <Input autoFocus label="Email" value="" onChangeText={() => {}} />
    </Container>
    <Container mb={20}>
      <Typography py={2}>Input Containing Value</Typography>
      <Input
        label="Email"
        placeholder="Placeholder"
        value="oliver@example.com"
        onChangeText={() => {}}
      />
    </Container>
    <Container mb={20}>
      <Typography py={2}>Disabled Input Without Value</Typography>
      <Input disabled label="Email" value="" onChangeText={() => {}} />
    </Container>
    <Container mb={20}>
      <Typography py={2}>Disabled Input With Value</Typography>
      <Input
        disabled
        label="Email"
        value="oliver@example.com"
        onChangeText={() => {}}
      />
    </Container>
    <Container mb={20}>
      <Typography py={2}>Input With Error</Typography>
      <Input
        errorMessage="Please enter a valid email."
        label="Email"
        value="oliver.com"
        onChangeText={() => {}}
      />
    </Container>
    <Container mb={20}>
      <Typography py={2}>Input With Left Icon</Typography>
      <Input
        label="Email"
        value=""
        PrefixIcon={() => (
          <Container flexDirection="row">
            <EmailSent color={theme.colors.background.grey600} size={22} />
          </Container>
        )}
        onChangeText={() => {}}
      />
    </Container>
    <Container mb={20}>
      <Typography py={2}>Input With Right Icon</Typography>
      <Input
        label="Email"
        value=""
        SuffixIcon={() => (
          <Container flexDirection="row">
            <Down color={theme.colors.background.grey600} size={22} />
          </Container>
        )}
        onChangeText={() => {}}
      />
    </Container>
    <Container mb={20}>
      <Container mb={20}>
        <Typography py={2}>Input With Icon and Value</Typography>
        <Input
          label="Email"
          value="oliver@example.com"
          PrefixIcon={() => (
            <Container flexDirection="row">
              <EmailSent color={theme.colors.background.grey600} size={22} />
            </Container>
          )}
          SuffixIcon={() => (
            <Container flexDirection="row">
              <Down color={theme.colors.background.grey600} size={22} />
            </Container>
          )}
          onChangeText={() => {}}
        />
      </Container>
    </Container>
    <Container mb={20}>
      <Typography py={2}>Input With Secured Content</Typography>
      <Input
        inputProps={{ secureTextEntry: true }}
        label="Password"
        value="Password"
        onChangeText={() => {}}
      />
    </Container>
    <Container mb={20}>
      <Typography py={2}>Input With Multiline Content</Typography>
      <Input
        inputProps={{ multiline: true, height: 100 }}
        label="Message"
        value="Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
          In sagittis scelerisque euismod.
          Vivamus efficitur libero ut fermentum elementum.
          Aenean scelerisque sed augue quis vestibulum.

          consectetur adipiscing elit.
          In sagittis scelerisque euismod.
          Vivamus efficitur libero ut fermentum elementum.
          Aenean scelerisque sed augue quis vestibulum. "
        onChangeText={() => {}}
      />
    </Container>
  </>
);
