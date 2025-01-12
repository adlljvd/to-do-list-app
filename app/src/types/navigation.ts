import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  welcome: undefined;
  Home: undefined;
  TaskList: undefined;
  TaskDetail: { taskId: string };
  CreateTask: undefined;
  EditTask: undefined;
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
