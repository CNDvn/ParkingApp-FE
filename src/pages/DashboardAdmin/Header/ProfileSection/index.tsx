import { Avatar } from '@mui/material';
import { selectUser } from 'components/UserProvider/userProvider.selector';
import { PATH_NAME } from 'config/path';
import { useAppSelector } from 'hook/hookRedux';
import { User } from 'models/user';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { stringAvatar } from 'utils/handleAvatar';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = (): JSX.Element => {
  const userResponse: Partial<User> = useAppSelector(selectUser);
  const navigate = useNavigate();
  return (
    <div
      onClick={(): void => {
        navigate(PATH_NAME.Profile);
      }}
    >
      <Avatar
        {...stringAvatar(
          (userResponse.fullName && (userResponse.fullName as string)) ||
            'Hello World'
        )}
        src={
          (userResponse.fullName && (userResponse.avatar as string)) ||
          'Hello World'
        }
      />
    </div>
  );
};

export default ProfileSection;
