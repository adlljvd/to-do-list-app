import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";
import { TaskFormProps, TaskFormData, TaskStatus, TaskPriority } from "./types";

export default function TaskForm({
  mode,
  initialData,
  onSubmit,
  disabled,
  profile,
  onCancel,
  submitLabel = mode === "create" ? "Create" : "Save",
}: TaskFormProps) {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return {
      hours: formattedHours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      ampm,
    };
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate(new Date());
    const { hours, minutes, ampm } = getCurrentTime();
    setHours(hours);
    setMinutes(minutes);
    setAmPm(ampm);
    setSelectedPriority("low");
    setSelectedStatus("pending");
    setSelectedCategory("");
  };

  useEffect(() => {
    resetForm();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [ampm, setAmPm] = useState<"AM" | "PM">("AM");
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority>("low");
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("pending");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (profile?.categories && profile.categories.length > 0) {
      setSelectedCategory(profile.categories[0].name);
    }
  }, [profile]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDueDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = () => {
    // Validate hours
    let hrs = parseInt(hours);
    if (isNaN(hrs) || hrs < 1) hrs = 1;
    if (hrs > 12) hrs = 12;
    setHours(hrs.toString().padStart(2, "0"));

    // Validate minutes
    let mins = parseInt(minutes);
    if (isNaN(mins) || mins < 0) mins = 0;
    if (mins > 59) mins = 59;
    setMinutes(mins.toString().padStart(2, "0"));

    setShowTimeModal(false);
  };

  const getTimeString = () => {
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleSubmit = () => {
    const formData: TaskFormData = {
      title,
      description,
      dueDate,
      time: getTimeString(),
      status: selectedStatus,
      priority: selectedPriority,
      category: selectedCategory,
    };
    console.log("Submitting form data:", formData);
    onSubmit(formData);
    resetForm();
  };

  return (
    <ScrollView style={styles.content}>
      <TextInput
        style={styles.titleInput}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#666666"
        editable={!disabled}
      />

      <TextInput
        style={styles.descriptionInput}
        placeholder="Add description"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor="#666666"
        editable={!disabled}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date & Time</Text>
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}
            disabled={disabled}
          >
            <Ionicons name="calendar-outline" size={20} color="#666666" />
            <Text style={styles.dateTimeText}>
              {dueDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowTimeModal(true)}
            disabled={disabled}
          >
            <Ionicons name="time-outline" size={20} color="#666666" />
            <Text style={styles.dateTimeText}>{getTimeString()}</Text>
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
              disabled={disabled}
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
              disabled={disabled}
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
          {profile?.categories?.map((category) => (
            <TouchableOpacity
              key={category._id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    selectedCategory === category.name
                      ? `${category.color}15`
                      : "transparent",
                  borderColor: category.color,
                },
              ]}
              onPress={() => setSelectedCategory(category.name)}
              disabled={disabled}
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

      {/* Date Picker Modal */}
      <Modal
        isVisible={showDatePicker}
        onBackdropPress={() => setShowDatePicker(false)}
        style={styles.modal}
        backdropOpacity={0.5}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Set Date</Text>
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              value={dueDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setDueDate(selectedDate);
                }
              }}
              style={{ width: Platform.OS === "ios" ? "100%" : "auto" }}
              textColor="#1A1A1A"
              themeVariant="light"
            />
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => handleDateChange(null, dueDate)}
            >
              <Text style={[styles.modalButtonText, styles.confirmButtonText]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        isVisible={showTimeModal}
        onBackdropPress={() => setShowTimeModal(false)}
        style={styles.modal}
        backdropOpacity={0.5}
        avoidKeyboard={true}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Time</Text>
            <View style={styles.timeInputContainer}>
              <View style={styles.timeInput}>
                <TextInput
                  style={styles.timeInputField}
                  value={hours}
                  onChangeText={(text) => {
                    const nums = text.replace(/[^0-9]/g, "");
                    if (nums.length <= 2) setHours(nums);
                  }}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="HH"
                />
                <Text style={styles.timeInputSeparator}>:</Text>
                <TextInput
                  style={styles.timeInputField}
                  value={minutes}
                  onChangeText={(text) => {
                    const nums = text.replace(/[^0-9]/g, "");
                    if (nums.length <= 2) setMinutes(nums);
                  }}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="MM"
                />
                <View style={styles.ampmContainer}>
                  <TouchableOpacity
                    style={[
                      styles.ampmButton,
                      ampm === "AM" && styles.ampmButtonSelected,
                    ]}
                    onPress={() => setAmPm("AM")}
                  >
                    <Text
                      style={[
                        styles.ampmButtonText,
                        ampm === "AM" && styles.ampmButtonTextSelected,
                      ]}
                    >
                      AM
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.ampmButton,
                      ampm === "PM" && styles.ampmButtonSelected,
                    ]}
                    onPress={() => setAmPm("PM")}
                  >
                    <Text
                      style={[
                        styles.ampmButtonText,
                        ampm === "PM" && styles.ampmButtonTextSelected,
                      ]}
                    >
                      PM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowTimeModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleTimeChange}
              >
                <Text
                  style={[styles.modalButtonText, styles.confirmButtonText]}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {mode === "create" && (
        <TouchableOpacity
          style={[styles.submitButton, disabled && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={disabled || !title.trim()}
        >
          <Text
            style={[
              styles.submitButtonText,
              disabled && styles.submitButtonTextDisabled,
            ]}
          >
            {disabled ? "Creating..." : submitLabel}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
