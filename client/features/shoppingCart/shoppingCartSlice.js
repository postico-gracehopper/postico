import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetches this user's shopping cart
export const fetchAllUserItemsAsync = createAsyncThunk(
  'GET AllUserItems',
  async (userId) => {
    // console.log('****** THUNK ENTER *******');
    // console.log('USERID: ', userId);
    const { data } = await axios.get(`/api/users/${userId}/cart`);
    // console.log('🚀 ~ file: shoppingCartSlice.js:12 ~ data', data);
    return data;
  }
);

export const ChangeQuantityAsync = createAsyncThunk(
  'PUT order',
  async (inputs) => {
    console.log('****** QTY THUNK ENTER *******');
    console.log('🚀 ~ file: shoppingCartSlice.js:19 ~ inputs', inputs);

    const { data } = await axios.put('/api/orders/', inputs);
    console.log('🚀 ~ file: shoppingCartSlice.js:23 ~ data', data);

    return data;
  }
);

// export const removeQuantityAsync = createAsyncThunk(
//   'PUT order',
//   async (orderItemId, num) => {
//     const { data } = await axios.put('/api/order/', { orderItemId, num });
//     return data;
//   }
// );

const initialState = {
  orderItems: {},
  subTotal: 0,
  isFetching: true,
  error: null,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUserItemsAsync.fulfilled, (state, action) => {
      state.orderItems = action.payload.orderItems;
      state.subTotal = action.payload.total;
    });
    builder.addCase(ChangeQuantityAsync.fulfilled, (state, action) => {
      console.log('ACTION.PAYLOAD>>>>>: ', action.payload);
      const { orderItem, orderSubTotal } = action.payload;
      state.orderItems = [...state.orderItems].map((item) => {
        if (item.id === orderItem.id) {
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
