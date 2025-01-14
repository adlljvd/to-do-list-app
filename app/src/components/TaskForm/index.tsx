import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";
import {
  TaskFormProps,
  TaskFormData,
  TaskStatus,
  TaskPriority,
  AMPM,
} from "./types";
import { Category } from "../../types/profile";

export default function TaskForm({
  mode,
  initialData,
  onSubmit,
  disabled,
  profile,
  onAddCategory,
  onDeleteCategory,
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
      ampm: ampm as AMPM,
    };
  };

  const parseInitialTime = () => {
    if (initialData?.time) {
      const [time, period] = initialData.time.split(" ");
      const [hrs, mins] = time.split(":");
      return {
        hours: hrs,
        minutes: mins,
        ampm: period as AMPM,
      };
    }
    return getCurrentTime();
  };

  const initialTime = parseInitialTime();

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [dueDate, setDueDate] = useState(initialData?.dueDate || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [hours, setHours] = useState(initialTime.hours);
  const [minutes, setMinutes] = useState(initialTime.minutes);
  const [ampm, setAmPm] = useState<AMPM>(initialTime.ampm);
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority>(
    initialData?.priority || "low"
  );
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(
    initialData?.status || "pending"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    initialData?.category || ""
  );
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (!initialData && profile?.categories && profile.categories.length > 0) {
      setSelectedCategory(profile.categories[0].name);
    }
  }, [profile, initialData]);

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

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const result = await onAddCategory?.({
        name: newCategory.trim(),
      });

      if (result) {
        setNewCategory("");
        setSelectedCategory(result.name);
        setShowCategoryModal(false);
      }
    } catch (error) {
      console.error("Error in handleAddCategory:", error);
    }
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowCategoryModal(true)}
            disabled={disabled}
          >
            <Ionicons name="add-circle-outline" size={24} color="#6B4EFF" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {profile?.categories?.map((category: Category) => (
            <View key={category._id} style={styles.categoryWrapper}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      selectedCategory === category.name
                        ? `${category.color}40`
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
              <TouchableOpacity
                style={styles.deleteCategoryButton}
                onPress={() => {
                  Alert.alert(
                    "Delete Category",
                    `Are you sure you want to delete "${category.name}"?`,
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                          try {
                            await onDeleteCategory?.(category._id);
                            if (selectedCategory === category.name) {
                              setSelectedCategory("");
                            }
                          } catch (error) {
                            console.log(error);
                          }
                        },
                      },
                    ]
                  );
                }}
                disabled={disabled}
              >
                <Ionicons name="close-circle" size={18} color="#FF4444" />
              </TouchableOpacity>
            </View>
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
              minimumDate={new Date()}
              maximumDate={new Date(2050, 12, 31)}
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

      {/* Add Category Modal */}
      <Modal
        isVisible={showCategoryModal}
        onBackdropPress={() => setShowCategoryModal(false)}
        style={styles.modal}
        backdropOpacity={0.5}
        avoidKeyboard={true}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Category</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Category Name</Text>
              <TextInput
                style={styles.input}
                value={newCategory}
                onChangeText={setNewCategory}
                placeholder="Enter category name"
                placeholderTextColor="#666666"
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowCategoryModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddCategory}
                disabled={!newCategory.trim()}
              >
                <Text
                  style={[styles.modalButtonText, styles.confirmButtonText]}
                >
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {(mode === "create" || mode === "edit") && (
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
            {disabled
              ? `${mode === "create" ? "Creating" : "Saving"}...`
              : submitLabel}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
