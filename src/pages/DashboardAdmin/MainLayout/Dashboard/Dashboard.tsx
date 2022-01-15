/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import React from 'react';
// material-ui
import { Grid } from '@mui/material';
import { gridSpacing } from 'constants/breakpoint';
import { useTheme } from '@mui/material/styles';
import TableUser from './TableUser/tableUser';
import MainCard from 'pages/ui-component/cards/MainCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //
interface IDashboard {
  leftDrawerOpened: boolean;
}
const Dashboard = ({ leftDrawerOpened }: IDashboard): JSX.Element => {
  const theme = useTheme();
  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  return (
    <Grid
      container
      spacing={gridSpacing}
      sx={{
        bgcolor: theme.palette.common.backgroundColorDashboard,
        marginTop: '100px',
        marginRight: '20px',
        marginLeft: leftDrawerOpened ? '0px' : '20px',
        borderRadius: '12px',
        minHeight: 'calc(100vh - 88px)',
        padding: '20px',
      }}
    >
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <h1>hello world</h1>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <h1>hello world</h1>
          </Grid>
        </Grid>
      </Grid> */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              border={false}
              elevation={16}
              content={false}
              boxShadow
              shadow={theme.shadows[16]}
            >
              <TableUser />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
