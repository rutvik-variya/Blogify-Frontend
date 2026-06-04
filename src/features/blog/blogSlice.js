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

export const toggleLikeBlog = createAsyncThunk("blog/toggleLikeBlog", async (blogId, thunkAPI) => {
    try {
        const userId = thunkAPI.getState().auth.user.id;

        const response = await axiosInstance.patch(`blog/${blogId}/like`);
        return {
            blogId,
            userId,
            liked: response.data.blog.liked,
            totalLikes: response.data.blog.totalLikes,
        };
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const toggleBookBlog = createAsyncThunk("blog/toggleSaveBlog", async (blogId, thunkAPI) => {
    try {
        const userId = thunkAPI.getState().auth.user.id;
        const response = await axiosInstance.patch(`blog/${blogId}/bookmark`);

        return {
            blogId,
            userId,
            bookmark: response.data.blog.bookmark,
            totalBookmarks: response.data.blog.totalBookMark,
        };

    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message
        );
    }
}
);

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

            // toggle like
            .addCase(toggleLikeBlog.fulfilled, (state, action) => {
                const { blogId, userId, liked, totalLikes } = action.payload;

                const blogsArray = Array.isArray(state.blogs)
                    ? state.blogs
                    : state.blogs.blogs;

                const blog = blogsArray.find(
                    item => item._id === blogId
                );
                if (!blog) return;

                blog.totalLikes = totalLikes;
                if (liked) {
                    if (!blog.likes.includes(userId)) {
                        blog.likes.push(userId);
                    }
                } else {
                    blog.likes = blog.likes.filter(
                        id => String(id) !== String(userId)
                    );
                }
            })

            // toggle save 
            .addCase(toggleBookBlog.fulfilled, (state, action) => {
                const { blogId, userId, bookmark, totalBookmarks, } = action.payload;

                const blogsArray = Array.isArray(state.blogs)
                    ? state.blogs
                    : state.blogs.blogs;

                const blog = blogsArray.find(
                    item => item._id === blogId
                );

                if (!blog) return;

                blog.totalBookmarks = totalBookmarks;

                if (bookmark) {
                    if (!blog.bookmarks.includes(userId)) {
                        blog.bookmarks.push(userId);
                    }
                } else {
                    blog.bookmarks = blog.bookmarks.filter(
                        id => String(id) !== String(userId)
                    );
                }
            })
    }
})

export const { clearError } = blogSlice.actions;
export default blogSlice.reducer;
