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

export const addToCartAsync = createAsyncThunk(
  'POST AddToCart',
  async (productInfo, thunkAPI) => {
    const { data } = await axios.post('/api/orders', productInfo, {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    thunkAPI.dispatch(fetchAllUserItemsAsync(productInfo.userId));
  }
);

export const ChangeQuantityAsync = createAsyncThunk(
  'PUT order',
  async (inputs) => {
    const { data } = await axios.put('/api/orders/', inputs, {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    return data;
  }
);

export const RemoveItemAsync = createAsyncThunk(
  'DELETE OrderItem',
  async (orderItemId) => {
    const { data } = await axios.delete(`/api/orders/`, {
      headers: { authorization: window.localStorage.getItem('token') },
      data: { orderItemId: orderItemId },
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
  reducers: {
    emptyCart(state, action) {
      state.orderItems = {};
      state.subTotal = 0;
      state.cartId = -1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUserItemsAsync.fulfilled, (state, action) => {
      // console.log('ACTION-PAYLOAD | FETCH CART ', action.payload);
      state.orderItems = action.payload.orderItems;
      state.subTotal = +action.payload.total;
      state.cartId = action.payload.cartId;
      state.orderItems = [...state.orderItems].map((item) => {
        const price = +item.price;
        item.totalItemPrice = price * item.quantity;
        return item;
      });
      state.subTotal = [...state.orderItems].reduce((acc, item) => {
        const num = +item.totalItemPrice;
        return acc + num;
      }, 0);
    });
    builder.addCase(ChangeQuantityAsync.fulfilled, (state, action) => {
      // console.log('ACTION.PAYLOAD | QTY CHANGE ', action.payload);
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
    builder.addCase(RemoveItemAsync.fulfilled, (state, action) => {
      state.orderItems = [...state.orderItems].filter(
        (item) => item.orderItemId !== action.payload.id
      );
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

export const { emptyCart } = shoppingCartSlice.actions;
