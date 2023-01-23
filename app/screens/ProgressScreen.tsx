import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import {
  Text,
} from "../components"
import { translate } from "../i18n"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface ProgressScreenProps extends AppStackScreenProps<"Progress"> {}

/**
 * Screen that displays the total and completed todos.
 */
export const ProgressScreen: FC<ProgressScreenProps> = observer(function WelcomeScreen(
  _props,
) {
  const { taskStore } = useStores()

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          text={translate("progressScreen.totalTodos") + taskStore.totalUndeletedTasks()}
          preset="subheading"
        />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          text={translate("progressScreen.totalCompleted") + taskStore.totalCompletedTasks()}
          preset="subheading"
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
