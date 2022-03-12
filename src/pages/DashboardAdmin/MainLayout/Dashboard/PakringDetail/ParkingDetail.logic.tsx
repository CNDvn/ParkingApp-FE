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
      const fields = [
        'id',
        'name',
        'address',
        'openTime',
        'closeTime',
        'status',
        'phoneNumber',
        'business',
        'images',
        'parkingSlots',
        'coordinates',
      ];
      fields.forEach((field) =>
        formik.setFieldValue(field, data.result[field as keyof Parking], false)
      );
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
        id: '',
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
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: Parking) => {
      console.log(values);
    },
  });

  return <ParkingDetail formik={formik} />;
};

export default ParkingDetailLogic;
