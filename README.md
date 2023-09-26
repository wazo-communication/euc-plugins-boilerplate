# euc-plugins-boilerplate
A JavaScript library that provides a boilerplate for quickly creating Wazo EUC App plugins.

# Installation
To install the library, use one of the following package managers:

```sh
yarn install
# or
npm install
```

# How does it work ?

For detailed information on how to use the library, please refer to the [EUC Plugins SDK documentation](https://wazo-communication.github.io/euc-plugins-js-sdk/).

This boilerplate serves a [manifest.json](/public/manifest.json) file that defines two static tabs.

## Web and Desktop / Mobile application
The first static tab is used for WDA (Web and Desktop application) and the mobile application. The `manifest.json` configuration for this tab is as follows:

```json
{
  "entityId": "my-wda-ma-plugin",
  "context": [
    "sidebarTab",
    "mobileTab"
  ],
  "name": "My plugin",
  "contentUrl": "./wda.html",
  "icon": "./plugin-icon.svg",
  "mobileIcon": "chatbubble-ellipses-outline"
}
```

The plugin will appear on the sidebar of the Web and Desktop application (using the `sidebarTab` context) and in the tab bar of the mobile application (using the `mobileTab` context).

It displays the `wda.html` file, which loads the [WDA main.tsx file](./src/wda/main.tsx).

# Portal

The second static tab will display a new tab in the Stack home page of the Portal. It uses the `generalPbxTab` context. The `manifest.json` configuration for this tab is as follows:

```json
{
  "entityId": "my-portal-plugin",
  "context": [
    "generalPbxTab"
  ],
  "name": "My plugin",
  "contentUrl": "./portal.html",
  "icon": "./plugin-icon.svg"
}
```

It displays the `portal.html` file, which loads the [Portal main.tsx file](./src/portal/main.tsx).

# Customization

The icon for the plugin can be configured in the [plugin-icon.svg](`./public/plugin-icon.svg`) file located in the `public` directory.

For the mobile icon, you should select an icon from the [Ionic icons](https://ionic.io/ionicons) library.

For information about translating the manifest elements, please refer to the [documentation](https://wazo-communication.github.io/euc-plugins-js-sdk/docs/configuration#translating-manifest-elements) and the [`manifest-fr.json`](./public/manifest-fr.json) file located in the `public` directory.

The [`backgroundScript`](./src/background.ts) defined in the `src/background.ts` file can be used for executing tasks when the plugin is not displayed.
⚠️ Please note that in the manifest file for the production build, the `src/` part should be removed. The development and build modes should have the same URLs.

# What's in it ?

This boilerplate is written in React with Typescript. It uses Redux to the [EUC App context](https://wazo-communication.github.io/euc-plugins-js-sdk/docs/sdk#retrieving-the-euc-app-context).

We also store the `locale` in the store and translate content depending on the EUC App locale through `react-intl`.

The theming also depends on the one defined in the EUC App, we use Material UI to style the components.

# How to test it

To test the plugin, follow these steps:

```sh
yarn dev
```

#### WDA
Then navigate to [The web application including the plugin](https://app.wazo.io/?manifestUrl=http://localhost:5173/manifest.json).
You'll see a new chat icon in the sidebar.

#### Portal
Then navigate to [The portal application including the plugin](https://portal.wazo.io/?manifestUrl=http://localhost:5173/manifest.json).
You'll see a new tab when connecting to a Stack.

# End-to-end testing

This project uses `playwright` to run e2e tests.

## WDA

```sh
EMAIL=me@my-stack.io PASSWORD=xxx SERVER=my-stack.io EXPECTED_FIRSTNAME=John yarn e2e:wda
```

## Portal

```sh
EMAIL=admin@my-stack.io PASSWORD=xxx RESELLER="My reseller" EXPECTED_HOST=my-stack.io yarn e2e:portal
```
