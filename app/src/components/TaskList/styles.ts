import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
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
});
