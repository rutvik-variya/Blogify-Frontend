import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const createBlog = createAsyncThunk("blog/createBlog", async (formData, thunkAPI) => {
    try {
        const response = await axiosInstance.post("/blog", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
        );
        return response.data.blog;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message ||
            "Something went wrong"
        );
    }
}
);

const initialState = {
    blogs: [],
    loading: false,
    error: null,
};

const blogPostSlice = createSlice({
    name: "createBlog",
    initialState,

    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(createBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs.unshift(action.payload);
            })

            .addCase(createBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = blogPostSlice.actions;
export default blogPostSlice.reducer;