import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { Close } from "@bigbinary/neeto-icons-rn";
import Toast, { BaseToast } from "react-native-toast-message";

import { theme } from "@theme";
import { moderateScale } from "@utils/scale";

const CloseButton = () => (
  <Pressable style={styles.closeButtonStyle} onPress={Toast.hide}>
    <Close color={theme.colors.background.white} size={moderateScale(22)} />
  </Pressable>
);

export const defaultToasterConfig = {
  success: props => (
    <BaseToast
      {...props}
      contentContainerStyle={styles.contentContainerStyle}
      leadingIconContainerStyle={styles.toasterBGColor}
      renderTrailingIcon={() => <CloseButton />}
      text1NumberOfLines={10}
      text1Style={styles.text1Style}
      text2NumberOfLines={10}
      text2Style={styles.text2Style}
      touchableContainerProps={{
        style: [styles.touchableContainerProps, styles.successStyle],
      }}
    />
  ),
  error: props => (
    <BaseToast
      {...props}
      contentContainerStyle={styles.contentContainerStyle}
      leadingIconContainerStyle={styles.toasterBGColor}
      renderTrailingIcon={() => <CloseButton />}
      text1NumberOfLines={10}
      text1Style={styles.text1Style}
      text2NumberOfLines={10}
      text2Style={styles.text2Style}
      touchableContainerProps={{
        style: [styles.touchableContainerProps, styles.errorStyle],
      }}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      contentContainerStyle={styles.contentContainerStyle}
      leadingIconContainerStyle={styles.toasterBGColor}
      renderTrailingIcon={() => <CloseButton />}
      text1NumberOfLines={10}
      text1Style={styles.text1Style}
      text2NumberOfLines={10}
      text2Style={styles.text2Style}
      touchableContainerProps={{
        style: [styles.touchableContainerProps, styles.infoStyle],
      }}
    />
  ),
  warning: props => (
    <BaseToast
      {...props}
      contentContainerStyle={styles.contentContainerStyle}
      leadingIconContainerStyle={styles.toasterBGColor}
      renderTrailingIcon={() => <CloseButton />}
      text1NumberOfLines={10}
      text1Style={styles.text1Style}
      text2NumberOfLines={10}
      text2Style={styles.text2Style}
      touchableContainerProps={{
        style: [styles.touchableContainerProps, styles.warningStyle],
      }}
    />
  ),
};

defaultToasterConfig.success.displayName = "Success";
defaultToasterConfig.error.displayName = "Error";

const styles = StyleSheet.create({
  touchableContainerProps: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 10,
    width: 340,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: "#FFF",
    borderLeftWidth: 5,
    borderLeftColor: "#D8D8D8",
  },
  successStyle: {
    borderLeftColor: theme.colors.toast.success,
    backgroundColor: theme.colors.background.grey800,
  },
  errorStyle: {
    borderLeftColor: theme.colors.toast.error,
    backgroundColor: theme.colors.background.grey800,
  },
  infoStyle: {
    borderLeftColor: theme.colors.toast.info,
    backgroundColor: theme.colors.background.grey800,
  },
  warningStyle: {
    borderLeftColor: theme.colors.toast.warning,
    backgroundColor: theme.colors.background.grey800,
  },
  toasterBGColor: { backgroundColor: theme.colors.background.grey800 },
  contentContainerStyle: {
    paddingHorizontal: 15,
    backgroundColor: theme.colors.background.grey800,
  },
  text1Style: {
    fontSize: 15,
    fontFamily: theme.fonts.sf700,
    color: theme.colors.font.white,
  },
  text2Style: {
    fontSize: 16,
    fontFamily: theme.fonts.sf700,
    color: theme.colors.font.white,
  },
  closeButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    backgroundColor: theme.colors.background.grey800,
    shadowColor: theme.colors.background.grey800,
    flexDirection: "row",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
});
