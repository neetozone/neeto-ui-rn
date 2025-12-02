import React, { useState } from "react";

import PropTypes from "prop-types";

import {
  Button,
  Container,
  BottomSheet,
  Typography,
  Touchable,
  RadioButton,
  CheckBox,
} from "@components";

const TypographyStories = {
  title: "Bottom Sheet",
  component: BottomSheet,
  args: {
    data: [
      { label: "neetoInvoice-RN", value: "neetoInvoice-RN" },
      { label: "neetoPlanner-RN", value: "neetoPlanner-RN" },
      { label: "neetoStore-RN", value: "neetoStore-RN" },
      { label: "neetoStoreBusiness-RN", value: "neetoStoreBusiness-RN" },
      { label: "neetoDesk-RN", value: "neetoDesk-RN" },
      { label: "neetoQuiz-RN", value: "neetoQuiz-RN" },
      { label: "neetoChat-RN", value: "neetoChat-RN" },
      { label: "neetoForm-RN", value: "neetoForm-RN" },
      { label: "neetoCal-RN", value: "neetoCal-RN" },
      { label: "Bigbinary HQ", value: "Bigbinary HQ" },
    ],
  },
  argTypes: {
    data: {
      separator: ",",
      control: { type: "array" },
    },
  },
  parameters: {
    layout: "padded",
    notes: `
BottomSheet can be used to select an item from list of items like a DropDown

![image](assets/screenshots/bottomsheet/bottomsheet.png)

## Usage

>import React, { useState } from 'react';
>import { Container, BottomSheet } from '@bigbinary/neetoui-rn';
>
>export default function Main() {
>  const [isBottomSheetVisible, setBottomSheetVisibility] = useState(false);
>  const [selectedItem, setSelectedItem] = useState(null);
>  const data = ["neeto-ui-rn", "neeto-desk-rn", "neeto-hq"];
>
>  return (
>    <Container>
>     <BottomSheet
>       maxHeight={moderateScale(200)}
>       isVisible={isBottomSheetVisible}
>       hide={() => {
>         setBottomSheetVisibility(false);
>       }}
>       onItemPress={({item}) => {
>        setSelectedItem(item);
>       }}
>       title="PROJECT"
>       data={data}
>       selectedItem={selectedItem}
>       ContentRow={() => <CustomComponent />}
>      />
>   </Container>
>  );
> }
`,
  },
};
export default TypographyStories;

export const BottomSheetDemo = args => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <Button
        label="Select Project"
        onPress={() => setBottomSheetVisible(true)}
      />
      <BottomSheet
        data={args.data}
        isVisible={bottomSheetVisible}
        selectedItem={selectedItem}
        title="Select Multi Options"
        ContentRow={({ item: { label }, onPress, isSelected }) =>
          !!label && (
            <Container py={12}>
              <RadioButton
                label={label}
                labelPosition="right"
                selected={isSelected}
                onSelect={onPress}
              />
            </Container>
          )
        }
        hide={() => {
          setBottomSheetVisible(false);
        }}
        onItemPress={({ item }) => {
          setSelectedItem(item);
        }}
      />
      {selectedItem !== null && (
        <Typography
          alignText="center"
          color="font.secondary"
          fontFamily="sf700"
          fontSize="l"
          py={50}
        >
          Selected Item: {selectedItem.label}
        </Typography>
      )}
    </Container>
  );
};

export const BottomSheets = args => {
  const [bottomSheetOneVisible, setBottomSheetOneVisible] = useState(false);
  const [bottomSheetTwoVisible, setBottomSheetTwoVisible] = useState(false);
  const [bottomSheetThreeVisible, setBottomSheetThreeVisible] = useState(false);
  const [bottomSheetFourVisible, setBottomSheetFourVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckbox = ({ item: { value } }) => {
    const oldData = [...selectedValues];
    const itemIndex = selectedValues.indexOf(value);
    if (itemIndex === -1) {
      oldData.push(value);
    } else {
      oldData.splice(itemIndex, 1);
    }
    setSelectedValues(oldData);
  };

  // Text Content
  const TextContent = ({ item: { label }, bg, onPress, isSelected }) =>
    !!label && (
      <Touchable bg={bg} borderRadius={20} py={8} onPress={onPress}>
        <Typography
          color={isSelected ? "font.grey800" : "font.grey700"}
          fontFamily={isSelected ? "sf700" : "sf400"}
          fontSize="l"
        >
          {label}
        </Typography>
      </Touchable>
    );

  // Radio Button
  const RadioContent = ({ item: { label }, onPress, isSelected }) =>
    !!label && (
      <RadioButton label={label} selected={isSelected} onSelect={onPress} />
    );

  const CheckBoxContent = ({ item: { label, value }, onPress }) =>
    !!label && (
      <CheckBox
        checked={selectedValues.indexOf(value) !== -1}
        label={label}
        onSelect={onPress}
      />
    );

  TextContent.propTypes = {
    item: PropTypes.object,
    bg: PropTypes.string,
    onPress: PropTypes.func,
    isSelected: PropTypes.bool,
  };

  RadioContent.propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    isSelected: PropTypes.bool,
  };

  CheckBoxContent.propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
  };

  return (
    <Container alignItems="center" flex={1} justifyContent="center">
      <Button
        label="Select Project with Labels"
        m={2}
        onPress={() => setBottomSheetOneVisible(true)}
      />
      <Button
        label="Select Project with Radio buttons"
        m={2}
        onPress={() => setBottomSheetTwoVisible(true)}
      />
      <Button
        label="Select Project with checkboxes"
        m={2}
        onPress={() => setBottomSheetThreeVisible(true)}
      />
      <Button
        label="Bottom Sheet with only children component"
        m={2}
        onPress={() => setBottomSheetFourVisible(true)}
      />
      <BottomSheet
        canSearch
        ContentRow={TextContent}
        data={args.data}
        isVisible={bottomSheetOneVisible}
        selectedItem={selectedItem}
        title="Select an Option"
        hide={() => {
          setBottomSheetOneVisible(false);
        }}
        onItemPress={({ item }) => {
          setSelectedItem(item);
        }}
      />
      <BottomSheet
        canSearch
        ContentRow={RadioContent}
        data={args.data}
        isVisible={bottomSheetTwoVisible}
        selectedItem={selectedItem}
        title="Select an Option"
        hide={() => {
          setBottomSheetTwoVisible(false);
        }}
        onItemPress={({ item }) => {
          setSelectedItem(item);
        }}
      >
        <Typography> Cant find your option? </Typography>
      </BottomSheet>
      <BottomSheet
        canSearch
        ContentRow={CheckBoxContent}
        contentType="checkbox"
        data={args.data}
        isVisible={bottomSheetThreeVisible}
        selectedItem={selectedItem}
        title="Select Multi Options"
        hide={() => {
          setBottomSheetThreeVisible(false);
        }}
        onItemPress={handleCheckbox}
      />
      <BottomSheet
        isVisible={bottomSheetFourVisible}
        hide={() => {
          setBottomSheetFourVisible(false);
        }}
      >
        <Typography> Bottom Sheet with children only</Typography>
      </BottomSheet>
      {selectedItem !== null && (
        <Typography
          alignText="center"
          color="font.secondary"
          fontFamily="sf700"
          fontSize="l"
          py={50}
        >
          Selected Item: {selectedItem.value}
        </Typography>
      )}
    </Container>
  );
};
