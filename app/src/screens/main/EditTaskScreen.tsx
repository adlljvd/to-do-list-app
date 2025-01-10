import React from "react";
import { View, Text } from "react-native";

export default function EditTaskScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edit Task Screen</Text>
    </View>
  );
}

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";

// interface EditTaskParams {
//   taskId?: number;
//   title?: string;
//   description?: string;
//   status?: "pending" | "in_progress" | "completed";
//   priority?: "low" | "medium" | "high";
//   category?: string;
//   date?: Date;
// }

// export default function EditTaskScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const params = route.params as EditTaskParams;

//   const [title, setTitle] = useState(params?.title || "");
//   const [description, setDescription] = useState(params?.description || "");
//   const [date, setDate] = useState(params?.date || new Date());
//   const [status, setStatus] = useState(params?.status || "pending");
//   const [priority, setPriority] = useState(params?.priority || "medium");
//   const [category, setCategory] = useState(params?.category || "");
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleSave = () => {
//     // TODO: Implement save functionality
//     navigation.goBack();
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>
//           {params?.taskId ? "Edit Task" : "Create Task"}
//         </Text>
//         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//           <Text style={styles.saveButtonText}>Save</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.form}>
//         <TextInput
//           style={styles.titleInput}
//           placeholder="Task Title"
//           value={title}
//           onChangeText={setTitle}
//         />

//         <TextInput
//           style={styles.descriptionInput}
//           placeholder="Add description"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//         />

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Date & Time</Text>
//           <TouchableOpacity
//             style={styles.dateButton}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <Text>{date.toLocaleDateString()}</Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={date}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) {
//                   setDate(selectedDate);
//                 }
//               }}
//             />
//           )}
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Status</Text>
//           <View style={styles.statusContainer}>
//             {["pending", "in progress"].map((item) => (
//               <TouchableOpacity
//                 key={item}
//                 style={[
//                   styles.statusButton,
//                   status === item && styles.statusButtonActive,
//                 ]}
//                 onPress={() => setStatus(item)}
//               >
//                 <Text
//                   style={
//                     status === item
//                       ? styles.statusTextActive
//                       : styles.statusText
//                   }
//                 >
//                   {item.charAt(0).toUpperCase() + item.slice(1)}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Priority</Text>
//           <View style={styles.priorityContainer}>
//             {["low", "medium", "high"].map((item) => (
//               <TouchableOpacity
//                 key={item}
//                 style={[
//                   styles.priorityButton,
//                   priority === item && styles.priorityButtonActive,
//                 ]}
//                 onPress={() => setPriority(item)}
//               >
//                 <Text
//                   style={
//                     priority === item
//                       ? styles.priorityTextActive
//                       : styles.priorityText
//                   }
//                 >
//                   {item.charAt(0).toUpperCase() + item.slice(1)}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Category</Text>
//           <View style={styles.categoryContainer}>
//             {["Work", "Meeting", "Personal", "Shopping"].map((item) => (
//               <TouchableOpacity
//                 key={item}
//                 style={[
//                   styles.categoryButton,
//                   category === item && styles.categoryButtonActive,
//                 ]}
//                 onPress={() => setCategory(item)}
//               >
//                 <Text style={styles.categoryText}>{item}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   createButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     backgroundColor: "#eee",
//   },
//   createButtonText: {
//     color: "#666",
//   },
//   form: {
//     padding: 16,
//   },
//   titleInput: {
//     fontSize: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   descriptionInput: {
//     fontSize: 14,
//     paddingVertical: 12,
//     marginTop: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   section: {
//     marginTop: 24,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 12,
//   },
//   dateButton: {
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#f5f5f5",
//   },
//   statusContainer: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   statusButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   statusButtonActive: {
//     backgroundColor: "#6B4EFF",
//   },
//   statusText: {
//     color: "#666",
//   },
//   statusTextActive: {
//     color: "#fff",
//   },
//   priorityContainer: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   priorityButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   priorityButtonActive: {
//     backgroundColor: "#6B4EFF",
//   },
//   priorityText: {
//     color: "#666",
//   },
//   priorityTextActive: {
//     color: "#fff",
//   },
//   categoryContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   categoryButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   categoryButtonActive: {
//     backgroundColor: "#6B4EFF",
//     borderColor: "#6B4EFF",
//   },
//   categoryText: {
//     color: "#666",
//   },
//   backButton: {
//     padding: 8,
//     borderRadius: 8,
//   },
//   saveButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     backgroundColor: "#6B4EFF",
//   },
//   saveButtonText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "600",
//   },
// });
