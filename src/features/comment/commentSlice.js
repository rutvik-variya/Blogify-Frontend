import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";


export const getComments = createAsyncThunk("comment/getComments", async (blogId, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/comment/${blogId}`);
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


export const postComment = createAsyncThunk("comment/postComment", async ({ blogId, commentData }, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/comment/${blogId}`, commentData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message
        );
    }
}
);
const initialState = {
    comment: [],
    loading: false,
    error: false
}


const commentSlice = createSlice({
    name: "comment",
    initialState,

    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // fetch comments 

            .addCase(getComments.pending, (state) => {
                state.loading = true
            })

            .addCase(getComments.fulfilled, (state, action) => {
                state.loading = false,
                    state.comment = action.payload
            })

            .addCase(getComments.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // add comments

            .addCase(postComment.pending, (state) => {
                state.loading = false
            })

            .addCase(postComment.fulfilled, (state, action) => {
                state.loading = false,
                    state.comment = action.payload
            })

            .addCase(postComment.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

    }
})

export const { clearError } = commentSlice.actions;
export default commentSlice.reducer;




