import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import TaskListScreen from "../screens/main/TaskListScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import CreateTaskScreen from "../screens/main/CreateTaskScreen";
import { Platform, TouchableOpacity, View, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

function CustomTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.customTabButton} onPress={onPress}>
      <View style={styles.customTabButtonInner}>{children}</View>
    </TouchableOpacity>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: Platform.OS === "ios" ? 85 : 60,
          paddingBottom: Platform.OS === "ios" ? 30 : 8,
          paddingTop: 8,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        tabBarActiveTintColor: "#6B4EFF",
        tabBarInactiveTintColor: "#999999",
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={TaskListScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <Ionicons
                name="add"
                size={32}
                color="#FFFFFF"
                style={{ marginTop: 12 }}
              />
            </View>
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  customTabButton: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  customTabButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6B4EFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6B4EFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
});
