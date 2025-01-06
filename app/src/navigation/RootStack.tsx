import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import TaskListScreen from "../screens/main/TaskListScreen";
import CreateTaskScreen from "../screens/main/CreateTaskScreen";
import EditTaskScreen from "../screens/main/EditTaskScreen";
import useIsSignedOut from "../hooks/useIsSignedOut";
import useIsSignedIn from "../hooks/useIsSignedIn";

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    contentStyle: { backgroundColor: "white" },
  },
  screens: {
    // Authentication
    Login: {
      //   if: useIsSignedOut,
      screen: LoginScreen,
      options: {
        headerShown: false,
      },
    },
    Register: {
      //   if: useIsSignedOut,
      screen: RegisterScreen,
      options: {
        title: "Register",
      },
    },
    // Main App
    TaskList: {
      //   if: useIsSignedIn,
      screen: TaskListScreen,
      options: {
        title: "My Tasks",
      },
    },
    CreateTask: {
      //   if: useIsSignedIn,
      screen: CreateTaskScreen,
      options: {
        title: "Create Task",
      },
    },
    EditTask: {
      //   if: useIsSignedIn,
      screen: EditTaskScreen,
      options: {
        title: "Edit Task",
      },
    },
  },
});

export default RootStack;
