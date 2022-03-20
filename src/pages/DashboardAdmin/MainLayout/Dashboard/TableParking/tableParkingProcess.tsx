/* eslint-disable no-unused-vars */
import { Box, Grid, Typography } from '@mui/material';
import {
  selectListParkingProcess,
  selectMessageParkingProcess,
} from 'components/ParkingProvider/parkingProvider.selector';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardParkingProcess from './cardParkingProcess';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { IParkingNotify } from 'models/base';
import { fetchParkingProcess } from 'components/ParkingProvider/parkingProvider.action';
import { useAppSelector } from 'hook/hookRedux';
import { toast } from 'react-toastify';

const TableParkingProcess = (): JSX.Element => {
  const listParkingProcess = useSelector(selectListParkingProcess);
  const dispatch = useDispatch();
  const message = useAppSelector(selectMessageParkingProcess);
  const [pagnigation, setPagnigation] = useState<IParkingNotify>({
    sizePage: 5,
    currentPage: 1,
    field: 'firstName',
    sort: 'DESC',
    status: 'processing',
  });
  React.useEffect(() => {
    dispatch(fetchParkingProcess(pagnigation));
  }, [pagnigation, message]);
  const handleChangeStatus = (
    event: React.MouseEvent<HTMLElement>,
    value: 'processing' | 'reject'
  ): void => {
    setPagnigation({ ...pagnigation, status: value });
  };
  React.useEffect(() => {
    if (message !== '') {
      toast.success(message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [message]);
  return (
    <div>
      <Typography variant="h2" textAlign="center">
        List Parking Process
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ToggleButtonGroup
          color="primary"
          value={pagnigation.status}
          exclusive
          onChange={handleChangeStatus}
        >
          {[{ status: 'processing' }, { status: 'reject' }].map((item, id) => {
            return (
              <ToggleButton key={id} value={item.status}>
                {item.status}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>
      <Grid
        container
        spacing={1}
        alignItems="center"
        padding={7}
        direction="row"
        justifyContent="flex-start"
      >
        {listParkingProcess.map((itemParking, index) => {
          return (
            <Grid item xs={6} md={4} key={index}>
              <CardParkingProcess parking={itemParking} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default TableParkingProcess;
