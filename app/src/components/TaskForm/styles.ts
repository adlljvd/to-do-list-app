import { StyleSheet } from "react-native";
import { Platform } from "react-native";

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
});
