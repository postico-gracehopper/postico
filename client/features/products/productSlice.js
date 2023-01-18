import axios from 'axios';
import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';

export const fetchProductsAsync = createAsyncThunk(
  '/products/fetchProductsAsync',
  async () => {
    try {
      const { data } = await axios.get('/api/products', {
        headers: { authorization: window.localStorage.getItem('token') },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  '/products/createProduct',
  async ({ name, description, price, image, category }) => {
    try {
      const { data } = await axios.post(
        '/api/products',
        {
          name,
          description,
          price,
          image,
          category,
        },
        { headers: { authorization: window.localStorage.getItem('token') } }
      );
      return data;
    } catch (error) {
      next(error);
    }
  }
);

const initialState = {
  products: [],
  filter: 'All',
  sortBy: '-',
  searchBy: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    changeSortBy(state, action) {
      state.sortBy = action.payload;
    },
    changeSearchBy(state, action) {
      state.searchBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      return state.products.push(action.payload);
    });
  },
});

export const selectProducts = (state) => state.products.products;
export const selectFilter = (state) => state.products.filter;
export const selectSortBy = (state) => state.products.sortBy;
export const selectSearchBy = (state) => state.products.searchBy;

export const sortedAndFilteredProducts = createSelector(
  [selectProducts, selectFilter, selectSortBy, selectSearchBy],
  (products, filter, sortBy, searchBy) => {
    let productsArray = products;

    let filtered =
      filter !== 'All'
        ? productsArray.filter((product) => product.category === filter)
        : productsArray;

    let sorted;

    if (sortBy === '-') {
      sorted = filtered;
    }

    if (sortBy === 'Price: Low to High') {
      sorted = [...filtered].sort((a, b) => (a.price < b.price ? -1 : 0));
    }

    if (sortBy === 'Price: High to Low') {
      sorted = [...filtered].sort((a, b) => (a.price > b.price ? -1 : 0));
    }

    if (searchBy.length > 0) {
      return sorted.filter((product) => {
        if (searchBy === '') {
          return product;
        } else if (
          product.name.toLowerCase().includes(searchBy.toLowerCase())
        ) {
          return product;
        }
      });
    }
    return sorted;
  }
);

export default productsSlice.reducer;
export const { changeFilter, changeSortBy, changeSearchBy } =
  productsSlice.actions;
