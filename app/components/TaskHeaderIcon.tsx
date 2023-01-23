import { observer } from "mobx-react-lite";
import React from "react"
import { ImageStyle } from "react-native";
import { useStores } from "../models";
import { colors, spacing } from "../theme";
import { Icon } from "./Icon";

export const TaskHeaderIcon = observer(function() {

  const { taskStore } = useStores()

  function setSorting() {
    const currentSorting = taskStore.sorting;

    if (currentSorting === 'NAME') {
      taskStore.setSorting('PRIORITY')
    } else {
      taskStore.setSorting('NAME')
    }
  }

  return (
    <Icon 
      style={$icon}
      color={colors.palette.primary100}
      size={20}
      icon="sort"
      onPress={setSorting}/>
  );
});

const $icon: ImageStyle = {
  paddingHorizontal: spacing.large
}