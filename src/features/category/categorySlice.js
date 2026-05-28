import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api/axios";


export const getCateories = createAsyncThunk("category/fetchCategory", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get("/category");
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


const initialState = {
    categories: [],
    loading: false,
    error: false
}

const categorySclice = createSlice({
    name: "category",
    initialState,

    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // get categories
            .addCase(getCateories.pending, (state) => {
                state.loading = true
            })

            .addCase(getCateories.fulfilled, (state, action) => {
                state.loading = false,
                state.categories = action.payload
            })

            .addCase(getCateories.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }
})

export const { clearError } = categorySclice.actions;
export default categorySclice.reducer;






