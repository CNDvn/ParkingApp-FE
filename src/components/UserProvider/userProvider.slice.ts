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
      state.count = action.payload.data.count;
      state.listUser = action.payload.data.result;
      state.currentPage = action.payload.data.currentPage;
      state.lastPage = action.payload.data.lastPage;
    });
    builder.addCase(fetchListUserAsync.rejected, (state, action) => {
      state.status = StatusRequest.FAILED;
      state.message = (action.payload as ErrorBase<string>).message;
    });
  },
});

export default userSlice.reducer;
