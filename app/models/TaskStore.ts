import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Task, TaskModel } from "./Task"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Gets the sort rank of a Task.status value.
 * @param status The Task.status value.
 * @returns The numeric rank value.
 */
function getRankByStatus(status) {
  switch (status) {
    case 'NEW':
      return 1
    case 'DONE':
      return 2
    case 'DELETED':
      return 3;
    default:
      return 3;
  }
}

/**
 * Gets the sort rank of a Task.priority value.
 * @param status The Task.priority value.
 * @returns The numeric rank value.
 */
function getRankByPriority(priority) {
  switch (priority) {
    case 'HIGH':
      return 1
    case 'MEDIUM':
      return 2
    case 'LOW':
      return 3;
    default:
      return 3;
  }
}

/**
 * The state store for Tasks.
 */
export const TaskStoreModel = types
  .model("TaskStore")
  .props({
    tasks: types.array(TaskModel),
    currentTask: types.maybe(types.reference(TaskModel)),
    sorting: types.optional(types.string, "NAME")
  })
  .actions(withSetPropAction)
  .actions((store) => ({

    // Adds a new task
    addNew: (task: Task) => {
      store.tasks.push(task)
    },

    // Sets the current viewed task
    setCurrentTask: (task: Task) => {
      store.currentTask = task;
    },

    // Sets the Task.status of a Task based on id
    setStatus: (id: string, newStatus: string) => {
      store.tasks.filter(task => task.id === id)[0].status = newStatus
    },

    // Sets the Task.priority of a Task based on id
    setPriority: (id: string, newPriority: string) => {
      store.tasks.filter(task => task.id === id)[0].priority = newPriority
    },

    // Sets the current sorting method of the task list
    setSorting: (sorting: string) => {
      store.sorting = sorting;
    },
  }))
  .views(store => ({

    // Returns all tasks that are not status = DELETED, sorted by status and name
    undeletedTasksByStatusAndName: () => {
      return store.tasks
        .filter(task => task.status !== 'DELETED')
        .sort((a, b) => {
          return getRankByStatus(a.status) - getRankByStatus(b.status) 
            || a.name.localeCompare(b.name)
        });
    },

    // Returns all tasks that are not status = DELETED, sorted by status, priority and name
    undeletedTasksByStatusAndPriorityAndName: () => {
      return store.tasks
        .filter(task => task.status !== 'DELETED')
        .sort((a, b) => {
          return getRankByStatus(a.status) - getRankByStatus(b.status) 
            || getRankByPriority(a.priority) - getRankByPriority(b.priority) 
            || a.name.localeCompare(b.name)
        });
    },

    // Gets the total undeleted tasks
    totalUndeletedTasks: () => {
      return store.tasks
        .filter(task => task.status !== 'DELETED')
        .length;
    },

    // Gets the total completed tasks
    totalCompletedTasks: () => {
      return store.tasks
        .filter(task => task.status === 'DONE')
        .length;
    },
  }))

export interface TaskStore extends Instance<typeof TaskStoreModel> {}
export interface TaskStoreSnapshot extends SnapshotOut<typeof TaskStoreModel> {}

