import React from "react";

import { Carousel, Container } from "@components";

export const CarouselComponent = () => (
  <Container>
    <Carousel
      itemArray={[
        {
          url: "https://picsum.photos/200",
        },
        {
          url: "https://picsum.photos/200",
        },
        {
          url: "https://picsum.photos/200",
        },
        {
          url: "https://picsum.photos/200",
        },
      ]}
    />
  </Container>
);

const CarouselStories = {
  title: "Carousel",
  component: CarouselComponent,
  parameters: {
    notes: `
![image](assets/screenshots/carousel/carousel.png)

This component supports below props categories from styled-system.

- flexbox
- space
- border
- color
- layout
- buttonStyle
\n
## Usage

>import * as React from "react";
>import { moderateScale } from "react-native-size-matters";
>import { Carousel } from "@bigbinary/neetoui-rn";
>
>export default function Main() {
>  return (
>     <Carousel itemArray={[{url:"http"}]} />
>  );
> }
`,
  },
};

export default CarouselStories;
