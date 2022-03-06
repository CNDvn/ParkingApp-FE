import React, { useEffect } from 'react';
import ParkingDetail from './ParkingDetail';
import { useParams } from 'react-router-dom';
import { FormikProps, useFormik } from 'formik';
import { Parking } from 'models/parking';
import { restAPI } from 'config/api';
import { fetchParkingDetail } from 'components/ParkingProvider/parkingProvider.service';
const ParkingDetailLogic = (): JSX.Element => {
  const params = useParams();

  useEffect((): void => {
    const callAPI = async (): Promise<void> => {
      const data = await fetchParkingDetail(
        restAPI,
        params.idParking as string
      );
      formik.setFieldValue('id', data.result.id);
      formik.setFieldValue('name', data.result.name);
      formik.setFieldValue('address', data.result.address);
      formik.setFieldValue('openTime', data.result.openTime);
      formik.setFieldValue('closeTime', data.result.closeTime);
      formik.setFieldValue('status', data.result.status);
      formik.setFieldValue('phoneNumber', data.result.phoneNumber);
      formik.setFieldValue('business', data.result.business);
      formik.setFieldValue('images', data.result.images);
      formik.setFieldValue('parkingSlots', data.result.parkingSlots);
      formik.setFieldValue('coordinates', data.result.coordinates);
    };
    callAPI();
  }, [params.idParking]);

  const formik: FormikProps<Parking> = useFormik({
    initialValues: {
      id: '',
      name: '',
      address: '',
      openTime: '',
      closeTime: '',
      status: '',
      phoneNumber: '',
      business: {
        user: {
          id: '',
          firstName: '',
          lastName: '',
          DOB: '',
          status: '',
          username: '',
          phoneNumber: '',
          email: '',
          address: '',
          avatar: '',
          customer: null,
          business: {},
          role: { id: '', name: '' },
          fullName: '',
        },
      },
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      images: [{ url: '' }],
      parkingSlots: [
        {
          id: '',
          locationName: '',
          status: '',
        },
      ],
    },
    // validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: Parking) => {
      console.log(values);
    },
  });

  return <ParkingDetail formik={formik} />;
};

export default ParkingDetailLogic;
