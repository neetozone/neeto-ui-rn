import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import {
  ChatBubble,
  Notes,
  Attachment,
  Forward,
  CannedResponses,
  Down,
  SendPlane,
} from "@bigbinary/neeto-icons-rn";
import { parse } from "node-html-parser";
import PropTypes from "prop-types";
import { moderateScale } from "react-native-size-matters";

import ExpandSVG from "@assets/icons/expand.svg";
import MinimizeSVG from "@assets/icons/minimize.svg";

import { AttachmentsView } from "./AttachmentsView";
import { EmailFields } from "./EmailFields";
import { IconButton } from "./IconButton";
import { MentionsInputWrapper } from "./MentionsInputWrapper";

import { theme } from "../../theme";
import { Button } from "../Button";
import { Container } from "../Container";
import { LineLoader } from "../LineLoader";
import { Popover } from "../Popover";

// eslint-disable-next-line @bigbinary/neeto/no-dangling-constants
const OPTION_TYPES = {
  REPLY: "REPLY",
  NOTE: "NOTE",
  FORWARD: "FORWARD",
};

const placeholders = {
  [OPTION_TYPES.REPLY]: "Type here to reply…",
  [OPTION_TYPES.NOTE]: "Add note here…",
  [OPTION_TYPES.FORWARD]: "Type here to forward…",
};

const labels = {
  [OPTION_TYPES.NOTE]: "Add note",
  [OPTION_TYPES.FORWARD]: "Forward",
};

/**
 * ChatInput component supports various options like `REPLY`, `NOTE` and `FORWARD`.
 * This component supports below props categories from [styled-system ](/styled-system).
 * <ul>
 * <li>flexbox</li>
 * <li>space</li>
 * <li>border</li>
 * <li>buttonStyle</li>
 * <li>brandLeft</li>
 * <li>typography</li>
 * </ul>
 *
 * <div class="screenshots">
 *   <img src="screenshots/chatInput/chatInput.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Typography, ChatInput, Container } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  const [value, setValue] = React.useState(
 *    "Hey Oliver, We are working on this issue. We will keep you update");
 *
 *  return (
 *    <Container flex={1}>
 *      <Container alignItems="center" flex={1} justifyContent="center">
 *        <Typography> Desk Example</Typography>
 *      </Container>
 *      <Container align-self="end">
 *        <ChatInput
 *          shouldShowEmailFields
 *          attachmentsCount={2}
 *          toEmails="oliver@example.com"
 *          value={value}
 *          Attachments={
 *            <Container alignItems="flex-start">
 *              <AnimatedImage
 *                imageHeight={30}
 *                imageUrl="https://picsum.photos/255/139"
 *                imageWidth={30}
 *                resizeMode="cover"
 *              />
 *            </Container>
 *          }
 *          onChangeText={setValue}
 *          onCannedResponse={() => {
 *            alert("On Canned Response");
 *          }}
 *          onForward={() => {
 *            alert("On Forward");
 *          }}
 *        />
 *      </Container>
 *    </Container>
 *  );
 * }
 * ```
 */

const convertMentionsToHTMLAndPlainText = ({ suggestions, value }) => {
  const mentionsRegex = new RegExp(/@\[[^)]*\)/g);
  let html = `<p>${value.replace(/\n/g, "<br>")}</p>`; // Replace newlines with <br> for HTML output
  let plainText = value;
  const allMentions = html.matchAll(mentionsRegex);

  for (const mentionObject of allMentions) {
    const mention = mentionObject[0];
    const id = /\((.*)\)/.exec(mention)[1];

    const suggestion = suggestions.find(suggestion => suggestion.id === id);

    const rootNode = parse("<span></span>");
    const spanNode = rootNode.querySelector("span");

    spanNode.setAttribute("data-type", "mention");
    spanNode.setAttribute("data-id", id);
    spanNode.setAttribute("data-label", suggestion.name);
    spanNode.set_content(`@${suggestion.name}`);
    const rootNodeString = rootNode.toString();
    html = html.replace(mention, rootNodeString);

    const plainTextMention = `@${suggestion.name}`;
    plainText = plainText.replace(mention, plainTextMention);
  }

  return { html, plainText };
};
export const ChatInput = forwardRef(
  (
    {
      shouldShowEmailFields,
      showReplyMenuOptions,
      value = "",
      onChangeText = () => {},
      onForward,
      onCannedResponse,
      toEmails: initialToEmails,
      onReply = () => {},
      onAddNote = () => {},
      onAttachment = () => {},
      attachmentsCount,
      Attachments,
      showCannedResponsesFor = [OPTION_TYPES.REPLY],
      showSuggestionsFor = [OPTION_TYPES.NOTE],
      disabled,
      isLoading = true,
      onOptionChange = () => {},
      initialSelectedOption = OPTION_TYPES.REPLY,
      suggestions,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef();

    const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
    const [isEmailFieldsVisible, setIsEmailFieldsVisible] = useState(false);
    const [isAttachmentsVisible, setIsAttachmentsVisible] = useState(false);

    const isReplyOptionSelected = selectedOption === OPTION_TYPES.REPLY;
    const isNoteOptionSelected = selectedOption === OPTION_TYPES.NOTE;
    const isForwardOptionSelected = selectedOption === OPTION_TYPES.FORWARD;

    const [toEmails, setToEmails] = useState(initialToEmails ?? []);
    const [toEmailsForForward, setToEmailsForForward] = useState([]);
    const [ccEmails, setCcEmails] = useState([]);
    const [bccEmails, setBccEmails] = useState([]);

    const moreReplyOptions = [
      {
        label: "Send and set as closed",
        Icon: () => null,
        onPress: () => {
          onReply({
            toEmails,
            ccEmails,
            bccEmails,
            status: "closed",
            ...convertMentionsToHTMLAndPlainText({ suggestions, value }),
          });
        },
      },
    ];

    useImperativeHandle(
      ref,
      () => ({
        clearEmailFields: () => {
          setToEmails(initialToEmails ?? []);
          setToEmailsForForward([]);
          setCcEmails([]);
          setBccEmails([]);
          inputRef.current.blur();
        },
      }),
      [initialToEmails, isReplyOptionSelected]
    );

    useEffect(() => {
      onOptionChange(selectedOption);
    }, [selectedOption]);

    useEffect(() => {
      setSelectedOption(initialSelectedOption);
    }, [initialSelectedOption]);

    useEffect(() => {
      setToEmails(initialToEmails ?? []);
    }, [initialToEmails]);

    const showEmailFieldsAndAttachments = () => {
      setIsAttachmentsVisible(true);
      !isNoteOptionSelected && setIsEmailFieldsVisible(true);
    };

    const hideEmailFieldsAndAttachments = () => {
      setIsAttachmentsVisible(false);
      setIsEmailFieldsVisible(false);
    };

    const onReplyClickHandler = () => {
      hideEmailFieldsAndAttachments();
      inputRef.current.focus();
      setSelectedOption(OPTION_TYPES.REPLY);
    };

    const onAddNoteClickHandler = () => {
      hideEmailFieldsAndAttachments();
      inputRef.current.focus();
      setIsEmailFieldsVisible(false);
      setSelectedOption(OPTION_TYPES.NOTE);
    };

    const onAddForwardClickHandler = () => {
      inputRef.current.focus();
      setIsEmailFieldsVisible(true);
      setIsAttachmentsVisible(false);
      setSelectedOption(OPTION_TYPES.FORWARD);
    };

    const onAddAttachmentsClickHandler = () => {
      if (!isAttachmentsVisible && attachmentsCount > 0) {
        // When attachments are not visible but there are few attachments then we no need to show the upload modal.
      } else {
        onAttachment();
      }
      setIsAttachmentsVisible(true);
    };

    const onActionHandler = () => {
      ({
        [OPTION_TYPES.REPLY]: () => {
          onReply({
            toEmails,
            ccEmails,
            bccEmails,
            ...convertMentionsToHTMLAndPlainText({ suggestions, value }),
          });
        },
        [OPTION_TYPES.NOTE]: () => {
          onAddNote({
            toEmails,
            ccEmails,
            bccEmails,
            ...convertMentionsToHTMLAndPlainText({ suggestions, value }),
          });
        },
        [OPTION_TYPES.FORWARD]: () => {
          onForward({
            toEmails: toEmailsForForward,
            ccEmails,
            bccEmails,
            ...convertMentionsToHTMLAndPlainText({ suggestions, value }),
          });
        },
      })[selectedOption]();
    };

    const shouldShowExpandAndMinimizeButton =
      attachmentsCount > 0 || (toEmails.length > 0 && !isNoteOptionSelected);

    const shouldDisableWhenForwardAndToFieldMissing =
      isForwardOptionSelected && toEmailsForForward.length === 0;

    return (
      <Container>
        <LineLoader
          backgroundColor={theme.colors.background.grey400}
          height={moderateScale(1)}
          isLoading={isLoading}
        />
        <Container
          bg={isNoteOptionSelected ? "background.oldLace" : "transparent"}
          p={moderateScale(5)}
          pt={0}
          px={moderateScale(16)}
        >
          <Container pt={moderateScale(8)}>
            <EmailFields
              bccEmails={bccEmails}
              ccEmails={ccEmails}
              isEmailFieldsVisible={isEmailFieldsVisible}
              isForwardOptionSelected={isForwardOptionSelected}
              isNoteOptionSelected={isNoteOptionSelected}
              isReplyOptionSelected={isReplyOptionSelected}
              setBccEmails={setBccEmails}
              setCcEmails={setCcEmails}
              setIsEmailFieldsVisible={setIsEmailFieldsVisible}
              setToEmails={setToEmails}
              setToEmailsForForward={setToEmailsForForward}
              shouldShowEmailFields={shouldShowEmailFields}
              toEmails={toEmails}
              toEmailsForForward={toEmailsForForward}
            />
            <Container flexDirection="row" justifyContent="space-between">
              <MentionsInputWrapper
                placeholder={placeholders[selectedOption]}
                ref={inputRef}
                suggestions={suggestions}
                value={value}
                shouldShowSuggestions={showSuggestionsFor.includes(
                  selectedOption
                )}
                onChange={onChangeText}
                {...rest}
              />
              {shouldShowExpandAndMinimizeButton && (
                <Container alignSelf="center">
                  {isEmailFieldsVisible || isAttachmentsVisible ? (
                    <IconButton
                      Icon={MinimizeSVG}
                      height={moderateScale(30)}
                      pt={moderateScale(8)}
                      width={moderateScale(30)}
                      onPress={hideEmailFieldsAndAttachments}
                    />
                  ) : (
                    <IconButton
                      Icon={ExpandSVG}
                      height={moderateScale(30)}
                      pt={moderateScale(8)}
                      width={moderateScale(30)}
                      onPress={showEmailFieldsAndAttachments}
                    />
                  )}
                </Container>
              )}
            </Container>
            <AttachmentsView
              Attachments={Attachments}
              attachmentsCount={attachmentsCount}
              isAttachmentsVisible={isAttachmentsVisible}
              isNoteOptionSelected={isNoteOptionSelected}
              setIsAttachmentsVisible={setIsAttachmentsVisible}
            />
            <Container
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
              mt={moderateScale(10)}
            >
              <Container flexDirection="row" justifyContent="space-between">
                <IconButton
                  Icon={ChatBubble}
                  opacity={isReplyOptionSelected ? 1 : 0.5}
                  pl={moderateScale(10)}
                  iconProps={{
                    viewBox: "0 0 37 37",
                    size: moderateScale(30),
                    color: isReplyOptionSelected
                      ? theme.colors.font.grey700
                      : theme.colors.font.grey500,
                  }}
                  onPress={onReplyClickHandler}
                />
                <IconButton
                  Icon={Notes}
                  opacity={isNoteOptionSelected ? 1 : 0.5}
                  onPress={onAddNoteClickHandler}
                />
                {onForward && (
                  <IconButton
                    Icon={Forward}
                    opacity={isForwardOptionSelected ? 1 : 0.5}
                    onPress={onAddForwardClickHandler}
                  />
                )}
                <Container
                  bg="background.grey400"
                  mx={moderateScale(5)}
                  p={moderateScale(0.4)}
                />
                {onCannedResponse &&
                  showCannedResponsesFor.includes(selectedOption) && (
                    <IconButton
                      Icon={CannedResponses}
                      opacity={0.5}
                      iconProps={{
                        viewBox: "0 0 38 38",
                        size: moderateScale(30),
                      }}
                      onPress={onCannedResponse}
                    />
                  )}
                <IconButton
                  {...(isLoading && {
                    iconProps: { color: "grey" },
                  })}
                  Icon={Attachment}
                  disabled={isLoading}
                  onPress={onAddAttachmentsClickHandler}
                />
              </Container>
              <Container alignItems="center" flexDirection="row">
                <Button
                  height={moderateScale(30)}
                  label={labels[selectedOption] ?? ""}
                  pr={0}
                  variant="text"
                  RightIcon={
                    selectedOption === OPTION_TYPES.REPLY
                      ? () => (
                          <SendPlane
                            color={theme.colors.font.primary}
                            size={moderateScale(22)}
                          />
                        )
                      : null
                  }
                  disabled={
                    shouldDisableWhenForwardAndToFieldMissing || disabled
                  }
                  labelStyle={{
                    mx: moderateScale(0),
                  }}
                  onPress={() => {
                    onActionHandler();
                    hideEmailFieldsAndAttachments();
                  }}
                />
                {showReplyMenuOptions && isReplyOptionSelected && (
                  <Popover
                    data={moreReplyOptions}
                    from={
                      <Button
                        disabled={disabled}
                        height={moderateScale(30)}
                        label=""
                        p={0}
                        variant="text"
                        RightIcon={() => (
                          <Down
                            color={theme.colors.background.grey800}
                            size={moderateScale(22)}
                          />
                        )}
                      />
                    }
                  />
                )}
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
);

ChatInput.displayName = "ChatInput";
ChatInput.propTypes = {
  /**
   * If true, Shows loader
   */
  isLoading: PropTypes.bool,
  /**
   * If true, Shows to, cc and bcc email inputs.
   */
  shouldShowEmailFields: PropTypes.bool,
  /**
   * If true, Shows reply menu options
   */
  showReplyMenuOptions: PropTypes.bool,
  /**
   * Value to make input component controllable.
   */
  value: PropTypes.string,
  /**
   * To set the initial selected option
   */
  initialSelectedOption: PropTypes.oneOf(Object.values(OPTION_TYPES)),
  /**
   * Callback to be called when user selection option.
   */
  onOptionChange: PropTypes.func,
  /**
   * Callback to be called when the input text changes.
   */
  onChangeText: PropTypes.func,
  /**
   * Callback to be called on click of forward icon.
   */
  onForward: PropTypes.func,
  /**
   * Callback to be called on click of canned responses icon.
   */
  onCannedResponse: PropTypes.func,
  /**
   * Email list separated by comma.
   */
  toEmails: PropTypes.arrayOf(PropTypes.string),
  /**
   * Callback to be called on click of reply icon.
   */
  onReply: PropTypes.func,
  /**
   * Callback to be called on click of add note icon.
   */
  onAddNote: PropTypes.func,
  /**
   * Callback to be called on click of attachment icon.
   */
  onAttachment: PropTypes.func,
  /**
   * Count of attachments.
   */
  attachmentsCount: PropTypes.number,
  /**
   * Component to render attachments.
   */
  Attachments: PropTypes.any,
  /**
   * Array for options to show canned responses. Example: ["REPLY","NOTES","FORWARD"]
   */
  showCannedResponsesFor: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(OPTION_TYPES))
  ),
  /**
   * Array for options to show suggestions. Example: ["REPLY","NOTES","FORWARD"]
   */
  showSuggestionsFor: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(OPTION_TYPES))
  ),
  /**
   * If true, Disables the reply, forward and add note button.
   */
  disabled: PropTypes.bool,
  /**
   * List of mentions
   */
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      imageUrl: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};
