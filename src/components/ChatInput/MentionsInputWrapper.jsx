import React, { forwardRef, useContext, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import PropTypes from "prop-types";
import { MentionInput } from "react-native-controlled-mentions";
import { ThemeContext } from "styled-components/native";

import { moderateScale } from "@utils/scale";

import { Avatar } from "../Avatar";
import { Card } from "../Card";
import { Container } from "../Container";
import { Divider } from "../Divider";
import { Touchable } from "../Touchable";
import { Typography } from "../Typography";

export const MentionsInputWrapper = forwardRef(
  ({ suggestions, shouldShowSuggestions, ...rest }, ref) => {
    const [visibleMentionsCount, setVisibleMentionsCount] = useState(0);
    const theme = useContext(ThemeContext);

    const heightOfMention = moderateScale(50);
    const mentionsListHeight = visibleMentionsCount * heightOfMention;

    const renderSuggestions = ({ keyword, onSuggestionPress }) => {
      if (!shouldShowSuggestions) return null;

      if (keyword === null) {
        if (visibleMentionsCount !== 0) setVisibleMentionsCount(0);

        return null;
      }

      const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.name
          .toLocaleLowerCase()
          .includes(keyword?.toLocaleLowerCase())
      );

      setVisibleMentionsCount(
        filteredSuggestions.length > 4 ? 4 : filteredSuggestions.length
      );

      return (
        <Card elevation={4}>
          <ScrollView
            contentInset={{ bottom: moderateScale(20) }}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{
              ...(filteredSuggestions.length === 0
                ? { height: 0 }
                : {
                    height: mentionsListHeight,
                    justifyContent: "flex-end",
                    borderRadius: moderateScale(10),
                    backgroundColor: theme.colors.background.grey100,
                  }),
            }}
          >
            {filteredSuggestions.map((suggestion, index) => {
              const { name, imageUrl } = suggestion;

              return (
                <Touchable
                  bg="background.grey100"
                  width="100%"
                  {...(index === 0 && {
                    borderTopLeftRadius: moderateScale(10),
                    borderTopRightRadius: moderateScale(10),
                  })}
                  {...(index === filteredSuggestions.length - 1 && {
                    borderBottomLeftRadius: moderateScale(10),
                    borderBottomRightRadius: moderateScale(10),
                  })}
                  height={heightOfMention}
                  key={index}
                  px={moderateScale(10)}
                  onPress={() => onSuggestionPress(suggestion)}
                >
                  <Container alignItems="center" flex={1} flexDirection="row">
                    <Avatar
                      imageUrl={imageUrl}
                      mr={moderateScale(8)}
                      name={name}
                      variant="extra-small"
                    />
                    <Typography
                      color="font.primary"
                      flex={1}
                      fontFamily="sf400"
                      fontSize="xs"
                    >
                      {name}
                    </Typography>
                  </Container>
                  {index !== filteredSuggestions.length - 1 && (
                    <Divider bg="border.primary" width="100%" />
                  )}
                </Touchable>
              );
            })}
          </ScrollView>
        </Card>
      );
    };

    return (
      <MentionInput
        inputRef={ref}
        placeholderTextColor={theme.colors.font.grey400}
        style={{ color: theme.colors.font.grey800 }}
        suggestions={suggestions}
        containerStyle={[
          styles.mentionsTextInputStyle,
          {
            minHeight: moderateScale(60) + mentionsListHeight,
          },
        ]}
        partTypes={[
          {
            isInsertSpaceAfterMention: true,
            allowedSpacesCount: 0,
            trigger: "@",
            renderSuggestions,
            textStyle: {
              fontFamily: theme.fonts.sf700,
              color: theme.colors.font.base,
            },
          },
        ]}
        {...rest}
      />
    );
  }
);

MentionsInputWrapper.displayName = "MentionsInputWrapper";
const styles = StyleSheet.create({
  mentionsTextInputStyle: {
    marginVertical: moderateScale(10),
    flex: 1,
    width: "100%",
  },
});

MentionsInputWrapper.propTypes = {
  shouldShowSuggestions: PropTypes.bool,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      imageUrl: PropTypes.string,
    })
  ),
};
