import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from 'hook/hookRedux';
import {
  fetchDeleteUser,
  fetchListUserAsync,
} from 'components/UserProvider/userProvider.action';
import { Role, User } from 'models/user';
import GroupIcon from '@mui/icons-material/Group';
import {
  selectCount,
  selectCurrentPage,
  selectLastPage,
  selectListUser,
  selectMessageUser,
  selectStatusUser,
} from 'components/UserProvider/userProvider.selector';
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Pagination,
  PaginationItem,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { stringAvatar } from 'utils/handleAvatar';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './searchUser';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { IUserPagnigation } from 'models/base';
import { fetchListRole } from 'components/RoleProvider/roleProvider.service';
import { restAPI } from 'config/api';
import useDebounce from 'hook/useDebounce';
import { resetMessage } from 'components/UserProvider/userProvider.slice';
import EditIcon from '@mui/icons-material/Edit';
import { useLoadingToast } from 'hook/useLoading';
import { StatusRequest } from 'constants/statusRequest';
import FormAddUser from '../FormAddUser/formAddUser';
const TableUser = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const listUser = useAppSelector(selectListUser);
  const lastPage = useAppSelector(selectLastPage);
  const status = useAppSelector(selectStatusUser);
  const count = useAppSelector(selectCount);
  const message = useAppSelector(selectMessageUser);
  const currentPage = useAppSelector(selectCurrentPage);
  const [openForm, setOpenForm] = React.useState<boolean>(false);
  const [userSelect, setUserSelect] = React.useState<User>();
  const handleOpenForm = (): void => setOpenForm(true);
  const handleCloseForm = (): void => setOpenForm(false);
  const [listRoles, setListRoles] = useState<Role[]>([]);
  const [pagnigation, setPagnigation] = useState<IUserPagnigation>({
    sizePage: 5,
    currentPage: 1,
    field: 'firstName',
    role: 'customer',
    sort: 'DESC',
    status: 'active',
  });
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 2000);

  const handleChangeRole = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ): void => {
    setPagnigation({ ...pagnigation, role: value });
  };

  const handleChangeNumberPage = (
    event: React.ChangeEvent<unknown> | null,
    numberPage: number
  ): void => {
    setPagnigation({ ...pagnigation, currentPage: numberPage });
  };

  const handleChangeSizePage = (event: SelectChangeEvent): void => {
    setPagnigation({ ...pagnigation, sizePage: parseInt(event.target.value) });
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    dispatch(resetMessage());
    dispatch(fetchListUserAsync({ ...pagnigation, search: '' }));
  }, [pagnigation]);

  React.useEffect(() => {
    dispatch(resetMessage());
    dispatch(fetchListUserAsync({ ...pagnigation, search: search }));
  }, [debouncedSearch]);

  React.useEffect(() => {
    const callAPI = async (): Promise<void> => {
      const data = await fetchListRole(restAPI);
      setListRoles(data.result);
    };
    callAPI();
  }, []);

  React.useEffect(() => {
    if (message !== '') {
      // if (message === 'Load List User Success') {
      //   toast.success(message, {
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //   });
      // } else {
      //   toast.warn(message, {
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //   });
      // }
      showToast();
    }
  }, [message]);

  const { showToast } = useLoadingToast({
    loading: status === StatusRequest.PENDING ? true : false,
    loadingMessage: 'Loading request .....',
    successMessage: message + '👌',
    errorMessage: 'Upload Profile Fail',
    status: status,
    path: '',
  });

  const handleDelete = (id: string): void => {
    dispatch(fetchDeleteUser(id));
  };

  return (
    <TableContainer component={Paper}>
      {/* <Box
        sx={{ flexGrow: 1 }}
      > */}
      <Grid container spacing={2} alignItems="center" padding={1}>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GroupIcon sx={{ fontSize: '25px', marginRight: '2px' }} />
            <Typography component="h1" sx={{ fontSize: '20px' }}>
              List User
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <ToggleButtonGroup
            color="primary"
            value={pagnigation.role}
            exclusive
            onChange={handleChangeRole}
          >
            {[...listRoles, { name: 'no' }].map((item, id) => {
              return (
                <ToggleButton key={id} value={item.name}>
                  {item.name}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={4}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={search}
              onChange={handleChangeSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Grid>
      </Grid>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}></Box> */}
      {/* </Box> */}
      {/* table */}

      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>
              UserName
              {/* {sort === 'ASC' ? (
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
              )} */}
            </TableCell>
            <TableCell align="left">FullName</TableCell>
            <TableCell align="left">FirstName</TableCell>
            <TableCell align="left">LastName</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Email</TableCell>
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
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{item.username}</TableCell>
                  <TableCell align="left">{item.fullName}</TableCell>
                  <TableCell align="left">{item.firstName}</TableCell>
                  <TableCell align="left">{item.lastName}</TableCell>
                  <TableCell align="left">{item.phoneNumber}</TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                  <TableCell align="left">
                    <Avatar
                      {...stringAvatar(item.fullName)}
                      src={item.avatar}
                    />
                  </TableCell>
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
                    <Chip label={item.status} color="primary" />
                  </TableCell>
                  <TableCell align="left">
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-evenly' }}
                    >
                      <Button
                        sx={{
                          width: 10,
                          marginRight: 2,
                          borderRadius: 50,
                          height: 54,
                        }}
                        variant="contained"
                        onClick={(): void => {
                          handleOpenForm();
                          setUserSelect(item);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={(): void => {
                          handleDelete(item.id);
                        }}
                        sx={{ width: 10, borderRadius: 50, height: 54 }}
                        variant="outlined"
                        color="error"
                        // endIcon={<DeleteIcon />}
                      >
                        <DeleteIcon />
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
              value={pagnigation.sizePage.toString()}
              label="SizePage"
              onChange={handleChangeSizePage}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            page={currentPage}
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
