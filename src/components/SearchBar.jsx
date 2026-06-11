import React, { useEffect, useRef, useState } from "react";
import { TouchableWithoutFeedback } from "react-native";

import { Close, Search } from "@bigbinary/neeto-icons-rn";
import PropTypes from "prop-types";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";
import {
  flexbox,
  space,
  border,
  buttonStyle,
  typography,
  color,
} from "styled-system";

import { useDebounce } from "@hooks";
import { theme } from "@theme";

import { Container } from "./Container";
import { Touchable } from "./Touchable";

const TextInput = styled.TextInput`
  ${flexbox}
  ${space}
  ${border}
  ${buttonStyle}
  ${typography}
  ${color}
`;

/**
 * SearchBars are used to search or filter items.
 *
 * <div class="screenshots">
 *   <img src="screenshots/searchbar/searchbar.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { Container, SearchBar } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  return (
 *    <Container>
 *      <SearchBar placeholder="Search" onChangeText={() => {}} />
 *    </Container>
 *  );
 * }
 * ```
 */

export const SearchBar = ({
  placeholder = "Search",
  onChangeText = () => {},
  onCancel = () => {},
  debounceDelay = 1000,
  showCancelButton = true,
  containerProps,
  searchbarProps,
}) => {
  const inputRef = useRef();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTextValue = useDebounce(
    searchText.trim(),
    Number(debounceDelay)
  );
  const buttonWidth = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    onChangeText(debouncedSearchTextValue);
  }, [debouncedSearchTextValue, onChangeText]);

  const animateSearchInput = val => {
    buttonWidth.value = withTiming(val, {
      easing: Easing.linear,
      duration: 200,
    });

    buttonOpacity.value = withTiming(val, {
      easing: Easing.linear,
      duration: 100,
    });
  };

  const onCancelHandle = () => {
    setSearchText("");
    inputRef.current.blur();
    onCancel();
  };

  return (
    <Container alignItems="center" flexDirection="row">
      <TouchableWithoutFeedback
        onPress={() => {
          if (!inputRef?.current?.isFocused()) {
            inputRef?.current?.focus();
          }
        }}
      >
        <Container
          alignItems="center"
          borderColor={theme.colors.border.grey400}
          borderRadius={moderateScale(8)}
          borderWidth={moderateScale(1)}
          flex={1}
          flexDirection="row"
          height={moderateScale(42)}
          {...containerProps}
        >
          <Container px={moderateScale(8)}>
            <Search
              color={theme.colors.font.grey600}
              size={moderateScale(22)}
            />
          </Container>
          <TextInput
            autoCapitalize="none"
            color="font.primary"
            flex={1}
            fontSize={moderateScale(16)}
            padding={0}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.font.grey600}
            ref={inputRef}
            returnKeyType="search"
            value={searchText}
            onChangeText={setSearchText}
            onBlur={() => {
              if (!searchText) animateSearchInput(0);
            }}
            onFocus={() => {
              animateSearchInput(1);
            }}
            {...searchbarProps}
          />
          {showCancelButton && (
            <Container>
              <Touchable
                flexGrow={1}
                height={moderateScale(42)}
                justifyContent="center"
                px={moderateScale(8)}
                onPress={onCancelHandle}
              >
                <Close
                  color={theme.colors.font.grey600}
                  size={moderateScale(22)}
                />
              </Touchable>
            </Container>
          )}
        </Container>
      </TouchableWithoutFeedback>
    </Container>
  );
};

SearchBar.propTypes = {
  /**
   * Set the placeholder text
   */
  placeholder: PropTypes.string,
  /**
   * Method to fire when text is changed
   */
  onChangeText: PropTypes.func.isRequired,
  /**
   * Takes numeric value which is used to set the debounce delay
   */
  debounceDelay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Takes an object and accepts all the props accepted by TextInput component from React Native.
   */
  searchbarProps: PropTypes.object,
  /**
   * Method called when the cancel button is pressed.
   */
  onCancel: PropTypes.func,
  /**
   * option to hide the cancel button. Default is true
   */
  showCancelButton: PropTypes.bool,
  containerProps: PropTypes.object,
};
