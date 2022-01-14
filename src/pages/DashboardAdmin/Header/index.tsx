import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';
import SearchSection from './SearchSection';
const Header = (): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          <img src="../../../svg/logo.svg" alt="" srcSet="" />
        </Box>
      </Box>

      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      <NotificationSection />
      <ProfileSection />
    </>
  );
};

export default Header;
