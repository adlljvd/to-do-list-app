import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../../config/api";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const roles = [
    { id: "buyer", label: "Buyer" },
    { id: "seller", label: "Seller" },
  ];

  const handleSelectRole = (role: any) => {
    setFormData({ ...formData, role: role.id });
    setShowRoleModal(false);
  };

  const getSelectedRoleLabel = () => {
    const selected = roles.find((r) => r.id === formData.role);
    return selected ? selected.label : "Select your role";
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      console.log("Form Data:", formData);

      const response = await axios.post(`${API_URL}/register`, {
        fullname: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      console.log("Response:", response.data);

      if (response.data) {
        Alert.alert("Success", "Please login to continue.", [
          {
            text: "OK",
            onPress: () => navigation.replace("Login"), // Gunakan replace
          },
        ]);
      }
    } catch (error: any) {
      console.error("Error details:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Registration failed";
        Alert.alert("Error", message);
      } else {
        Alert.alert("Error", "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Create Account</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999999"
                  value={formData.fullName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, fullName: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="#999999"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) =>
                    setFormData({ ...formData, password: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#999999"
                  secureTextEntry
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    setFormData({ ...formData, confirmPassword: text })
                  }
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Role</Text>
              <TouchableOpacity
                style={styles.roleButton}
                onPress={() => setShowRoleModal(true)}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    !formData.role && styles.rolePlaceholder,
                  ]}
                >
                  {getSelectedRoleLabel()}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Modal untuk Role Selection */}
          <Modal
            visible={showRoleModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowRoleModal(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowRoleModal(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Role</Text>
                {roles.map((role) => (
                  <TouchableOpacity
                    key={role.id}
                    style={[
                      styles.roleOption,
                      formData.role === role.id && styles.roleOptionSelected,
                    ]}
                    onPress={() => handleSelectRole(role)}
                  >
                    <Text
                      style={[
                        styles.roleOptionText,
                        formData.role === role.id &&
                          styles.roleOptionTextSelected,
                      ]}
                    >
                      {role.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  headerContainer: {
    marginTop: "15%",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    lineHeight: 24,
  },
  formContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  inputWrapper: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: "#1A1A1A",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  roleButton: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roleButtonText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  rolePlaceholder: {
    color: "#999999",
  },
  dropdownIcon: {
    fontSize: 12,
    color: "#666666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  roleOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#F8F8F8",
  },
  roleOptionSelected: {
    backgroundColor: "#6B4EFF",
  },
  roleOptionText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  roleOptionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#6B4EFF",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#6B4EFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingVertical: 24,
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    color: "#666666",
    fontSize: 15,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  footerLink: {
    color: "#6B4EFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});
