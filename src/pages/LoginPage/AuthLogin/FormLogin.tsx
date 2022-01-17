import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormikProps } from 'formik';
import React, { FocusEvent, useState } from 'react';
import { LoginContentType } from './FormLogin.type';
import { useStyles } from './style';

interface PropsFormLogin {
  formik: FormikProps<LoginContentType>;
}

const FormLogin: React.FC<PropsFormLogin> = ({ formik }: PropsFormLogin) => {
  const [checked, setChecked] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    formik;

  const theme = useTheme();
  
  const matchSM = useMediaQuery(theme.breakpoints.only('sm'));
  
  const classes = useStyles();
  
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <form onSubmit={handleSubmit}>
          {/* input email */}
          <FormControl
            fullWidth
            className={classes.formControl}
            error={Boolean(touched.username && errors.username)}
          >
            <InputLabel htmlFor="outlined-adornment-email-login">
              Username
            </InputLabel>
            <OutlinedInput
              className={classes.input}
              id="outlined-adornment-email-login"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                handleChange(e);
              }}
              onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                handleBlur(e);
              }}
              value={values.username}
              name="username"
              label="Username"
              inputProps={{}}
            />
            {touched.username && errors.username && (
              <FormHelperText
                error
                id="standard-weight-helper-text-username-login"
              >
                {errors.username}
              </FormHelperText>
            )}
          </FormControl>
          {/* input password */}
          <FormControl
            fullWidth
            className={classes.formControl}
            error={Boolean(touched.password && errors.password)}
          >
            <InputLabel htmlFor="outlined-adornment-password-login">
              Password
            </InputLabel>
            <OutlinedInput
              className={classes.input}
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                handleChange(e);
              }}
              onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                handleBlur(e);
              }}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(): void => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>
          {/* button sign in*/}
          <Box sx={{ mt: 1 }}>
            <Button
              disableElevation
              className={classes.button}
              fullWidth
              size="large"
              type="submit"
            >
              Sign in
            </Button>
          </Box>
        </form>
      </Box>
      {/* forget password */}
      <Stack
        direction={matchSM ? 'column' : 'row'}
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                setChecked(event.target.checked)
              }
              name="checked"
              color="primary"
            />
          }
          label="Remember me"
        />
        <Typography
          component="h6"
          color="secondary"
          sx={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          Forgot Password?
        </Typography>
      </Stack>
    </>
  );
};

export default FormLogin;
