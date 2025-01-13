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
import { fetchTasksAsync } from "../../store/slices/taskSlice";
import { AppDispatch, RootState } from "../../store";
import { CreateTaskTabNavigationProp } from "../../types/navigation";
import { fetchProfileAsync } from "../../store/slices/userSlice";

export default function CreateTaskScreen() {
  const navigation = useNavigation<CreateTaskTabNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { profile } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchProfileAsync());
  }, []);

  const handleCreateTask = async (data: TaskFormData) => {
    if (!data.title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    try {
      setLoading(true);
      console.log("Creating task with data:", data); // Debug log

      const taskData = {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        category: data.category,
        dueDate: data.dueDate.toISOString(),
        time: data.time,
      };

      await axios.post(`${API_URL}/tasks`, taskData, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      });

      dispatch(fetchTasksAsync());
      navigation.goBack();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to create task"
        );
      } else {
        Alert.alert("Error", "Failed to create task. Please try again.");
      }
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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="close" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Task</Text>
        </View>

        <TaskForm
          mode="create"
          onSubmit={handleCreateTask}
          onCancel={() => navigation.goBack()}
          disabled={loading}
          profile={profile}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </View>
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
