import React from "react"
import { GestureResponderEvent, View, ViewStyle } from "react-native";
import { TxKeyPath } from "../i18n";
import { spacing } from "../theme";
import { Icon } from "./Icon";
import { Toggle } from "./Toggle";

type IProps = {
  labelTx: TxKeyPath;
  value: boolean;
  onPress: (event: GestureResponderEvent) => void;
  icon: string;
};

/**
 * Custom component that displays the priority toggle buttons.
 * @param props See IProps
 * @returns A React component.
 */
export const PriorityToggle = function(props: IProps) {
  return (
    <View style={$toggleContainer}>
        <Toggle
          labelTx={props.labelTx}
          containerStyle={$toggle}
          value={props.value}
          onPress={props.onPress}
        />
        <Icon icon={props.icon} size={22}/>
    </View>
  );
};

const $toggleContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingRight: spacing.medium
}

const $toggle: ViewStyle = {
  flexGrow: 1,
  marginVertical: spacing.extraSmall,
  marginHorizontal: spacing.small,
}