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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface Task {
  id: number;
  title: string;
  time: string;
  date: {
    day: number;
    month: string;
    year: number;
  };
}

export default function TaskListScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<string>("my_day");

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
    },
    {
      id: 2,
      title: "Team Discussion",
      time: "12:30 PM - 01:30 PM",
      date: { day: 18, month: "May", year: 2020 },
    },
    {
      id: 3,
      title: "Dribbble Shot Upload",
      time: "03:00 PM - 04:00 PM",
      date: { day: 10, month: "June", year: 2020 },
    },
  ];

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

  const renderTasks = () => (
    <ScrollView style={styles.tasksContainer}>
      {mockTasks.map((task, index) => (
        <View key={task.id} style={styles.monthSection}>
          {index === 0 ||
          mockTasks[index - 1].date.month !== task.date.month ? (
            <Text style={styles.monthTitle}>
              {`${task.date.month} ${task.date.year}`}
            </Text>
          ) : null}
          <TouchableOpacity style={styles.taskCard}>
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
              <Text style={styles.taskTitle}>{task.title}</Text>
              <View style={styles.taskTimeContainer}>
                <Ionicons name="time-outline" size={14} color="#666666" />
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
    marginBottom: 2,
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
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  taskTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  taskTime: {
    fontSize: 12,
    color: "#666666",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});
