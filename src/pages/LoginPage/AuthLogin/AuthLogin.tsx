import {
  Box,
  Button,
  Divider,
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'firebaseConfig/firebaseConfig';
import React from 'react';
import FormLoginLogic from './FormLogin.logic';

const AuthLogin = (): JSX.Element => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const loginGG = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth,provider);
    console.log(data);
  };
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <FormLoginLogic />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: '1px solid rgba(0, 0, 0, 0.12)',
              }}
              disableRipple
              disabled
            >
              OR
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Hidden only="sm">
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                Enter your credentials to continue
              </Typography>
            </Box>
          </Grid>
        </Hidden>

        <Grid item xs={12}>
          <Button
            disableElevation
            fullWidth
            size="medium"
            variant="outlined"
            sx={{
              color: 'grey.700',
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100],
            }}
            onClick={():void=>{loginGG();}}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }} >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 }, mt: '2px' }}>
                <img
                  width={30}
                  height={30}
                  src="https://img.icons8.com/color/96/000000/google-logo.png"
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: (): object => ({
                    sm: '10px',
                    md: '20px',
                  }),
                }}
              >
                {' '}
                Sign in with Google
              </Typography>
            </Box>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthLogin;
