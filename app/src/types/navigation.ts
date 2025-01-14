import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Task } from "./task";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  welcome: undefined;
  MainTabs: undefined;
  TaskList: undefined;
  TaskDetail: { task: Task };
  CreateTask: undefined;
  EditTask: {
    taskId: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    category: string;
    dueDate: string;
    time: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  CreateTask: undefined;
  Profile: undefined;
};

//rootstack navigation
export type AuthScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "welcome"
>;
export type TaskListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TaskList"
>;
export type TaskDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TaskDetail"
>;
export type EditTaskScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditTask"
>;

//bottomtab navigation
export type HomeTabNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  "Home"
>;
export type CreateTaskTabNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  "CreateTask"
>;
export type ProfileTabNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  "Profile"
>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;
