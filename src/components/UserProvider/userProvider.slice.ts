import { createSlice } from '@reduxjs/toolkit';
import { KEYS } from 'config/key';
import { StatusRequest } from 'constants/statusRequest';
import { ErrorBase } from 'models/error';
import { User } from 'models/user';
import {
  fetchListUserAsync,
  fetchLoginAsync,
  fetchLoginGoogleAsync,
  fetchProfileAsync,
  fetchUpdateProfile,
  fetchUploadAvatar,
} from './userProvider.action';
// import { ROLE } from 'config/roleContants';

export interface UserSlice {
  user: User;
  message: string | undefined;
  messageLogin: string | undefined;
  status: StatusRequest.PENDING | StatusRequest.SUCCESS | StatusRequest.FAILED;
  statusLogin:
    | StatusRequest.PENDING
    | StatusRequest.SUCCESS
    | StatusRequest.FAILED;
  listUser: User[];
  currentPage: number;
  nextPage: number;
  prevPage: number | null;
  lastPage: number | null;
  count: number;
  isAvatar: boolean;
  statusUploadProfile: boolean;
}
const initialState: UserSlice = {
  user: {
    id: '',
    DOB: '',
    address: '',
    avatar: '',
    business: {},
    customer: null,
    email: '',
    phoneNumber: '',
    firstName: '',
    fullName: '',
    lastName: '',
    role: {
      name: ''
    },
    status: '',
    username: ''
  },
  message: '',
  messageLogin: '',
  status: StatusRequest.PENDING,
  statusLogin: StatusRequest.PENDING,
  statusUploadProfile: false,
  listUser: [],
  currentPage: 0,
  nextPage: 0,
  prevPage: null,
  lastPage: 0,
  count: 0,
  isAvatar: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user =  {
        id: '',
        DOB: '',
        address: '',
        avatar: '',
        business: {},
        customer: null,
        email: '',
        phoneNumber: '',
        firstName: '',
        fullName: '',
        lastName: '',
        role: {
          name: ''
        },
        status: '',
        username: ''
      };
    },
    resetFlag: (state)=>{
      state.isAvatar = false;
    }
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(fetchLoginAsync.pending, (state) => {
      state.statusLogin = StatusRequest.PENDING;
    });
    builder.addCase(fetchLoginAsync.fulfilled, (state, action) => {
      localStorage.setItem(
        KEYS.token,
        JSON.stringify(action.payload.result.access_token)
      );
      localStorage.setItem(
        KEYS.refresh_token,
        JSON.stringify(action.payload.result.refresh_token)
      );
      state.statusLogin = StatusRequest.SUCCESS;
      state.messageLogin = 'Login Successfully';
    });
    builder.addCase(fetchLoginAsync.rejected, (state, action) => {
      state.statusLogin = StatusRequest.FAILED;
      state.messageLogin = (action.payload as ErrorBase<string>).message;
    });
    // get profile
    builder.addCase(fetchProfileAsync.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(fetchProfileAsync.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      state.user = action.payload.result;
    });
    builder.addCase(fetchProfileAsync.rejected, (state, action) => {
      state.status = StatusRequest.FAILED;
      state.message = (action.payload as ErrorBase<string>).message;
    });
    // get list User
    builder.addCase(fetchListUserAsync.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-unused-vars
    builder.addCase(fetchListUserAsync.fulfilled, (state) => {
      state.status = StatusRequest.SUCCESS;
      state.listUser = [];
      // if (
      //   instanceOfPagnigationData(
      //     action.payload.data as PagnigationData<User[]>
      //   )
      // ) {
      //   const data = action.payload.data as PagnigationData<User[]>;
      //   state.count = data.count;
      //   state.listUser = data.result;
      //   state.currentPage = data.currentPage;
      //   state.lastPage = data.lastPage;
      //   state.message = '';
      // } else if (
      //   instanceOfFetchEmptyListUser(action.payload.data as FetchEmptyListUser)
      // ) {
      //   const data = action.payload.data as FetchEmptyListUser;
      //   state.message = data.message;
      //   state.listUser = [];
      //   state.count = 0;
      //   state.lastPage = 0;
      // }
    });
    builder.addCase(fetchListUserAsync.rejected, (state, action) => {
      state.statusLogin = StatusRequest.FAILED;
      state.message = (action.payload as ErrorBase<string>).message;
    });
    // login google
    builder.addCase(fetchLoginGoogleAsync.pending, (state) => {
      state.statusLogin = StatusRequest.PENDING;
    });
    builder.addCase(fetchLoginGoogleAsync.fulfilled, (state, action) => {
      localStorage.setItem(
        KEYS.token,
        JSON.stringify(action.payload.result.access_token)
      );
      localStorage.setItem(
        KEYS.refresh_token,
        JSON.stringify(action.payload.result.refresh_token)
      );
      state.statusLogin = StatusRequest.SUCCESS;
      state.messageLogin = 'Login Successfully';
    });
    builder.addCase(fetchLoginGoogleAsync.rejected, (state) => {
      state.statusLogin = StatusRequest.FAILED;
      state.messageLogin = 'Sorry You Can Not Permission';
    });

    builder.addCase(fetchUploadAvatar.pending, (state)=>{
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(fetchUploadAvatar.fulfilled, (state, action)=>{
      state.status = StatusRequest.SUCCESS;
      state.message = action.payload.result;
      state.isAvatar = true;
    });
    builder.addCase(fetchUploadAvatar.rejected, (state)=>{
      state.status = StatusRequest.FAILED;
      // state.message = action.payload;
    });

    builder.addCase(fetchUpdateProfile.pending, (state)=>{
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(fetchUpdateProfile.fulfilled, (state, action)=>{
      state.status = StatusRequest.SUCCESS;
      state.message = action.payload.result;
      state.statusUploadProfile = true;
    });
    builder.addCase(fetchUpdateProfile.rejected, (state)=>{
      state.status = StatusRequest.FAILED;
    });
  },
});
export const { resetUser ,resetFlag} = userSlice.actions;
export default userSlice.reducer;
