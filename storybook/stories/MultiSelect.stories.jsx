import React, { useState } from "react";

import { MultiSelect, Button, Alert } from "@components";

const MultiSelectStories = {
  title: "MultiSelect",
  component: MultiSelect,
  parameters: {
    notes: `
MultiSelect can be used to select multiple options from a list of options.

![image](assets/screenshots/multiSelect/multiSelect.png)

## Usage

### Import and use MultiSelect component.

>import * as React, { useState } from 'react';
>import { MultiSelect, Container } from '@bigbinary/neetoui-rn';
>
>const OPTIONS = [
>  {
>    label: "Option 1",
>    value: "option_1"
>  },
>  {
>    label: "Option 2",
>    value: "option_2"
>  },
> ]

>export default function Main() {
>  const [selectedOptions, setSelectedOptions] = useState([])
>
>  return (
>    <MultiSelect
>      label="Select"
>      options={OPTIONS}
>      value={selectedOptions}
>      onSelect={setSelectedOptions}
>    />
> );
> }
`,
  },
};

export default MultiSelectStories;

const data = [
  {
    name: "Option 1",
    id: "option_1",
  },
  {
    name: "Option 2",
    id: "option_2",
  },
  {
    name: "Option 3",
    id: "option_3",
  },
  {
    name: "Option 4",
    id: "option_4",
  },
  {
    name: "Option 5",
    id: "option_5",
  },
  {
    name: "Option 6",
    id: "option_6",
  },
];

export const MultiSelects = () => {
  const [selectedOptions, setSelectedOptions] = useState([
    {
      name: "Option 1",
      id: "option_1",
    },
  ]);
  const [sData, setSData] = useState(data);

  const [isLoading, setIsLoading] = useState(false);

  const simulateAPICall = value => {
    setIsLoading(true);
    setTimeout(() => {
      setSData(prev => [...prev, { name: value, id: value }]);
      setIsLoading(false);
    }, 2000);
  };

  const createMultiselectItem = ({ searchText }) => (
    <Button
      isLoading={isLoading}
      label={`Create Tag: ${searchText}`}
      loadingText=""
      onPress={() => simulateAPICall(searchText)}
    />
  );

  return (
    <>
      <Alert />
      <MultiSelect
        isSearchable
        showCreateOption
        CreateItemComponent={createMultiselectItem}
        label="Multi Select"
        labelExtractor={item => item?.name}
        options={sData}
        searchBarProps={{ placeholder: "Search Here...", debounceDelay: 1000 }}
        showCreateOptionLoader={isLoading}
        value={selectedOptions}
        valueExtractor={item => item?.id}
        onPressCreateOption={simulateAPICall}
        onSelect={setSelectedOptions}
      />
    </>
  );
};
