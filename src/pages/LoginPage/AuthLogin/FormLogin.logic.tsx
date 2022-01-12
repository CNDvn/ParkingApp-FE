import { FormikProps, useFormik } from 'formik';
import React from 'react';
import FormLogin from './FormLogin';
import { LoginContentType } from './FormLogin.type';
import * as yup from 'yup';
const LOGIN_FORM_INITIAL_VALUES = {
  username: '',
  password: '',
};
const schema = yup.object().shape({
  username: yup.string().required().trim(),
  password: yup.string().required().trim(),
});
const FormLoginLogic = (): JSX.Element => {
  const formik: FormikProps<LoginContentType> = useFormik({
    initialValues: LOGIN_FORM_INITIAL_VALUES,
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <FormLogin formik={formik} />
    </>
  );
};

export default FormLoginLogic;
