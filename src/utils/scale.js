import { moderateScale as baseModerateScale } from "react-native-size-matters";

export const moderateScale = (size, factor) =>
  Math.round(baseModerateScale(size, factor));
