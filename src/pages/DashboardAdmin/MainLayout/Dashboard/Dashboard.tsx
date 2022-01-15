/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import React from 'react';
// material-ui
import { Grid } from '@mui/material';
import { gridSpacing } from 'constants/breakpoint';
import { useTheme } from '@mui/material/styles';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = (): JSX.Element => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid
      container
      spacing={gridSpacing}
      sx={{
        bgcolor: theme.palette.common.backgroundColorDashboard,
        marginTop: '88px',
        marginRight: '20px',
      }}
    >
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <h1>hello world</h1>
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <h1>hello world</h1>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <h1>hello world</h1>
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <h1>hello world</h1>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <h1>hello world</h1>
          </Grid>
          <Grid item xs={12} md={4}>
            <h1>hello world</h1>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
