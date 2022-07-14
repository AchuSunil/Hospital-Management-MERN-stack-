import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AXIOS from "../../axios";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isMessage: "",
    isLoading: false,
};

//Register User
export const registerUser = createAsyncThunk("/signup", async (userData, thunkAPI) => {
    console.log(userData, "dsfsafsf");
    const data = {
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
    };
    try {
        const response = await AXIOS.post("/signup", data);
        // if (response.data) {
        //     // localStorage.setItem("user", JSON.stringify(response.data));
        // thunkAPI.dispatch()
        // }
        console.log(response.data,'///response');
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const authSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.isMessage = "";
        },
    },
    extraReducers: {
        [registerUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
         
        },
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.rejected]: (state, action) => {
            state.error = true;
            state.isLoading = false;
            state.isMessage = action.payload;
            state.user = null;
        },
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
