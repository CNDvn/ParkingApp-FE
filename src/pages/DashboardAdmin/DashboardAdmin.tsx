import { fetchProfileAsync } from 'components/UserProvider/userProvider.action';
import {
  selectMessageUser,
  selectStatusUser,
  selectUser,
} from 'components/UserProvider/userProvider.selector';
import { StatusRequest } from 'constants/statusRequest';
import { Counter } from 'feature/counter/Counter';
import { useAppSelector } from 'hook/hookRedux';
import { useLoadingToast } from 'hook/useLoading';
import { useMounting } from 'hook/useMounting';
import { User } from 'models/user';
import React from 'react';
import { useDispatch } from 'react-redux';

const DashboardAdmin = (): JSX.Element => {
  const dispatch = useDispatch();

  const statusRequest: StatusRequest = useAppSelector(selectStatusUser);
  const userResponse: Partial<User> = useAppSelector(selectUser);
  const messageResponse: string | undefined = useAppSelector(selectMessageUser);

  const { showToast } = useLoadingToast({
    loading: statusRequest === StatusRequest.PENDING ? true : false,
    loadingMessage: 'Loading request .....',
    successMessage: `Welcome Admin ${userResponse.userName}` + '👌',
    errorMessage: messageResponse,
    status: statusRequest,
    path: '',
  });
  useMounting(() => {
    dispatch(fetchProfileAsync());
    showToast();
  });
  return (
    <div>
      <Counter />
    </div>
  );
};

export default DashboardAdmin;
