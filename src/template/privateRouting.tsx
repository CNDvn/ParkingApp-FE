import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { User } from 'models/user';
import { selectUser } from 'components/UserProvider/userProvider.selector';
import { useAppSelector } from 'hook/hookRedux';

const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const location = useLocation();
  const userResponse: Partial<User> = useAppSelector(selectUser);
  console.log(userResponse);

  if (!userResponse) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
