import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  Text,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasksAsync,
  toggleTaskStatus,
} from "../../store/slices/taskSlice";
import { AppDispatch, RootState } from "../../store";
import { API_URL } from "../../config/api";
import { Ionicons } from "@expo/vector-icons";
import { Profile } from "../../types/profile";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import UserHeader from "../../components/UserHeader";
import TabNavigation from "../../components/TabNavigation";
import PlannedView from "../../components/PlannedView";
import TaskList from "../../components/TaskList";
import { fetchProfileAsync } from "../../store/slices/userSlice";

const tabs = [
  { id: "my_day", name: "My Day" },
  { id: "planned", name: "Planned" },
  { id: "completed", name: "Completed" },
];

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="document-text-outline" size={64} color="#CCCCCC" />
    <Text style={styles.emptyText}>Click button + to create a new task</Text>
  </View>
);

export default function TaskListScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<string>("my_day");
  const { tasks, loading: tasksLoading } = useSelector(
    (state: RootState) => state.tasks
  );
  const { profile } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchTasksAsync());
    dispatch(fetchProfileAsync());
  }, []);

  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete "${taskTitle}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await axios.delete(
                `${API_URL}/tasks/${taskId}`,
                {
                  headers: {
                    Authorization: `Bearer ${await SecureStore.getItemAsync(
                      "token"
                    )}`,
                  },
                }
              );
              dispatch(fetchTasksAsync());
              if (response.status === 200) {
                Alert.alert("Deleted", response.data.message);
              }
            } catch (error) {
              if (axios.isAxiosError(error)) {
                const message =
                  error.response?.data?.message || "Delete task failed";
                Alert.alert("Error", message);
              } else {
                Alert.alert("Error", "Delete task failed. Please try again.");
              }
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleToggleTaskStatus = async (taskId: string) => {
    try {
      const currentTask = tasks.find((task) => task.id === taskId);
      if (!currentTask) return;

      const nextStatus = (() => {
        switch (currentTask.status) {
          case "completed":
            return "in_progress";
          case "in_progress":
            return "completed";
          case "pending":
            return "completed";
          default:
            return "pending";
        }
      })();

      dispatch(toggleTaskStatus({ taskId, status: nextStatus }));

      axios
        .put(
          `${API_URL}/tasks/${taskId}`,
          {
            status: nextStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${await SecureStore.getItemAsync(
                "token"
              )}`,
            },
          }
        )
        .catch((error) => {
          dispatch(toggleTaskStatus({ taskId, status: currentTask.status }));

          if (axios.isAxiosError(error)) {
            const message =
              error.response?.data?.message || "Toggle task status failed";
            Alert.alert("Error", message);
          } else {
            Alert.alert(
              "Error",
              "Toggle task status failed. Please try again."
            );
          }
        });
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  const filteredTasks = (tasks || []).filter((task) => {
    switch (activeTab) {
      case "my_day":
        return task.status !== "completed";
      case "planned":
        return task.date !== null;
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  if (tasksLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <UserHeader name={profile.name} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6B4EFF" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <UserHeader name={profile.name} />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {!tasks?.length ? (
        <EmptyState />
      ) : activeTab === "planned" ? (
        <PlannedView
          tasks={filteredTasks}
          onToggleStatus={handleToggleTaskStatus}
        />
      ) : (
        <TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});
