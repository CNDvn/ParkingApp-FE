import { createAsyncThunk } from '@reduxjs/toolkit';
import { restAPI } from 'config/api';
import { fetchUserLogin } from './userProvider.service';
import {
  LoginFailPayload,
  LoginRequestPayload,
  LoginSuccessPayload,
} from './userProvider.type';

export const loginAsync = createAsyncThunk(
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
