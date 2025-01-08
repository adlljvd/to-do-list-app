import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const logoRotateLeft = new Animated.Value(0);
  const logoRotateRight = new Animated.Value(0);
  const logoScale = new Animated.Value(0.8);

  useEffect(() => {
    // Logo rotation animation
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(logoRotateLeft, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(logoRotateRight, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(logoRotateLeft, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(logoRotateRight, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Initial pop animation
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const leftRotateInterpolate = logoRotateLeft.interpolate({
    inputRange: [0, 1],
    outputRange: ["-45deg", "-135deg"],
  });

  const rightRotateInterpolate = logoRotateRight.interpolate({
    inputRange: [0, 1],
    outputRange: ["45deg", "135deg"],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Animated.View
            style={[styles.logoWrapper, { transform: [{ scale: logoScale }] }]}
          >
            <Animated.View
              style={[
                styles.logoLeft,
                { transform: [{ rotate: leftRotateInterpolate }] },
              ]}
            />
            <Animated.View
              style={[
                styles.logoRight,
                { transform: [{ rotate: rightRotateInterpolate }] },
              ]}
            />
          </Animated.View>
          <Text style={styles.title}>Taskio</Text>
          <Text style={styles.subtitle}>
            Your personal task companion{"\n"}Smart, Simple, and Seamless
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[styles.buttonText, styles.registerButtonText]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    padding: 24,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: "20%",
  },
  logoWrapper: {
    width: 120,
    height: 120,
    position: "relative",
    marginBottom: 40,
  },
  logoLeft: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#FF9898",
    borderRadius: 8,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    left: 15,
    top: 15,
    shadowColor: "#FF9898",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    transform: [{ rotate: "-10deg" }],
  },
  logoRight: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#6B4EFF",
    borderRadius: 8,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    right: 15,
    bottom: 15,
    shadowColor: "#6B4EFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    transform: [{ rotate: "10deg" }],
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    marginHorizontal: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
    marginBottom: "15%",
    paddingHorizontal: 4,
  },
  button: {
    backgroundColor: "#6B4EFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    shadowColor: "#6B4EFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#6B4EFF",
    shadowColor: "transparent",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  registerButtonText: {
    color: "#6B4EFF",
  },
});
