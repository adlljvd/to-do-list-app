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
      title: "Project Review : To Do List App",
      description:
        "All codes backend and frontend for the To Do List App should be reviewed by the team before launch.",
      time: "02:30 PM - 03:45 PM",
      date: { day: 20, month: "May", year: 2020 },
      status: "pending",
      priority: "high",
      category: { name: "Work", color: "#FF5252" },
      createdAt: "2025-01-08T09:00:00Z",
      updatedAt: "2025-01-10T01:30:00Z",
    },
    {
      id: 2,
      title: "Meeting with Instructor",
      description:
        "Weekly sync up meeting with buddys. Discuss about project progress.",
      time: "10:30 AM - 11:00 AM",
      date: { day: 20, month: "June", year: 2020 },
      status: "completed",
      priority: "medium",
      category: { name: "Meeting", color: "#2196F3" },
      createdAt: "2025-01-09T14:00:00Z",
      updatedAt: "2025-01-09T14:00:00Z",
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

  const handleToggleTaskStatus = (taskId: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
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

  const renderPlannedView = () => {
    const currentDate = new Date();
    const daysToShow = [15, 20, 24, 25];

    return (
      <View style={styles.plannedContainer}>
        <View style={styles.calendarHeader}>
          <View style={styles.monthSelector}>
            <TouchableOpacity style={styles.monthArrow}>
              <Ionicons name="chevron-back" size={24} color="#666666" />
            </TouchableOpacity>
            <Text style={styles.currentMonth}>May 2020</Text>
            <TouchableOpacity style={styles.monthArrow}>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daysScroll}
          >
            {daysToShow.map((day) => {
              const isToday = day === 20;
              const date = new Date(2020, 4, day); // May is 4 (0-based)
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
              });

              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayCell, isToday && styles.todayCell]}
                >
                  <Text style={[styles.dayNumber, isToday && styles.todayText]}>
                    {day}
                  </Text>
                  <Text style={[styles.dayName, isToday && styles.todayText]}>
                    {dayName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView style={styles.plannedTasksList}>
          {/* Pending Tasks */}
          {tasks
            .filter((task) => task.status === "pending")
            .map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.plannedTaskItem}
                onPress={() => navigation.navigate("TaskDetail", { task })}
              >
                <View style={styles.taskTimeRow}>
                  <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={14} color="#666666" />
                    <Text style={styles.plannedTaskTimeText}>{task.time}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.taskStatusButton}
                    onPress={() => handleToggleTaskStatus(task.id)}
                  >
                    <View style={styles.statusDot} />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.taskTitle, { marginBottom: 8 }]}>
                  {task.title}
                </Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
              </TouchableOpacity>
            ))}

          {/* Completed Section */}
          {tasks.some((task) => task.status === "completed") && (
            <View style={styles.completedSection}>
              <Text style={styles.sectionTitle}>Completed</Text>
              {tasks
                .filter((task) => task.status === "completed")
                .map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    style={[styles.plannedTaskItem, styles.completedTask]}
                    onPress={() => navigation.navigate("TaskDetail", { task })}
                  >
                    <View style={styles.taskTimeRow}>
                      <View style={styles.timeContainer}>
                        <Ionicons
                          name="time-outline"
                          size={14}
                          color="#666666"
                        />
                        <Text
                          style={[
                            styles.plannedTaskTimeText,
                            styles.completedText,
                          ]}
                        >
                          {task.time}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.taskStatusButton}
                        onPress={() => handleToggleTaskStatus(task.id)}
                      >
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color="#6B4EFF"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.taskTitle, styles.completedText]}>
                      {task.title}
                    </Text>
                    <Text
                      style={[styles.taskDescription, styles.completedText]}
                    >
                      {task.description}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {renderHeader()}
      {renderTabs()}
      {activeTab === "planned" ? renderPlannedView() : renderTasks()}
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
  filterContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  filterButtonActive: {
    backgroundColor: "#6B4EFF",
  },
  filterButtonText: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "600",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  dayText: {
    fontSize: 12,
    color: "#666666",
    width: 32,
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  dateCell: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  hasTaskCell: {
    backgroundColor: "#F0EDFF",
  },
  dateCellText: {
    fontSize: 14,
    color: "#1A1A1A",
  },
  todayCellText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  hasTaskCellText: {
    color: "#6B4EFF",
    fontWeight: "600",
  },
  taskIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#6B4EFF",
    position: "absolute",
    bottom: 4,
  },
  plannedTaskMeta: {
    flexDirection: "row",
    gap: 8,
  },
  plannedContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  calendarHeader: {
    marginBottom: 24,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  monthArrow: {
    padding: 8,
  },
  currentMonth: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  daysScroll: {
    flexDirection: "row",
  },
  dayCell: {
    width: 48,
    height: 64,
    marginRight: 12,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  todayCell: {
    backgroundColor: "#6B4EFF",
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  dayName: {
    fontSize: 12,
    color: "#666666",
  },
  todayText: {
    color: "#FFFFFF",
  },
  plannedTasksList: {
    flex: 1,
  },
  plannedTaskContent: {
    gap: 8,
  },
  plannedTaskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  plannedTaskTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  completedSection: {
    marginTop: 24,
  },
  plannedTaskItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  completedTask: {
    opacity: 0.7,
  },
  taskTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  plannedTaskTimeText: {
    fontSize: 12,
    color: "#666666",
  },
  taskStatusButton: {
    padding: 4,
  },
  statusDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6B4EFF",
  },
  taskDescription: {
    fontSize: 14,
    color: "#1A1A1A",
    lineHeight: 20,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#666666",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 16,
    paddingHorizontal: 24,
  },
});
