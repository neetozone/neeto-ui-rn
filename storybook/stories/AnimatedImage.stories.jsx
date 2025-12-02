import React from "react";
import { Platform } from "react-native";

import { Container, AnimatedImage, Typography } from "@components";

const imageUrl = "https://picsum.photos/255/139";

const AnimatedImageStories = {
  title: "AnimatedImages",
  component: AnimatedImage,
  args: {
    imageUrl,
    imageHeight: 255,
    imageWidth: 255,
  },
  parameters: {
    notes: `
AnimatedImage can be used to display a placeholder before image is loaded with animation.

![image](assets/screenshots/avatar/images.png)

![image](assets/screenshots/avatar/texts.png)

## Usage

>import * as React from 'react';
>import { Typography, Avatar } from '@bigbinary/neetoui-rn';
>

>export default function Main() {
> return (
>   <Container>
>     <AnimatedImage
>      imageHeight={23}
>      imageWidth={23}
>      imageUrl='/example'
>     />
>  </Container>
>  );
>}
`},
};
export default AnimatedImageStories;

export const AnimatedImageDemo = args => {
  if (Platform.OS === "web") {
    return (
      <Container alignItems="center" flex={1} justifyContent="center">
        <Typography>
          This story is disabled on web due to animation compatibility issues.
        </Typography>
      </Container>
    );
  }

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <AnimatedImage {...args} />
    </Container>
  );
};

export const AnimatedImages = () => {
  // Disable on web platform
  if (Platform.OS === "web") {
    return (
      <Container alignItems="center" flex={1} justifyContent="center">
        <Typography>
          This story is disabled on web due to animation compatibility issues.
        </Typography>
      </Container>
    );
  }

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <AnimatedImage
        imageHeight={139}
        imageUrl="https://picsum.photos/255/139"
        imageWidth={255}
        resizeMode="cover"
      />
      <Typography fontSize="xl">Image with Placeholder</Typography>
    </Container>
  );
};
