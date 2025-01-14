import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "../../types/task";
import { TaskDetailScreenNavigationProp } from "../../types/navigation";

interface TaskDetailParams {
  task: Task;
}

export default function TaskDetailScreen() {
  const navigation = useNavigation<TaskDetailScreenNavigationProp>();
  const route = useRoute();
  const { task } = route.params as TaskDetailParams;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#4CAF50";
      case "in_progress":
        return "#2196F3";
      default:
        return "#FFA000";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#FF5252";
      case "medium":
        return "#FFA000";
      default:
        return "#4CAF50";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Detail</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("EditTask", {
              taskId: task.id,
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
              category: task.category.name,
              dueDate: `${task.date.year}-${String(task.date.month).padStart(
                2,
                "0"
              )}-${String(task.date.day).padStart(2, "0")}`,
              time: task.time,
            })
          }
        >
          <Ionicons name="create-outline" size={24} color="#6B4EFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <View style={styles.metaContainer}>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: `${task.category.color}15` },
              ]}
            >
              <Text
                style={[styles.categoryText, { color: task.category.color }]}
              >
                {task.category.name}
              </Text>
            </View>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: `${getPriorityColor(task.priority)}15` },
              ]}
            >
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(task.priority) },
                ]}
              />
              <Text
                style={[
                  styles.priorityText,
                  { color: getPriorityColor(task.priority) },
                ]}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
                Priority
              </Text>
            </View>
          </View>
          <Text style={styles.description}>
            {task.description || "No description provided"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor(task.status)}15` },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(task.status) },
              ]}
            >
              {task.status.replace("_", " ").toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <View style={[styles.historyContainer, styles.dateTimeWrapper]}>
            <View style={styles.dateTimeContainer}>
              <View style={styles.dateContainer}>
                <View style={styles.historyIconContainer}>
                  <Ionicons name="calendar-outline" size={20} color="#666666" />
                </View>
                <View>
                  <Text style={styles.historyLabel}>Date</Text>
                  <Text style={styles.dateText}>
                    {`${task.date.day} ${task.date.month} ${task.date.year}`}
                  </Text>
                </View>
              </View>
              <View style={styles.historyDivider} />
              <View style={styles.timeContainer}>
                <View style={styles.historyIconContainer}>
                  <Ionicons name="time-outline" size={20} color="#666666" />
                </View>
                <View>
                  <Text style={styles.historyLabel}>Time</Text>
                  <Text style={styles.timeText}>{task.time}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Task History</Text>
          <View style={styles.historyContainer}>
            <View style={styles.historyItem}>
              <View style={styles.historyIconContainer}>
                <Ionicons name="add-circle-outline" size={20} color="#4CAF50" />
              </View>
              <View>
                <Text style={styles.historyLabel}>Created</Text>
                <Text style={styles.historyDate}>
                  {new Date(task.createdAt).toLocaleString()}
                </Text>
              </View>
            </View>
            <View style={styles.historyDivider} />
            <View style={styles.historyItem}>
              <View style={styles.historyIconContainer}>
                <Ionicons name="pencil-outline" size={20} color="#2196F3" />
              </View>
              <View>
                <Text style={styles.historyLabel}>Last Updated</Text>
                <Text style={styles.historyDate}>
                  {new Date(task.updatedAt).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: Platform.OS === "ios" ? 20 : 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: "row",
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666666",
    marginTop: 16,
    lineHeight: 24,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  dateTimeWrapper: {
    padding: 16,
  },
  dateTimeContainer: {
    gap: 12,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateText: {
    fontSize: 14,
    color: "#1A1A1A",
  },
  timeText: {
    fontSize: 14,
    color: "#1A1A1A",
  },
  historyContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  historyIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  historyLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  historyDate: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  historyDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
});
