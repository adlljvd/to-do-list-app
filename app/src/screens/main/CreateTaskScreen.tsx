import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Category, TaskFormData } from "../../components/TaskForm/types";
import TaskForm from "../../components/TaskForm";
import { API_URL } from "../../config/api";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { addTaskAsync, fetchTasksAsync } from "../../store/slices/taskSlice";
import { AppDispatch, RootState } from "../../store";
import { CreateTaskTabNavigationProp } from "../../types/navigation";
import { fetchProfileAsync } from "../../store/slices/userSlice";
import { RawTaskData } from "../../types/task";

export default function CreateTaskScreen() {
  const navigation = useNavigation<CreateTaskTabNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { profile } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchProfileAsync());
  }, []);

  useEffect(() => {
    console.log(profile, "profile");
  }, [profile]);

  const handleCreateTask = async (data: TaskFormData) => {
    if (!data.title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    try {
      setLoading(true);

      const taskData: RawTaskData = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        time: data.time,
        status: data.status,
        priority: data.priority,
        category:
          typeof data.category === "string"
            ? {
                name: data.category,
                color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              }
            : data.category,
      };

      await dispatch(addTaskAsync(taskData));
      await dispatch(fetchTasksAsync());
      navigation.goBack();
    } catch (error) {
      console.error("Error creating task:", error);
      Alert.alert(
        "Error",
        "Failed to create task. The task will be saved locally and synced when online."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (category: Category) => {
    try {
      const response = await axios.post(
        `${API_URL}/categories`,
        { name: category.name },
        {
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
          },
        }
      );

      // Refresh profile to get updated categories
      dispatch(fetchProfileAsync());

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to create category"
        );
      } else {
        Alert.alert("Error", "Failed to create category. Please try again.");
      }
      throw error;
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      console.log(categoryId, "categoryId");
      await axios.delete(`${API_URL}/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      });

      // Refresh profile to get updated categories
      dispatch(fetchProfileAsync());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to delete category"
        );
      } else {
        Alert.alert("Error", "Failed to delete category. Please try again.");
      }
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Task</Text>
      </View>
      <TaskForm
        key={Date.now()}
        mode="create"
        onSubmit={handleCreateTask}
        disabled={loading}
        profile={profile}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },
});
