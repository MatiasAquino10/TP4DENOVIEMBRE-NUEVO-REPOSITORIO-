import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import ThemeSelector from './ThemeSelector'; // Asumo que este componente ya existe

const Header = () => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/path/to/logo.png" // Reemplazar con la ruta real de la imagen
            alt="SGA Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Sistema de Gestión Académica (SGA)
          </Typography>
        </Box>
        <ThemeSelector />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
