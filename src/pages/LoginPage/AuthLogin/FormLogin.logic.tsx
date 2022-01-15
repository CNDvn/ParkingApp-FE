import { FormikProps, useFormik } from 'formik';
import React from 'react';
import FormLogin from './FormLogin';
import { LoginContentType } from './FormLogin.type';
import * as yup from 'yup';
import { StatusRequest } from 'constants/statusRequest';
import { useLoadingToast } from 'hook/useLoading';
import { useAppDispatch, useAppSelector } from 'hook/hookRedux';
import { fetchLoginAsync } from 'components/UserProvider/userProvider.action';
import { LoginRequestPayload } from 'components/UserProvider/userProvider.type';
import {
  selectMessageUser,
  selectStatusUser,
} from 'components/UserProvider/userProvider.selector';
import { PATH_NAME } from 'config/path';

const LOGIN_FORM_INITIAL_VALUES = {
  username: '',
  password: '',
};

const schema = yup.object().shape({
  username: yup.string().required().trim(),
  password: yup.string().required().trim(),
});

const FormLoginLogic = (): JSX.Element => {
  const statusRequest: StatusRequest = useAppSelector(selectStatusUser);
  const messageResponse: string | undefined = useAppSelector(selectMessageUser);
  const dispatch = useAppDispatch();

  const { showToast } = useLoadingToast({
    loading: statusRequest === StatusRequest.PENDING ? true : false,
    loadingMessage: 'Loading request .....',
    successMessage: messageResponse + '👌',
    errorMessage: messageResponse,
    status: statusRequest,
    path: PATH_NAME.DashboardAdmin,
  });

  const formik: FormikProps<LoginContentType> = useFormik({
    initialValues: LOGIN_FORM_INITIAL_VALUES,
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: LoginRequestPayload) => {
      dispatch(fetchLoginAsync(values));
      formik.resetForm();
      showToast();
    },
  });

  return (
    <>
      <FormLogin formik={formik} />
    </>
  );
};

export default FormLoginLogic;
