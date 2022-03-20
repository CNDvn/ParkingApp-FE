import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, ButtonBase } from '@mui/material';

import { IconBell } from '@tabler/icons';
import { useSelector } from 'react-redux';
import { selectListParkingProcess } from 'components/ParkingProvider/parkingProvider.selector';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from 'config/path';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = (): JSX.Element => {
  const theme = useTheme();
  const listParkingProcess = useSelector(selectListParkingProcess);
  const navigation = useNavigate();
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
        <ButtonBase
          sx={{ borderRadius: '12px' }}
          onClick={(): void => {
            navigation(PATH_NAME.DashboardAdminParkingProcess);
          }}
        >
          <IconBell stroke={1.5} size="1.3rem" />({listParkingProcess.length})
        </ButtonBase>
      </Box>
    </>
  );
};

export default NotificationSection;
