**neetoUI-RN** is the library that drives the experience in all
[neeto product's](https://neeto.com/) React Native application built at
[BigBinary](https://www.bigbinary.com).

## Documentation

Read the docs here.

Docs: https://neetoui-rn-docs.onrender.com/

Storybook: https://neetoui-rn.onrender.com/

## Installation

```
yarn add @bigbinary/neetoui-rn react-native-svg react-native-webview @shopify/flash-list react-native-reanimated react-native-fast-image react-native-device-info
```

Navigate to iOS folder and run:

```
pod install
```

> All the native components will be linked automatically.

## Getting Started

## react-native-safe-area-context

We are using SafeAreaView from
[`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context)
in our `ParentView` component to handle safe area. Follow the instructions under
`SafeAreaProvider` for the `ParentView` component to work.

### SafeAreaProvider

You should add `SafeAreaProvider` in your app root component. You may need to
add it in other places like the root of modals and routes when using
[`react-native-screens`](https://github.com/software-mansion/react-native-screens).

Note that providers should not be inside a `View` that is animated with
`Animated` or inside a `ScrollView` since it can cause very frequent updates.

#### Example

```js
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  return <SafeAreaProvider>...</SafeAreaProvider>;
}
```

## Development

Install all the dependencies by executing following command.

```
yarn
```

You can create new components in the `src/components` and export them from
`src/components/index.js`. You can create stories in `storybook/stories`.

You can use below commands for running storybook in different platforms:

| Platform | Command        |
| -------- | -------------- |
| Android  | `yarn android` |
| iOS:     | `yarn ios`     |
| Web      | `yarn web`     |

## Auto Publish to NPM

neetoUI-RN version gets patched, auto-incremented and auto-published to npm on
new commit to main branch. You can checkout the `publish` workflow in Github
actions to get a live update.

## Building Storybook

Run `yarn build-react` to build storybook locally, this would create `dist`
folder with static files.

Run `yarn serve` to serve storybook locally.

## Running Component Documentation

Run `cd docs`, `yarn start` to run component documentation locally.

## Building Component Documentation

Run `cd docs`, `yarn build` to build component documentation locally, this would
create `dist` folder with static files in `docs` folder.

## Testing with yalc package manager

To publish locally

```
yarn build && rm -rf ~/.yalc/packages && yalc publish --private
```

or

```
yarn yalc:publish
```

To install local yalc version of library in any app.

```
rm -rf .yalc && yalc add @bigbinary/neetoui-rn  && rm -rf node_modules  && yarn
```

## Learn more about contributing to this repository

https://github.com/bigbinary/neeto-ui-rn/blob/main/CONTRIBUTING.md
