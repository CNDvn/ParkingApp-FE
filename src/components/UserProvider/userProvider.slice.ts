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
import { FetchEmptyListUser, instanceOfFetchEmptyListUser, instanceOfPagnigationData, PagnigationData } from './userProvider.type';


export interface UserSlice {
  user: User;
  message: string | undefined;
  messageLogin: string | undefined;
  status: StatusRequest.PENDING | StatusRequest.SUCCESS | StatusRequest.FAILED;
  statusLogin:
    | StatusRequest.PENDING
    | StatusRequest.SUCCESS
    | StatusRequest.FAILED;
  listUserPagination: PagnigationData<User[]>
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
      id:'',
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
  listUserPagination: {
    count: 0,
    currentPage: 0,
    nextPage: 0,
    lastPage: 0,
    prevPage: 0,
    data: []
  },
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
          id: '',
          name: ''
        },
        status: '',
        username: ''
      };
    },
    resetFlag: (state)=>{
      state.isAvatar = false;
    },
    resetMessage: (state) => {
      state.message = '';
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
    
    builder.addCase(fetchListUserAsync.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      console.log(action.payload?.result);
      if (instanceOfPagnigationData(action.payload?.result as PagnigationData<User[]>)) {
        state.listUserPagination = action.payload?.result as PagnigationData<User[]>;
        state.message = 'Load List User Success';
      }else if(instanceOfFetchEmptyListUser(action.payload?.result as FetchEmptyListUser)){
        state.message = (action.payload?.result as FetchEmptyListUser).message;
        state.listUserPagination.data = [];
      }
    });
    builder.addCase(fetchListUserAsync.rejected, (state, action) => {
      state.status = StatusRequest.FAILED;
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
export const { resetUser ,resetFlag,resetMessage} = userSlice.actions;
export default userSlice.reducer;
