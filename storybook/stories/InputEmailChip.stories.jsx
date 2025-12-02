import React, { useState } from "react";

import { InputEmailChip, Container, Typography } from "@components";

export const InputEmailChipDemo = () => (
  <>
    <Template
      emails={["oliver@example.com", "john@example.com"]}
      label="Emails"
      title="emails & label"
    />
    <Template
      emails={["oliver@example.com", "john@example.com"]}
      title="emails Only"
    />
    <Template label="Emails" title="label only" />
    <Template
      disabled
      emails={["oliver@example.com", "john@example.com"]}
      label="Emails"
      title="disabled with emails & label"
    />
  </>
);

const InputEmailChipMetaData = {
  title: "InputEmailChip",
  component: InputEmailChipDemo,
  argTypes: {
    emails: {
      control: {
        type: "array",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
  },
  args: {},
};

export default InputEmailChipMetaData;

const Template = args => {
  const { title, ...rest } = args;
  const [emails, setEmails] = useState(args.emails || []);

  return (
    <Container mb={20}>
      <Typography color="font.grey800">{title}</Typography>
      <InputEmailChip {...rest} emails={emails} onUpdate={setEmails} />
    </Container>
  );
};
