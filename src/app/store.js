import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categorReducer from "../features/category/categorySlice"
import blogReducer from "../features/blog/blogSlice"
import blogDetailReducer from "../features/blog/blogDetailSlice";
import commentReducer from "../features/comment/commentSlice"
import createBlogReducer from "../features/blog/blogPostSlice"
import dashboardReducer from "../features/dashboard/userDashboardSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import createWebStorage from "redux-persist/es/storage/createWebStorage";

const storage = createWebStorage("local");

const persistConfig = {
    key: "auth",
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,
    authReducer
);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        category: categorReducer,
        blog: blogReducer,
        blogDetail: blogDetailReducer,
        comment: commentReducer,
        createBlog: createBlogReducer,
        dashboard: dashboardReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);