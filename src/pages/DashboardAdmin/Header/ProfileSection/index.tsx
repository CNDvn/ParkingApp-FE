import { Avatar } from '@mui/material';
import { selectUser } from 'components/UserProvider/userProvider.selector';
import { useAppSelector } from 'hook/hookRedux';
import { User } from 'models/user';
import React from 'react';
import { stringAvatar } from 'utils/handleAvarta';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = (): JSX.Element => {
  const userResponse: Partial<User> = useAppSelector(selectUser);
  return (
    <>
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
    </>
  );
};

export default ProfileSection;
