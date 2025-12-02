import React from "react";

import { Plus } from "@bigbinary/neeto-icons-rn";

import { Button, Container } from "@components";
import { theme } from "@theme";

const variants = ["text", "solid", "danger", "danger-inverse", "danger-text"];

const ButtonMetaData = {
  title: "Buttons",
  component: Button,
  args: {
    label: "Button Component",
    variant: variants[1],
    disabled: false,
    isLoading: false,
  },
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
    variant: {
      options: variants,
      control: {
        type: "radio",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    isLoading: {
      control: {
        type: "boolean",
      },
    },
    onPress: { action: "pressed the button" },
  },
  parameters: {
    notes: `
Buttons are touchable elements used to interact with the screen and to trigger an action.

![image](assets/screenshots/button/button.png)

## Usage

import * as React from 'react';
import { Button, Container } from '@bigbinary/neetoui-rn';

export default function Main() {
  return (
    <Container>
      <Button my={moderateScale(9)} label="Button1" />
      <Button my={moderateScale(9)} disabled label="Disabled Button2" />
      <Button
        my={moderateScale(9)}
        LeftIcon={() => <Icon name="ri-add-line" color="white" size={moderateScale(16)} />}
        label="Left Icon Button"
      />
      <Button
        my={moderateScale(9)}
        RightIcon={() => <Icon name="ri-add-line" color="white" size={moderateScale(16)} />}
        label="Right Icon Button"
      />
      <Button my={moderateScale(9)} variant="text" label="Text Button" />
      <Button
        my={moderateScale(9)}
        variant="text"
        LeftIcon={() => (
          <Icon name="ri-add-line" color={theme.fonts.primary} size={moderateScale(16)} />
        )}
        label="Left Icon Text Button"
      />
      <Button
        my={moderateScale(9)}
        variant="text"
        RightIcon={() => (
          <Icon name="ri-add-line" color={theme.fonts.primary} size={moderateScale(16)} />
        )}
        label="Right Icon Text Button"
      />
    </Container>
  );
 }
    `,
  },
};

export default ButtonMetaData;

export const ButtonDemo = args => (
  <Container alignItems="center" flex={1} justifyContent="center">
    <Button {...args} />
  </Container>
);

export const Buttons = () => (
  <Container alignItems="center" flex={1}>
    <Button label="Default Button is solid" my={9} />
    <Button
      isLoading
      label="Default Loading Button"
      loadingText="Loading..."
      my={9}
    />
    <Button isLoading label="Default Loading Button" my={9} />
    <Button disabled label="Default Disabled Button" my={9} />
    <Button label="Danger Button" my={9} variant="danger" />
    <Button disabled label="Danger Disabled Button" my={9} variant="danger" />
    <Button label="Secondary Button" my={9} variant="secondary" />
    <Button
      disabled
      label="Secondary Disabled Button"
      my={9}
      variant="secondary"
    />
    <Button label="Danger Inverse Button" my={9} variant="danger-inverse" />
    <Button
      isLoading
      label="Danger Inverse Button"
      loadingText="Loading..."
      my={9}
      variant="danger-inverse"
    />
    <Button label="Danger Plain Button" my={9} variant="danger-text" />
    <Button
      LeftIcon={() => <Plus color="white" size={16} />}
      label="Left Icon Button"
      my={9}
    />
    <Button
      RightIcon={() => <Plus color="white" size={16} />}
      label="Right Icon Button"
      my={9}
    />
    <Button label="Text Button" my={9} variant="text" />
    <Button disabled label="Text Button" my={9} variant="text" />
    <Button
      label="Left Icon Text Button"
      my={9}
      variant="text"
      LeftIcon={() => (
        <Plus color={theme.fonts.primary} name="ri-add-line" size={16} />
      )}
    />
    <Button
      RightIcon={() => <Plus color={theme.fonts.primary} size={16} />}
      label="Right Icon Text Button"
      my={9}
      variant="text"
    />
    <Button
      isLoading
      RightIcon={() => <Plus color={theme.fonts.primary} size={16} />}
      label="Right Icon Text Button"
      loadingText="Loading with text variant..."
      my={9}
      variant="text"
    />
  </Container>
);
