import { fetchListParking } from './../ParkingProvider/parkingProvider.service';
import {
  FetchSuccessListParkingPayload,
  FetchSuccessEmptyParkingPayload,
} from './parkingProvider.type';
import { IParkingPagnigation } from './../../models/base';
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
