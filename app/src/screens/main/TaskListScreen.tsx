import React, { useState } from "react";
import { StyleSheet, SafeAreaView, StatusBar, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserHeader from "../../components/UserHeader";
import TabNavigation from "../../components/TabNavigation";
import PlannedView from "../../components/PlannedView";
import TaskList from "../../components/TaskList";

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

const mockTasks: Task[] = [
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
];

const tabs = [
  { id: "my_day", name: "My Day" },
  { id: "important", name: "Important" },
  { id: "planned", name: "Planned" },
];

export default function TaskListScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<string>("my_day");
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <UserHeader userName="Aiman Reduan" />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === "planned" ? (
        <PlannedView
          tasks={tasks}
          onTaskPress={(task) => navigation.navigate("TaskDetail", { task })}
          onToggleStatus={handleToggleTaskStatus}
        />
      ) : (
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
