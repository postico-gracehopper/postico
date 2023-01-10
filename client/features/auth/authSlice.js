import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const TOKEN = 'token';

/*
  THUNKS
*/
export const me = createAsyncThunk('auth/me', async (meState) => {
  const token = window.localStorage.getItem(TOKEN)
  try {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token
      }
    })
    return res.data
    // Change by blake: I believe we want the customer data in state, 
    // even if we have the token (no user data in localstorage.token)
    // if (!token) {
    //   const res = await axios.get('/auth/me', {
    //     headers: {
    //       authorization: token,
    //     },
    //   });
    //   return res.data;
    // } else {
    //   return {};
    // }
  } catch (err) {
    if (err.response.data) {
      // change: was showing error under thunkAPI
      // return thunkAPI.rejectWithValue(err.response.data);
      return err.response.data
    } else {
      return 'There was an issue with your request.';
    }
  }
});

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ username, password, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
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
  return (state.auth.me.username && state.auth.me.id)
}
/*
  REDUCER
*/
export default authSlice.reducer;
