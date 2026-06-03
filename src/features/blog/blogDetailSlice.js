import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const fetchBlogDetail = createAsyncThunk("blogDetail/fetchBlogDetail", async (slug, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`/blog/${slug}`);
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


const initialState = {
    blog: null,
    loading: false,
    error: null
}

const blogDetailSlice = createSlice({
    name: "blogDetail",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // blogdetail fetch
            .addCase(fetchBlogDetail.pending, (state) => {
                state.loading = true,
                    state.error = null
            })

            .addCase(fetchBlogDetail.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.loading = false,
                    state.blog = action.payload;
            })

            .addCase(fetchBlogDetail.rejected, (state, action) => {

                state.loading = false,
                    state.error = action.payload;
            })
    }
})



export const { clearError } = blogDetailSlice.actions;
export default blogDetailSlice.reducer;