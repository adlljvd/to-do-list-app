import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";
import {
  addTaskAsync,
  deleteTaskAsync,
  updateTaskAsync,
} from "../store/slices/taskSlice";
import { AppDispatch } from "../store";

export type PendingChange =
  | { type: "ADD"; task: Task }
  | { type: "UPDATE"; task: Task }
  | { type: "DELETE"; taskId: string };

const TASKS_STORAGE_KEY = "@todo_tasks";
const PENDING_CHANGES_KEY = "@todo_pending_changes";

export const StorageService = {
  // Save tasks to AsyncStorage
  saveTasks: async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  },

  // Load tasks from AsyncStorage
  loadTasks: async (): Promise<Task[]> => {
    try {
      const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
      console.error("Error loading tasks:", error);
      return [];
    }
  },

  // Save pending changes when offline
  savePendingChanges: async (changes: PendingChange[]) => {
    try {
      await AsyncStorage.setItem(PENDING_CHANGES_KEY, JSON.stringify(changes));
    } catch (error) {
      console.error("Error saving pending changes:", error);
    }
  },

  // Load pending changes
  loadPendingChanges: async () => {
    try {
      const changesJson = await AsyncStorage.getItem(PENDING_CHANGES_KEY);
      return changesJson ? JSON.parse(changesJson) : [];
    } catch (error) {
      console.error("Error loading pending changes:", error);
      return [];
    }
  },

  // Clear pending changes after sync
  clearPendingChanges: async () => {
    try {
      await AsyncStorage.removeItem(PENDING_CHANGES_KEY);
    } catch (error) {
      console.error("Error clearing pending changes:", error);
    }
  },
};

export const syncPendingChangesAsync = () => async (dispatch: AppDispatch) => {
  try {
    const pendingChanges = await StorageService.loadPendingChanges();

    for (const change of pendingChanges) {
      switch (change.type) {
        case "ADD":
          await dispatch(addTaskAsync(change.task));
          break;
        case "UPDATE":
          await dispatch(updateTaskAsync(change.task));
          break;
        case "DELETE":
          await dispatch(deleteTaskAsync(change.taskId));
          break;
      }
    }

    await StorageService.clearPendingChanges();
  } catch (error) {
    console.error("Error syncing pending changes:", error);
  }
};
