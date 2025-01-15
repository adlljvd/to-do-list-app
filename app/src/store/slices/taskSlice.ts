import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/api";
import { AppDispatch } from "../index";
import * as SecureStore from "expo-secure-store";
import {
  PendingChange,
  PendingChangeAdd,
  PendingChangeDelete,
  RawTaskData,
  Task,
} from "../../types/task";
import { StorageService } from "../../storage/storage";
import { formatTaskDate } from "../../utils/dateFormatter";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: "",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksPending(state) {
      state.loading = true;
      state.tasks = initialState.tasks;
      state.error = initialState.error;
    },
    fetchTasksSuccess(state, action) {
      state.loading = false;
      state.tasks = action.payload;
      state.error = initialState.error;
    },
    fetchTasksFailed(state, action) {
      state.loading = false;
      state.tasks = initialState.tasks;
      state.error = action.payload;
    },
    toggleTaskStatus(state, action) {
      const { taskId } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "completed"
                  ? "in_progress"
                  : task.status === "in_progress"
                  ? "completed"
                  : task.status === "pending"
                  ? "completed"
                  : "pending",
            }
          : task
      );
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action) {
      const { id } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? action.payload : task
      );
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const {
  fetchTasksPending,
  fetchTasksSuccess,
  fetchTasksFailed,
  toggleTaskStatus,
  addTask,
  updateTask,
  deleteTask,
} = taskSlice.actions;

export const fetchTasksAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchTasksPending());

    // Try to fetch from API first
    try {
      const { data } = await axios.get(`${API_URL}/tasks?sort=dueDate`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      });
      dispatch(fetchTasksSuccess(data.data));
      // Save to AsyncStorage
      await StorageService.saveTasks(data.data);
    } catch (error) {
      // If API fails, load from AsyncStorage
      const offlineTasks = await StorageService.loadTasks();
      dispatch(fetchTasksSuccess(offlineTasks));
    }
  } catch (error) {
    dispatch(fetchTasksFailed("Failed to fetch tasks"));
  }
};

// Add Task with offline support
export const addTaskAsync =
  (taskData: RawTaskData) => async (dispatch: AppDispatch) => {
    try {
      // Transform data untuk API - pastikan format sesuai dengan yang diharapkan backend
      const apiData = {
        title: taskData.title,
        description: taskData.description,
        dueDate:
          taskData.dueDate instanceof Date
            ? taskData.dueDate.toISOString()
            : taskData.dueDate, // Jika sudah string, gunakan langsung
        time: taskData.time,
        status: taskData.status,
        priority: taskData.priority,
        category:
          typeof taskData.category === "string"
            ? taskData.category
            : taskData.category?.name || "Uncategorized",
      };

      console.log("Sending to API:", JSON.stringify(apiData, null, 2));

      const { data } = await axios.post(`${API_URL}/tasks`, apiData, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", JSON.stringify(data, null, 2));

      dispatch(addTask(data.data));
      // Save to AsyncStorage
      const currentTasks = await StorageService.loadTasks();
      await StorageService.saveTasks([...currentTasks, data.data]);
    } catch (error) {
      console.log("Error in addTaskAsync:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("API Error response:", error.response.data);
      }

      // If offline or network error
      if (axios.isAxiosError(error) && !error.response) {
        const currentTasks = await StorageService.loadTasks();

        // Save to pending changes (data mentah)
        const pendingChanges = await StorageService.loadPendingChanges();
        const pendingChange: PendingChangeAdd = {
          type: "ADD",
          task: {
            ...taskData,
            dueDate:
              taskData.dueDate instanceof Date
                ? taskData.dueDate.toISOString()
                : taskData.dueDate,
          },
        };
        await StorageService.savePendingChanges([
          ...pendingChanges,
          pendingChange,
        ]);

        // Format task untuk UI
        const formattedTask: Task = {
          id: Date.now().toString(),
          title: taskData.title,
          description: taskData.description,
          time: taskData.time,
          date: formatTaskDate(
            taskData.dueDate instanceof Date
              ? taskData.dueDate
              : new Date(taskData.dueDate)
          ),
          status: taskData.status,
          priority: taskData.priority,
          category: taskData.category,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await StorageService.saveTasks([...currentTasks, formattedTask]);
        dispatch(addTask(formattedTask));
      } else {
        throw error;
      }
    }
  };

// Update Task with offline support
export const updateTaskAsync =
  (task: Task) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.put(`${API_URL}/tasks/${task.id}`, task, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      });
      dispatch(updateTask(data.data));
      // Update in AsyncStorage
      const currentTasks = await StorageService.loadTasks();
      const updatedTasks = currentTasks.map((t) =>
        t.id === task.id ? data.data : t
      );
      await StorageService.saveTasks(updatedTasks);
    } catch (error) {
      console.log("Error in updateTaskAsync:", error);
      if (axios.isAxiosError(error) && !error.response) {
        const currentTasks = await StorageService.loadTasks();
        const updatedTasks = currentTasks.map((t) =>
          t.id === task.id ? task : t
        );
        await StorageService.saveTasks(updatedTasks);

        const pendingChanges = await StorageService.loadPendingChanges();
        await StorageService.savePendingChanges([
          ...pendingChanges,
          { type: "UPDATE", task },
        ]);

        dispatch(updateTask(task));
      } else {
        throw error;
      }
    }
  };

// Delete Task with offline support
export const deleteTaskAsync =
  (taskId: string) => async (dispatch: AppDispatch) => {
    try {
      // Try to delete from API
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      });
      dispatch(deleteTask(taskId));
      // Update AsyncStorage
      const currentTasks = await StorageService.loadTasks();
      const updatedTasks = currentTasks.filter((t) => t.id !== taskId);
      await StorageService.saveTasks(updatedTasks);
    } catch (error) {
      console.log("Error in deleteTaskAsync:", error);
      // If offline or network error, delete locally and add to pending changes
      if (axios.isAxiosError(error) && !error.response) {
        const currentTasks = await StorageService.loadTasks();
        const updatedTasks = currentTasks.filter((t) => t.id !== taskId);
        await StorageService.saveTasks(updatedTasks);

        const pendingChanges = await StorageService.loadPendingChanges();
        await StorageService.savePendingChanges([
          ...pendingChanges,
          { type: "DELETE", taskId },
        ]);

        dispatch(deleteTask(taskId));
      } else {
        throw error;
      }
    }
  };

// Sync pending changes when online
export const syncPendingChangesAsync = () => async (dispatch: AppDispatch) => {
  try {
    const pendingChanges =
      (await StorageService.loadPendingChanges()) as PendingChange[];
    console.log(
      "Pending changes to sync:",
      JSON.stringify(pendingChanges, null, 2)
    );

    // Filter duplicate tasks based on all properties except category.color
    const uniqueChanges = pendingChanges.filter(
      (change, index, self) =>
        index ===
        self.findIndex((t) => {
          if (t.type !== change.type) return false;

          if (t.type === "DELETE") {
            return t.taskId === (change as PendingChangeDelete).taskId;
          }

          if (t.type === "ADD" && change.type === "ADD") {
            const tTask = t.task;
            const changeTask = change.task;
            return (
              tTask.title === changeTask.title &&
              tTask.description === changeTask.description &&
              tTask.dueDate === changeTask.dueDate &&
              tTask.time === changeTask.time &&
              tTask.status === changeTask.status &&
              tTask.priority === changeTask.priority
            );
          }

          return false;
        })
    );

    console.log(
      "Unique changes to sync:",
      JSON.stringify(uniqueChanges, null, 2)
    );

    for (const change of uniqueChanges) {
      switch (change.type) {
        case "ADD": {
          console.log(
            "Processing ADD task:",
            JSON.stringify(change.task, null, 2)
          );
          const apiData = {
            title: change.task.title,
            description: change.task.description,
            dueDate: change.task.dueDate, // dueDate sudah dalam format string dari PendingChangeAdd
            time: change.task.time,
            status: change.task.status,
            priority: change.task.priority,
            category:
              typeof change.task.category === "string"
                ? change.task.category
                : change.task.category?.name || "Uncategorized",
          };
          console.log("API request data:", JSON.stringify(apiData, null, 2));

          const response = await axios.post(`${API_URL}/tasks`, apiData, {
            headers: {
              Authorization: `Bearer ${await SecureStore.getItemAsync(
                "token"
              )}`,
              "Content-Type": "application/json",
            },
          });
          console.log("API Response:", JSON.stringify(response.data, null, 2));
          break;
        }
        case "UPDATE":
          await dispatch(updateTaskAsync(change.task));
          break;
        case "DELETE":
          await dispatch(deleteTaskAsync(change.taskId));
          break;
      }
    }

    await StorageService.clearPendingChanges();
    // Refresh tasks after sync
    await dispatch(fetchTasksAsync());
  } catch (error) {
    console.error("Error syncing pending changes:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error response:", error.response.data);
    }
  }
};

export default taskSlice.reducer;
