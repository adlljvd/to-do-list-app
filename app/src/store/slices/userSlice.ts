import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/api";
import { AppDispatch } from "../index";
import * as SecureStore from "expo-secure-store";
import { Profile } from "../../types/profile";

interface UserState {
  profile: Profile;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  profile: {
    userId: "",
    name: "",
    email: "",
    role: "",
  },
  loading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchProfilePending(state) {
      state.loading = true;
      state.profile = initialState.profile;
      state.error = initialState.error;
    },
    fetchProfileSuccess(state, action) {
      state.loading = false;
      state.profile = action.payload;
      state.error = initialState.error;
    },
    fetchProfileFailed(state, action) {
      state.loading = false;
      state.profile = initialState.profile;
      state.error = action.payload;
    },
  },
});

export const { fetchProfilePending, fetchProfileSuccess, fetchProfileFailed } =
  userSlice.actions;

export const fetchProfileAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchProfilePending());
    const { data } = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${await SecureStore.getItem("token")}`,
      },
    });
    dispatch(fetchProfileSuccess(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(
        fetchProfileFailed(
          error.response?.data?.message || "Failed to fetch profile"
        )
      );
    } else {
      dispatch(fetchProfileFailed("An unknown error occurred"));
    }
  }
};

export default userSlice.reducer;
