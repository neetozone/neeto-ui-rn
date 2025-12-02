import React from "react";

import { Container, Button, Alert } from "@components";

const AlertStories = {
  title: "Alert",
  parameters: {
    notes: `
Launches an alert dialog with the specified title and message.
Optionally provide a list of buttons.

Tapping any button will fire the respective onPress callback and dismiss the alert.

By default, the only button will be an 'OK' button.

![image](assets/screenshots/alert/alert-1.png)

![image](assets/screenshots/alert/alert-2.png)

![image](assets/screenshots/alert/alert-3.png)

![image](assets/screenshots/alert/alert-4.png)

![image](assets/screenshots/alert/alert-5.png)

![image](assets/screenshots/alert/alert-6.png)


## Usage

>import * as React from "react";
>import { moderateScale } from "react-native-size-matters";
>import { Alert } from "@bigbinary/neetoui-rn";
>export function App(props) {
>  return (
>    <>
>      // Render at root component.
>      <Alert />
>    </>
>  );
>}

>import * as React from "react";
>import { moderateScale } from "react-native-size-matters";
>import { Alert, Button } from "@bigbinary/neetoui-rn";
>
>export default function Main() {
>  return (
>    <Button
>      width={moderateScale(200)}
>      my={moderateScale(10)}
>      label="Three Buttons"
>      onPress={() => {
>        Alert.show({
>          title: "Enjoying our app ?",
>          description: "Do you wannna rate us on app store ?",
>          buttons: [
>            {
>              label: "Yay!",
>              onPress: () => {},
>            },
>            {
>              label: "No",
>              onPress: () => {},
>            },
>            {
>              label: "Ask me later",
>              onPress: () => {},
>            },
>          ],
>          isCancelable: false,
>          onDismiss: () => {},
>        });
>      }}
>    />
>  );
}
`,
  },
};
export default AlertStories;

export const AlertDemo = () => (
  <Container alignItems="center" flex={1} justifyContent="center">
    <Alert />
    <Button
      label="With Default Button"
      my={10}
      width={200}
      onPress={() => {
        Alert.show({
          title: "Successful !!",
          description: "Your profile has been updated successfully",
        });
      }}
    />
    <Button
      label="Single Button"
      my={10}
      width={200}
      onPress={() => {
        Alert.show({
          title: "Successful !!",
          description: "Your profile has been updated successfully",
          buttons: [
            {
              label: "Yay!",
              onPress: () => {},
              variant: "text",
            },
          ],
        });
      }}
    />
    <Button
      label="Two Buttons"
      my={10}
      width={200}
      onPress={() => {
        Alert.show({
          title: "Logout",
          description: "Are you sure you want to logout?",
          buttons: [
            {
              label: "Yay!",
              onPress: () => {},
              variant: "solid",
            },
            {
              label: "No",
              onPress: () => {},
              variant: "text",
            },
          ],
          onDismiss: () => {},
        });
      }}
    />
    <Button
      label="Three Buttons"
      my={10}
      width={200}
      onPress={() => {
        Alert.show({
          title: "Enjoying our app ?",
          description: "Do you wannna rate us on app store ?",
          buttons: [
            {
              label: "Yay!",
              onPress: () => {},
            },
            {
              label: "No",
              onPress: () => {},
            },
            {
              label: "Ask me later",
              onPress: () => {},
            },
          ],
        });
      }}
    />
    <Button
      label="Non Cancelable "
      my={10}
      width={200}
      onPress={() => {
        Alert.show({
          title: "Alert !!",
          description: "You need to agree to proceed.",
          buttons: [
            {
              label: "Agree!",
              onPress: () => {},
            },
          ],
          isCancelable: false,
        });
      }}
    />
    <Button
      label="Danger Buttons"
      my={10}
      width={200}
      onPress={() => {
        Alert.show({
          title: "Delete",
          description: "Are you sure you want to delete?",
          buttons: [
            {
              label: "Yay!",
              onPress: () => {},
              variant: "danger",
            },
            {
              label: "No",
              onPress: () => {},
            },
          ],
          onDismiss: () => {},
        });
      }}
    />
  </Container>
);
