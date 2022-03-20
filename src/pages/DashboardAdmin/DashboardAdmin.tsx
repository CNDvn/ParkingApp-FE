import MainLayout from './MainLayout';
import {
  selectMessageUser,
  selectStatusUser,
  selectUser,
} from 'components/UserProvider/userProvider.selector';
import { StatusRequest } from 'constants/statusRequest';
import { useAppSelector } from 'hook/hookRedux';
import { useLoadingToast } from 'hook/useLoading';
import { useMounting } from 'hook/useMounting';
import { User } from 'models/user';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_NAME } from 'config/path';
import { KEYS } from 'config/key';
import { fetchParkingProcess } from 'components/ParkingProvider/parkingProvider.action';

interface IDashboardAdmin {
  children: JSX.Element | JSX.Element[];
}
const DashboardAdmin = ({ children }: IDashboardAdmin): JSX.Element => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const statusRequest: StatusRequest = useAppSelector(selectStatusUser);
  const userResponse: Partial<User> = useAppSelector(selectUser);
  const messageResponse: string | undefined = useAppSelector(selectMessageUser);
  const navigate = useNavigate();

  const { showToast } = useLoadingToast({
    loading: statusRequest === StatusRequest.PENDING ? true : false,
    loadingMessage: 'Loading request .....',
    successMessage: `Welcome Admin ${userResponse.username}` + '👌',
    errorMessage: messageResponse,
    status: statusRequest,
    path: '',
  });

  useMounting(() => {
    console.log('run');
    const token = localStorage.getItem(KEYS.token);
    if (token) {
      dispatch(
        fetchParkingProcess({
          sizePage: 5,
          currentPage: 1,
          field: 'firstName',
          sort: 'DESC',
          status: 'processing',
        })
      );
      showToast();
      if (pathname !== PATH_NAME.DashboardAdminUser) {
        navigate(PATH_NAME.DashboardAdminUser);
      }
    }
  });

  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
};

export default DashboardAdmin;
