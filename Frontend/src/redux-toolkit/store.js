import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../redux-toolkit/features/authSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    devTools: true,
});
