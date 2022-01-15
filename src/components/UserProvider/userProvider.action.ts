import { createAsyncThunk } from '@reduxjs/toolkit';
import { restAPI } from 'config/api';
import { fetchProfileUser, fetchUserLogin } from './userProvider.service';
import {
  LoginFailPayload,
  LoginRequestPayload,
  LoginSuccessPayload,
  ProfileSuccessPayload,
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
  async (_, { rejectWithValue }) => {
    try {
      const response: ProfileSuccessPayload = await fetchProfileUser(restAPI);
      return response;
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);
