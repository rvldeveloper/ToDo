import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import {
  Icon,
  Text,
} from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> { }

/**
 * Screen that is inteded to be shown during initial app load.
 */
export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props,
) {

  const { navigation } = _props

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  function goNext() {
    navigation.navigate("TaskTab")
  }

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.appTitle"
          preset="heading"
        />
        <Text 
          tx="welcomeScreen.subTitle" 
          preset="subheading" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.postscript" size="md" />
        <Icon 
          icon="caretRight" 
          size={35} 
          containerStyle={$demoIconContainer} 
          onPress={goNext} />
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

const $bottomContainer: ViewStyle = {
  flexDirection: "row",
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-between",
  alignItems: "center",
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}

const $demoIconContainer: ViewStyle = {
  padding: spacing.extraSmall,
}