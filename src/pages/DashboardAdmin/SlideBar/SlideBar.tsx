import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Theme, useMediaQuery } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { drawerWidth } from 'constants/breakpoint';

// import Fade from '@mui/material/Fade';
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

  const drawer = (
    <>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
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
