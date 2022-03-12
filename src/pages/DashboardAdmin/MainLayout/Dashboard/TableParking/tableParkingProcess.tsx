import { Grid, Typography } from '@mui/material';
import { selectListParkingProcess } from 'components/ParkingProvider/parkingProvider.selector';
import React from 'react';
import { useSelector } from 'react-redux';
import CardParkingProcess from './cardParkingProcess';

const TableParkingProcess = (): JSX.Element => {
  const listParkingProcess = useSelector(selectListParkingProcess);
  return (
    <div>
      <Typography variant="h2" textAlign="center">
        List Parking Process
      </Typography>
      <Grid
        container
        spacing={1}
        alignItems="center"
        padding={7}
        direction="row"
        justifyContent="center"
      >
        {listParkingProcess.map((itemParking, index) => {
          return (
            <Grid item xs={6} md={3} key={index}>
              <CardParkingProcess parking={itemParking} />
            </Grid>
          );
        })}
        <Grid item xs={6} md={3}>
          <h1>dsad</h1>
        </Grid>
        <Grid item xs={6} md={3}>
          <h1>dassad</h1>
        </Grid>
        <Grid item xs={6} md={3}>
          <h1>dassad</h1>
        </Grid>
      </Grid>
    </div>
  );
};

export default TableParkingProcess;
