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
  selectMessageListUser,
  selectMessageUser,
  selectStatusDelete,
  selectStatusUpdate,
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
import {
  resetDelete,
  resetMessage,
  resetMessageListUser,
  resetUpdateUser,
} from 'components/UserProvider/userProvider.slice';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import FormAddUserLogic from '../FormAddUser/formAddUser.logic';
const TableUser = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const listUser = useAppSelector(selectListUser);
  const lastPage = useAppSelector(selectLastPage);
  const isDelete = useAppSelector(selectStatusDelete);
  const isUpdate = useAppSelector(selectStatusUpdate);
  const count = useAppSelector(selectCount);
  const message = useAppSelector(selectMessageListUser);
  const currentPage = useAppSelector(selectCurrentPage);
  const [openForm, setOpenForm] = React.useState<boolean>(false);
  const [numberPage, setNumberPage] = useState<number>(1);
  const [sizePage] = React.useState<number>(5);
  const [userSelect, setUserSelect] = React.useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    DOB: '',
    status: '',
    username: '',
    phoneNumber: '',
    email: '',
    address: '',
    avatar: '',
    customer: null,
    business: {},
    role: { id: '', name: '' },
    fullName: '',
  });
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
    setNumberPage(numberPage);
  };

  const handleChangeSizePage = (event: SelectChangeEvent): void => {
    setPagnigation({ ...pagnigation, sizePage: parseInt(event.target.value) });
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    dispatch(fetchListUserAsync({ ...pagnigation, search: '' }));
    return (): void => {
      dispatch(resetMessageListUser());
    };
  }, [pagnigation]);

  React.useEffect(() => {
    if (isDelete) {
      dispatch(fetchListUserAsync({ ...pagnigation, search: '' }));
    }
    return (): void => {
      dispatch(resetMessageListUser());
      dispatch(resetDelete());
    };
  }, [isDelete]);

  React.useEffect(() => {
    if (isUpdate) {
      dispatch(fetchListUserAsync({ ...pagnigation, search: '' }));
      handleCloseForm();
    }
    return (): void => {
      dispatch(resetMessageListUser());
    };
  }, [isUpdate]);

  React.useEffect(() => {
    dispatch(fetchListUserAsync({ ...pagnigation, search: search }));
    return (): void => {
      dispatch(resetMessageListUser());
    };
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
      toast.success(message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [message]);

  const handleDelete = (id: string): void => {
    dispatch(fetchDeleteUser(id));
  };

  return (
    <TableContainer component={Paper}>
      <Grid container spacing={2} alignItems="center" padding={3}>
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

      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell align="left">Avatar</TableCell>
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
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Email</TableCell>
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
      <FormAddUserLogic
        openForm={openForm}
        handleCloseForm={handleCloseForm}
        userSelect={userSelect}
      />
    </TableContainer>
  );
};
export default TableUser;
