/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// eslint-disable-next-line no-unused-vars
import { useAppDispatch, useAppSelector } from 'hook/hookRedux';
import { fetchListUserAsync } from 'components/UserProvider/userProvider.action';
import { User } from 'models/user';
import {
  selectCount,
  selectLastPage,
  // selectLastPage,
  selectListUser,
} from 'components/UserProvider/userProvider.selector';
import {
  Avatar,
  Box,
  Pagination,
  PaginationItem,
  TablePagination,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// eslint-disable-next-line no-unused-vars
import { stringAvatar } from 'utils/handleAvarta';
import { useState } from 'react';
import { FetchListUserRequest } from 'components/UserProvider/userProvider.type';

const TableUser = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const listUser = useAppSelector(selectListUser);
  const lastPage = useAppSelector(selectLastPage);
  const count = useAppSelector(selectCount);
  const [numberPage, setNumberPage] = useState(1);

  const handleChangeNumberPage = (
    event: React.ChangeEvent<unknown> | null,
    newPage: number
  ): void => {
    setNumberPage(newPage);
  };

  React.useEffect(() => {
    const paramFetchListUser: FetchListUserRequest = {
      newPage: numberPage,
    };
    dispatch(fetchListUserAsync(paramFetchListUser));
  }, [numberPage]);
  let countNumber = 0;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell align="left">UserName</TableCell>
            <TableCell align="left">FullName</TableCell>
            <TableCell align="left">Year Of Birth</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Avatar</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUser.length > 0 &&
            listUser.map((item: User) => {
              countNumber += 1;
              return (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {countNumber}
                  </TableCell>
                  <TableCell align="left">{item.userName}</TableCell>
                  <TableCell align="left">{item.fullName}</TableCell>
                  <TableCell align="left">{item.dob}</TableCell>
                  <TableCell align="left">{item.phone}</TableCell>
                  <TableCell align="left">
                    <Avatar
                      {...stringAvatar(item.fullName)}
                      src={item.avatar}
                    />
                  </TableCell>
                  <TableCell align="left">{item.role}</TableCell>
                  <TableCell align="left">{item.status}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center" mb="10px">
        <Pagination
          count={lastPage as number}
          color="primary"
          onChange={handleChangeNumberPage}
          renderItem={(item): JSX.Element => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Box>
    </TableContainer>
  );
};
export default TableUser;
