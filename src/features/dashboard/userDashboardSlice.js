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

export const getRecentBlogs = createAsyncThunk(
    "dashboard/getRecentBlogs",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("dashboard/recent-blogs");
            return res.data.result;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const getBookmarkBlogs = createAsyncThunk(
    "dashboard/getBookmarkBlogs",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("dashboard/bookmark-blogs");
            return res.data.result;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch bookmarks"
            );
        }
    }
);

export const getRecentActivity = createAsyncThunk(
    "dashboard/getRecentActivity",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("dashboard/activity");
            return res.data.result;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch bookmarks"
            );
        }
    }
);

export const getMyBlogs = createAsyncThunk(
    "dashboard/getMyBlogs",
    async (status = "", thunkAPI) => {
        try {
            const res = await axiosInstance.get("dashboard/my-blogs", {
                params: {
                    status
                }
            });
            return res.data.result;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

export const deleteBlog = createAsyncThunk(
    "dashboard/deleteBlog",
    async (blogId, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`/blog/${blogId}`);
            return {
                blogId,
                message: res.data.message,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete blog"
            );
        }
    }
);

export const editBlog = createAsyncThunk(
    "dashboard/editBlog",
    async ({ blogId, formData }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`/blog/${blogId}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return res.data.blog;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to edit blog"
            );
        }
    }
);

// Connected directly to: PATCH /api/blog/:id/status
export const updateBlogStatus = createAsyncThunk(
    "dashboard/updateBlogStatus",
    async ({ blogId, status }, thunkAPI) => {
        try {
            const res = await axiosInstance.patch(`/blog/${blogId}/status`, { status });
            return res.data.blog;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update blog status"
            );
        }
    }
);

const initialState = {
    stats: null,
    recentBlogs: [],
    bookmarkBlogs: [],
    recentActivity: [],
    myBlogs: [],

    loading: false,
    recentLoading: false,
    bookmarkLoading: false,
    recentActivityLoading: false,
    myBlogsLoading: false,
    deleteLoading: false,
    statusUpdateLoading: false,

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
            })

            // recentblogs
            .addCase(getRecentBlogs.pending, (state) => {
                state.recentLoading = true;
            })
            .addCase(getRecentBlogs.fulfilled, (state, action) => {
                state.recentLoading = false;
                state.recentBlogs = action.payload;
            })
            .addCase(getRecentBlogs.rejected, (state, action) => {
                state.recentLoading = false;
                state.error = action.payload;
            })

            // bookmark 
            .addCase(getBookmarkBlogs.pending, (state) => {
                state.bookmarkLoading = true;
            })
            .addCase(getBookmarkBlogs.fulfilled, (state, action) => {
                state.bookmarkLoading = false;
                state.bookmarkBlogs = action.payload;
            })
            .addCase(getBookmarkBlogs.rejected, (state, action) => {
                state.bookmarkLoading = false;
                state.error = action.payload;
            })

            // recentActivity
            .addCase(getRecentActivity.pending, (state) => {
                state.recentActivityLoading = true;
            })
            .addCase(getRecentActivity.fulfilled, (state, action) => {
                state.recentActivityLoading = false;
                state.recentActivity = action.payload;
            })
            .addCase(getRecentActivity.rejected, (state, action) => {
                state.recentActivityLoading = false;
                state.error = action.payload;
            })

            // get my blog
            .addCase(getMyBlogs.pending, (state) => {
                state.myBlogsLoading = true;
            })
            .addCase(getMyBlogs.fulfilled, (state, action) => {
                state.myBlogsLoading = false;
                state.myBlogs = action.payload;
            })
            .addCase(getMyBlogs.rejected, (state, action) => {
                state.myBlogsLoading = false;
                state.error = action.payload;
            })

            // delete blog
            .addCase(deleteBlog.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.myBlogs = state.myBlogs.filter(
                    (blog) => blog._id !== action.payload.blogId
                );
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })

            // edit blog
            .addCase(editBlog.pending, (state) => {
                state.loading = true;
            })
            .addCase(editBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.myBlogs = state.myBlogs.map((blog) =>
                    blog._id === action.payload._id ? action.payload : blog
                );
            })
            .addCase(editBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Status lifecycle
            .addCase(updateBlogStatus.pending, (state) => {
                state.statusUpdateLoading = true;
            })
            .addCase(updateBlogStatus.fulfilled, (state, action) => {
                state.statusUpdateLoading = false;
                state.myBlogs = state.myBlogs.map((blog) =>
                    blog._id === action.payload._id ? action.payload : blog
                );
            })
            .addCase(updateBlogStatus.rejected, (state, action) => {
                state.statusUpdateLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;