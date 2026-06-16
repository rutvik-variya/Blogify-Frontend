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
);

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (userId, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`/admin/users/${userId}`);

            return {
                userId,
                message: res.data.message,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete user"
            );
        }
    }
);

export const fetchCategory = createAsyncThunk(
    "admin/fetchCategory",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/category");
            return response.data.categories;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch categories"
            );
        }
    }
);

export const addCategory = createAsyncThunk(
    "admin/addCategory",
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                "admin/category",
                formData
            );

            return response.data.category;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to add category"
            );
        }
    }
);

export const editCategory = createAsyncThunk(
    "admin/editCategory",
    async ({ categoryId, formData }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`/admin/category/${categoryId}`, formData)
            return res.data.category;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to edit category"
            );
        }
    }
)

export const deleteCategory = createAsyncThunk(
    "admin/deleteCategory",
    async (categoryId, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`/admin/category/${categoryId}`);
            return {
                categoryId,
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

export const fetchBlog = createAsyncThunk(
    "admin/fetchBlog",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/admin/blog");
            return response.data.blogs;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch categories"
            );
        }
    }
);

export const deleteBlog = createAsyncThunk(
    "admin/deleteBlog",

    async (blogId, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`/admin/blog/${blogId}`);
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


const initialState = {
    stats: null,
    users: [],
    categories: [],
    blogs: [],

    loading: false,
    userLoading: false,
    deleteUserLoading: false,
    categoryLoading: false,
    deleteLoading: false,
    blogsLoding: false,


    error: null,
};

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
                state.stats = action.payload;
            })
            .addCase(getAdminStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // manage user
            .addCase(getAllUsers.pending, (state) => {
                state.userLoading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.userLoading = false;
                state.users = action.payload.users;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.userLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteUser.pending, (state) => {
                state.deleteUserLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.deleteUserLoading = false;

                state.users = state.users.filter(
                    (user) => user._id !== action.payload.userId
                );
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteUserLoading = false;
                state.error = action.payload;
            })

            // manage category
            .addCase(fetchCategory.pending, (state) => {
                state.categoryLoading = true;
                state.error = null;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.categoryLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.categoryLoading = false;
                state.error = action.payload;
            })

            .addCase(addCategory.pending, (state) => {
                state.categoryLoading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categoryLoading = false;
                state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.categoryLoading = false;
                state.error = action.payload;
            })

            .addCase(editCategory.pending, (state) => {
                state.loading = true;
            })

            .addCase(editCategory.fulfilled, (state, action) => {
                state.loading = false;

                state.categories = state.categories.map((category) =>
                    category._id === action.payload._id ? action.payload : category
                );
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteCategory.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.categories = state.categories.filter(
                    (categories) => categories._id !== action.payload.categoryId
                );
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })

            // manage Blog

            .addCase(fetchBlog.pending, (state) => {
                state.blogsLoding = true;
                state.error = null;
            })
            .addCase(fetchBlog.fulfilled, (state, action) => {
                state.blogsLoding = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlog.rejected, (state, action) => {
                state.blogsLoding = false;
                state.error = action.payload;
            })

            .addCase(deleteBlog.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.deleteLoading = false;

                state.blogs = state.blogs.filter(
                    (blog) => blog._id !== action.payload.blogId
                );
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
    },
});

export const { clearError } = adminDashBoardSlice.actions;

export default adminDashBoardSlice.reducer;