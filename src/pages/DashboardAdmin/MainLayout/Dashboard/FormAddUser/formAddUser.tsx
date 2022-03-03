import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';
import { stringAvatar } from 'utils/handleAvatar';
import InputCustoms from '../Profile/Input';
import { FormikProps } from 'formik';
import { IFormAddUserType } from './formAddUser.type';

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
export default function FormAddUser({
  openForm,
  handleCloseForm,
  title,
  formik,
}: IFormAddUser): JSX.Element {
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
