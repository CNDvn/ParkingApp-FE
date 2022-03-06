import { Avatar, Box, Grid } from '@mui/material';

import { FormikProps } from 'formik';
import { Parking } from 'models/parking';
// import MapBoxTest from 'pages/MapBox/MapBoxTest';
import MapBox from 'pages/MapBox/MapBox';
import React from 'react';
import { stringAvatar } from 'utils/handleAvatar';
import InputCustoms from '../Profile/Input';
interface IParkingDetail {
  formik: FormikProps<Parking>;
}

const ParkingDetail = ({ formik }: IParkingDetail): JSX.Element => {
  return (
    <Grid container spacing={2} padding={1}>
      <Grid item xs={6}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar
            {...stringAvatar(
              formik.values.business?.user?.fullName.toUpperCase() ||
                'hello world'
            )}
            src={formik.values.business?.user?.avatar}
            sx={{ width: 200, height: 200, fontSize: 30 }}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <InputCustoms
            disable={false}
            touched={formik.touched.name as boolean}
            error={formik.errors.name as string}
            value={formik.values.name}
            name="name"
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            label="Name"
          />{' '}
          {/* Name  */}
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
          />{' '}
          {/* Address  */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 7,
            justifyContent: 'center',
          }}
        >
          <InputCustoms
            disable={false}
            touched={formik.touched.openTime as boolean}
            error={formik.errors.openTime as string}
            value={formik.values.openTime}
            name="openTime"
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            label="OpenTime"
          />{' '}
          <InputCustoms
            disable={false}
            touched={formik.touched.closeTime as boolean}
            error={formik.errors.closeTime as string}
            value={formik.values.closeTime}
            name="closeTime"
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            label="CloseTime"
          />{' '}
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
        </Box>
        <Box sx={{ width: '100%' }}>
          <InputCustoms
            disable={true}
            touched={formik.touched.business?.user?.fullName as boolean}
            error={formik.errors.business?.user?.fullName as string}
            value={formik.values.business?.user?.fullName}
            name="fullName"
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            label="Host Name"
          />{' '}
          {/* Address  */}
        </Box>
      </Grid>

      <Grid item xs={6}>
        <MapBox coordinates={formik.values.coordinates} />
        {/* <MapBoxTest /> */}
        <h1>hello</h1>
      </Grid>
    </Grid>
  );
};

export default ParkingDetail;
