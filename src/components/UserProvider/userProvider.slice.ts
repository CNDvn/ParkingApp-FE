import {
  FetchEmptyListUser,
  instanceOfFetchEmptyListUser,
  instanceOfPagnigationData,
  PagnigationData,
} from './userProvider.type';
import { createSlice } from '@reduxjs/toolkit';
import { StatusRequest } from 'constants/statusRequest';
import { ErrorBase } from 'models/error';
import { User } from 'models/user';
import {
  fetchListUserAsync,
  fetchLoginAsync,
  fetchProfileAsync,
} from './userProvider.action';

export interface UserSlice {
  user: Partial<User>;
  message: string | undefined;
  status: StatusRequest.PENDING | StatusRequest.SUCCESS | StatusRequest.FAILED;
  listUser: User[];
  currentPage: number;
  nextPage: number;
  prevPage: number | null;
  lastPage: number | null;
  count: number;
}
const initialState: UserSlice = {
  user: {},
  message: '',
  status: StatusRequest.PENDING,
  listUser: [],
  currentPage: 0,
  nextPage: 0,
  prevPage: null,
  lastPage: 0,
  count: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(fetchLoginAsync.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(fetchLoginAsync.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      state.message = action.payload.data;
    });
    builder.addCase(fetchLoginAsync.rejected, (state, action) => {
      state.status = StatusRequest.FAILED;
      state.message = (action.payload as ErrorBase<string>).message;
    });
    // get profile
    builder.addCase(fetchProfileAsync.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(fetchProfileAsync.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      state.user = action.payload.data;
    });
    builder.addCase(fetchProfileAsync.rejected, (state, action) => {
      state.status = StatusRequest.FAILED;
      state.message = (action.payload as ErrorBase<string>).message;
    });
    // get list User
    builder.addCase(fetchListUserAsync.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(fetchListUserAsync.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      if (
        instanceOfPagnigationData(
          action.payload.data as PagnigationData<User[]>
        )
      ) {
        const data = action.payload.data as PagnigationData<User[]>;
        state.count = data.count;
        state.listUser = data.result;
        state.currentPage = data.currentPage;
        state.lastPage = data.lastPage;
        state.message = '';
      } else if (
        instanceOfFetchEmptyListUser(action.payload.data as FetchEmptyListUser)
      ) {
        const data = action.payload.data as FetchEmptyListUser;
        state.message = data.message;
        state.listUser = [];
        state.count = 0;
        state.lastPage = 0;
      }
    });
    builder.addCase(fetchListUserAsync.rejected, (state, action) => {
      state.status = StatusRequest.FAILED;
      state.message = (action.payload as ErrorBase<string>).message;
    });
  },
});

export default userSlice.reducer;
