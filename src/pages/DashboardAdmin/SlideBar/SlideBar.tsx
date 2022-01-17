import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Drawer, Theme, useMediaQuery } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { drawerWidth } from 'constants/breakpoint';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from 'config/path';

interface ISidebar {
  handleLeftDrawerToggle: VoidFunction;
  leftDrawerOpened: boolean;
}

const Sidebar = ({
  handleLeftDrawerToggle,
  leftDrawerOpened,
}: ISidebar): JSX.Element => {
  const theme: Theme = useTheme();
  const matchUpMd: boolean = useMediaQuery(theme.breakpoints.up('md'));
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ): void => {
    setSelectedIndex(index);
  };
  const navigate = useNavigate();
  const drawer = (
    <>
      <Box sx={{ width: 250, mt: '20px' }} role="presentation">
        <List>
          <Divider />
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event): void => {
              handleListItemClick(event, 0);
              navigate(PATH_NAME.DashboardAdminUser);
            }}
          >
            <ListItemIcon>
              <PersonIcon sx={{ fontSize: '32px' }} />
            </ListItemIcon>
            <ListItemText>User</ListItemText>
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event): void => {
              handleListItemClick(event, 1);
              navigate(PATH_NAME.DashboardAdminParking);
            }}
          >
            <ListItemIcon>
              <img
                src="../../../../images/signage.png"
                alt=""
                srcSet=""
                width="40px"
                height="40px"
              />
            </ListItemIcon>
            <ListItemText>Paring</ListItemText>
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event): void => {
              handleListItemClick(event, 2);
              navigate(PATH_NAME.DashboardAdminPayment);
            }}
          >
            <ListItemIcon>
              <img
                src="../../../../images/wallet.png"
                alt=""
                srcSet=""
                width="40px"
                height="40px"
              />
            </ListItemIcon>
            <ListItemText>Paring</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Box>
      <Button
        onClick={(): void => {
          navigate('/');
        }}
      >
        Logout
      </Button>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { md: 0 },
        width: matchUpMd ? drawerWidth : 'auto',
        zIndex: '100',
        display: leftDrawerOpened ? 'block' : 'none',
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={leftDrawerOpened}
        onClose={handleLeftDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            [theme.breakpoints.up('md')]: {
              top: '88px',
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {/* <Fade in={leftDrawerOpened}>{drawer}</Fade> */}
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
