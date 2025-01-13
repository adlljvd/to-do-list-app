import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../../context/AuthContext";
import { fetchProfileAsync } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

export default function ProfileScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { setIsLogin } = useContext(AuthContext);
  const { profile } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchProfileAsync());
  }, []);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("token");
          setIsLogin(false);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Your Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}&background=6B4EFF&color=fff`,
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#1A1A1A" />
          <Text style={styles.menuText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={24} color="#999999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={24} color="#1A1A1A" />
          <Text style={styles.menuText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={24} color="#999999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={[styles.menuText, { color: "#FF3B30" }]}>Logout</Text>
          <Ionicons name="chevron-forward" size={24} color="#999999" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 24,
  },
  greeting: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  profileSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666666",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  menuSection: {
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: "#1A1A1A",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});
