import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AXIOS from "../../axios";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isMessage: "",
    isLoading: false,
};

//Register User
export const registerUser = createAsyncThunk("/signup", async (userData, thunkAPI) => {
    const data = {
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        password: userData.password,
        phone: userData.phone,
    };
    try {
        const response = await AXIOS.post("/signup", data);

        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//Login User
export const loginUser = createAsyncThunk("/signin", async (userData, thunkAPI) => {
    const data = {
        email: userData.email,
        password: userData.password,
    };
    try {
        const response = await AXIOS.post("/signin", data);
        if (response.data) {
            const { _id, name, email, token } = response.data;
            localStorage.setItem("userInfo", JSON.stringify({ _id, name, email, token }));
        }
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const userReducer = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.isMessage = null;
        },
    },
    extraReducers: {
        [registerUser.fulfilled]: (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.isMessage = action.payload.message;
        },
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isMessage = action.payload;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
            state.isMessage = action.payload.message;
        },
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isMessage = action.payload;
        },
    },
});

export const { reset } = userReducer.actions;
export default userReducer.reducer;
