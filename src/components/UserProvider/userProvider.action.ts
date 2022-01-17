import { createAsyncThunk } from '@reduxjs/toolkit';
import { restAPI } from 'config/api';
import {
  fetchListUser,
  fetchProfileUser,
  fetchUserLogin,
} from './userProvider.service';
import {
  FetchListUserRequest,
  FetchSuccessEmptyPayload,
  FetchSuccessPayload,
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
      const responseProfile: ProfileSuccessPayload = await fetchProfileUser(
        restAPI
      );
      return { ...response, profile: responseProfile.data };
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

export const fetchListUserAsync = createAsyncThunk(
  'user/fetchListUser',
  async (payload: FetchListUserRequest, { rejectWithValue }) => {
    try {
      const response: FetchSuccessPayload | FetchSuccessEmptyPayload =
        await fetchListUser(restAPI, payload);
      return response;
    } catch (error) {
      return rejectWithValue((error as LoginFailPayload).response.data);
    }
  }
);
