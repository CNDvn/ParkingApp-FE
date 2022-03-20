import { Navigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { User } from 'models/user';
import { selectUser } from 'components/UserProvider/userProvider.selector';
import { useAppSelector } from 'hook/hookRedux';
import DashboardAdmin from 'pages/DashboardAdmin/DashboardAdmin';
import { useDispatch } from 'react-redux';
import { fetchProfileAsync } from 'components/UserProvider/userProvider.action';
import { KEYS } from 'config/key';
const AdminTemplate = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  return (
    <>
      <DashboardAdmin>{children}</DashboardAdmin>
    </>
  );
};
const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const dispatch = useDispatch();
  const token = localStorage.getItem(KEYS.token);
  useEffect(() => {
    if (token) {
      dispatch(fetchProfileAsync(JSON.parse(token)));
    }
  }, []);

  const location = useLocation();
  const userResponse: Partial<User> = useAppSelector(selectUser);

  if (userResponse.id === '' && !token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <AdminTemplate>{children}</AdminTemplate>;
};

export default PrivateRoute;
