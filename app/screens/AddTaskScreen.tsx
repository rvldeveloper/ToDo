import { observer } from "mobx-react-lite"
import { ModelCreationType, ISimpleType } from "mobx-state-tree"
import { $nonEmptyObject, ExtractCFromProps } from "mobx-state-tree/dist/internal"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  Icon,
  Text,
  TextField,
  Toggle,
  ToggleProps,
} from "../components"
import { PriorityToggle } from "../components/PriorityToggle"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface AddTaskScreenProps extends AppStackScreenProps<"AddTask"> {}

/**
 * Contains the add todo form.
 */
export const AddTaskScreen: FC<AddTaskScreenProps> = observer(function TasksScreen(
  _props,
) {

  const { navigation } = _props
  const [ name, setName ] = useState("")
  const [ priority, setPriority ] = useState("MEDIUM")

  const { taskStore } = useStores()

  function addTodo() {
    taskStore.addNew({
      id: taskStore.tasks.length.toString(),
      name,
      priority,
      status: "NEW"
    })
    navigation.goBack()
  }

  return (
    <View style={$container}>
      <TextField
        value={name}
        onChangeText={setName}
        label="Task"
        multiline
        placeholderTx="addTaskScreen.namePlaceholder"
      />
      <View style={$priorityContainer}>
        <Text preset="formLabel">Priority</Text>
        <PriorityToggle
          labelTx="priority.high"
          value={priority === "HIGH"}
          onPress={() => setPriority("HIGH")}
          icon="highPriority"
        />
        <PriorityToggle
          labelTx="priority.medium"
          value={priority === "MEDIUM"}
          onPress={() => setPriority("MEDIUM")}
          icon="mediumPriority"
        />
        <PriorityToggle
          labelTx="priority.low"
          value={priority === "LOW"}
          onPress={() => setPriority("LOW")}
          icon="lowPriority"
        />
      </View>
      <Button onPress={addTodo}>Add</Button>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  padding: spacing.medium,
}

const $priorityContainer: ViewStyle = {
  paddingVertical: spacing.medium
}

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