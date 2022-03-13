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
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { User } from 'models/user';
import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { stringAvatar } from 'utils/handleAvatar';
const TableBanUser = (): JSX.Element => {
  const [listUser, setListUser] = useState<
    (User & { bookingCancel: number })[]
  >([
    {
      id: Math.random().toString(),
      DOB: '20/10/2000',
      address: 'Hồ Chí Minh',
      avatar: 'https://picsum.photos/id/237/200/300',
      email: 'bao@gamil.com',
      firstName: 'bao',
      business: {},
      customer: null,
      fullName: 'Gia Bảo',
      lastName: 'Bao',
      phoneNumber: '0908439882',
      role: {
        id: 'abc',
        name: 'customer',
      },
      status: 'active',
      username: 'hello world',
      bookingCancel: 10,
    },
    {
      id: Math.random().toString(),
      DOB: '20/10/2000',
      address: 'Hồ Chí Minh',
      avatar: 'https://picsum.photos/id/237/200/300',
      email: 'tu@gamil.com',
      firstName: 'tu',
      business: {},
      customer: null,
      fullName: 'Tú Nguyễn',
      lastName: 'tu',
      phoneNumber: '0908439882',
      role: {
        id: 'abc',
        name: 'customer',
      },
      status: 'active',
      username: 'hello world',
      bookingCancel: 5,
    },
    {
      id: Math.random().toString(),
      DOB: '20/10/2000',
      address: 'Hồ Chí Minh',
      avatar: 'https://picsum.photos/id/237/200/300',
      email: 'trọng@gamil.com',
      firstName: 'trọng',
      business: {},
      customer: null,
      fullName: 'Thành Trọng',
      lastName: 'trọng',
      phoneNumber: '0908439882',
      role: {
        id: 'abc',
        name: 'customer',
      },
      status: 'active',
      username: 'hello world',
      bookingCancel: 5,
    },
    {
      id: Math.random().toString(),
      DOB: '20/10/2000',
      address: 'Hồ Chí Minh',
      avatar: 'https://picsum.photos/id/237/200/300',
      email: 'huy@gamil.com',
      firstName: 'huy',
      business: {},
      customer: null,
      fullName: 'Gia Huy',
      lastName: 'huy',
      phoneNumber: '0908439882',
      role: {
        id: 'abc',
        name: 'customer',
      },
      status: 'active',
      username: 'hello world',
      bookingCancel: 7,
    },
    {
      id: Math.random().toString(),
      DOB: '20/10/2000',
      address: 'Hồ Chí Minh',
      avatar: 'https://picsum.photos/id/237/200/300',
      email: 'sang@gamil.com',
      firstName: 'sang',
      business: {},
      customer: null,
      fullName: 'Anh Sang',
      lastName: 'sang',
      phoneNumber: '0908439882',
      role: {
        id: 'abc',
        name: 'customer',
      },
      status: 'active',
      username: 'hello world',
      bookingCancel: 12,
    },
    {
      id: Math.random().toString(),
      DOB: '20/10/2000',
      address: 'Hồ Chí Minh',
      avatar: 'https://picsum.photos/id/237/200/300',
      email: 'Khoa@gamil.com',
      firstName: 'Khoa',
      business: {},
      customer: null,
      fullName: 'Đăng Khoa',
      lastName: 'Khoa',
      phoneNumber: '0908439882',
      role: {
        id: 'abc',
        name: 'customer',
      },
      status: 'active',
      username: 'hello world',
      bookingCancel: 9,
    },
  ]);
  const handleDelete = (id: string): void => {
    const newList = listUser.filter((item) => item.id !== id);
    setListUser(newList);
  };
  const [page, setPage] = React.useState(1);
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    console.log(value);

    const newList = listUser.reverse();
    setListUser(newList);
    setPage(value);
  };
  return (
    <div>
      {' '}
      <Typography variant="h2" textAlign="center">
        Ban List User
      </Typography>
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
            listUser.map(
              (item: User & { bookingCancel: number }, index: number) => {
                return (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
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
                    <TableCell align="left">
                      {' '}
                      <Chip label={item.bookingCancel} color="primary" />
                    </TableCell>
                    <TableCell align="left">
                      {' '}
                      <Chip label={item.status} color="primary" />
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-evenly' }}
                      >
                        <Button
                          onClick={(): void => {
                            handleDelete(item.id);
                          }}
                          sx={{ width: 10, borderRadius: 50, height: 54 }}
                          variant="outlined"
                          color="error"
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
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
          page={page}
          onChange={handleChange}
          count={10}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default TableBanUser;
