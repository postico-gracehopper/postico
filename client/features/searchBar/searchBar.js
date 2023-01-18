import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Input, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  sortedAndFilteredProducts,
  changeSearchBy,
} from '../products/productSlice';
import { TroubleshootOutlined } from '@mui/icons-material';

function SearchBar() {
  const products = useSelector(sortedAndFilteredProducts);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(changeSearchBy(e.target.value));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <SearchIcon sx={{ marginRight: '10px' }} />
      <Input
        className="font-plex text-tahiti tracking-widest italic"
        placeholder="Search products"
        fullWidth={true}
        onChange={handleSearch}
        sx={{
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '1rem',
        }}
      ></Input>
    </Box>
  );
}

export default SearchBar;
