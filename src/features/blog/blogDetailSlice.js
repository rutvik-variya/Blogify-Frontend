import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import {
    toggleLikeBlog,
    toggleBookBlog
} from "./blogSlice";

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

            // togggle like

            .addCase(toggleLikeBlog.fulfilled, (state, action) => {
                if (!state.blog?.blogs) return;

                const { userId, liked, totalLikes } = action.payload;

                state.blog.blogs.totalLikes = totalLikes;

                if (liked) {
                    if (!state.blog.blogs.likes.includes(userId)) {
                        state.blog.blogs.likes.push(userId);
                    }
                } else {
                    state.blog.blogs.likes =
                        state.blog.blogs.likes.filter(
                            id => String(id) !== String(userId)
                        );
                }
            })

            // toggle save
            .addCase(toggleBookBlog.fulfilled, (state, action) => {
                if (!state.blog?.blogs) return;

                const {
                    userId,
                    bookmark,
                    totalBookmarks
                } = action.payload;

                state.blog.blogs.totalBookmarks = totalBookmarks;

                if (bookmark) {
                    if (!state.blog.blogs.bookmarks.includes(userId)) {
                        state.blog.blogs.bookmarks.push(userId);
                    }
                } else {
                    state.blog.blogs.bookmarks =
                        state.blog.blogs.bookmarks.filter(
                            id => String(id) !== String(userId)
                        );
                }
            })
    }
})

export const { clearError } = blogDetailSlice.actions;
export default blogDetailSlice.reducer;