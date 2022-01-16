import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from 'hook/hookRedux';
import { fetchListUserAsync } from 'components/UserProvider/userProvider.action';
import { User } from 'models/user';
import GroupIcon from '@mui/icons-material/Group';
import {
  selectCount,
  selectLastPage,
  selectListUser,
  selectMessageUser,
} from 'components/UserProvider/userProvider.selector';
import {
  Avatar,
  Box,
  ButtonBase,
  Pagination,
  PaginationItem,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { stringAvatar } from 'utils/handleAvarta';
import { useState } from 'react';
import { FetchListUserRequest } from 'components/UserProvider/userProvider.type';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './searchUser';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { toast } from 'react-toastify';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FormAddUser from '../FormAddUser/formAddUser';

const TableUser = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const listUser = useAppSelector(selectListUser);
  const lastPage = useAppSelector(selectLastPage);
  const count = useAppSelector(selectCount);
  const message = useAppSelector(selectMessageUser);
  const [sizePage, setSizePage] = React.useState<number>(5);
  const [numberPage, setNumberPage] = useState<number>(1);
  const [userNameSearch, setUserNameSearch] = useState<string>('');
  const [sort, setSort] = React.useState<string>('ASC');
  const [role, setRole] = React.useState<string>('NO');
  const [openForm, setOpenForm] = React.useState<boolean>(false);
  const [userSelect, setUserSelect] = React.useState<User>();

  const handleOpenForm = (): void => setOpenForm(true);
  const handleCloseForm = (): void => setOpenForm(false);

  const handleChangeRole = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ): void => {
    setRole(value);
  };

  const handleChangeNumberPage = (
    event: React.ChangeEvent<unknown> | null,
    numberPage: number
  ): void => {
    setNumberPage(numberPage);
  };

  const handleChangeSizePage = (event: SelectChangeEvent): void => {
    setSizePage(parseInt(event.target.value));
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setUserNameSearch(e.target.value);
  };

  React.useEffect(() => {
    const paramFetchListUser: FetchListUserRequest = {
      numberPage: numberPage,
      sizePage: sizePage,
      userName: userNameSearch,
      sort: sort,
      role: role,
    };
    dispatch(fetchListUserAsync(paramFetchListUser));
  }, [
    numberPage,
    sizePage,
    userNameSearch,
    sort,
    dispatch,
    fetchListUserAsync,
    role,
  ]);

  React.useEffect(() => {
    if (message !== '') {
      toast.warn(message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [message]);

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mx: '12px' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GroupIcon />
          <Typography>List User</Typography>
        </Box>
        {/* search role */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
          <ToggleButtonGroup
            color="primary"
            value={role}
            exclusive
            onChange={handleChangeRole}
          >
            <ToggleButton value="ADMIN">ADMIN</ToggleButton>
            <ToggleButton value="HOST">HOST</ToggleButton>
            <ToggleButton value="NO">NO</ToggleButton>
            <ToggleButton value="CLIENT">CLIENT</ToggleButton>
          </ToggleButtonGroup>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={userNameSearch}
              onChange={handleChangeSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
      </Box>
      {/* table */}

      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>
              UserName
              {sort === 'ASC' ? (
                <ButtonBase
                  sx={{
                    fontSize: '16px',
                    width: '100px',
                    height: '50px',
                  }}
                  onClick={(): void => {
                    setSort('DESC');
                  }}
                >
                  <ArrowUpwardIcon />
                </ButtonBase>
              ) : (
                <ButtonBase
                  sx={{
                    fontSize: '16px',
                    width: '100px',
                    height: '50px',
                  }}
                  onClick={(): void => {
                    setSort('ASC');
                  }}
                >
                  <ArrowDownwardIcon />
                </ButtonBase>
              )}
            </TableCell>
            <TableCell align="left">FullName</TableCell>
            <TableCell align="left">Avatar</TableCell>
            <TableCell align="left">Role</TableCell>
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
                  <TableCell align="left">{item.userName}</TableCell>
                  <TableCell align="left">{item.fullName}</TableCell>
                  <TableCell align="left">
                    <Avatar
                      {...stringAvatar(item.fullName)}
                      src={item.avatar}
                    />
                  </TableCell>
                  <TableCell align="left">{item.role}</TableCell>
                  <TableCell align="left">{item.status}</TableCell>
                  <TableCell align="left">
                    <Box sx={{ display: 'flex' }}>
                      <Button
                        variant="contained"
                        onClick={(): void => {
                          handleOpenForm();
                          setUserSelect(item);
                        }}
                      >
                        Update
                      </Button>
                      <Button variant="text" endIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {/* chosen  RowsPerPage*/}
      <Box
        display="flex"
        justifyContent="space-between"
        mb="10px"
        mx="10px"
        alignItems="center"
      >
        <Typography>Total: {count}</Typography>
        <Box display="flex" alignItems="baseline">
          <Typography>RowsPerPage: </Typography>
          <FormControl
            sx={{
              width: '100px',
              marginLeft: '5px',
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sizePage.toString()}
              label="SizePage"
              onChange={handleChangeSizePage}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
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
      </Box>
      <FormAddUser
        userSelect={userSelect}
        title="Update User"
        openForm={openForm}
        handleCloseForm={handleCloseForm}
      />
    </TableContainer>
  );
};
export default TableUser;
