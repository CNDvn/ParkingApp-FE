/* eslint-disable no-unused-vars */
import {
  Avatar,
  Button,
  Chip,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { User } from 'models/user';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { stringAvatar } from 'utils/handleAvatar';
import { useAppSelector } from 'hook/hookRedux';
import DoneIcon from '@mui/icons-material/Done';
import {
  selectCurrentPage,
  selectLastPage,
  selectListUser,
  selectMessageBanUser,
} from 'components/UserProvider/userProvider.selector';
import { IUserPagnigation } from 'models/base';
import {
  fetchListBanUser,
  fetchListUserAsync,
  fetchUpdateBanUser,
} from 'components/UserProvider/userProvider.action';
import { useDispatch } from 'react-redux';
import { resetMessage } from 'components/UserProvider/userProvider.slice';
import BlockIcon from '@mui/icons-material/Block';
const TableBanUser = (): JSX.Element => {
  const listUser = useAppSelector(selectListUser);
  const [sizePage] = React.useState<number>(5);
  const lastPage = useAppSelector(selectLastPage);
  const dispatch = useDispatch();
  const [numberPage, setNumberPage] = useState<number>(1);
  const message = useAppSelector(selectMessageBanUser);
  const currentPage = useAppSelector(selectCurrentPage);
  const [pagnigation, setPagnigation] = useState<IUserPagnigation>({
    sizePage: 5,
    currentPage: 1,
    field: 'firstName',
    role: 'customer',
    sort: 'DESC',
    status: 'active',
  });
  React.useEffect(() => {
    dispatch(resetMessage());
    dispatch(fetchListUserAsync({ ...pagnigation, search: '' }));
  }, [pagnigation]);

  React.useEffect(() => {
    dispatch(fetchListBanUser({ ...pagnigation, search: '' }));
  }, [pagnigation, message]);
  React.useEffect(() => {
    if (message !== '') {
      toast.success(message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [message]);
  const handleDelete = (id: string): void => {
    dispatch(fetchUpdateBanUser({ id, status: 'ban' }));
  };
  const handleActive = (id: string): void => {
    dispatch(fetchUpdateBanUser({ id, status: 'active' }));
  };
  const handleChangeStatusUser = (
    event: React.MouseEvent<HTMLElement>,
    value: 'active' | 'ban'
  ): void => {
    setPagnigation({ ...pagnigation, status: value });
  };
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    numberPage: number
  ): void => {
    setPagnigation({ ...pagnigation, currentPage: numberPage });
    setNumberPage(numberPage);
  };
  return (
    <div>
      {' '}
      <Typography variant="h2" textAlign="center">
        Ban List User
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ToggleButtonGroup
          color="primary"
          value={pagnigation.status}
          exclusive
          onChange={handleChangeStatusUser}
        >
          {[{ status: 'active' }, { status: 'ban' }].map((item, id) => {
            return (
              <ToggleButton key={id} value={item.status}>
                {item.status}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell align="left">Avatar</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell align="left">FullName</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Booking Cancel</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUser.length > 0 &&
            listUser.map((item: User, index: number) => {
              return (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + sizePage * (numberPage - 1) + 1}
                  </TableCell>
                  <TableCell align="left">
                    <Avatar
                      {...stringAvatar(item.fullName)}
                      src={item.avatar}
                    />
                  </TableCell>
                  <TableCell align="left">{item.username}</TableCell>
                  <TableCell align="left">{item.fullName}</TableCell>
                  <TableCell align="left">{item.phoneNumber}</TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                  <TableCell align="left">
                    {' '}
                    <Chip
                      label={item.role.name}
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {' '}
                    {Math.floor(Math.random() * 10) + 1}
                  </TableCell>
                  <TableCell align="center">
                    {' '}
                    <Chip label={item.status} color="primary" />
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-evenly' }}
                    >
                      {item.status === 'active' ? (
                        <Button
                          onClick={(): void => {
                            handleDelete(item.id);
                          }}
                          sx={{ width: 10, borderRadius: 50, height: 54 }}
                          variant="outlined"
                          color="error"
                        >
                          <BlockIcon />
                        </Button>
                      ) : (
                        <Button
                          onClick={(): void => {
                            handleActive(item.id);
                          }}
                          sx={{ width: 10, borderRadius: 50, height: 54 }}
                          variant="outlined"
                        >
                          <DoneIcon />
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={lastPage as number}
          page={currentPage}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default TableBanUser;
