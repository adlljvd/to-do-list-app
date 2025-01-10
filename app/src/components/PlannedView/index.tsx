import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

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
}

interface PlannedViewProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
  onToggleStatus: (taskId: number) => void;
}

const PlannedView: React.FC<PlannedViewProps> = ({
  tasks,
  onTaskPress,
  onToggleStatus,
}) => {
  const navigation = useNavigation();
  const currentDate = new Date();
  const daysToShow = [15, 20, 24, 25];

  const renderMonthSelector = () => (
    <View style={styles.monthSelector}>
      <TouchableOpacity style={styles.monthArrow}>
        <Ionicons name="chevron-back" size={24} color="#666666" />
      </TouchableOpacity>
      <Text style={styles.currentMonth}>May 2020</Text>
      <TouchableOpacity style={styles.monthArrow}>
        <Ionicons name="chevron-forward" size={24} color="#666666" />
      </TouchableOpacity>
    </View>
  );

  const renderDayCell = (day: number) => {
    const isToday = day === 20;
    const date = new Date(2020, 4, day);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

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
  };

  const renderDaysScroll = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.daysScroll}
    >
      {daysToShow.map(renderDayCell)}
    </ScrollView>
  );

  const renderTaskItem = (task: Task) => (
    <TouchableOpacity
      key={task.id}
      style={[
        styles.plannedTaskItem,
        task.status === "completed" && styles.completedTask,
      ]}
      onPress={() => navigation.navigate("TaskDetail", { task })}
    >
      <View style={styles.taskTimeRow}>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={14} color="#666666" />
          <Text
            style={[
              styles.plannedTaskTimeText,
              task.status === "completed" && styles.completedText,
            ]}
          >
            {task.time}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.taskStatusButton}
          onPress={() => onToggleStatus(task.id)}
        >
          {task.status === "completed" ? (
            <Ionicons name="checkmark-circle" size={24} color="#6B4EFF" />
          ) : (
            <View style={styles.statusDot} />
          )}
        </TouchableOpacity>
      </View>
      <Text
        style={[
          styles.taskTitle,
          { marginBottom: 8 },
          task.status === "completed" && styles.completedText,
        ]}
      >
        {task.title}
      </Text>
      <Text
        style={[
          styles.taskDescription,
          task.status === "completed" && styles.completedText,
        ]}
      >
        {task.description}
      </Text>
    </TouchableOpacity>
  );

  const renderPendingTasks = () => (
    <>{tasks.filter((task) => task.status === "pending").map(renderTaskItem)}</>
  );

  const renderCompletedTasks = () => {
    const completedTasks = tasks.filter((task) => task.status === "completed");
    if (completedTasks.length === 0) return null;

    return (
      <View style={styles.completedSection}>
        <Text style={styles.sectionTitle}>Completed</Text>
        {completedTasks.map(renderTaskItem)}
      </View>
    );
  };

  return (
    <View style={styles.plannedContainer}>
      <View style={styles.calendarHeader}>
        {renderMonthSelector()}
        {renderDaysScroll()}
      </View>
      <ScrollView style={styles.plannedTasksList}>
        {renderPendingTasks()}
        {renderCompletedTasks()}
      </ScrollView>
    </View>
  );
};

export default PlannedView;
