import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateTaskScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<
    "low" | "medium" | "high"
  >("medium");
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Work",
    color: "#FF5252",
  });
  const [selectedStatus, setSelectedStatus] = useState<
    "pending" | "in progress"
  >("pending");

  const categories = [
    { name: "Work", color: "#FF5252" },
    { name: "Meeting", color: "#2196F3" },
    { name: "Personal", color: "#4CAF50" },
    { name: "Shopping", color: "#9C27B0" },
  ];

  const handleCreateTask = () => {
    // TODO: Implement task creation logic
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="close" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Task</Text>
          <TouchableOpacity
            onPress={handleCreateTask}
            style={[styles.createButton, !title && styles.createButtonDisabled]}
            disabled={!title}
          >
            <Text
              style={[
                styles.createButtonText,
                !title && styles.createButtonTextDisabled,
              ]}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <TextInput
            style={styles.titleInput}
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#666666"
          />

          <TextInput
            style={styles.descriptionInput}
            placeholder="Add description"
            value={description}
            onChangeText={setDescription}
            multiline
            placeholderTextColor="#666666"
          />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date & Time</Text>
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={20} color="#666666" />
                <Text style={styles.dateTimeText}>
                  {date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons name="time-outline" size={20} color="#666666" />
                <Text style={styles.dateTimeText}>
                  {date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status</Text>
            <View style={styles.statusContainer}>
              {["pending", "in progress"].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusButton,
                    selectedStatus === status && styles.statusButtonSelected,
                  ]}
                  onPress={() =>
                    setSelectedStatus(status as "pending" | "in progress")
                  }
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      selectedStatus === status &&
                        styles.statusButtonTextSelected,
                    ]}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Priority</Text>
            <View style={styles.priorityContainer}>
              {["low", "medium", "high"].map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityButton,
                    selectedPriority === priority &&
                      styles.priorityButtonSelected,
                  ]}
                  onPress={() =>
                    setSelectedPriority(priority as "low" | "medium" | "high")
                  }
                >
                  <Text
                    style={[
                      styles.priorityButtonText,
                      selectedPriority === priority &&
                        styles.priorityButtonTextSelected,
                    ]}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.name}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor:
                        selectedCategory.name === category.name
                          ? `${category.color}15`
                          : "transparent",
                      borderColor: category.color,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      { color: category.color },
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        <Modal
          isVisible={showDatePicker || showTimePicker}
          onBackdropPress={() => {
            setShowDatePicker(false);
            setShowTimePicker(false);
          }}
          style={styles.modal}
          backdropOpacity={0.5}
        >
          <View style={styles.modalContent}>
            <View style={styles.pickerContainer}>
              {Platform.OS === "ios" ? (
                <DateTimePicker
                  value={date}
                  mode={showDatePicker ? "date" : "time"}
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      if (showDatePicker) {
                        setDate(selectedDate);
                      } else {
                        const newDate = new Date(date);
                        newDate.setHours(selectedDate.getHours());
                        newDate.setMinutes(selectedDate.getMinutes());
                        setDate(newDate);
                      }
                    }
                  }}
                  textColor="#000000"
                  themeVariant="light"
                />
              ) : (
                <DateTimePicker
                  value={date}
                  mode={showDatePicker ? "date" : "time"}
                  display="default"
                  onChange={(event, selectedDate) => {
                    if (event.type === "set" && selectedDate) {
                      if (showDatePicker) {
                        setDate(selectedDate);
                      } else {
                        const newDate = new Date(date);
                        newDate.setHours(selectedDate.getHours());
                        newDate.setMinutes(selectedDate.getMinutes());
                        setDate(newDate);
                      }
                    }
                    setShowDatePicker(false);
                    setShowTimePicker(false);
                  }}
                />
              )}
            </View>
            {Platform.OS === "ios" && (
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setShowDatePicker(false);
                    setShowTimePicker(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={() => {
                    setShowDatePicker(false);
                    setShowTimePicker(false);
                  }}
                >
                  <Text
                    style={[styles.modalButtonText, styles.confirmButtonText]}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      </View>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  createButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#6B4EFF",
  },
  createButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  createButtonTextDisabled: {
    color: "#999999",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  descriptionInput: {
    fontSize: 16,
    color: "#1A1A1A",
    marginBottom: 24,
    minHeight: 80,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  dateTimeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  dateTimeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
  },
  dateTimeText: {
    fontSize: 14,
    color: "#1A1A1A",
  },
  priorityContainer: {
    flexDirection: "row",
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  priorityButtonSelected: {
    backgroundColor: "#6B4EFF",
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  priorityButtonTextSelected: {
    color: "#FFFFFF",
  },
  categoryContainer: {
    flexDirection: "row",
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  pickerContainer: {
    backgroundColor: "white",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#666666",
  },
  confirmButton: {
    backgroundColor: "#6B4EFF",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "600",
  },
  statusContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  statusButtonSelected: {
    backgroundColor: "#6B4EFF",
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  statusButtonTextSelected: {
    color: "#FFFFFF",
  },
});
