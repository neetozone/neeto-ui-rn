import React from "react";

import { Touchable, ListItem, Typography, Container } from "@components";

const ListItemMetaData = {
  title: "ListItems",
  component: ListItem,
  args: {
    label: "List Item Component",
  },
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    notes: `
ListItems are components that displays a label with different values like string, toggle, button etc.

![image](assets/screenshots/listitem/listItemStyles.png)

## Usage

>import * as React from 'react';
>import { Container, ListItem, Typography } from '@bigbinary/neetoui-rn';
>export default function Main() {
> return (
>   <Container>
>     <ListItem
>       LeftComponent={() => <Typography mr={moderateScale(2)}>📣</Typography>}
>       label="Organization"
>       value={() => <Typography>Bigbinary</Typography>}
>     />
>   </Container>
> );
>}
`,
  },
};

export default ListItemMetaData;

export const ListItemDemo = args => (
  <Container alignItems="center" flex={1} justifyContent="center">
    <ListItem {...args} RightComponent={() => <Typography>Text</Typography>} />
  </Container>
);

export const ListItems = () => (
  <Container alignItems="center">
    <ListItem
      LeftComponent={() => <Typography mr={2}>📣</Typography>}
      RightComponent={() => <Typography>oliversmith@bigbinary.com</Typography>}
      label="Organization"
      my={1}
    />
    <ListItem
      RightComponent={() => <Typography>Text</Typography>}
      label="Hello"
      my={1}
    />
    <ListItem
      label="Sample Project"
      my={1}
      RightComponent={() => (
        <Touchable p={1}>
          <Typography color="font.base">Add</Typography>
        </Touchable>
      )}
    />
  </Container>
);
