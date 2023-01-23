# ToDo
For Rocket Lab coding assignment. This code is authored by Ryan Vincent Lamaroza.

This project was bootstrapped with [Ignite React Native Boilerplate](https://github.com/infinitered/ignite).

## Project setup

In the project directory, you can run:

```
yarn
```
to build the project. Note that depending if CocoaPods is installed in your system, the `pod install` step would fail. When this happens, make sure that CocoaPods is installed first, then you can run `pod install` in the `/ios` directory.

then

### Compiles and hot-reloads for development

```
# For expo
yarn expo
```

then hit `w` to launch expo on a browser, or `i` to run expo on an ios simulator, or `a` for android simulator. (On screen instructions will appear once `yarn expo` command is executed)

### Notable Files / Project directory

* app/components - ignite boilerplate and app custom components
* app/i18n - translation texts (only english texts for now)
* app/models -  stores (using mobx-state-tree)
* app/models/TaskStore.ts - main data store controller for this app
* app/models/TaskStore.test.ts - sample jest test cases
* app/navigators - application navigation code using react-navigation
* app/screens - application screens
