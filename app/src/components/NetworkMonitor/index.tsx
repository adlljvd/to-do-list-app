import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { syncPendingChangesAsync } from "../../store/slices/taskSlice";

export function NetworkMonitor() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        dispatch(syncPendingChangesAsync());
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}
