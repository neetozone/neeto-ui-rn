import React, { useRef } from "react";

import { ChatInput, Button, Typography, Container } from "@components";

export const ChatInputs = () => {
  const chatInputRef = useRef();

  const [value, setValue] = React.useState(
    "Hey Oliver, We are working on this issue. We will keep you update"
  );

  const suggestions = [
    {
      id: "1",
      name: "Oliver Smith",
      imageUrl: "https://picsum.photos/100",
    },
    {
      id: "2",
      name: "Andy neeto",
      imageUrl: "https://picsum.photos/100",
    },
    {
      id: "3",
      name: "This is an example of a long name, very long name.",
      imageUrl: "https://picsum.photos/100",
    },
    {
      id: "4",
      name: "This is an example of a long name, very long name.",
      imageUrl: "https://picsum.photos/100",
    },
  ];

  return (
    <Container flex={1}>
      <Container alignItems="center" flex={1} justifyContent="center">
        <Typography> Desk Example</Typography>
        <Button
          label="Clear Email Fields"
          variant="text"
          onPress={() => chatInputRef.current.clearEmailFields()}
        />
      </Container>
      <Container align-self="end">
        <ChatInput
          shouldShowEmailFields
          showReplyMenuOptions
          attachmentsCount={2}
          ref={chatInputRef}
          suggestions={suggestions}
          toEmails={["oliver@example.com"]}
          value={value}
          onChangeText={setValue}
          onAddNote={() => {
            alert("On Add Note");
          }}
          onCannedResponse={() => {
            alert("On Canned Response");
          }}
          onForward={() => {
            alert("On Forward");
          }}
          onReply={() => {
            alert("On Reply");
          }}
        />
      </Container>
    </Container>
  );
};

const ChatInputMetaData = {
  title: "ChatInput",
  component: ChatInputs,
  parameters: {
    notes: `
ChatInput component supports various options

like \`REPLY\`, \`NOTE\` and \`FORWARD\`.

This component supports below props categories from styled-system.

- flexbox
- space
- border
- buttonStyle
- brandLeft
- typography

![image](assets/screenshots/chatInput/chatInput.png)

## Usage

import * as React from 'react';
import { Typography, ChatInput, Container } from '@bigbinary/neetoui-rn';

export default function Main() {
  const [value, setValue] = React.useState(
    "Hey Oliver, We are working on this issue. We will keep you update");

  return (
    <Container flex={1}>
      <Container alignItems="center" flex={1} justifyContent="center">
        <Typography> Desk Example</Typography>
      </Container>
      <Container align-self="end">
        <ChatInput
          shouldShowEmailFields
          attachmentsCount={2}
          toEmails="oliver@example.com"
          value={value}
          Attachments={
            <Container alignItems="flex-start">
              <AnimatedImage
                imageHeight={30}
                imageUrl="https"
                imageWidth={30}
                resizeMode="cover"
              />
            </Container>
          }
          onChangeText={setValue}
          onCannedResponse={() => {
            alert("On Canned Response");
          }}
          onForward={() => {
            alert("On Forward");
          }}
        />
      </Container>
    </Container>
  );
  }
`,
  },
};

export default ChatInputMetaData;
