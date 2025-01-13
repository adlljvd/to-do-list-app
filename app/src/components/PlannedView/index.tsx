import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Task } from "../../types/task";
import { TaskListScreenNavigationProp } from "../../types/navigation";

interface PlannedViewProps {
  tasks: Task[];
  onToggleStatus: (taskId: string) => void;
}

const PlannedView: React.FC<PlannedViewProps> = ({ tasks, onToggleStatus }) => {
  const navigation = useNavigation<TaskListScreenNavigationProp>();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [selectedMonth, setSelectedMonth] = useState<Date>(currentDate);

  // Get all available months that have tasks
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    tasks.forEach((task) => {
      if (task.date) {
        const monthKey = `${task.date.year}-${task.date.month}`;
        months.add(monthKey);
      }
    });
    return Array.from(months)
      .map((monthKey) => {
        const [year, month] = monthKey.split("-");
        return {
          date: new Date(
            parseInt(year),
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
            ].indexOf(month),
            1
          ),
          monthKey,
        };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [tasks]);

  // Get current month index from available months
  const currentMonthIndex = useMemo(() => {
    const selectedMonthKey = `${selectedMonth.getFullYear()}-${
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
      ][selectedMonth.getMonth()]
    }`;
    return availableMonths.findIndex((m) => m.monthKey === selectedMonthKey);
  }, [selectedMonth, availableMonths]);

  const renderMonthSelector = () => (
    <View style={styles.monthSelector}>
      <TouchableOpacity
        style={styles.monthArrow}
        disabled={currentMonthIndex <= 0}
        onPress={() => {
          if (currentMonthIndex > 0) {
            setSelectedMonth(availableMonths[currentMonthIndex - 1].date);
          }
        }}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={currentMonthIndex <= 0 ? "#CCCCCC" : "#666666"}
        />
      </TouchableOpacity>
      <Text style={styles.currentMonth}>
        {selectedMonth.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </Text>
      <TouchableOpacity
        style={styles.monthArrow}
        disabled={currentMonthIndex >= availableMonths.length - 1}
        onPress={() => {
          if (currentMonthIndex < availableMonths.length - 1) {
            setSelectedMonth(availableMonths[currentMonthIndex + 1].date);
          }
        }}
      >
        <Ionicons
          name="chevron-forward"
          size={24}
          color={
            currentMonthIndex >= availableMonths.length - 1
              ? "#CCCCCC"
              : "#666666"
          }
        />
      </TouchableOpacity>
    </View>
  );

  // Get all days in current month that have tasks
  const daysWithTasks = useMemo(() => {
    const days = new Set<number>(); // Specify type as number
    tasks.forEach((task) => {
      if (task.date) {
        const taskDate = new Date(
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
        );
        if (
          taskDate.getMonth() === selectedMonth.getMonth() &&
          taskDate.getFullYear() === selectedMonth.getFullYear()
        ) {
          days.add(taskDate.getDate());
        }
      }
    });
    return Array.from(days).sort((a, b) => a - b); // Will return number[]
  }, [tasks, selectedMonth]);

  const renderDayCell = (day: number) => {
    const date = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      day
    );
    const isSelected =
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear();
    const isToday =
      currentDate.getDate() === day &&
      currentDate.getMonth() === date.getMonth() &&
      currentDate.getFullYear() === date.getFullYear();

    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.dayCell,
          isToday && styles.todayCell,
          isSelected && styles.selectedCell,
        ]}
        onPress={() => setSelectedDate(date)}
      >
        <Text
          style={[
            styles.dayNumber,
            isToday && styles.todayText,
            isSelected && styles.selectedText,
          ]}
        >
          {day}
        </Text>
        <Text
          style={[
            styles.dayName,
            isToday && styles.todayText,
            isSelected && styles.selectedText,
          ]}
        >
          {date.toLocaleDateString("en-US", { weekday: "short" })}
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
      {daysWithTasks.map(renderDayCell)}
    </ScrollView>
  );

  // Filter tasks for selected date
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.date) return false;
      const taskDate = new Date(
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
      );
      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [tasks, selectedDate]);

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
    <>
      {filteredTasks
        .filter(
          (task) => task.status === "pending" || task.status === "in_progress"
        )
        .map(renderTaskItem)}
    </>
  );

  const renderCompletedTasks = () => {
    const completedTasks = filteredTasks.filter(
      (task) => task.status === "completed"
    );
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
      <ScrollView
        style={styles.plannedTasksList}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {renderPendingTasks()}
        {renderCompletedTasks()}
      </ScrollView>
    </View>
  );
};

export default PlannedView;
