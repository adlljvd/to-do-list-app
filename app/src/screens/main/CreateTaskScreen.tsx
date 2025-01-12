import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TaskForm from "../../components/TaskForm";
import { TaskFormData } from "../../components/TaskForm/types";

export default function CreateTaskScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: null,
    time: null,
    status: "pending",
    priority: "low",
    category: "",
  });

  const handleCreateTask = (data: TaskFormData) => {
    // TODO: Implement task creation logic
    console.log("Creating task:", data);
    navigation.goBack();
  };

  const handleFormChange = (data: TaskFormData) => {
    setFormData(data);
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
          <TouchableOpacity
            onPress={() => handleCreateTask(formData)}
            style={[
              styles.createButton,
              !formData.title && styles.createButtonDisabled,
            ]}
            disabled={!formData.title}
          >
            <Text
              style={[
                styles.createButtonText,
                !formData.title && styles.createButtonTextDisabled,
              ]}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>

        <TaskForm
          mode="create"
          onSubmit={handleCreateTask}
          onCancel={() => navigation.goBack()}
          onChange={handleFormChange}
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
  },
  createButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#6B4EFF",
  },
  createButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  createButtonTextDisabled: {
    color: "#999999",
  },
});
