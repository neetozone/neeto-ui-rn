import React, { useRef, useState } from "react";

import PropTypes from "prop-types";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import styled from "styled-components/native";
import { space, flexbox, border, layout } from "styled-system";

import { useKeyboard } from "@hooks";

import Container from "./Container";

export const ScrollView = styled.ScrollView.attrs(() => ({
  keyboardShouldPersistTaps: "handled",
  showsVerticalScrollIndicator: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { flexGrow: 1 },
}))`
  ${space}
  ${flexbox}
  ${border}
  ${layout}
`;

/**
 * RichTextEditor component is wrapper created around react-native-pell-rich-editor. This has dependency on react-native-webview, so make sure to add that as well.
 *
 *
 * <div class="screenshots">
 *   <img src="screenshots/rte/rte.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from "react";
 * import { moderateScale } from "react-native-size-matters";
 * import { Container, RichTextEditor, theme } from "@bigbinary/neetoui-rn";
 *
 * export default function Main() {
 * const [message, setMessage] = React.useState('');
 *
 * const editorProps = {
 *   initialContentHTML: "Rich Text Component...",
 *   initialFocus: true,
 *   editorStyle: {
 *     color: theme.colors.font.grey,
 *   },
 * };
 *
 * return (
 *   <Container flex={1}>
 *     <RichTextEditor
 *       onChange={setMessage}
 *       toolbarActions={[
 *         "keyboard",
 *         "setBold",
 *         "setItalic",
 *         "insertBulletsList",
 *         "insertOrderedList",
 *         "setStrikethrough",
 *         "setUnderline",
 *         "undo",
 *         "redo",
 *       ]}
 *       editorProps={editorProps}
 *     />
 *   </Container>
 *  );
 * };
 *
 * ```
 */

export const RichTextEditor = ({
  onChange,
  placeholderText,
  children,
  toolbarActions,
  editorProps,
  toolBarProps,
  richTextRef: externalRichTextRef,
  ...rest
}) => {
  const internalRichTextRef = useRef();
  const keyboardHeight = useKeyboard();
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const showToolbar = keyboardHeight > 0 && toolbarVisible;

  // Use the external ref if provided, otherwise use the internal ref
  const richTextRef = externalRichTextRef || internalRichTextRef;

  const computeToolbarActions = () => {
    const actionItems = [];
    toolbarActions?.map(actionItem => {
      actionItems.push(actions[actionItem]);
    });

    return actionItems;
  };

  return (
    <ScrollView {...rest?.editorWrapperStyle}>
      {showToolbar && (
        <Container width="100%" {...rest?.toolbarWrapperStyle}>
          <RichToolbar
            actions={computeToolbarActions()}
            editor={richTextRef}
            {...toolBarProps}
          />
        </Container>
      )}
      <RichEditor
        androidLayerType="software"
        autoCapitalize="sentences"
        placeholder={placeholderText}
        ref={richTextRef}
        useContainer={false}
        onChange={onChange}
        onBlur={() => {
          setToolbarVisible(false);
          editorProps?.onBlurFn?.();
        }}
        onFocus={() => {
          setToolbarVisible(true);
          editorProps?.onFocusFn?.();
        }}
        {...editorProps}
      />
      {children}
    </ScrollView>
  );
};

RichTextEditor.defaultProps = {
  editorProps: {},
  toolBarProps: {},
  toolbarWrapperStyle: {},
  placeholderText: "Type here...",
};

RichTextEditor.propTypes = {
  /**
   * Callback that is called when the text input's text changes.
   */
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  /**
   * Placeholder for the input.
   */
  placeholderText: PropTypes.string,
  /**
   * An array of actions to be provided by this toolbar. Check react-native-pell-rich-editor for list of supported actions.
   */
  toolbarActions: PropTypes.array.isRequired,
  /**
   * Object which can be used to pass other supported props by the Editor.
   */
  editorProps: PropTypes.object,
  /**
   * Object which can be used to pass other supported props by the RichToolbar.
   */
  toolBarProps: PropTypes.object,
  editorWrapperStyle: PropTypes.object,
  toolbarWrapperStyle: PropTypes.object,
  /**
   * Ref object to control the editor from outside the component.
   */
  richTextRef: PropTypes.object,
};
