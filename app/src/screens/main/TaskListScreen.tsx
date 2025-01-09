import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  Alert,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface Task {
  id: number;
  title: string;
  description: string;
  time: string;
  date: {
    day: number;
    month: string;
    year: number;
  };
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  category: {
    name: string;
    color: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function TaskListScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<string>("my_day");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Vistro Project Handover",
      description:
        "Complete the handover documentation and transfer all project assets to the client. Include technical documentation and user guides.",
      time: "11:30 AM",
      date: { day: 15, month: "May", year: 2020 },
      status: "in_progress",
      priority: "high",
      category: { name: "Work", color: "#FF5252" },
      createdAt: "2025-01-08T09:00:00Z",
      updatedAt: "2025-01-10T01:30:00Z",
    },
    {
      id: 2,
      title: "Team Discussion",
      description:
        "Weekly team sync to discuss project progress, blockers, and upcoming milestones. Prepare sprint review presentation.",
      time: "12:30 PM - 01:30 PM",
      date: { day: 18, month: "May", year: 2020 },
      status: "pending",
      priority: "medium",
      category: { name: "Meeting", color: "#2196F3" },
      createdAt: "2025-01-09T14:00:00Z",
      updatedAt: "2025-01-09T14:00:00Z",
    },
    {
      id: 3,
      title: "Dribbble Shot Upload",
      description:
        "Create and upload new design shots showcasing recent UI/UX work. Include process shots and design rationale.",
      time: "03:00 PM - 04:00 PM",
      date: { day: 10, month: "June", year: 2020 },
      status: "completed",
      priority: "low",
      category: { name: "Design", color: "#9C27B0" },
      createdAt: "2025-01-07T11:00:00Z",
      updatedAt: "2025-01-09T16:45:00Z",
    },
  ]);

  const handleDeleteTask = (taskId: number, taskTitle: string) => {
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
          onPress: () => {
            setTasks((currentTasks) =>
              currentTasks.filter((task) => task.id !== taskId)
            );
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const tabs = [
    { id: "my_day", name: "My Day" },
    { id: "important", name: "Important" },
    { id: "planned", name: "Planned" },
  ];

  const mockTasks: Task[] = [
    {
      id: 1,
      title: "Vistro Project Handover",
      time: "11:30 AM",
      date: { day: 15, month: "May", year: 2020 },
      status: "in_progress",
      priority: "high",
      category: { name: "Work", color: "#FF5252" },
    },
    {
      id: 2,
      title: "Team Discussion",
      time: "12:30 PM - 01:30 PM",
      date: { day: 18, month: "May", year: 2020 },
      status: "pending",
      priority: "medium",
      category: { name: "Meeting", color: "#2196F3" },
    },
    {
      id: 3,
      title: "Dribbble Shot Upload",
      time: "03:00 PM - 04:00 PM",
      date: { day: 10, month: "June", year: 2020 },
      status: "completed",
      priority: "low",
      category: { name: "Design", color: "#9C27B0" },
    },
  ];

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

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.userName}>Aiman Reduan</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://ui-avatars.com/api/?name=AR&background=6B4EFF&color=fff",
          }}
          style={styles.avatar}
        />
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <View style={styles.tabsContent}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    taskId: number,
    taskTitle: string
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => handleDeleteTask(taskId, taskTitle)}
      >
        <Animated.View
          style={[
            styles.deleteActionContent,
            {
              transform: [{ scale }],
            },
          ]}
        >
          <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
          <Text style={styles.deleteActionText}>Delete</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderTasks = () => (
    <ScrollView style={styles.tasksContainer}>
      {tasks.map((task, index) => (
        <View key={task.id} style={styles.monthSection}>
          {index === 0 || tasks[index - 1].date.month !== task.date.month ? (
            <Text style={styles.monthTitle}>
              {`${task.date.month} ${task.date.year}`}
            </Text>
          ) : null}
          <GestureHandlerRootView>
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, task.id, task.title)
              }
              rightThreshold={40}
            >
              <View style={styles.taskCard}>
                <TouchableOpacity
                  style={styles.taskCardContent}
                  onPress={() => navigation.navigate("TaskDetail", { task })}
                >
                  <View style={styles.taskDateContainer}>
                    <Text style={styles.taskDay}>{task.date.day}</Text>
                    <Text style={styles.taskDayName}>
                      {new Date(
                        task.date.year,
                        [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ].indexOf(task.date.month),
                        task.date.day
                      ).toLocaleDateString("en-US", { weekday: "short" })}
                    </Text>
                  </View>
                  <View style={styles.taskContent}>
                    <View style={styles.taskHeader}>
                      <View style={styles.titleAndCategory}>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <View
                          style={[
                            styles.categoryBadge,
                            { backgroundColor: `${task.category.color}15` },
                          ]}
                        >
                          <Text
                            style={[
                              styles.categoryText,
                              { color: task.category.color },
                            ]}
                          >
                            {task.category.name}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.indicators}>
                        <View
                          style={[
                            styles.priorityIndicator,
                            {
                              backgroundColor: getPriorityColor(task.priority),
                            },
                          ]}
                        />
                        <View
                          style={[
                            styles.statusBadge,
                            {
                              backgroundColor: `${getStatusColor(
                                task.status
                              )}20`,
                            },
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
                    </View>
                    <View style={styles.taskTimeContainer}>
                      <Ionicons name="time-outline" size={14} color="#666666" />
                      <Text style={styles.taskTime}>{task.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </Swipeable>
          </GestureHandlerRootView>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {renderHeader()}
      {renderTabs()}
      {renderTasks()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 20 : 40,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    color: "#666666",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  userName: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#1A1A1A",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  tabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  tabsContent: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#6B4EFF",
  },
  tabText: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  monthSection: {
    marginBottom: 24,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  taskCard: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 16,
    marginBottom: 5,
  },
  taskCardContent: {
    flex: 1,
    flexDirection: "row",
  },
  taskDateContainer: {
    backgroundColor: "#F0EDFF",
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
    minWidth: 48,
  },
  taskDay: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B4EFF",
    marginBottom: 1,
    marginTop: 8,
  },
  taskDayName: {
    fontSize: 12,
    color: "#6B4EFF",
    textTransform: "uppercase",
  },
  taskContent: {
    flex: 1,
    marginLeft: 16,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  taskTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  taskTime: {
    fontSize: 12,
    color: "#666666",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  taskHeader: {
    flexDirection: "column",
    gap: 8,
    marginBottom: 8,
  },
  indicators: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  titleAndCategory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
  },
  taskFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteAction: {
    backgroundColor: "#FF5252",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: 100,
    height: "95%",
  },
  deleteActionContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  deleteActionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
