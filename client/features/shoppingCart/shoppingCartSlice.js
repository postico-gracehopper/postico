import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetches this user's shopping cart
export const fetchAllUserItemsAsync = createAsyncThunk(
  'GET AllUserItems',
  async (userId) => {
    const { data } = await axios.get(`/api/users/${userId}/cart`, {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    return data;
  }
);

export const ChangeQuantityAsync = createAsyncThunk(
  'PUT order',
  async (inputs) => {
    // console.log('ENTER THUNK');
    const { data } = await axios.put('/api/orders/', inputs, {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    return data;
  }
);

const initialState = {
  orderItems: {},
  subTotal: 0,
  cartId: -1,
  isFetching: true,
  error: null,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUserItemsAsync.fulfilled, (state, action) => {
      console.log('ACTION-PAYLOAD | FETCH CART ', action.payload);
      state.orderItems = action.payload.orderItems;
      state.subTotal = +action.payload.total;
      state.cartId = action.payload.cartId;
    });
    builder.addCase(ChangeQuantityAsync.fulfilled, (state, action) => {
      console.log('ACTION.PAYLOAD | QTY CHANGE ', action.payload);
      const { orderItem, orderSubTotal } = action.payload;
      state.orderItems = [...state.orderItems].map((item) => {
        if (item.orderItemId === orderItem.id) {
          item.quantity = orderItem.quantity;
          const num = +orderItem.product.price;
          item.totalItemPrice = orderItem.quantity * num;
        }
        return item;
      });
      state.subTotal = [...state.orderItems].reduce((acc, item) => {
        const num = +item.totalItemPrice;
        return acc + num;
      }, 0);
    });
  },
});

export default shoppingCartSlice.reducer;

/*
  SELECTOR
*/

export const selectShoppingCart = (state) => {
  return state.shoppingCart.orderItems;
};

export const selectSubTotal = (state) => {
  return state.subTotal;
};

export const selectCartId = (state) => {
  return state.cartId;
};
