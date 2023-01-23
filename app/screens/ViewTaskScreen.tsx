import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ImageStyle, View, ViewStyle } from "react-native"
import {
  Button,
  Icon,
  Text,
  TextField,
  Toggle,
} from "../components"
import { PriorityToggle } from "../components/PriorityToggle"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface ViewTaskScreenProps extends AppStackScreenProps<"ViewTask"> {}

/**
 * Screen that allows viewing, editing, deleting, and completing of tasks.
 */
export const ViewTaskScreen: FC<ViewTaskScreenProps> = observer(function TasksScreen(
  _props,
) {
  
  const { taskStore } = useStores()
  const task = taskStore.currentTask;

  const [ priority, setPriority ] = useState(task?.priority)

  function savePriority(priority) {
    taskStore.setPriority(task?.id, priority)
    setPriority(priority)
  }

  function doDone() {
    taskStore.setStatus(task?.id, 'DONE')
  }

  function doDelete() {
    taskStore.setStatus(task?.id, 'DELETED')
  }

  return (
    <View style={$container}>
      <TextField
        value={task?.name}
        label="Task"
        multiline
        status="disabled"
      />
      <View style={$priorityContainer}>
        <Text preset="formLabel">Priority</Text>
        <PriorityToggle
          labelTx="priority.high"
          value={priority === "HIGH"}
          onPress={() => savePriority("HIGH")}
          icon="highPriority"
        />
        <PriorityToggle
          labelTx="priority.medium"
          value={priority === "MEDIUM"}
          onPress={() => savePriority("MEDIUM")}
          icon="mediumPriority"
        />
        <PriorityToggle
          labelTx="priority.low"
          value={priority === "LOW"}
          onPress={() => savePriority("LOW")}
          icon="lowPriority"
        />
      </View>
      {
        task?.status === "NEW" &&
        <Button 
          style={$button}
          preset="filled" 
          onPress={doDone}
          LeftAccessory={(props) => (
            <Icon containerStyle={props.style} icon="check" style={$iconStyle}/>
          )}>
            Done
        </Button>
      }
      {
        task?.status === "DONE" &&
        <Button 
          disabled
          style={$button}
          LeftAccessory={(props) => (
            <Icon containerStyle={props.style} icon="check" style={$iconStyle}/>
          )}>
            This task is completed
        </Button>
      }
      {
        task?.status !== "DELETED" &&
        <Button 
          style={$button}
          preset="default" 
          onPress={doDelete}
          LeftAccessory={(props) => (
            <Icon containerStyle={props.style} icon="x" style={$iconStyle}/>
          )}>
            Delete
        </Button>
      }
      {
        task?.status === "DELETED" &&
        <Button 
          disabled
          style={$button}
          LeftAccessory={(props) => (
            <Icon containerStyle={props.style} icon="x" style={$iconStyle}/>
          )}>
            This task is deleted
        </Button>
      }
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

const $button: ViewStyle = {
  marginVertical: spacing.small,
}

const $iconStyle: ImageStyle = { width: 30, height: 30 }