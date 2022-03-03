import React from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'constants/breakpoint';
import { useTheme } from '@mui/material/styles';
import MainCard from 'pages/ui-component/cards/MainCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //
interface IDashboard {
  leftDrawerOpened?: boolean;
  children: React.ReactNode;
}
const Dashboard = ({ leftDrawerOpened, children }: IDashboard): JSX.Element => {
  const theme = useTheme();

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
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sx={{ paddingLeft: '0px !important' }}>
            <MainCard
              border={false}
              elevation={16}
              content={false}
              boxShadow
              shadow={theme.shadows[16]}
            >
              {children}
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
