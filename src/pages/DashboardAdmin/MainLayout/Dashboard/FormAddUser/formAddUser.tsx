import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Avatar, Button, TextField } from '@mui/material';
import { stringAvatar } from 'utils/handleAvatar';
import InputCustoms from '../Profile/Input';
import { FormikProps } from 'formik';
import { IFormAddUserType } from './formAddUser.type';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import makeStyles from '@mui/styles/makeStyles';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface IFormAddUser {
  openForm: boolean;
  handleCloseForm: VoidFunction;
  title: string;
  formik: FormikProps<IFormAddUserType>;
}
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    background: 'rgb(250, 250, 250)',
    fontWeight: 500,
    marginTop: 8,
    marginLeft: 10,
    '& > label': {
      top: 23,
      left: 0,
      color: 'rgb(33, 33, 33)',
      '&[data-shrink="false"]': {
        top: 5,
      },
    },
    '& > div > input': {
      padding: '30.5px 14px 11.5px !important',
    },
    '& > div': {
      borderRadius: '12px',
    },
  },
}));
export default function FormAddUser({
  openForm,
  handleCloseForm,
  title,
  formik,
}: IFormAddUser): JSX.Element {
  const classes = useStyles();
  console.log(formik);
  return (
    <div>
      <Modal
        keepMounted
        open={openForm}
        onClose={handleCloseForm}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            align="center"
            component="h2"
          >
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {formik.values.fullName && (
              <Avatar
                {...stringAvatar(
                  (formik.values.fullName as string).length > 0
                    ? formik.values.fullName
                    : 'abc abc'
                )}
                src={formik.values.avatar}
              />
            )}
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <InputCustoms
              disable={true}
              touched={formik.touched.username as boolean}
              error={formik.errors.username as string}
              value={formik.values.username}
              name="username"
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              label="UserName"
            />{' '}
            <InputCustoms
              disable={false}
              touched={formik.touched.email as boolean}
              error={formik.errors.email as string}
              value={formik.values.email}
              name="email"
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              label="Email"
            />{' '}
            <InputCustoms
              disable={false}
              touched={formik.touched.firstName as boolean}
              error={formik.errors.firstName as string}
              value={formik.values.firstName}
              name="firstName"
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              label="FirstName"
            />{' '}
            <InputCustoms
              disable={false}
              touched={formik.touched.lastName as boolean}
              error={formik.errors.lastName as string}
              value={formik.values.lastName}
              name="lastName"
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              label="LastName"
            />{' '}
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Year Of Birthday"
                  value={formik.values.DOB}
                  onChange={(newValue): void => {
                    console.log(newValue);
                    console.log(
                      new Date(newValue as string).toLocaleDateString()
                    );
                    formik.setFieldValue(
                      'DOB',
                      new Date(newValue as string).toLocaleDateString()
                    );
                  }}
                  renderInput={(params): JSX.Element => (
                    <TextField className={classes.root} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <InputCustoms
              disable={false}
              touched={formik.touched.phoneNumber as boolean}
              error={formik.errors.phoneNumber as string}
              value={formik.values.phoneNumber}
              name="phoneNumber"
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              label="PhoneNumber"
            />{' '}
            <InputCustoms
              disable={false}
              touched={formik.touched.address as boolean}
              error={formik.errors.address as string}
              value={formik.values.address}
              name="address"
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              label="Address"
            />{' '}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginY: 5,
              }}
            >
              <Button
                variant="contained"
                disabled={!formik.dirty}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
