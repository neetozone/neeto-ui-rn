import React from "react";

import { Container, RichTextEditor } from "@components";
import { theme } from "@theme";

const RichTextEditorStories = {
  title: "Rich Text Editor",
  parameters: {
    notes: `
RichTextEditor component is wrapper created around react-native-pell-rich-editor.

This has dependency on react-native-webview, so make sure to add that as well.


![image](assets/screenshots/rte/rte.png)

## Usage

>import * as React from "react";
>import { moderateScale } from "react-native-size-matters";
>import { Container, RichTextEditor, theme } from "@bigbinary/neetoui-rn";
>
>export default function Main() {
> const [message, setMessage] = React.useState('');
>
> const editorProps = {
>  initialContentHTML: "Rich Text Component...",
>   initialFocus: true,
>   editorStyle: {
>     color: theme.colors.font.grey,
>   },
> };
>
> return (
>   <Container flex={1}>
>     <RichTextEditor
>       onChange={setMessage}
>       toolbarActions={[
>         "keyboard",
>         "setBold",
>         "setItalic",
>         "insertBulletsList",
>         "insertOrderedList",
>         "setStrikethrough",
>         "setUnderline",
>         "undo",
>         "redo",
>       ]}
>       editorProps={editorProps}
>     />
>   </Container>
>  );
> };
`,
  },
};

export default RichTextEditorStories;

export const RichTextEditorComponent = () => {
  const editorProps = {
    initialContentHTML: "Rich Text Component...",
    initialFocus: true,
    editorStyle: {
      color: theme.colors.font.grey,
    },
  };
  const toolBarProps = {};
  const toolbarWrapperStyle = {
    bottom: 0,
  };

  return (
    <Container flex={1}>
      <RichTextEditor
        editorProps={editorProps}
        toolBarProps={toolBarProps}
        toolbarWrapperStyle={toolbarWrapperStyle}
        toolbarActions={[
          "keyboard",
          "setBold",
          "setItalic",
          "insertBulletsList",
          "insertOrderedList",
          "setStrikethrough",
          "setUnderline",
          "undo",
          "redo",
        ]}
        onChange={() => {}}
      />
    </Container>
  );
};
