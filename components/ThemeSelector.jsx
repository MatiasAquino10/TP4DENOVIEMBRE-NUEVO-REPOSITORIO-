import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const ThemeSelector = () => {
  const toggleTheme = () => {
    console.log('Cambiando tema...');
  };

  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      <Brightness4Icon />
    </IconButton>
  );
};

export default ThemeSelector;
