import React, { useState } from "react";

import { Button, TopBar } from "@components";

const itemList = ["All", "Active", "Expired"];

export const TopBarStories = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <TopBar
        activeIndex={activeTab}
        data={itemList}
        onActiveTabChange={index => {
          setActiveTab(index);
        }}
      />
      <Button label="Switch to `Expired` tab" onPress={() => setActiveTab(2)} />
    </>
  );
};

const TopBarStoriesMetaData = {
  title: "TopBar",
  component: TopBarStories,
  argTypes: {},
  args: {},
  parameters: {
    notes: `
Buttons are touchable elements used to interact with the screen and to trigger an action.

![image](assets/screenshots/toptabbar/toptabbar-1.png)

![image](assets/screenshots/toptabbar/toptabbar-2.png)

## Usage

>import * as React, { useEffect, useState } from 'react';
>import { Button, TopBar } from '@bigbinary/neetoui-rn';
>
>export default function Main() {
>  const [activeTab, setActiveTab] = useState(0);
>
>  useEffect(() => {
>    console.log("Active tab is ", itemList[activeTab]);
>  }, [activeTab]);
>
>  return (
>    <>
>      <TopBar
>       data={itemList}
>        activeIndex={activeTab}
>        onActiveTabChange={index => {
>          setActiveTab(index);
>        }}
>      />
>
>      <Button label="Switch to tab" onPress={() => setActiveTab(2)} />
>    </>
>  );
> }
`,
  },
};

export default TopBarStoriesMetaData;
