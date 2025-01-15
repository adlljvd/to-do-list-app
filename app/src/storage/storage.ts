import AsyncStorage from "@react-native-async-storage/async-storage";
import { RawTaskData, Task } from "../types/task";
import { formatTaskDate } from "../utils/dateFormatter";

export type PendingChange =
  | { type: "ADD"; task: RawTaskData }
  | { type: "UPDATE"; task: Task }
  | { type: "DELETE"; taskId: string };

const TASKS_STORAGE_KEY = "@todo_tasks";
const PENDING_CHANGES_KEY = "@todo_pending_changes";

const generateUniqueId = () => {
  return Date.now().toString() + "-" + Math.random().toString(36).substr(2, 9);
};

export const StorageService = {
  saveTasks: async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  },

  loadTasks: async (): Promise<Task[]> => {
    try {
      const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      const tasks = tasksJson ? JSON.parse(tasksJson) : [];

      const pendingChanges = await StorageService.loadPendingChanges();
      const pendingTasks = pendingChanges
        .filter((change) => change.type === "ADD")
        .map((change) => {
          const dueDate = change.task.dueDate
            ? new Date(change.task.dueDate)
            : new Date();

          return {
            id: generateUniqueId(),
            title: change.task.title,
            description: change.task.description,
            time: change.task.time,
            date: formatTaskDate(dueDate),
            status: change.task.status,
            priority: change.task.priority,
            category: change.task.category,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        });

      return [...tasks, ...pendingTasks];
    } catch (error) {
      console.error("Error loading tasks:", error);
      return [];
    }
  },

  savePendingChanges: async (changes: PendingChange[]) => {
    try {
      // Log before saving
      console.log("Saving pending changes:", JSON.stringify(changes, null, 2));

      // Ensure dueDate is in ISO string format for ADD changes
      const formattedChanges = changes.map((change) => {
        if (change.type === "ADD" && change.task.dueDate instanceof Date) {
          return {
            ...change,
            task: {
              ...change.task,
              dueDate: change.task.dueDate.toISOString(),
            },
          };
        }
        return change;
      });

      await AsyncStorage.setItem(
        PENDING_CHANGES_KEY,
        JSON.stringify(formattedChanges)
      );
    } catch (error) {
      console.error("Error saving pending changes:", error);
    }
  },

  loadPendingChanges: async (): Promise<PendingChange[]> => {
    try {
      const changesJson = await AsyncStorage.getItem(PENDING_CHANGES_KEY);
      const changes = changesJson ? JSON.parse(changesJson) : [];
      console.log("Loaded pending changes:", JSON.stringify(changes, null, 2));
      return changes;
    } catch (error) {
      console.error("Error loading pending changes:", error);
      return [];
    }
  },

  clearPendingChanges: async () => {
    try {
      await AsyncStorage.removeItem(PENDING_CHANGES_KEY);
    } catch (error) {
      console.error("Error clearing pending changes:", error);
    }
  },
};
