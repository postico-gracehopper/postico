import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsersAsync = createAsyncThunk(
  '/users/fetchUsersAsync',
  async () => {
    try {
      const { data } = await axios.get('/api/users', 
      {headers: {authorization: window.localStorage.getItem("token")}});
      return data;
    } catch (error) {
      next(error);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;

export const selectUsers = (state) => state.users;
