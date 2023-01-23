import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { translate } from "../i18n"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  Icon,
  ListItem,
  Text,
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface TasksScreenProps extends AppStackScreenProps<"TaskList"> {}

/**
 * Screen that shows the to do lists.
 */
export const TasksScreen: FC<TasksScreenProps> = observer(function TasksScreen(
  _props,
) {

  const { navigation } = _props
  const { taskStore } = useStores()

  function goAddTask() {
    navigation.navigate("AddTask")
  }

  function viewTask(item) {
    taskStore.setCurrentTask(item);
    navigation.navigate("ViewTask")
  }

  function doDone(item) {
    taskStore.setStatus(item.id, 'DONE')
  }

  function getPriorityIcon(priority: string) {
    return priority.toLowerCase() + "Priority";
  }

  function getTasks() {
    if (taskStore.sorting === 'NAME') {
      return taskStore.undeletedTasksByStatusAndName()
    } else {
      return taskStore.undeletedTasksByStatusAndPriorityAndName()
    }
  }

  return (
    <View style={$container}>
      { taskStore.tasks.length <= 0 ? (
        <>
          <View style={$noTodoList}>
            <Text
              style={$noTodoListText}
              tx="tasksScreen.noToDoList"
              preset="default"
            />
          </View>
          <Button
            style={$addToDo}
            onPress={goAddTask}
          >
            {translate("tasksScreen.addButton")}
          </Button>
        </>
      ) : (
        <>
          <FlatList
            style={$taskList}
            data={getTasks()}
            ListFooterComponent={<View style={$extraSpace}></View>}
            renderItem={({ item }) => (
              <View 
                key={item.id} 
                style={$taskListContainer} >
                <ListItem
                  textStyle={item.status === 'DONE' && $strikedText}
                  text={item.name}
                  TextProps={{ numberOfLines: 1 }}
                  leftIcon={getPriorityIcon(item.priority)}
                  onPress={() => viewTask(item)} 
                />
                {
                  item.status !== 'DONE' &&
                  <View style={$buttonContainer} >
                    <Icon 
                      icon="check" 
                      size={20} 
                      onPress={() => doDone(item)} 
                    />
                  </View>
                }
              </View>
            )}
          />
          <Button
              style={$addToDoFloating}
              onPress={goAddTask} >
            {translate("tasksScreen.addButton")}
          </Button>
        </>
      )}
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $noTodoList: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.large,
  marginVertical: spacing.large,
}

const $noTodoListText: TextStyle = {
  textAlign: "center",
}

const $addToDo: ViewStyle = {
  marginHorizontal: spacing.large,
}

const $taskList: ViewStyle = {
  padding: spacing.small
}

const $taskListContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $buttonContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $addToDoFloating: ViewStyle = {
  position: 'absolute',
  bottom: spacing.medium,
  right: spacing.medium,
}

const $strikedText: TextStyle = {
  textDecorationLine: "line-through"
}

const $extraSpace: ViewStyle = {
  height: 200
}
