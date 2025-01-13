import { StyleSheet, Dimensions, Platform } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  addButton: {
    padding: 4,
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
  submitButton: {
    backgroundColor: "#6B4EFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
    marginBottom: Platform.OS === "ios" ? 40 : 24,
  },
  submitButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButtonTextDisabled: {
    color: "#999999",
  },
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 20,
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
  datePickerContainer: {
    marginVertical: 20,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
  },
  timeInputContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  timeInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
  },
  timeInputField: {
    fontSize: 24,
    fontWeight: "600",
    width: 50,
    textAlign: "center",
    color: "#1A1A1A",
  },
  timeInputSeparator: {
    fontSize: 24,
    fontWeight: "600",
    marginHorizontal: 5,
    color: "#1A1A1A",
  },
  ampmContainer: {
    flexDirection: "row",
    marginLeft: 15,
  },
  ampmButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginHorizontal: 2,
    backgroundColor: "#FFFFFF",
  },
  ampmButtonSelected: {
    backgroundColor: "#007AFF",
  },
  ampmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  ampmButtonTextSelected: {
    color: "#FFFFFF",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1A1A1A",
  },
  colorPickerContainer: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
  },
  selectedColorPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  colorText: {
    fontSize: 14,
    color: "#666666",
  },
  categoryWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  deleteCategoryButton: {
    marginLeft: -10,
    marginTop: -10,
    padding: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
});
