import React from "react";

import { Container, Button, Toast } from "@components";

const types = ["success", "error", "info", "warning"];
const positions = ["bottom", "top"];
const ToastMessage = {
  title: "ToastMessage",
  component: Toast,
  args: {
    text1: "Yay!",
    text2: "Have a nice day! 😄",
    type: types[0],
    position: positions[0],
  },
  argTypes: {
    type: {
      options: types,
      control: {
        type: "select",
      },
    },
    position: {
      options: positions,
      control: {
        type: "select",
      },
    },
  },
  parameters: {
    notes: `
Toast component is a wrapper over

https://github.com/calintamas/react-native-toast-message.

![image](assets/screenshots/toast/toast-1.png)

![image](assets/screenshots/toast/toast-2.png)

![image](assets/screenshots/toast/toast-3.png)

![image](assets/screenshots/toast/toast-4.png)

## Usage

>import { Toast } from "@bigbinary/neetoui-rn";
>
>export function App(props) {
>  return (
>    <>
>      // Render at root component.
>      <Toast />
>    </>
>  );
>}


>import * as React from "react";
>import { moderateScale } from "react-native-size-matters";
>import { Toast, Container, Button } from "@bigbinary/neetoui-rn";
>
>export default function Main() {
>  return (
>    <Container>
>      <Button
>        label="Error Test"
>        onPress={() => {
>          Toast.show({
>           type: "error",
>            text1: "Yay!",
>            text2: "Have a nice day! 😄",
>          });
>        }}
>      />
>    </Container>
>  );
>}
`,
  },
};
export default ToastMessage;

export const ToastDemo = props => (
  <Container flex={1}>
    <Toast />
    <Button
      label="Show Toast"
      my={10}
      onPress={() => {
        Toast.show({
          ...props,
        });
      }}
    />
  </Container>
);

export const Toasts = () => (
  <Container flex={1}>
    <Toast />
    <Button
      label="Success Toast"
      my={10}
      onPress={() => {
        Toast.show({
          type: "success",
          text1: "Yay!",
          text2: "Showing Success Toast Message!",
        });
      }}
    />
    <Button
      label="Error Toast"
      my={10}
      onPress={() => {
        Toast.show({
          type: "error",
          text1: "Ohh!",
          text2: "Showing Error Toast Message!",
        });
      }}
    />
    <Button
      label="Info Toast"
      my={10}
      onPress={() => {
        Toast.show({
          type: "info",
          text1: "Ohh!",
          text2: "Showing Info Toast Message!",
        });
      }}
    />
    <Button
      label="Warning Toast"
      my={10}
      onPress={() => {
        Toast.show({
          type: "warning",
          text1: "Ohh!",
          text2: "Showing Warning Toast Message!",
        });
      }}
    />
  </Container>
);
