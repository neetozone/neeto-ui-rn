import React, { useContext, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

import PropTypes from "prop-types";
import { ThemeContext } from "styled-components/native";

import { moderateScale } from "@utils/scale";

import { Chip } from "./Chip";
import { Container } from "./Container";
import { Input } from "./Input";
import { Typography } from "./Typography";

import { endsWithChars, trimChars, isValidEmail } from "../utils";

export const InputEmailChip = ({
  disabled,
  label,
  emails = [],
  onUpdate,
  delimiters = [" ", ","],
  ...rest
}) => {
  const [textValue, setTextValue] = useState("");
  const [emailIndexForDeletion, setEmailIndexForDeletion] = useState(-1);

  const theme = useContext(ThemeContext);
  const inputRef = useRef();

  const gap = moderateScale(4);
  const chipWrapperStyle = {
    pt: gap,
  };

  const getChipContainerStyle = isReadyForDeletion => ({
    borderColor: isReadyForDeletion ? "border.danger" : "border.grey200",
  });

  const handleKeyPress = event => {
    const { key } = event.nativeEvent || {};

    if (!(textValue === "" && key === "Backspace" && emails.length > 0)) return;

    if (emailIndexForDeletion === -1) {
      setEmailIndexForDeletion(emails.length - 1);
    } else {
      removeEmail({ lastOne: true });
      setEmailIndexForDeletion(-1);
    }
  };

  const handleSubmitEditing = event => {
    const { text } = event.nativeEvent || {};
    setEmailIndexForDeletion(-1);
    checkAndUpdateEmails(text);
  };

  const handleTextChange = text => {
    if (!endsWithChars(text, delimiters)) {
      setEmailIndexForDeletion(-1);
      setTextValue(text);

      return;
    }

    checkAndUpdateEmails(text);
  };

  const handleInputTouchStart = () => setEmailIndexForDeletion(-1);

  const handleOnEndEditing = event => {
    checkAndUpdateEmails(event.nativeEvent.text);
  };

  const checkAndUpdateEmails = text => {
    const emailCandidate = trimChars(text, delimiters);

    if (
      emailCandidate !== "" && // Non empty email
      isValidEmail(emailCandidate) && // Valid email
      !emails.includes(emailCandidate) // Unique email
    ) {
      const _emails = [...emails, emailCandidate];
      setTextValue("");
      onUpdate && onUpdate(_emails);
    } else {
      setTextValue(text);
    }
  };

  const removeEmail = ({ email, lastOne = false }) => {
    const indexOfEmail = lastOne ? emails.length - 1 : emails.indexOf(email);

    if (indexOfEmail !== -1) {
      const _emails = [...emails];
      _emails.splice(indexOfEmail, 1);
      onUpdate && onUpdate(_emails);
    }
  };

  const inputProps = {
    autoComplete: "off",
    autoCorrect: false,
    fontSize: "xs",
    returnKeyType: "done",
    autoCapitalize: "none",
    keyboardType: "email-address",
    padding: 0,
    minHeight: moderateScale(26),
    selectionColor:
      emailIndexForDeletion === -1 ? theme.colors.font.base : "transparent",
  };

  useEffect(
    () => () => {
      setTextValue(prevTextValue => {
        checkAndUpdateEmails(prevTextValue);

        return prevTextValue;
      });
    },
    []
  );

  return (
    <Container
      flexDirection="row"
      minHeight={moderateScale(30)}
      py={moderateScale(2)}
      width="100%"
      {...rest}
    >
      {!!label && (
        <Typography
          color={disabled ? "font.grey400" : "font.grey600"}
          fontSize="xs"
          textAlign="left"
          width={moderateScale(40)}
          mt={Platform.select({
            android: moderateScale(10),
            ios: moderateScale(8),
          })}
        >
          {label}
        </Typography>
      )}
      <Container
        alignItems="center"
        flex={1}
        flexDirection="row"
        flexWrap="wrap"
      >
        {emails.map((email, index) => (
          <Container key={email} {...chipWrapperStyle}>
            <Chip
              isDisabled={disabled}
              label={email}
              containerStyle={{
                ...getChipContainerStyle(index === emailIndexForDeletion),
                height: moderateScale(25),
              }}
              onClose={disabled ? null : () => removeEmail({ email })}
            />
          </Container>
        ))}
        {!disabled && (
          <Container
            alignItems="center"
            flex={1}
            justifyContent="center"
            minWidth={moderateScale(160)}
            paddingTop={Platform.select({
              ios: gap,
              android: moderateScale(7),
            })}
          >
            <Input
              noBorder
              disabled={disabled}
              value={textValue}
              containerProps={{
                borderRadius: 0,
              }}
              inputProps={{
                ...inputProps,
                ref: inputRef,
                onKeyPress: handleKeyPress,
                onSubmitEditing: handleSubmitEditing,
                onTouchStart: handleInputTouchStart,
                onEndEditing: handleOnEndEditing,
                borderBottomWidth: moderateScale(2),
                borderColor: "background.grey200",
              }}
              onChangeText={handleTextChange}
            />
          </Container>
        )}
      </Container>
    </Container>
  );
};

InputEmailChip.propTypes = {
  /**
   * Disable input component
   */
  disabled: PropTypes.bool,
  /**
   * Label for the input field
   */
  label: PropTypes.string,
  /**
   * Array of emails to be set
   */
  emails: PropTypes.arrayOf(PropTypes.string),
  /**
   * Characters to be used for separating emails while entering
   * By default `,`, ` ` and enter/done triggers chip creation for the entered email.
   */
  delimiters: PropTypes.arrayOf(PropTypes.string),
  /**
   * Callback containing the emails. It is triggered when an email is added or removed.
   */
  onUpdate: PropTypes.func,
};
