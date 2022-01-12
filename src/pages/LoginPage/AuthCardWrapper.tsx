import { Box } from '@mui/material';
import React from 'react';
import MainCard from './MainCard';
interface PropsChildren {
  children: React.ReactNode;
}
const AuthCardWrapper = ({ children }: PropsChildren): JSX.Element => {
  return (
    <MainCard
      content={false}
      sx={{
        maxWidth: { xs: 400, lg: 475 },
        margin: { xs: 2.5, md: 3 },
        '& > *': {
          flexGrow: 1,
          flexBasis: '50%',
        },
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
};

export default AuthCardWrapper;
