import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../SlideBar/SlideBar';
import Dashboard from './Dashboard/Dashboard';

interface MainLayout {
  children: React.ReactNode;
}
const MainLayout = ({ children }: MainLayout): JSX.Element => {
  const theme = useTheme();
  const [leftDrawerOpened, setLeftDrawerOpened] = useState<boolean>(true);
  const handleLeftDrawerToggle = (): void => {
    setLeftDrawerOpened(!leftDrawerOpened);
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
      <Dashboard leftDrawerOpened={leftDrawerOpened}>
        {/* <TableUser /> */}
        {children}
      </Dashboard>
    </Box>
  );
};

export default MainLayout;
