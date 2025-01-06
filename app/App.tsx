import { createStaticNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/store";
import RootStack from "./src/navigation/RootStack";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AuthContext from "./src/context/AuthContext";
import { View, Platform } from "react-native";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getValueFor();
    if (Platform.OS === "android") {
      setStatusBarBackgroundColor("#1A1A1A", true);
      setStatusBarStyle("light");
    }
  }, []);

  async function getValueFor() {
    let result = await SecureStore.getItemAsync("userToken");
    if (result) {
      setIsLogin(true);
    }
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ isLogin, setIsLogin }}>
        <SafeAreaProvider>
          <View style={{ flex: 1, backgroundColor: "#1A1A1A" }}>
            <StatusBar style="light" backgroundColor="#1A1A1A" />
            <Navigation />
          </View>
        </SafeAreaProvider>
      </AuthContext.Provider>
    </Provider>
  );
}
