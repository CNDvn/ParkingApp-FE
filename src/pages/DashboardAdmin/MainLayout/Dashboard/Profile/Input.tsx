/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React from 'react';
import { useStyles } from './Style';
interface IInputCustoms {
  touched: boolean;
  error: string;
  value: string;
  name: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  disable: boolean;
}
const InputCustoms = ({
  touched,
  error,
  value,
  name,
  label,
  handleChange,
  handleBlur,
  disable,
}: IInputCustoms): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <FormControl
        fullWidth
        sx={{ m: 1 }}
        className={classes.formControl}
        error={Boolean(touched && error)}
      >
        <InputLabel htmlFor="outlined-adornment-email-login">
          {label}
        </InputLabel>
        <OutlinedInput
          disabled={disable}
          className={classes.input}
          id="outlined-adornment-email-login"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            handleChange(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>): void => {
            handleBlur(e);
          }}
          value={value}
          name={name}
          label={label}
          inputProps={{}}
        />
        {touched && error && (
          <FormHelperText error id="standard-weight-helper-text-username-login">
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default InputCustoms;
