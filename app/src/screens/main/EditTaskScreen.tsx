import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import TaskForm from "../../components/TaskForm";
import { TaskFormData } from "../../components/TaskForm/types";

interface EditTaskParams {
  taskId?: number;
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  category?: string;
  date?: Date;
}

export default function EditTaskScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as EditTaskParams;

  const handleSave = (formData: TaskFormData) => {
    // TODO: Implement save functionality
    console.log("Saving task:", formData);
    navigation.goBack();
  };

  const initialData = {
    title: params?.title,
    description: params?.description,
    date: params?.date,
    status: params?.status,
    priority: params?.priority,
    category: {
      name: params?.category || "Work",
      color: getCategoryColor(params?.category || "Work"),
    },
  };

  function getCategoryColor(categoryName: string) {
    const categories = [
      { name: "Work", color: "#FF5252" },
      { name: "Meeting", color: "#2196F3" },
      { name: "Personal", color: "#4CAF50" },
      { name: "Shopping", color: "#9C27B0" },
    ];
    const category = categories.find((c) => c.name === categoryName);
    return category?.color || "#FF5252";
  }

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
          <View style={styles.placeholder} />
        </View>

        <TaskForm
          mode="edit"
          initialData={initialData}
          onSubmit={handleSave}
          onCancel={() => navigation.goBack()}
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
