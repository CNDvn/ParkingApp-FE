import { createAsyncThunk } from '@reduxjs/toolkit';
import { restAPI } from 'config/api';
import { KEYS } from 'config/key';
import { IUserPagnigation } from 'models/base';
import {
  deleteUser,
  fetchListUser,
  fetchLoginGoogleUser,
  fetchProfileUser,
  fetchUserLogin,
  updateProfile,
  updateUser,
  uploadAvatar,
} from './userProvider.service';
import {
  FetchRequestLoginGoogle,
  FetchSuccessEmptyPayload,
  FetchSuccessPayload,
  LoginFailPayload,
  LoginRequestPayload,
  LoginSuccessPayload,
  ProfileSuccessPayload,
  UpdateProfileRequest,
  UpdateProfileSuccessPayload,
  UpdateUserRequest,
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
      const response: ProfileSuccessPayload = await fetchProfileUser(
        restAPI,
        payload
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);

export const fetchListUserAsync = createAsyncThunk(
  'user/fetchListUser',
  async (
    payload: IUserPagnigation & { search: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem(KEYS.token);
      if (token) {
        const response: FetchSuccessPayload | FetchSuccessEmptyPayload =
          await fetchListUser(restAPI, payload, JSON.parse(token));
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
      const response: LoginSuccessPayload = await fetchLoginGoogleUser(
        restAPI,
        payload
      );
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
      const response: UploadAvatarPayload = await uploadAvatar(
        restAPI,
        payload,
        token
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);

export const fetchUpdateProfile = createAsyncThunk(
  '/users/profile',
  async (payload: UpdateProfileRequest, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
      const response: UpdateProfileSuccessPayload = await updateProfile(
        restAPI,
        payload,
        token
      );
      return response;
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  '/user/update',
  async (payload: UpdateUserRequest, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
      const response = await updateUser(restAPI, payload, payload.id, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDeleteUser = createAsyncThunk(
  '/user/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
      const response = await deleteUser(restAPI, id, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
