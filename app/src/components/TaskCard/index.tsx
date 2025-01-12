import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { Task } from "../../types/task";
import { TaskListScreenNavigationProp } from "../../types/navigation";

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string, taskTitle: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const navigation = useNavigation<TaskListScreenNavigationProp>();

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

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => onDelete(task.id, task.title)}
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

  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX)
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
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
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
                      backgroundColor: `${getStatusColor(task.status)}20`,
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
  );
};

export default TaskCard;
