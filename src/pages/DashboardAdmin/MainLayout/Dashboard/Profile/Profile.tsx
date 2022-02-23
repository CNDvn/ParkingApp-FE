import {
  Avatar,
  Box,
  Button,
  Chip,
  Fab,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { stringAvatar } from 'utils/handleAvatar';
import InputCustoms from './Input';
import { IProfile } from './Profile.type';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useDispatch } from 'react-redux';
import { fetchUploadAvatar } from 'components/UserProvider/userProvider.action';
import { User } from 'models/user';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import makeStyles from '@mui/styles/makeStyles';

interface PropsProfile {
  formik: FormikProps<IProfile>;
  user: User;
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

const Profile = ({ formik, user }: PropsProfile): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const classes = useStyles();

  const dispatch = useDispatch();
  const handleSubmitUpdateAvatar = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    const data: FormData = new FormData();
    data.append('image', file as Blob);
    dispatch(fetchUploadAvatar(data));
    setFile(null);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        component="h4"
        gutterBottom
        variant="h3"
        sx={{ textAlign: 'center' }}
      >
        Profile
      </Typography>
      <Box sx={{ position: 'relative' }}>
        {file ? (
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            {' '}
            {file?.name}
          </Typography>
        ) : (
          <Avatar
            {...stringAvatar(
              formik.values.fullName.toUpperCase() || 'hello world'
            )}
            src={user.avatar}
            sx={{ width: 200, height: 200, fontSize: 30 }}
          />
        )}

        <form onSubmit={handleSubmitUpdateAvatar}>
          <label htmlFor="upload-photo">
            {!file && (
              <Fab
                sx={{
                  position: 'absolute',
                  bgcolor: '#3da9fc',
                  bottom: '10px',
                  right: '10px',
                  color: 'white',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 999,
                }}
                color="primary"
                size="small"
                component="span"
                aria-label="add"
              >
                <TextField
                  onChange={handleChangeFile}
                  style={{ display: 'none' }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                />
                <PhotoCameraIcon sx={{ fontSize: 30 }} />
              </Fab>
            )}
          </label>
          {file && (
            <Box>
              <Button type="submit" variant="contained">
                Upload File{' '}
              </Button>
            </Box>
          )}
        </form>
      </Box>
      <Stack direction="row" spacing={1} sx={{ marginY: 2 }}>
        <Chip label="Admin" color="primary" />
        <Chip label="Active" color="success" variant="outlined" />
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
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
          {/* firstName  */}
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
          {/* lastName  */}
        </Box>
        <Box sx={{ width: '100%' }}>
          <InputCustoms
            disable={true}
            touched={formik.touched.fullName as boolean}
            error={formik.errors.fullName as string}
            value={formik.values.fullName}
            name="fullName"
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            label="FullName"
          />{' '}
          {/* fullName  */}
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Year Of Birthday"
              value={formik.values.DOB}
              onChange={(newValue): void => {
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
        <Box sx={{ width: '100%' }}>
          <InputCustoms
            disable={false}
            touched={formik.touched.email as boolean}
            error={formik.errors.email as string}
            value={formik.values.email}
            name="email"
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            label="Email"
          />
          {/* email  */}
        </Box>
        <Box sx={{ width: '100%' }}>
          <InputCustoms
            disable={false}
            touched={formik.touched.phoneNumber as boolean}
            error={formik.errors.phoneNumber as string}
            value={formik.values.phoneNumber}
            name="phoneNumber"
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            label="PhoneNumber"
          />
          {/* phone  */}
        </Box>
        <Box sx={{ width: '100%' }}>
          <InputCustoms
            disable={false}
            touched={formik.touched.address as boolean}
            error={formik.errors.address as string}
            value={formik.values.address}
            name="address"
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            label="Address"
          />
          {/* address  */}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginY: 5,
          }}
        >
          <Button variant="contained" disabled={!formik.dirty} type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Profile;
