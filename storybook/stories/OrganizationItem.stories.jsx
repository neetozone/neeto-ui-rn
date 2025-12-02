import React from "react";

import { OrganizationItem, Container } from "@components";

const OrganizationItemMetaData = {
  title: "OrganizationItem",
  component: OrganizationItem,
  parameters: {
    notes: `
![image](assets/screenshots/organizationItem/organizationItem.png)

## Usage

>import * as React from 'react';
>import { OrganizationItem } from '@bigbinary/neetoui-rn';

>export default function Main() {
>  return (
>    <OrganizationItem name="BigBinary Solutions Pvt. Ltd." />
>  );
> }
`,
  },
};

export default OrganizationItemMetaData;

export const OrganizationItemComponent = () => (
  <Container alignItems="center" flex={1} justifyContent="center">
    <OrganizationItem
      name="BigBinary Solutions Pvt. Ltd."
      subdomain="bigbinary.neetoplanner.net"
    />
  </Container>
);
