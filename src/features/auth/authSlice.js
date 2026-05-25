import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api/axios";

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/auth/register", userData)
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/auth/login", userData)
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/auth/logout")
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}


const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })

            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })

            // login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                // console.log("action payload log:", action.payload)
                state.isLoading = false;
                state.error = null
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })

            // logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.accessToken = null
                state.refreshToken = null
                state.isAuthenticated = false
            })
    }

})

export const { clearError } = authSlice.actions
export default authSlice.reducer;













































