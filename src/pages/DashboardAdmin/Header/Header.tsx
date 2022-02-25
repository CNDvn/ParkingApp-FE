/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTheme } from '@mui/material/styles';
import React from 'react';
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';
// import SearchSection from './SearchSection';
import { Box, ButtonBase, Grid } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';
import LogoSection from '../LogoSection';
import AvatarSection from './NotificationSection/Avatar';
interface IHeader {
  handleLeftDrawerToggle: VoidFunction;
}
const Header = ({ handleLeftDrawerToggle }: IHeader): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        padding={1}
        justifyContent="space-between"
      >
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LogoSection>
              <img src="../../../svg/logo.svg" alt="" srcSet="" />
            </LogoSection>
            <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
              <AvatarSection handleToggle={handleLeftDrawerToggle}>
                <IconMenu2 stroke={1.5} size="1.3rem" />
              </AvatarSection>
            </ButtonBase>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <NotificationSection />
            <ProfileSection />
          </Box>
        </Grid>
      </Grid>
      {/* <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          <LogoSection>
            <img src="../../../svg/logo.svg" alt="" srcSet="" />
          </LogoSection>
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <AvatarSection handleToggle={handleLeftDrawerToggle}>
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </AvatarSection>
        </ButtonBase>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 1 }} />
        <NotificationSection />
        <ProfileSection />
      </Box> */}
    </>
  );
};

export default Header;
