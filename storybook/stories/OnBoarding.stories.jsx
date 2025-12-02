import React, { useRef } from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { OnBoarding } from "@components";

import Neeto from "../../public/assets/images/neeto.svg";

export const OnBoardingComponent = () => {
  const ref = useRef();

  return (
    <SafeAreaProvider>
      <OnBoarding
        appLogo={Neeto}
        slides={[
          {
            title: "Welcome to neetoInovice",
            description: "Enter your daily timesheets and organize your work.",
            illustration: <Neeto />,
          },
          {
            title: "Track using Calendar",
            description:
              "Switch between any day to view your timesheet entries.",
            illustration: <Neeto />,
          },
          {
            title: "Manage Projects",
            description:
              "Browse through projects and manage by adding or leaving from it. ",
            illustration: <Neeto />,
          },
        ]}
        onBoardingRef={ref}
        onComplete={() => {}}
      />
    </SafeAreaProvider>
  );
};

const OnBoardingStories = {
  title: "OnBoarding",
  component: OnBoardingComponent,
  parameters: {
    notes: `
This component supports below props categories from styled-system.

- flexbox
- space
- border
- layout
- color
- buttonStyle
\n

![image](assets/screenshots/onboarding/onboarding.png)

## Usage

>import * as React from "react";
>import { moderateScale } from "react-native-size-matters";
>import { OnBoarding } from "@bigbinary/neetoui-rn";
>
>export default function Main() {
>
>  return (
>    <OnBoarding
>      appLogo={Neeto}
>      slides={[
>          {title: "Welcome to neetoInovice", description: "Enter your daily ...", illustration:""},
>          {title: "", description: "", illustration:""}
>      ]}
>      onComplete={() =>{ console.log("Completed");}}
> />
>  );
> }
`,
  },
};

export default OnBoardingStories;
