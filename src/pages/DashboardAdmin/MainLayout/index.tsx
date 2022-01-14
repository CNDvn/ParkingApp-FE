import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import Header from '../Header/Header';
// import SwipeableTemporaryDrawer from '../SlideBar/SlideBar';
import Sidebar from '../SlideBar/SlideBar';

const MainLayout = (): JSX.Element => {
  const theme = useTheme();
  const [leftDrawerOpened, setleftDrawerOpened] = useState(false);
  const handleLeftDrawerToggle = (): void => {
    setleftDrawerOpened(!leftDrawerOpened);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.common.backgroundColorAdmin,
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>
      {/* drawer */}
      <Sidebar
        leftDrawerOpened={leftDrawerOpened}
        handleLeftDrawerToggle={handleLeftDrawerToggle}
      />
    </Box>
  );
};

export default MainLayout;
