import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/api";
import { AppDispatch } from "../index";
import * as SecureStore from "expo-secure-store";
import { Task } from "../../types/task";
import { StorageService } from "../../storage/storage";

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
export const addTaskAsync = (task: Task) => async (dispatch: AppDispatch) => {
  try {
    // Try to add to API
    const { data } = await axios.post(`${API_URL}/tasks`, task, {
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
    });
    dispatch(addTask(data.data));
    // Save to AsyncStorage
    const currentTasks = await StorageService.loadTasks();
    await StorageService.saveTasks([...currentTasks, data.data]);
  } catch (error) {
    // If offline, save locally and add to pending changes
    const currentTasks = await StorageService.loadTasks();
    const tempTask = { ...task, id: Date.now().toString() }; // Temporary ID
    await StorageService.saveTasks([...currentTasks, tempTask]);

    const pendingChanges = await StorageService.loadPendingChanges();
    await StorageService.savePendingChanges([
      ...pendingChanges,
      { type: "ADD", task: tempTask },
    ]);

    dispatch(addTask(tempTask));
  }
};

// Update Task with offline support
export const updateTaskAsync =
  (task: Task) => async (dispatch: AppDispatch) => {
    try {
      // Try to update in API
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
      // If offline, update locally and add to pending changes
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
      // If offline, delete locally and add to pending changes
      const currentTasks = await StorageService.loadTasks();
      const updatedTasks = currentTasks.filter((t) => t.id !== taskId);
      await StorageService.saveTasks(updatedTasks);

      const pendingChanges = await StorageService.loadPendingChanges();
      await StorageService.savePendingChanges([
        ...pendingChanges,
        { type: "DELETE", taskId },
      ]);

      dispatch(deleteTask(taskId));
    }
  };

export default taskSlice.reducer;
