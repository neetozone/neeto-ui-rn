import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Modal from "react-native-modal";

import { moderateScale } from "@utils/scale";

import { Button } from "./Button";
import { Container } from "./Container";
import { Typography } from "./Typography";

const useAlertHook = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [params, setParams] = useState({});

  const {
    title = "",
    description = "",
    isCancelable = true,
    onDismiss,
    buttons = [],
  } = params;

  const show = React.useCallback(params => {
    setParams(params);
    setIsVisible(true);
  }, []);

  const hide = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  const hideOnBackPressDrop = React.useCallback(() => {
    if (isCancelable) {
      hide();
    }

    if (onDismiss && isCancelable) {
      onDismiss();
    }
  }, [hide, isCancelable, onDismiss]);

  return {
    isVisible,
    show,
    hide,
    hideOnBackPressDrop,
    title,
    description,
    isCancelable,
    buttons,
  };
};

let rootLevelRef = null;

/**
 * Launches an alert dialog with the specified title and message.
 * Optionally provide a list of buttons.
 * Tapping any button will fire the respective onPress callback and dismiss the alert.
 * By default, the only button will be an 'OK' button.
 * <div class="screenshots">
 *   <img src="screenshots/alert/alert-1.png" />
 *   <img src="screenshots/alert/alert-2.png" />
 *   <img src="screenshots/alert/alert-3.png" />
 *   <img src="screenshots/alert/alert-4.png" />
 *   <img src="screenshots/alert/alert-5.png" />
 *   <img src="screenshots/alert/alert-6.png" />
 * </div>
 *
 *
 *  ## Usage
 * ```js
 *import * as React from "react";
 *import { moderateScale } from "@utils/scale";
 *import { Alert } from "@bigbinary/neetoui-rn";
 *export function App(props) {
 *  return (
 *    <>
 *      // Render at root component.
 *      <Alert />
 *    </>
 *  );
 *}
 *
 *import * as React from "react";
 *import { moderateScale } from "@utils/scale";
 *import { Alert, Button } from "@bigbinary/neetoui-rn";
 *
 *export default function Main() {
 *  return (
 *    <Button
 *      width={moderateScale(200)}
 *      my={moderateScale(10)}
 *      label="Three Buttons"
 *      onPress={() => {
 *        Alert.show({
 *          title: "Enjoying our app ?",
 *          description: "Do you wannna rate us on app store ?",
 *          buttons: [
 *            {
 *              label: "Yay!",
 *              onPress: () => {},
 *            },
 *            {
 *              label: "No",
 *              onPress: () => {},
 *            },
 *            {
 *              label: "Ask me later",
 *              onPress: () => {},
 *            },
 *          ],
 *          isCancelable: false,
 *          onDismiss: () => {},
 *        });
 *      }}
 *    />
 *  );
 *}
 *
 * ```
 */

export const Alert = () => {
  const {
    isVisible,
    show,
    hide,
    buttons,
    hideOnBackPressDrop,
    title,
    description,
  } = useAlertHook();

  const [
    button1 = {
      label: "OK",
      onPress: () => {},
      variant: "solid",
    },
    button2,
    button3,
  ] = buttons;

  const ref = React.useRef(null);

  React.useImperativeHandle(
    ref,
    React.useCallback(
      () => ({
        show,
      }),
      [show]
    )
  );

  React.useEffect(() => {
    rootLevelRef = ref.current;
  }, [ref]);

  return (
    <Modal
      hideModalContentWhileAnimating
      useNativeDriver
      isVisible={isVisible}
      style={styles.modalStyle}
      onBackdropPress={hideOnBackPressDrop}
    >
      <Container
        alignItems="center"
        bg="background.primary"
        borderRadius={moderateScale(8)}
        justifyContent="center"
        padding={moderateScale(18)}
        width="90%"
      >
        <Typography
          color="font.grey800"
          fontFamily="sf600"
          fontSize="3xl"
          textAlign="center"
        >
          {title}
        </Typography>
        <Container alignItems="center" justifyContent="center">
          <Typography
            color="font.grey500"
            fontFamily="sf400"
            fontSize="s"
            py={moderateScale(20)}
            textAlign="center"
          >
            {description}
          </Typography>
        </Container>
        <Container
          flexDirection="row"
          justifyContent="space-around"
          width="100%"
        >
          {button2 && (
            <Button
              borderRadius={moderateScale(8)}
              borderWidth={moderateScale(1)}
              fontFamily="sf400"
              fontSize="m"
              height={moderateScale(35)}
              label={button2.label}
              minWidth={moderateScale(110)}
              p={0}
              variant={button2.variant || "text"}
              width={undefined}
              onPress={() => {
                button2.onPress?.();
                hide();
              }}
            />
          )}
          {button1 && (
            <Button
              borderRadius={moderateScale(8)}
              fontFamily="sf400"
              fontSize="m"
              height={moderateScale(35)}
              label={button1.label}
              minWidth={moderateScale(110)}
              p={0}
              variant={button1.variant}
              width={undefined}
              onPress={() => {
                button1.onPress?.();
                hide();
              }}
            />
          )}
        </Container>
        {button3 && (
          <Button
            borderRadius={moderateScale(8)}
            borderWidth={moderateScale(1)}
            fontFamily="sf400"
            fontSize="m"
            height={moderateScale(35)}
            label={button3.label}
            minWidth={moderateScale(110)}
            mt={moderateScale(20)}
            p={0}
            variant={button3.variant}
            onPress={() => {
              button3.onPress?.();
              hide();
            }}
          />
        )}
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
});

Alert.show = params => {
  rootLevelRef.show(params);
};
