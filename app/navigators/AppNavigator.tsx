/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { translate } from "../i18n"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import { TaskHeaderIcon } from "../components/TaskHeaderIcon"
import Config from "../config"
import {
  WelcomeScreen,
} from "../screens"
import { AddTaskScreen } from "../screens/AddTaskScreen"
import { TasksScreen } from "../screens/TasksScreen"
import { ViewTaskScreen } from "../screens/ViewTaskScreen"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { TaskTabNavigator } from "./TaskTabNavigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  TaskTab: undefined
  AddTask: undefined
  TaskList: undefined
  ViewTask: {
    task: undefined
  }
  Progress: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="TaskTab" component={TaskTabNavigator} />
    </Stack.Navigator>
  )
})

/**
 * This are the stacked screens when "Tasks" tab is selected
 * from the TaskTabNavigator.
 * @returns A stack navigator
 */
export function TaskNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen 
        name="TaskList" 
        component={TasksScreen} 
        options={{ 
          headerShown: true, 
          headerBackVisible: false,
          title: translate("appNavigator.taskListScreenTitle"), 
          headerRight: () => <TaskHeaderIcon/> }} />
      <Stack.Screen 
        name="AddTask" 
        component={AddTaskScreen} 
        options={{ title: translate("appNavigator.addTaskScreenTitle") }} />
      <Stack.Screen 
        name="ViewTask" 
        component={ViewTaskScreen} 
        options={{ title: translate("appNavigator.viewTaskScreenTitle") }} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

/**
 * This is the starting point of the screen routes for this app.
 * @returns The root app navigator
 */
export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
