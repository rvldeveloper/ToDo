import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { ProgressScreen } from "../screens/ProgressScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps, TaskNavigator } from "./AppNavigator"

export type TaskTabParamList = {
  Tasks: undefined
  Progress: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TaskTabScreenProps<T extends keyof TaskTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TaskTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TaskTabParamList>()

/**
 * The main tab navigator of the app.
 * @returns A tab navigator component.
 */
export function TaskTabNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Tasks"
        component={TaskNavigator}
        options={{
          tabBarLabel: translate("taskTabNavigator.tasks"),
          tabBarIcon: ({ focused }) => <Icon icon="components" color={focused && colors.tint} size={25} />,
        }}
      />

      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarLabel: translate("taskTabNavigator.progress"),
          tabBarIcon: ({ focused }) => <Icon icon="view" color={focused && colors.tint} size={25} />,
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
