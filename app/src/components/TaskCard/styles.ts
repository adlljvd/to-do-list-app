import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  taskCard: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 16,
    marginBottom: 5,
  },
  taskCardContent: {
    flex: 1,
    flexDirection: "row",
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
    marginBottom: 1,
    marginTop: 8,
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
  taskHeader: {
    flexDirection: "column",
    gap: 8,
    marginBottom: 8,
  },
  titleAndCategory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
  },
  indicators: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  taskTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  taskTime: {
    fontSize: 12,
    color: "#666666",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  deleteAction: {
    backgroundColor: "#FF5252",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: 100,
    height: "95%",
  },
  deleteActionContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  deleteActionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
