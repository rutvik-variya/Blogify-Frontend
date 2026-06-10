import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const getDashboardStats = createAsyncThunk(
    "dashboard/getDashboardStats",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/dashboard/state");
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

const initialState = {
    stats: [],
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getDashboardStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload.result;
            })

            .addCase(getDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = dashboardSlice.actions;

export default dashboardSlice.reducer;