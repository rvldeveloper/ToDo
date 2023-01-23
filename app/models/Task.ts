import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * This represents a todo task.
 */
export const TaskModel = types
  .model("Task")
  .props({
    id: types.identifier,
    name: types.string,
    priority: types.string,
    status: types.string,
  })

export interface Task extends Instance<typeof TaskModel> {}
export interface TaskSnapshotOut extends SnapshotOut<typeof TaskModel> {}
export interface TaskSnapshotIn extends SnapshotIn<typeof TaskModel> {}
