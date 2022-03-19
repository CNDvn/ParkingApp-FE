import React from 'react';
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
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { logout } from 'components/UserProvider/userProvider.service';
import { restAPI } from 'config/api';
import { toast } from 'react-toastify';
import IconBan from '../../../images/ban.png';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
  const handleLogout = async (): Promise<void> => {
    await logout(restAPI);
  };
  const navigate = useNavigate();
  const drawer = (
    <>
      <Box sx={{ width: 400, mt: '20px' }} role="presentation">
        <List>
          <Divider />
          <ListItem
            button
            selected={selectedIndex === 0}

            // onClick={(event): void => {
            //   handleListItemClick(event, 0);
            //   navigate(PATH_NAME.DashboardAdminUser);
            // }}
          >
            <ListItemIcon>
              <PersonIcon sx={{ fontSize: '32px' }} />
            </ListItemIcon>
            <ListItemText>User</ListItemText>
            <ListItemIcon>
              <ArrowDropDownIcon sx={{ fontSize: '32px' }} />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event): void => {
              handleListItemClick(event, 4);
              navigate(PATH_NAME.DashboardAdminBanUser);
            }}
          >
            <ListItemIcon>
              <img
                src={IconBan}
                alt=""
                srcSet=""
                style={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText>Ban User</ListItemText>
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
              <LocalParkingIcon sx={{ fontSize: '32px' }} />
            </ListItemIcon>
            <ListItemText>Parking</ListItemText>
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
              <AccountBalanceWalletIcon sx={{ fontSize: '32px' }} />
            </ListItemIcon>
            <ListItemText>Wallet</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Box>
      <Button
        onClick={(): void => {
          handleLogout();
          navigate('/');
          localStorage.clear();
          toast('🦄 Good bye admin', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
