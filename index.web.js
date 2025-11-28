import { AppRegistry } from "react-native";

// Loaded Fonts with this approach: https://github.com/oblador/react-native-vector-icons#web-with-webpack

import App from "./App";
import { name as appName } from "./app.json";
import sfBold from "./src/assets/fonts/SFProText-Bold.ttf";
import sfMedium from "./src/assets/fonts/SFProText-Medium.ttf";
import sfRegular from "./src/assets/fonts/SFProText-Regular.ttf";
import sfSemiBold from "./src/assets/fonts/SFProText-Semibold.ttf";

if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("app-root"),
});

const iconFontStyles = `
@font-face {
  src: url(${sfRegular});
  font-family: SFProText-Regular;
}

@font-face {
  src: url(${sfMedium});
  font-family: SFProText-Medium;
}

@font-face {
  src: url(${sfSemiBold});
  font-family: SFProText-Semibold;
}

@font-face {
  src: url(${sfBold});
  font-family: SFProText-Bold;
}
`;

const style = document.createElement("style");
style.type = "text/css";
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

document.head.appendChild(style);
