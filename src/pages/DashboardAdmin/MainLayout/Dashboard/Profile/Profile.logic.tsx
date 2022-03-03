/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Profile from './Profile';
import * as yup from 'yup';
import {
  selectStatusUpdateProfile,
  selectUser,
} from 'components/UserProvider/userProvider.selector';
import { useAppSelector } from 'hook/hookRedux';
import { User } from 'models/user';
import { IProfile } from './Profile.type';
import { FormikProps, useFormik } from 'formik';
import { KEYS } from 'config/key';
import {
  fetchProfileAsync,
  fetchUpdateProfile,
} from 'components/UserProvider/userProvider.action';
import { useDispatch } from 'react-redux';
import { StatusRequest } from 'constants/statusRequest';
import { useLoadingToast } from 'hook/useLoading';
import {
  selectMessageUser,
  selectStatusAvatar,
  selectStatusUser,
} from 'components/UserProvider/userProvider.selector';
import {
  resetFlag,
  resetProfile,
} from 'components/UserProvider/userProvider.slice';
const schema = yup.object().shape({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
  phoneNumber: yup.string().required().trim(),
  address: yup.string().required().trim(),
});
export const convertDob = (data: string): string => {
  const array = data.split('/');
  return '0' + array[0] + '/' + '0' + array[1] + '/' + array[2];
};
export const ChangeFormateDate = (data: string): string => {
  data = data.split('T')[0];
  return data.toString().split('-').reverse().join('-');
};

const ProfileLogic = (): JSX.Element => {
  const isProfile = useAppSelector(selectStatusUpdateProfile);
  const user: User = useAppSelector(selectUser);
  const status = useAppSelector(selectStatusUser);
  const message = useAppSelector(selectMessageUser);
  const showToastUpload = useLoadingToast({
    loading: status === StatusRequest.PENDING ? true : false,
    loadingMessage: 'Loading request .....',
    successMessage: message + '👌',
    errorMessage: 'Upload Profile Fail',
    status: status,
    path: '',
  });

  const dispatch = useDispatch();
  const formik: FormikProps<IProfile> = useFormik({
    initialValues: user,
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: IProfile) => {
      if (values.DOB.includes('T')) {
        values.DOB = values.DOB.split('T')[0];
      }
      if (values.DOB.match('^([0-9]{1})/([0-9]{1})/([0-9]{4})$')) {
        values.DOB = convertDob(values.DOB);
        values.DOB = values.DOB.replaceAll('/', '-')
          .split('-')
          .reverse()
          .join('-');
      }

      dispatch(
        fetchUpdateProfile({
          DOB: values.DOB,
          address: values.address,
          avatar: user.avatar,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
        })
      );
      showToastUpload.showToast();
    },
  });

  const flag = useAppSelector(selectStatusAvatar);

  const { showToast } = useLoadingToast({
    loading: status === StatusRequest.PENDING ? true : false,
    loadingMessage: 'Loading request .....',
    successMessage: message + '👌',
    errorMessage: 'Upload fail',
    status: status,
    path: '',
  });

  useEffect(() => {
    if (flag) {
      const token = localStorage.getItem(KEYS.token);
      if (token) {
        dispatch(fetchProfileAsync(JSON.parse(token)));
        dispatch(resetFlag());
      }
      showToast();
    }
  }, [flag]);

  useEffect(() => {
    if (isProfile) {
      const token = localStorage.getItem(KEYS.token);
      if (token) {
        dispatch(fetchProfileAsync(JSON.parse(token)));
        dispatch(resetProfile());
      }
      showToast();
    }
  }, [isProfile]);

  return (
    <>
      <Profile formik={formik} user={user} />
    </>
  );
};

export default ProfileLogic;
