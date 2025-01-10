import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";
import {
  TaskFormProps,
  TaskFormData,
  Category,
  TaskStatus,
  TaskPriority,
} from "./types";

const categories: Category[] = [
  { name: "Work", color: "#FF5252" },
  { name: "Meeting", color: "#2196F3" },
  { name: "Personal", color: "#4CAF50" },
  { name: "Shopping", color: "#9C27B0" },
];

export default function TaskForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  submitLabel = mode === "create" ? "Create" : "Save",
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [date, setDate] = useState(initialData?.date || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority>(
    initialData?.priority || "medium"
  );
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(
    initialData?.status || "pending"
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    initialData?.category || categories[0]
  );

  const handleSubmit = () => {
    const formData: TaskFormData = {
      title,
      description,
      date,
      status: selectedStatus,
      priority: selectedPriority,
      category: selectedCategory,
    };
    onSubmit(formData);
  };

  return (
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
          {["pending", "in_progress", "completed"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                selectedStatus === status && styles.statusButtonSelected,
              ]}
              onPress={() => setSelectedStatus(status as TaskStatus)}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  selectedStatus === status && styles.statusButtonTextSelected,
                ]}
              >
                {status.replace("_", " ").charAt(0).toUpperCase() +
                  status.replace("_", " ").slice(1)}
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
                selectedPriority === priority && styles.priorityButtonSelected,
              ]}
              onPress={() => setSelectedPriority(priority as TaskPriority)}
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
                style={[styles.categoryButtonText, { color: category.color }]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
    </ScrollView>
  );
}
