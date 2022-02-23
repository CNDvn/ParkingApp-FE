import React, { useEffect } from 'react';
import Profile from './Profile';
import * as yup from 'yup';
import { selectUser } from 'components/UserProvider/userProvider.selector';
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
import { resetFlag } from 'components/UserProvider/userProvider.slice';
const schema = yup.object().shape({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
  phoneNumber: yup.string().required().trim(),
  address: yup.string().required().trim(),
});

const ProfileLogic = (): JSX.Element => {
  const user: User = useAppSelector(selectUser);

  const dispatch = useDispatch();
  const formik: FormikProps<IProfile> = useFormik({
    initialValues: user,
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: IProfile) => {
      console.log(values);
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
      showToast();
    },
  });
  const status = useAppSelector(selectStatusUser);
  const flag = useAppSelector(selectStatusAvatar);
  const message = useAppSelector(selectMessageUser);
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
      console.log('run profile');
      const token = localStorage.getItem(KEYS.token);
      if (token) {
        dispatch(fetchProfileAsync(JSON.parse(token)));
        dispatch(resetFlag());
      }
      showToast();
    }
  }, [flag]);

  return (
    <>
      <Profile formik={formik} user={user} />
    </>
  );
};

export default ProfileLogic;
