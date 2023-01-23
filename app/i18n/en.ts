const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  priority: {
    high: "High",
    medium: "Medium",
    low: "Low",
  },
  appNavigator: {
    taskListScreenTitle: "My todo list",
    addTaskScreenTitle: "Add a todo",
    viewTaskScreenTitle: "View a todo",
  },
  taskTabNavigator: {
    tasks: "Todos",
    progress: "Progress"
  },
  welcomeScreen: {
    appTitle: "ToDo",
    subTitle: "The best task management app, ever!",
    postscript: "start adding todos!",
  },
  tasksScreen: {
    header: "My to do list",
    noToDoList: "You do not have any task yet. Start adding one",
    addButton: "Add a todo"
  },
  addTaskScreen: {
    namePlaceholder: "What are you planning to do?",
    addButton: "Add",
  },
  progressScreen: {
    totalTodos: "Total todos: ",
    totalCompleted: "Total completed: ",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en
