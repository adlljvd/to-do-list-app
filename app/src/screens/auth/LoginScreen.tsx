import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "../../config/api";
import { LoginScreenNavigationProp } from "../../types/navigation";

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { setIsLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      await SecureStore.setItemAsync("token", response.data.access_token);
      setIsLogin(true);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Login failed";
        Alert.alert("Error", message);
      } else {
        Alert.alert("Error", "Login failed. Please try again.");
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
            <Text style={styles.title}>Welcome to Taskio!</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#999999"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => {
                // Handle forgot password
              }}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <Text style={styles.footerText}>New to Taskio? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.footerLink}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: "#6B4EFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
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
    position: "relative",
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
  decorBottom: {
    position: "absolute",
    bottom: -20,
    width: 150,
    height: 6,
    backgroundColor: "rgba(107, 78, 255, 0.1)",
    borderRadius: 3,
  },
});
