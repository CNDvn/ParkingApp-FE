import { fetchDeleteParking, fetchListParkingAsync } from 'components/ParkingProvider/parkingProvider.action';
import { PagnigationData } from './../UserProvider/userProvider.type';
import { Parking } from './../../models/parking';
import { createSlice } from '@reduxjs/toolkit';
import { StatusRequest } from 'constants/statusRequest';
import { ErrorBase } from 'models/error';
import {
  FetchEmptyListParking,
  instanceOfFetchEmptyListParking,
  instanceOfPagnigationData,
} from './parkingProvider.type';

export interface ParkingSlice {
  parking: Parking;
  message: string | undefined;
  status: StatusRequest.PENDING | StatusRequest.SUCCESS | StatusRequest.FAILED;
  listParkingPagination: PagnigationData<Parking[]>;
  isImages: boolean;
  isDelete: boolean;
}

const initialState: ParkingSlice = {
  parking: {
    id: '',
    name: '',
    address: '',
    openTime: '',
    closeTime: '',
    status: '',
    phoneNumber: '',
    business: {},
    images: [],
    coordinates: { latitude: 0, longitude: 0 },
  },
  message: '',
  status: StatusRequest.PENDING,
  listParkingPagination: {
    count: 0,
    currentPage: 0,
    nextPage: 0,
    lastPage: 0,
    prevPage: 0,
    data: [],
  },
  isImages: false,
  isDelete: false,
};

export const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {
    resetParking: (state) => {
      state.parking = {
        id: '',
        address: '',
        images: [],
        business: {},
        phoneNumber: '',
        name: '',
        openTime: '',
        closeTime: '',
        coordinates: { latitude: 0, longitude: 0 },
        status: '',
      };
    },
    resetMessage: (state) => {
      state.message = '';
    },
    resetDelete: (state) => {
      state.isDelete = false;
    },
  },
  extraReducers: (builder) => {
    // get list Parking
    builder.addCase(fetchListParkingAsync.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });

    builder.addCase(fetchListParkingAsync.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      if (
        instanceOfPagnigationData(
          action.payload?.result as PagnigationData<Parking[]>
        )
      ) {
        state.listParkingPagination = action.payload?.result as PagnigationData<
          Parking[]
        >;
        state.message = 'Load List Parking Success';
      } else if (
        instanceOfFetchEmptyListParking(
          action.payload?.result as FetchEmptyListParking
        )
      ) {
        state.message = (
          action.payload?.result as FetchEmptyListParking
        ).message;
        state.listParkingPagination.data = [];
      }
    });
    builder.addCase(fetchListParkingAsync.rejected, (state, action) => {
      state.status = StatusRequest.FAILED;
      state.message = (action.payload as ErrorBase<string>).message;
    });

    // delete parking
    builder.addCase(fetchDeleteParking.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(fetchDeleteParking.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      state.message = action.payload.result;
      state.isDelete = true;
    });
    builder.addCase(fetchDeleteParking.rejected, (state) => {
      state.status = StatusRequest.FAILED;
    });
  },
});
export const { resetParking, resetMessage } = parkingSlice.actions;
export default parkingSlice.reducer;
