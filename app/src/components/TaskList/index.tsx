import React from "react";
import { View, Text, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TaskCard from "../TaskCard";
import styles from "./styles";

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

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: number, taskTitle: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
  return (
    <ScrollView style={styles.tasksContainer}>
      {tasks.map((task, index) => (
        <View key={task.id} style={styles.monthSection}>
          {index === 0 || tasks[index - 1].date.month !== task.date.month ? (
            <Text style={styles.monthTitle}>
              {`${task.date.month} ${task.date.year}`}
            </Text>
          ) : null}
          <GestureHandlerRootView>
            <TaskCard task={task} onDelete={onDeleteTask} />
          </GestureHandlerRootView>
        </View>
      ))}
    </ScrollView>
  );
};

export default TaskList;
