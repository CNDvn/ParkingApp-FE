import { fetchUpdateUser } from 'components/UserProvider/userProvider.action';
import { FormikProps, useFormik } from 'formik';
import { User } from 'models/user';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import FormAddUser from './formAddUser';
import { IFormAddUserType } from './formAddUser.type';

export const convertDob = (data: string): string => {
  const array = data.split('/');
  return '0' + array[0] + '/' + '0' + array[1] + '/' + array[2];
};
interface PropsFormAddUser {
  openForm: boolean;
  handleCloseForm: VoidFunction;
  userSelect: User;
}
const FormAddUserLogic = ({
  openForm,
  handleCloseForm,
  userSelect,
}: PropsFormAddUser): JSX.Element => {
  const schema = yup.object().shape({
    firstName: yup.string().required().trim(),
    lastName: yup.string().required().trim(),
    email: yup.string().required().trim().email(),
    phoneNumber: yup.string().required().trim(),
  });
  const dispatch = useDispatch();
  const formik: FormikProps<IFormAddUserType> = useFormik({
    initialValues: userSelect,
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    onSubmit: (values: IFormAddUserType) => {
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
        fetchUpdateUser({
          id: formik.values.id,
          DOB: values.DOB,
          address: values.address,
          username: formik.values.username,
          avatar: formik.values.avatar,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
        })
      );
    },
  });

  React.useEffect(() => {
    if (userSelect) {
      formik.setFieldValue('id', userSelect.id);
      formik.setFieldValue('DOB', userSelect.DOB);
      formik.setFieldValue('address', userSelect.address);
      formik.setFieldValue('avatar', userSelect.avatar);
      formik.setFieldValue('username', userSelect.username);
      formik.setFieldValue('email', userSelect.email);
      formik.setFieldValue('firstName', userSelect.firstName);
      formik.setFieldValue('lastName', userSelect.lastName);
      formik.setFieldValue('phoneNumber', userSelect.phoneNumber);
    }
  }, [userSelect]);

  return (
    <>
      <FormAddUser
        formik={formik}
        title="Update User"
        openForm={openForm}
        handleCloseForm={handleCloseForm}
      />
    </>
  );
};

export default FormAddUserLogic;
