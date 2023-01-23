import { TaskStoreModel } from "./TaskStore"

test("can add new task", () => {
  const instance = TaskStoreModel.create()

  instance.addNew({
    id: "1",
    name: "test task",
    priority: "HIGH",
    status: "NEW"
  })

  expect(instance.tasks).toStrictEqual([
    {
        id: "1",
        name: "test task",
        priority: "HIGH",
        status: "NEW"
    },
  ])
})

test("can set current task", () => {
  const instance = TaskStoreModel.create()
  instance.addNew({
    id: "1",
    name: "test task",
    priority: "HIGH",
    status: "NEW"
  })
  const task = instance.tasks[0]

  instance.setCurrentTask(task)

  expect(instance.currentTask).toStrictEqual(
    {
        id: "1",
        name: "test task",
        priority: "HIGH",
        status: "NEW"
    },
  )
})

test("can set status of a task", () => {
  const instance = TaskStoreModel.create()
  instance.addNew({
    id: "1",
    name: "test task",
    priority: "HIGH",
    status: "NEW"
  })
  const task = instance.tasks[0]

  instance.setStatus("1", "DONE")

  expect(instance.tasks).toStrictEqual([
    {
        id: "1",
        name: "test task",
        priority: "HIGH",
        status: "DONE"
    },
  ])
})

test("can set priority of a task", () => {
  const instance = TaskStoreModel.create()
  instance.addNew({
    id: "1",
    name: "test task",
    priority: "HIGH",
    status: "NEW"
  })
  const task = instance.tasks[0]

  instance.setPriority("1", "LOW")

  expect(instance.tasks).toStrictEqual([
    {
        id: "1",
        name: "test task",
        priority: "LOW",
        status: "NEW"
    },
  ])
})

test("can set current sorting", () => {
  const instance = TaskStoreModel.create()
  instance.setSorting("PRIORITY")

  expect(instance.sorting).toStrictEqual("PRIORITY")
})

test("returns all undeleted, sorted by status and name", () => {
  const instance = TaskStoreModel.create()
  instance.addNew({
    id: "1",
    name: "test 1",
    priority: "HIGH",
    status: "NEW"
  })
  instance.addNew({
    id: "2",
    name: "test 2",
    priority: "MEDIUM",
    status: "DONE"
  })
  instance.addNew({
    id: "3",
    name: "test 3",
    priority: "LOW",
    status: "DELETED"
  })

  expect(instance.undeletedTasksByStatusAndName()).toStrictEqual([
    {
      id: "1",
      name: "test 1",
      priority: "HIGH",
      status: "NEW"
    },
    {
      id: "2",
      name: "test 2",
      priority: "MEDIUM",
      status: "DONE"
    },
  ])
})

test("returns all undeleted, sorted by status, priority and name", () => {
  const instance = TaskStoreModel.create()
  instance.addNew({
    id: "1",
    name: "test 1",
    priority: "MEDIUM",
    status: "NEW"
  })
  instance.addNew({
    id: "2",
    name: "test 2",
    priority: "HIGH",
    status: "DONE"
  })
  instance.addNew({
    id: "3",
    name: "test 3",
    priority: "LOW",
    status: "DELETED"
  })
  instance.addNew({
    id: "2",
    name: "test 4",
    priority: "HIGH",
    status: "NEW"
  })

  expect(instance.undeletedTasksByStatusAndPriorityAndName()).toStrictEqual([
    {
      id: "2",
      name: "test 4",
      priority: "HIGH",
      status: "NEW"
    },
    {
      id: "1",
      name: "test 1",
      priority: "MEDIUM",
      status: "NEW"
    },
    {
      id: "2",
      name: "test 2",
      priority: "HIGH",
      status: "DONE"
    },
  ])
})

test("returns the count of undeleted tasks", () => {
  const instance = TaskStoreModel.create()
  instance.addNew({
    id: "1",
    name: "test 1",
    priority: "MEDIUM",
    status: "NEW"
  })
  instance.addNew({
    id: "2",
    name: "test 2",
    priority: "HIGH",
    status: "DONE"
  })
  instance.addNew({
    id: "3",
    name: "test 3",
    priority: "LOW",
    status: "DELETED"
  })
  instance.addNew({
    id: "2",
    name: "test 4",
    priority: "HIGH",
    status: "NEW"
  })

  expect(instance.totalUndeletedTasks()).toStrictEqual(3)
})

test("returns the count of done", () => {
  const instance = TaskStoreModel.create()
  instance.addNew({
    id: "1",
    name: "test 1",
    priority: "MEDIUM",
    status: "DONE"
  })
  instance.addNew({
    id: "2",
    name: "test 2",
    priority: "HIGH",
    status: "DONE"
  })
  instance.addNew({
    id: "3",
    name: "test 3",
    priority: "LOW",
    status: "DELETED"
  })
  instance.addNew({
    id: "2",
    name: "test 4",
    priority: "HIGH",
    status: "NEW"
  })

  expect(instance.totalCompletedTasks()).toStrictEqual(2)
})