const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const appDirectory = path.resolve(__dirname);

const babelLoaderConfiguration = {
  test: [/\.js$/, /\.jsx$/, /\.ts$/],
  include: [
    path.resolve(__dirname, "index.web.js"),
    path.resolve(__dirname, "App.web.js"),
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "./storybook/stories"),
    path.resolve(__dirname, "./.storybook/preview.js"),
    path.resolve(__dirname, "./node_modules/@bigbinary/neeto-icons-rn"),
    path.resolve(__dirname, "./node_modules/react-native-modal-selector"),
    path.resolve(__dirname, "./node_modules/react-native-swipe-gestures"),
    path.resolve(__dirname, "./node_modules/react-native-modal"),
    path.resolve(__dirname, "./node_modules/react-native-animatable"),
    path.resolve(__dirname, "./node_modules/react-native-reanimated"),
    path.resolve(__dirname, "./node_modules/react-native-gesture-handler"),
    path.resolve(__dirname, "./node_modules/react-native-remix-icon"),
    path.resolve(__dirname, "./node_modules/react-native-svg"),
    path.resolve(__dirname, "./node_modules/react-native-svg-transformer"),
    path.resolve(__dirname, "./node_modules/react-native-toast-message"),
    path.resolve(__dirname, "./node_modules/react-native-fast-image"),
    path.resolve(
      __dirname,
      "./node_modules/react-native-keyboard-aware-scroll-view"
    ),
    path.resolve(__dirname, "./node_modules/react-native-pell-rich-editor"),
    path.resolve(__dirname, "./node_modules/react-native-webview"),
    path.resolve(__dirname, "./node_modules/react-native-calendars"),
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: [
        "@babel/env",
        "@babel/preset-react",
        "module:metro-react-native-babel-preset",
      ],
      plugins: ["react-native-web", "@babel/plugin-proposal-class-properties"],
    },
  },
};

const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  use: {
    loader: "url-loader",
  },
  include: [path.resolve(appDirectory, "./src/assets")],
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: "@svgr/webpack",
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
    },
  },
};

module.exports = {
  entry: {
    app: path.join(__dirname, "index.web.js"),
  },
  output: {
    path: path.resolve(appDirectory, "dist"),
    publicPath: "/",
    filename: "rnw.bundle.js",
  },
  resolve: {
    extensions: [
      ".web.tsx",
      ".web.ts",
      ".tsx",
      ".ts",
      ".web.js",
      ".js",
      ".jsx",
    ],
    alias: {
      "react-native$": "react-native-web",
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      ttfLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
    }),
    new webpack.DefinePlugin({ process: { env: {} } }),
  ],
  devServer: {
    open: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
