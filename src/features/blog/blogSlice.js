import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api/axios";

export const latestBlog = createAsyncThunk("blog/latestBlog", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get("/latestBlog");
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async (params = {}, thunkAPI) => {
    try {
        const query = new URLSearchParams(params).toString();

        const response = await axiosInstance.get(`/blog?${query}`);
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const initialState = {
    blogs: [],
    loading: false,
    error: false
}

const blogSlice = createSlice({
    name: "blog",
    initialState,

    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // latest blog

            .addCase(latestBlog.pending, (state) => {
                state.loading = true
            })

            .addCase(latestBlog.fulfilled, (state, action) => {
                state.loading = false,
                    state.blogs = action.payload
            })

            .addCase(latestBlog.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // fetch blogs 
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload
            })

            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})

export const { clearError } = blogSlice.actions;
export default blogSlice.reducer;
