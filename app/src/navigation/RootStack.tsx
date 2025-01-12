import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import MainTabs from "./MainTabs";
import EditTaskScreen from "../screens/main/EditTaskScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import TaskDetailScreen from "../screens/main/TaskDetailScreen";
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
    MainTabs: {
      if: useIsSignedIn,
      screen: MainTabs,
      options: {
        headerShown: false,
      },
    },
    TaskDetail: {
      if: useIsSignedIn,
      screen: TaskDetailScreen,
      options: {
        headerShown: false,
        animation: "slide_from_right",
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
