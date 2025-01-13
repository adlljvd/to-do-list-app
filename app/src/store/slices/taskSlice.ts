import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/api";
import { AppDispatch } from "../index";
import * as SecureStore from "expo-secure-store";
import { Task } from "../../types/task";

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
  },
});

export const {
  fetchTasksPending,
  fetchTasksSuccess,
  fetchTasksFailed,
  toggleTaskStatus,
} = taskSlice.actions;

export const fetchTasksAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchTasksPending());
    const { data } = await axios.get(`${API_URL}/tasks?sort=dueDate`, {
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
    });
    dispatch(fetchTasksSuccess(data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(
        fetchTasksFailed(
          error.response?.data?.message || "Failed to fetch tasks"
        )
      );
    } else {
      dispatch(fetchTasksFailed("An unknown error occurred"));
    }
  }
};

export default taskSlice.reducer;
