import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Input, IconButton } from '@mui/material';
import { useState } from 'react';

function SearchBar({ placeholder, onChange, searchBarWidth }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <SearchIcon sx={{ marginRight: '10px' }} />
      <Input
        placeholder={placeholder}
        onChange={onChange}
        sx={{
          width: searchBarWidth,
          color: 'rgba(0, 0, 0, 0.6)',
          fontSize: '1.1rem',
        }}
        disableUnderline
      ></Input>
    </Box>
  );
}

export default SearchBar;
