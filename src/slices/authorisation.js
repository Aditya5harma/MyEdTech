import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiConnector } from '../services/apiconnector';
import { setUser } from "../slices/profile";
import { categories } from '../services/apis';

export const loginApiCall = createAsyncThunk(
  "authorisation/loginApiCall",
  async (logindata,{dispatch}) => {
    try {
      
      const response = await apiConnector("POST", categories.LOGIN_API, logindata);
      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        console.log(`response succcesss---${response}`)
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
      ? response.data.user.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response;
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      // console.log("LOGIN API ERROR data...........", error.response.data.message);

      throw new Error(error)
    }
    
  }
);

const initialState = {
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  signupInfo: {}
};

const authorisationSlice = createSlice({
  name: 'authorisation',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setsignupInfo: (state, action) => {
      state.signupInfo = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder

      .addCase(loginApiCall.fulfilled, (state, action) => {
        console.log(`actions.payload  - ${ action.payload.data.token}`);
        state.token = action.payload.data.token;
      })

  }
});

export const { setToken, setsignupInfo } = authorisationSlice.actions;
export default authorisationSlice.reducer;
