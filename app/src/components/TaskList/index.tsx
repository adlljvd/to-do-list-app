import React from "react";
import { View, Text, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Task } from "../../types/task";
import TaskCard from "../TaskCard";
import styles from "./styles";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string, taskTitle: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
  return (
    <ScrollView
      style={styles.tasksContainer}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
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
