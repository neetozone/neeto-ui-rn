import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Keyboard,
  InteractionManager,
} from "react-native";

import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

import { Container } from "./Container";
import { Divider } from "./Divider";
import { Loader } from "./Loader";
import { SearchBar } from "./SearchBar";
import { Touchable } from "./Touchable";
import { Typography } from "./Typography";

import { theme } from "../theme";

const Title = ({
  title,
  bg,
  isVisible,
  hide,
  titleContainerStyle,
  titleTextStyle,
  contentType,
  canSearch,
  setSearchText,
  onDonePress,
  searchBarProps,
}) => {
  let touchY;

  useEffect(() => {
    setSearchText("");
  }, [isVisible, setSearchText]);

  return (
    <Container
      bg={bg}
      borderRadius={moderateScale(20)}
      pb={moderateScale(12)}
      onTouchStart={e => (touchY = e.nativeEvent.pageY)}
      onTouchEnd={e => {
        // Swipe Down Detection
        if (e.nativeEvent.pageY - touchY > 20) hide();
      }}
      {...titleContainerStyle}
    >
      <Container flexDirection="row" justifyContent="space-between">
        {title && (
          <Typography textStyle="modalHeader" {...titleTextStyle}>
            {title}
          </Typography>
        )}
        {contentType && (
          <Touchable
            onPress={() => {
              hide();
              onDonePress();
            }}
          >
            <Typography color="font.purple500" textStyle="modalHeader">
              Done
            </Typography>
          </Touchable>
        )}
      </Container>
      {canSearch && (
        <SearchBar
          containerProps={{ mt: moderateScale(16) }}
          debounceDelay={200}
          placeholder="Search"
          showCancelButton={false}
          onChangeText={setSearchText}
          onCancel={() => {
            setSearchText("");
          }}
          {...searchBarProps}
        />
      )}
    </Container>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  hide: PropTypes.func,
  bg: PropTypes.string,
  titleContainerStyle: PropTypes.object,
  titleTextStyle: PropTypes.object,
  contentType: PropTypes.oneOf(["checkbox", null]),
  canSearch: PropTypes.bool,
  setSearchText: PropTypes.func,
  onDonePress: PropTypes.func,
  searchBarProps: PropTypes.object,
};

/**
 * BottomSheet can be used to select an item from list of items. Like a DropDown
 *
 * <div class="screenshots">
 *   <img src="screenshots/bottomsheet/bottomsheet.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import React, { useState } from 'react';
 * import { Container, BottomSheet } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  const [isBottomSheetVisible, setBottomSheetVisibility] = useState(false);
 *  const [selectedItem, setSelectedItem] = useState(null);
 *  const data = ["neeto-ui-rn", "neeto-desk-rn", "neeto-hq"];
 *
 *  return (
 *    <Container>
 *     <BottomSheet
 *       maxHeight={moderateScale(200)}
 *       isVisible={isBottomSheetVisible}
 *       hide={() => {
 *         setBottomSheetVisibility(false);
 *       }}
 *       onItemPress={({item}) => {
 *         setSelectedItem(item);
 *       }}
 *       title="PROJECT"
 *       data={data}
 *       selectedItem={selectedItem}
 *       ContentRow={() => <CustomComponent />}
 *      />
 *   </Container>
 *  );
 * }
 * ```
 *
 * @extends StyledSystems props /styled-system
 */

export const BottomSheet = ({
  showCreateOption,
  CreateItemComponent,
  showCreateOptionLoader,
  createSearchedOptionLabelStyle,
  createOptionLabel,
  onPressCreateOption,
  createSearchedOptionContainerStyle,
  data = [],
  title,
  hide,
  isVisible,
  onItemPress,
  bg,
  children,
  titleContainerStyle,
  titleTextStyle,
  modalParams,
  HeaderComponent,
  ContentRow,
  contentType,
  canSearch,
  onDonePress,
  disabled,
  noResultsLabelContainerStyle,
  noResultsLabelStyle,
  noResultsLabel,
  NoResultsComponent,
  labelExtractor,
  valueExtractor,
  selectedItem,
  onBackdropPress,
  searchBarProps,
  shouldHideKeyboardOnScrollBegin = true,
  shouldShowItemSeparator = true,
  flatListRef,
  ...rest
}) => {
  const [searchText, setSearchText] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isVisible) {
      InteractionManager.runAfterInteractions(() => {
        setIsReady(true);
      });
    } else {
      setIsReady(false);
    }
  }, [isVisible]);

  const getLabel = useCallback(
    (item, index) => item?.label || labelExtractor(item, index) || item,
    [labelExtractor]
  );

  const generatedData = useMemo(() => {
    if (searchText.length) {
      return data.filter(item =>
        getLabel(item).toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return data;
  }, [data, getLabel, searchText]);

  const shouldHideCreateComponent = useMemo(() => {
    const filteredItemCount = generatedData.filter(
      data =>
        getLabel(data).toLocaleLowerCase() === searchText.toLocaleLowerCase()
    ).length;

    return filteredItemCount > 0;
  }, [generatedData, getLabel, searchText]);

  const checkIsSelected = item => {
    const itemValue = item?.value || valueExtractor(item) || item;
    const selectedItemValue =
      selectedItem?.value || valueExtractor(selectedItem) || selectedItem;

    return itemValue === selectedItemValue;
  };

  return (
    <Modal
      avoidKeyboard
      hideModalContentWhileAnimating
      useNativeDriver
      isVisible={isVisible && isReady}
      style={styles.modalStyle}
      onRequestClose={hide}
      onBackdropPress={() => {
        onBackdropPress();
        hide();
      }}
      {...modalParams}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <Container
          bg={bg}
          borderTopLeftRadius={moderateScale(20)}
          borderTopRightRadius={moderateScale(20)}
          flexShrink={1}
          p={moderateScale(16)}
          {...rest}
        >
          {title && (
            <Title
              HeaderComponent={HeaderComponent}
              bg={bg}
              canSearch={canSearch}
              contentType={contentType}
              hide={hide}
              isVisible={isVisible}
              searchBarProps={searchBarProps}
              searchText={searchText}
              setSearchText={setSearchText}
              title={title}
              titleContainerStyle={titleContainerStyle}
              titleTextStyle={titleTextStyle}
              onDonePress={onDonePress}
            />
          )}
          {data && (
            <FlatList
              data={generatedData}
              initialNumToRender={data.length}
              keyExtractor={(_item, index) => index}
              keyboardShouldPersistTaps="handled"
              ref={flatListRef}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={
                shouldShowItemSeparator ? (
                  <Divider bg="background.grey200" />
                ) : null
              }
              ListFooterComponent={
                <Container>
                  {children}
                  {!!searchText &&
                    !generatedData.length &&
                    !showCreateOption &&
                    (NoResultsComponent ? (
                      <NoResultsComponent />
                    ) : (
                      <Container
                        alignItems="center"
                        mb={moderateScale(2)}
                        py={moderateScale(2)}
                        {...noResultsLabelContainerStyle}
                      >
                        <Typography
                          color="font.grey"
                          fontFamily="sf600"
                          fontSize="s"
                          {...noResultsLabelStyle}
                        >
                          {noResultsLabel || "No options found"}
                        </Typography>
                      </Container>
                    ))}
                  {!disabled &&
                    !shouldHideCreateComponent &&
                    (showCreateOptionLoader ? (
                      <Loader color={theme.colors.background.base} />
                    ) : (
                      !!searchText &&
                      showCreateOption && (
                        <Container>
                          {CreateItemComponent ? (
                            <CreateItemComponent searchText={searchText} />
                          ) : (
                            <Touchable
                              alignItems="center"
                              height={moderateScale(40)}
                              justifyContent="center"
                              onPress={() => onPressCreateOption(searchText)}
                              {...createSearchedOptionContainerStyle}
                            >
                              <Typography
                                color="font.grey"
                                fontFamily="sf400"
                                fontSize="s"
                                {...createSearchedOptionLabelStyle}
                              >
                                {createOptionLabel ||
                                  `Create ${searchText} option`}
                              </Typography>
                            </Touchable>
                          )}
                        </Container>
                      )
                    ))}
                </Container>
              }
              renderItem={({ item, index }) => (
                <ContentRow
                  index={index}
                  isSelected={checkIsSelected(item)}
                  item={item}
                  key={index}
                  onPress={() => {
                    !contentType && hide();
                    onItemPress({ index, item });
                  }}
                />
              )}
              onScrollBeginDrag={
                shouldHideKeyboardOnScrollBegin && Keyboard.dismiss
              }
            />
          )}
        </Container>
      </SafeAreaView>
    </Modal>
  );
};

BottomSheet.defaultProps = {
  bg: "background.primary",
  showCreateOption: false,
  showCreateOptionLoader: false,
  createOptionLabel: null,
  onPressCreateOption: () => {},
  CreateItemComponent: null,
  onDonePress: () => {},
  valueExtractor: () => {},
  labelExtractor: () => {},
  onBackdropPress: () => {},
  searchBarProps: {},
};

BottomSheet.propTypes = {
  /**
   * List of items.
   */
  data: PropTypes.array,
  /**
   * Title to be displayed in the bottom sheet header.
   */
  title: PropTypes.string,
  /**
   * If true bottom sheet will be shown.
   */
  isVisible: PropTypes.bool,
  /**
   * Callback that will be called on while hiding the bottom sheet.
   */
  hide: PropTypes.func,
  /**
   * Callback which returns the index of selected item.
   */
  onItemPress: PropTypes.func,
  /**
   * Callback that will be called on Done button press
   */
  onDonePress: PropTypes.func,
  /**
   * Background color.
   */
  bg: PropTypes.string,
  /**
   * To customize title container styles.
   */
  titleContainerStyle: PropTypes.object,
  /**
   * To customize title text styles.
   */
  titleTextStyle: PropTypes.object,
  /**
   * Show option to create the searched label if not present in the options list
   */
  showCreateOption: PropTypes.bool,
  /**
   * Show loader while creating a searched option not present in the options list
   */
  showCreateOptionLoader: PropTypes.bool,
  /**
   * Custom label for creating searched option not present in the options list
   */
  createOptionLabel: PropTypes.string,
  /**
   * Callback when create searched option is pressed
   */
  onPressCreateOption: PropTypes.func,
  /**
   * Component that renders when searched item doesn't exists
   */
  CreateItemComponent: PropTypes.func,
  /**
   * To customize empty options placeholder text style.
   */
  createSearchedOptionLabelStyle: PropTypes.object,
  /**
   * Flag will disable create item feature
   */
  disabled: PropTypes.bool,
  /**
   * To customize empty options placeholder container style.
   */
  createSearchedOptionContainerStyle: PropTypes.object,
  noResultsLabelContainerStyle: PropTypes.object,
  noResultsLabelStyle: PropTypes.object,
  noResultsLabel: PropTypes.string,
  NoResultsComponent: PropTypes.node,
  /**
   * Use custom key as label.
   */
  labelExtractor: PropTypes.func,
  /**
   * Use custom key as value.
   */
  valueExtractor: PropTypes.func,
  /**
   * Function to customize back drop press
   */
  onBackdropPress: PropTypes.func,
  /**
   * Currently selected item
   */
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * Object to update the searchbar component
   */
  searchBarProps: PropTypes.object,
  /**
   * To support more Modal params.
   */
  modalParams: PropTypes.object,
  children: PropTypes.node,
  HeaderComponent: PropTypes.elementType,
  ContentRow: PropTypes.elementType,
  contentType: PropTypes.oneOf(["checkbox", null]),
  canSearch: PropTypes.bool,
  shouldHideKeyboardOnScrollBegin: PropTypes.bool,
  shouldShowItemSeparator: PropTypes.bool,
  flatListRef: PropTypes.object,
};

const styles = StyleSheet.create({
  safeAreaView: {
    maxHeight: "70%",
    backgroundColor: theme.colors.background.primary,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
  },
  modalStyle: {
    margin: 0,
    justifyContent: "flex-end",
    flex: 1,
  },
  inputContainerStyle: {
    backgroundColor: "white",
    borderRadius: moderateScale(10),
  },
});
