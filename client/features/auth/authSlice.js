import { createSlice, createAsyncThunk, dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const TOKEN = 'token';

/*
  THUNKS
*/
export const me = createAsyncThunk('auth/me', async (meState, thunkAPI) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    if (!token && res.data.token) {
      window.localStorage.setItem(TOKEN, res.data.token);
    }
    return res.data;
  } catch (err) {
    if (err.response.data === 'bad token') {
      window.localStorage.removeItem(TOKEN);
      thunkAPI.dispatch(me());
    }
  }
});

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ username, password, email, method }, thunkAPI) => {
    try {
      if (method === 'Login') {
        const res = await axios.post(`/auth/login`, { username, password });
      } else {
        const res = await axios.post(`/auth/signup`, {
          username,
          password,
          email,
        });
      }
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me());
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return 'There was an issue with your request.';
      }
    }
  }
);

/*
  SLICE
*/
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    me: {},
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
      // add functionality to request a new token (call auth/me) immediately
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      if (
        Object.keys(action.payload).includes('token') &&
        Object.keys(action.payload).length === 1
      ) {
        ('');
      } else {
        state.me = action.payload;
      }
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

/*
  ACTIONS
*/
export const { logout } = authSlice.actions;

export const isLoggedIn = (state) => {
  return state.auth.me.username && state.auth.me.id;
};
/*
  REDUCER
*/
export default authSlice.reducer;
/*
  SELECTOR
*/
export const selectMe = (state) => {
  return state.auth.me;
};
