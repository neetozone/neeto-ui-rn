import React, { useEffect, useState } from "react";

import {
  FlashList as FlashListComponent,
  Container,
  Typography,
} from "@components";

const data = [
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
  {
    title: "Title",
    description: "Description",
  },
];

const FlashListStories = {
  title: "FlashList",
  component: FlashListComponent,
};

export default FlashListStories;

export const FlashList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lData, setLData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLData(data);
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <FlashListComponent
      data={lData}
      estimatedItemSize={53}
      isLoading={isLoading}
      keyExtractor={(_item, index) => index.toString()}
      SkeletonComponent={
        <Container>
          <Typography>Loading</Typography>
        </Container>
      }
      renderItem={({ item }) => (
        <Container
          borderColor="black"
          borderRadius={5}
          borderWidth={1}
          m={2}
          px={3}
          py={2}
        >
          <Typography>{item.title}</Typography>
          <Typography>{item.description}</Typography>
        </Container>
      )}
    />
  );
};
