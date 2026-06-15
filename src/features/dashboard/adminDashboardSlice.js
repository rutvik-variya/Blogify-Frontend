import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const getAdminStats = createAsyncThunk(
    "admin/getAdminStats",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/admin/stats");
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "admin/getAllUsers",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/admin/users");
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
)


const initialState = {
    stats: null,
    users:[],

    loading: false,
    userLoading:false,

    error: null,
}

const adminDashBoardSlice = createSlice({
    name: "adminDashBoard",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // get admin stats
            .addCase(getAdminStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAdminStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload
            })

            .addCase(getAdminStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get all users
            .addCase(getAllUsers.pending, (state) => {
                state.userLoading = true;
                state.error = null;
            })

            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.userLoading = false;
                state.users = action.payload
            })

            .addCase(getAllUsers.rejected, (state, action) => {
                state.userLoading = false;
                state.error = action.payload;
            })
        }
})

export const { clearError } = adminDashBoardSlice.actions;
export default adminDashBoardSlice.reducer;


