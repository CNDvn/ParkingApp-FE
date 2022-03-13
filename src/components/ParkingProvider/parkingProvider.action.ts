import { KEYS } from './../../config/key';
import { deleteParking, fetchListParking, fetchListParkingProcess, updateParkingConfirmService, updateParkingRejectService } from './../ParkingProvider/parkingProvider.service';
import {
  FetchSuccessListParkingPayload,
  FetchSuccessEmptyParkingPayload,

} from './parkingProvider.type';
import { IParkingNotify, IParkingPagnigation } from './../../models/base';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { restAPI } from 'config/api';

export const fetchListParkingAsync = createAsyncThunk(
  'parkings/fetchListParking',
  async (
    payload: IParkingPagnigation & { search: string },
    { rejectWithValue }
  ) => {
    try {
      const response:
        | FetchSuccessListParkingPayload
        | FetchSuccessEmptyParkingPayload = await fetchListParking(
        restAPI,
        payload
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDeleteParking = createAsyncThunk(
  '/parkings/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
      const response = await deleteParking(restAPI, id, token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const fetchParkingProcess = createAsyncThunk('/parkings/process', async (payload: IParkingNotify,{ rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
    const response:
      | FetchSuccessListParkingPayload
      | FetchSuccessEmptyParkingPayload = await fetchListParkingProcess(
      restAPI,
      token,
      payload
    );
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateParkingConfirm = createAsyncThunk('/parkings/confirm', async (payload: string,{ rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
    const response = await updateParkingConfirmService(
      restAPI,
      payload,
      token
    );
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateParkingReject = createAsyncThunk('/parkings/reject', async (payload: string,{ rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
    const response = await updateParkingRejectService(
      restAPI,
      payload,
      token
    );
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});