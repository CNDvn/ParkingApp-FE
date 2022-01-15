import { createSlice } from '@reduxjs/toolkit';
import { StatusRequest } from 'constants/statusRequest';
import { ErrorBase } from 'models/error';
import { User } from 'models/user';
import { fetchLoginAsync, fetchProfileAsync } from './userProvider.action';

export interface UserSlice {
  user: Partial<User>;
  message: string | undefined;
  status: StatusRequest.PENDING | StatusRequest.SUCCESS | StatusRequest.FAILED;
}
const initialState: UserSlice = {
  user: {},
  message: '',
  status: StatusRequest.PENDING,
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
  },
});

export default userSlice.reducer;
