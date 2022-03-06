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
import { fetchDeleteUser } from 'components/UserProvider/userProvider.action';
import GroupIcon from '@mui/icons-material/Group';
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
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { IParkingPagnigation } from 'models/base';
import useDebounce from 'hook/useDebounce';
import { toast } from 'react-toastify';
import { fetchListParkingAsync } from 'components/ParkingProvider/parkingProvider.action';
import {
  selectCount,
  selectCurrentPage,
  selectLastPage,
  selectListParking,
  selectMessageParking,
} from 'components/ParkingProvider/parkingProvider.selector';
import { Parking } from 'models/parking';
import { Search, SearchIconWrapper, StyledInputBase } from './searchParking';
import { resetMessage } from 'components/ParkingProvider/parkingProvider.slice';
const TableParking = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const listParking = useAppSelector(selectListParking);
  const lastPage = useAppSelector(selectLastPage);
  const count = useAppSelector(selectCount);
  const message = useAppSelector(selectMessageParking);
  const currentPage = useAppSelector(selectCurrentPage);
  const [numberPage, setNumberPage] = useState<number>(1);
  const [sizePage] = React.useState<number>(5);
  const [pagnigation, setPagnigation] = useState<IParkingPagnigation>({
    sizePage: 5,
    currentPage: 1,
    field: 'name',
    sort: 'DESC',
    status: 'active',
  });
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 2000);

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
    dispatch(resetMessage());
    dispatch(fetchListParkingAsync({ ...pagnigation, search: '' }));
  }, [pagnigation]);

  React.useEffect(() => {
    dispatch(resetMessage());
    dispatch(
      fetchListParkingAsync({ ...pagnigation, search: search })
    );
  }, [debouncedSearch]);

  React.useEffect(() => {
    if (message !== '') {
      if (message === 'Load List Parking Success') {
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  }, [message]);

  const handleDelete = (id: string): void => {
    dispatch(fetchDeleteUser(id));
  };

  return (
    <TableContainer component={Paper}>
      <Grid container spacing={2} alignItems="center" padding={1}>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GroupIcon sx={{ fontSize: '25px', marginRight: '2px' }} />
            <Typography component="h1" sx={{ fontSize: '20px' }}>
              List Parking
            </Typography>
          </Box>
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
            <TableCell align="left">Image</TableCell>
            <TableCell>
              Parking
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
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Open</TableCell>
            <TableCell align="left">Close</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listParking.length > 0 &&
            listParking.map((item: Parking, index: number) => {
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
                      src={
                        item.images[0]?.url ?? 'https://picsum.photos/200/300'
                      }
                    />
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="left">{item.address}</TableCell>
                  <TableCell align="left">{item.openTime}</TableCell>
                  <TableCell align="left">{item.closeTime}</TableCell>
                  <TableCell align="left">{item.phoneNumber}</TableCell>
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
    </TableContainer>
  );
};
export default TableParking;
