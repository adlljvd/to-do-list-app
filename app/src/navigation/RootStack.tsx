import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import TaskListScreen from "../screens/main/TaskListScreen";
import CreateTaskScreen from "../screens/main/CreateTaskScreen";
import EditTaskScreen from "../screens/main/EditTaskScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import useIsSignedOut from "../hooks/useIsSignedOut";
import useIsSignedIn from "../hooks/useIsSignedIn";

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    contentStyle: { backgroundColor: "white" },
  },
  screens: {
    // Authentication
    Welcome: {
      if: useIsSignedOut,
      screen: WelcomeScreen,
      options: {
        headerShown: false,
        animation: "fade",
      },
    },
    Login: {
      if: useIsSignedOut,
      screen: LoginScreen,
      options: {
        headerShown: false,
        animation: "slide_from_right",
      },
    },
    Register: {
      if: useIsSignedOut,
      screen: RegisterScreen,
      options: {
        title: "Register",
        animation: "slide_from_right",
      },
    },
    // Main App
    TaskList: {
      if: useIsSignedIn,
      screen: TaskListScreen,
      options: {
        title: "My Tasks",
      },
    },
    CreateTask: {
      if: useIsSignedIn,
      screen: CreateTaskScreen,
      options: {
        title: "Create Task",
      },
    },
    EditTask: {
      if: useIsSignedIn,
      screen: EditTaskScreen,
      options: {
        title: "Edit Task",
      },
    },
  },
});

export default RootStack;
