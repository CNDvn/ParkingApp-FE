import { Avatar, Button, Typography } from '@mui/material';
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
      <Button
        variant="text"
        sx={{
          width: 50,
          height: 50,
          borderRadius: 50,
          '&:hover': {
            backgroundColor: '#fff',
            color: '#3c52b2',
          },
        }}
      >
        {' '}
        <Avatar
          sx={{ marginRight: '5px' }}
          {...stringAvatar(
            (userResponse.fullName && (userResponse.fullName as string)) ||
              'Hello World'
          )}
          src={
            (userResponse.fullName && (userResponse.avatar as string)) ||
            'Hello World'
          }
        />
        <Typography>{userResponse.username?.toUpperCase()}</Typography>
      </Button>
    </div>
  );
};

export default ProfileSection;
