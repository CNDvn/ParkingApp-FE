import { createSlice } from '@reduxjs/toolkit';
import { StatusRequest } from 'constants/statusRequest';
import { User } from 'models/user';
import { loginAsync } from './userProvider.action';
import { ErrorBase } from './userProvider.type';

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
    builder.addCase(loginAsync.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      state.message = action.payload.data;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.status = StatusRequest.FAILED;
      state.message = (action.payload as ErrorBase<string>).message;
    });
  },
});

export default userSlice.reducer;
