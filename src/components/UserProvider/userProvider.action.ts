/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { restAPI } from 'config/api';
import { KEYS } from 'config/key';
import {
  fetchListUser,
  fetchLoginGoogleUser,
  fetchProfileUser,
  fetchUserLogin,
  updateProfile,
  uploadAvatar,
} from './userProvider.service';
import {
  FetchListUserRequest,
  FetchRequestLoginGoogle,
  FetchSuccessEmptyPayload,
  FetchSuccessPayload,
  LoginFailPayload,
  LoginRequestPayload,
  LoginSuccessPayload,
  ProfileSuccessPayload,
  UpdateProfileRequest,
  UpdateProfileSuccessPayload,
  UploadAvatarPayload,
} from './userProvider.type';

export const fetchLoginAsync = createAsyncThunk(
  'user/fetchLogin',
  async (payload: LoginRequestPayload, { rejectWithValue }) => {
    try {
      const response: LoginSuccessPayload = await fetchUserLogin(
        payload,
        restAPI
      );      
        return response;
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);

export const fetchProfileAsync = createAsyncThunk(
  'user/fetchProfile',
  async (payload: string, { rejectWithValue }) => {
    try {
      const response: ProfileSuccessPayload = await fetchProfileUser(restAPI,payload);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);

export const fetchListUserAsync = createAsyncThunk(
  'user/fetchListUser',
  async (payload: FetchListUserRequest, { rejectWithValue }) => {
    try {
      const token =  localStorage.getItem(KEYS.token);
      if (token) {
        const response: FetchSuccessPayload | FetchSuccessEmptyPayload =
        await fetchListUser(restAPI, payload,JSON.parse(token));
      return response;
      }
     
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);

export const fetchLoginGoogleAsync = createAsyncThunk(
  'auths/loginGoogle',
  async (payload: FetchRequestLoginGoogle, { rejectWithValue }) => {
    try {
      const response: LoginSuccessPayload =
        await fetchLoginGoogleUser(restAPI, payload);
        console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);

export const fetchUploadAvatar = createAsyncThunk(
  'users/avatar',
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
      const response: UploadAvatarPayload =
        await uploadAvatar(restAPI, payload,token);
      return response;
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);

export const fetchUpdateProfile = createAsyncThunk(
  '/users/profile',
  async (payload: UpdateProfileRequest,{ rejectWithValue })=>{
    try {
      const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
      const response: UpdateProfileSuccessPayload = await updateProfile(restAPI, payload, token);
      return response;
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);