import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, ButtonBase } from '@mui/material';

import { IconBell } from '@tabler/icons';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = (): JSX.Element => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2,
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <IconBell stroke={1.5} size="1.3rem" />
        </ButtonBase>
      </Box>
    </>
  );
};

export default NotificationSection;
