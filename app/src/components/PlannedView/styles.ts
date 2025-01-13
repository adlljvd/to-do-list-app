import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  plannedContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  calendarHeader: {
    marginBottom: 24,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  monthArrow: {
    padding: 8,
  },
  currentMonth: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  daysScroll: {
    flexDirection: "row",
  },
  dayCell: {
    width: 48,
    height: 64,
    marginRight: 12,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  todayCell: {
    backgroundColor: "#6B4EFF",
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  dayName: {
    fontSize: 12,
    color: "#666666",
  },
  todayText: {
    color: "#FFFFFF",
  },
  plannedTasksList: {
    flex: 1,
  },
  plannedTaskItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  completedTask: {
    opacity: 0.7,
  },
  taskTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  plannedTaskTimeText: {
    fontSize: 12,
    color: "#666666",
  },
  taskStatusButton: {
    padding: 4,
  },
  statusDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6B4EFF",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  taskDescription: {
    fontSize: 14,
    color: "#1A1A1A",
    lineHeight: 20,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#666666",
  },
  completedSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  selectedCell: {
    backgroundColor: "#6B4EFF",
    borderColor: "#6B4EFF",
  },
  selectedText: {
    color: "#FFFFFF",
  },
});
