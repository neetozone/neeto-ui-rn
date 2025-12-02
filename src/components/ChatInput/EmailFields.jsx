import React from "react";

import PropTypes from "prop-types";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

import { Badge } from "./Badge";

import { InputEmailChip } from "../InputEmailChip";

export const EmailFields = ({
  shouldShowEmailFields,
  setIsEmailFieldsVisible,
  isEmailFieldsVisible,
  toEmails,
  toEmailsForForward,
  ccEmails,
  bccEmails,
  setToEmails,
  setToEmailsForForward,
  setBccEmails,
  setCcEmails,
  isReplyOptionSelected,
  isNoteOptionSelected,
  isForwardOptionSelected,
}) => {
  const firstToEmail = isReplyOptionSelected
    ? toEmails[0]
    : toEmailsForForward[0];

  let badge = "";
  if (firstToEmail) {
    badge = `To ${firstToEmail}`;
  } else if (isForwardOptionSelected) {
    badge = "Click here to enter email id.";
  }

  const totalEmailsMinus1 =
    toEmails.length +
    toEmailsForForward.length +
    ccEmails.length +
    bccEmails.length -
    1;

  if (!shouldShowEmailFields) return null;

  return isEmailFieldsVisible ? (
    <Animated.View
      entering={FadeInDown}
      key={isEmailFieldsVisible}
      pb={moderateScale(10)}
    >
      {isReplyOptionSelected && (
        <InputEmailChip
          disabled
          emails={toEmails}
          label="To:"
          onUpdate={setToEmails}
        />
      )}
      {isForwardOptionSelected && (
        <InputEmailChip
          disabled={false}
          emails={toEmailsForForward}
          label="To:"
          onUpdate={setToEmailsForForward}
        />
      )}
      <InputEmailChip
        disabled={false}
        emails={ccEmails}
        label="Cc:"
        onUpdate={setCcEmails}
      />
      <InputEmailChip
        disabled={false}
        emails={bccEmails}
        label="Bcc:"
        onUpdate={setBccEmails}
      />
    </Animated.View>
  ) : (
    <Animated.View
      alignItems="flex-start"
      entering={FadeInUp}
      flexDirection="row"
      flexWrap="wrap"
      key={isEmailFieldsVisible}
      style={
        isNoteOptionSelected && {
          height: moderateScale(0),
          width: moderateScale(0),
        }
      }
      onTouchStart={() => setIsEmailFieldsVisible(true)}
    >
      {toEmails.length > 0 && (
        <>
          <Badge text={badge} />
          {totalEmailsMinus1 > 1 && <Badge text={`+ ${totalEmailsMinus1}`} />}
        </>
      )}
    </Animated.View>
  );
};

EmailFields.propTypes = {
  shouldShowEmailFields: PropTypes.bool,
  isEmailFieldsVisible: PropTypes.bool,
  setIsEmailFieldsVisible: PropTypes.func,
  ccEmails: PropTypes.arrayOf(PropTypes.string),
  toEmails: PropTypes.arrayOf(PropTypes.string),
  toEmailsForForward: PropTypes.arrayOf(PropTypes.string),
  bccEmails: PropTypes.arrayOf(PropTypes.string),
  setBccEmails: PropTypes.func,
  setCcEmails: PropTypes.func,
  setToEmails: PropTypes.func,
  setToEmailsForForward: PropTypes.func,
  isReplyOptionSelected: PropTypes.bool,
  isNoteOptionSelected: PropTypes.bool,
  isForwardOptionSelected: PropTypes.bool,
};
