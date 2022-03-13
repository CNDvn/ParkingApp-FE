import { Grid, Typography } from '@mui/material';
import { selectListParkingProcess } from 'components/ParkingProvider/parkingProvider.selector';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CardParkingProcess from './cardParkingProcess';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { IParkingNotify } from 'models/base';
import { Status } from 'models/parking';
import { fetchListStatus } from 'components/RoleProvider/roleProvider.service';
import { restAPI } from 'config/api';

const TableParkingProcess = (): JSX.Element => {
  const listParkingProcess = useSelector(selectListParkingProcess);
  const [status, setStatus] = useState<Status[]>([]);
  const [pagnigation, setPagnigation] = useState<IParkingNotify>({
    sizePage: 5,
    currentPage: 1,
    field: 'firstName',
    sort: 'DESC',
    status: 'processing',
  });
  React.useEffect(() => {
    const callAPI = async (): Promise<void> => {
      const data = await fetchListStatus(restAPI);
      setStatus(data.result);
    };
    callAPI();
  }, []);
  const handleChangeStatus = (): void => {
    setPagnigation({ ...pagnigation });
  };
  return (
    <div>
      <Typography variant="h2" textAlign="center">
        List Parking Process
      </Typography>
      <Grid item xs={4}>
        <ToggleButtonGroup
          color="primary"
          value={pagnigation.status}
          exclusive
          onChange={handleChangeStatus}
        >
          {[...status, { status: 'no' }].map((item, id) => {
            return (
              <ToggleButton key={id} value={item.status}>
                {item.status}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Grid>
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
      </Grid>
    </div>
  );
};

export default TableParkingProcess;
