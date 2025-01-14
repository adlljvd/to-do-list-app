import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "../../components/TaskForm";
import { AMPM, TaskFormData } from "../../components/TaskForm/types";
import { API_URL } from "../../config/api";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { AppDispatch, RootState } from "../../store";
import { fetchTasksAsync } from "../../store/slices/taskSlice";
import { fetchProfileAsync } from "../../store/slices/userSlice";
import { EditTaskScreenNavigationProp } from "../../types/navigation";

interface EditTaskParams {
  taskId: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  category: string;
  dueDate: string;
  time: string;
}

export default function EditTaskScreen() {
  const navigation = useNavigation<EditTaskScreenNavigationProp>();
  const route = useRoute();
  const params = route.params as EditTaskParams;
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProfileAsync());
  }, []);

  const handleAddCategory = async (category: { name: string }) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.post(
        `${API_URL}/categories`,
        { name: category.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      const token = await SecureStore.getItemAsync("token");
      await axios.delete(`${API_URL}/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const handleSave = async (formData: TaskFormData) => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.put(
        `${API_URL}/tasks/${params.taskId}`,
        {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          category: formData.category,
          dueDate: formData.dueDate,
          time: formData.time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.data, "<<< ini respones");
      await dispatch(fetchTasksAsync());

      navigation.reset({
        index: 1,
        routes: [
          { name: "MainTabs" },
          {
            name: "TaskDetail",
            params: { task: response.data.data },
          },
        ],
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to update task"
        );
      } else {
        Alert.alert("Error", "Failed to update task. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const parseDueDate = (dateString: string) => {
    try {
      console.log("Input date string:", dateString);

      const [year, month, day] = dateString.split("-");
      const monthMap: { [key: string]: number } = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };

      const numericYear = parseInt(year);
      const numericMonth = monthMap[month];
      const numericDay = parseInt(day);

      console.log("Parsed values:", { numericYear, numericMonth, numericDay });
      const date = new Date(numericYear, numericMonth, numericDay);
      console.log("Resulting date:", date);

      return isNaN(date.getTime()) ? new Date() : date;
    } catch (error) {
      console.error("Error parsing date:", error);
      return new Date();
    }
  };

  const initialData: TaskFormData = {
    title: params.title,
    description: params.description,
    dueDate: parseDueDate(params.dueDate),
    time: params.time,
    status: params.status,
    priority: params.priority,
    category: params.category,
  };

  // Debug log
  console.log("Params received:", params);
  console.log("Initial data:", initialData);

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
          <Text style={styles.headerTitle}>Edit Task</Text>
        </View>

        <TaskForm
          mode="edit"
          initialData={initialData}
          onSubmit={handleSave}
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
  },
  placeholder: {
    width: 40,
  },
});
