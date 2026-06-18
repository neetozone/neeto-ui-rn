import React from "react";
import { Linking } from "react-native";

import PropTypes from "prop-types";

import { moderateScale } from "@utils/scale";

import { Container } from "./Container";
import { Typography } from "./Typography";

/**
 *
 * Buttons are touchable elements used to interact with the screen and to trigger an action.
 *
 * <div class="screenshots">
 *   <img src="screenshots/organizationItem/organizationItem.png" />
 * </div>
 *
 *  ## Usage
 * ```js
 * import * as React from 'react';
 * import { OrganizationItem } from '@bigbinary/neetoui-rn';
 *
 * export default function Main() {
 *  return (
 *    <OrganizationItem name="BigBinary Solutions Pvt. Ltd." />
 *  );
 * }
 * ```
 *
 */

export const OrganizationItem = ({
  label,
  labelContainerProps,
  labelProps,
  name,
  nameProps,
  subdomain,
  subdomainProps,
  ...rest
}) => (
  <Container
    bg="background.secondary"
    borderRadius={moderateScale(6)}
    justifyContent="space-between"
    px={moderateScale(12)}
    py={moderateScale(12)}
    width="100%"
    {...rest}
  >
    <Container alignItems="center" flexDirection="row" {...labelContainerProps}>
      <Typography
        color="font.grey800"
        fontFamily="sf500"
        fontSize="s"
        {...labelProps}
      >
        {label || "Organization"}
      </Typography>
    </Container>
    <Typography
      color="font.grey700"
      fontFamily="sf500"
      fontSize="m"
      mt="8px"
      {...nameProps}
    >
      {name}
    </Typography>
    <Typography
      color="font.grey700"
      fontFamily="sf500"
      fontSize="m"
      onPress={() => Linking.openURL(`https://${subdomain}`)}
      {...subdomainProps}
    >
      {subdomain}
    </Typography>
  </Container>
);

OrganizationItem.propTypes = {
  /**
   * Organization label
   */
  label: PropTypes.string,
  /**
   * Customize label container
   */
  labelContainerProps: PropTypes.object,
  /**
   * Customize label
   */
  labelProps: PropTypes.object,
  /**
   * Organization name
   */
  name: PropTypes.string.isRequired,
  /**
   * Customize name
   */
  nameProps: PropTypes.object,
  /**
   * Subdomain
   */
  subdomain: PropTypes.string.isRequired,
  /**
   * Customize Subdomain
   */
  subdomainProps: PropTypes.object,
};
