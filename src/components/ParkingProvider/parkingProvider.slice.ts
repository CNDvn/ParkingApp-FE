import {
  fetchDeleteParking,
  fetchListParkingAsync,
  fetchParkingProcess,
  updateParkingConfirm,
  updateParkingReject,
} from 'components/ParkingProvider/parkingProvider.action';
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
  messageProcess: string | undefined;
  status: StatusRequest.PENDING | StatusRequest.SUCCESS | StatusRequest.FAILED;
  listParkingPagination: PagnigationData<Parking[]>;
  isImages: boolean;
  isDelete: boolean;
  listParkingPaginationProcess: PagnigationData<Parking[]>;
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
    business: {
      id: '',
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
          id: '',
          name: '',
        },
        status: '',
        username: '',
      },
    },
    images: [],
    coordinates: { latitude: 0, longitude: 0 },
    parkingSlots: [],
  },
  listParkingPaginationProcess: {
    count: 0,
    currentPage: 0,
    nextPage: 0,
    lastPage: 0,
    prevPage: 0,
    data: [],
  },
  message: '',
  messageProcess: '',
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
        business: {
          id: '',
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
              id: '',
              name: '',
            },
            status: '',
            username: '',
          },
        },
        phoneNumber: '',
        name: '',
        openTime: '',
        closeTime: '',
        coordinates: { latitude: 0, longitude: 0 },
        status: '',
        parkingSlots: [],
      };
    },
    resetMessage: (state) => {
      state.message = '';
    },
    resetMessageProcess: (state) => {
      state.messageProcess = '';
    },
    resetDelete: (state) => {
      state.isDelete = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchParkingProcess.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(fetchParkingProcess.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      if (
        instanceOfPagnigationData(
          action.payload?.result as PagnigationData<Parking[]>
        )
      ) {
        state.listParkingPaginationProcess = action.payload
          ?.result as PagnigationData<Parking[]>;
        state.messageProcess = 'Load List Parking Process Success';
      } else if (
        instanceOfFetchEmptyListParking(
          action.payload?.result as FetchEmptyListParking
        )
      ) {
        state.messageProcess = (
          action.payload?.result as FetchEmptyListParking
        ).message;
        state.listParkingPaginationProcess.data = [];
      }
    });
    builder.addCase(fetchParkingProcess.rejected, (state, action) => {
      state.status = StatusRequest.FAILED;
      state.messageProcess = (action.payload as ErrorBase<string>).message;
    });

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

    // Update parking confirm
    builder.addCase(updateParkingConfirm.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(updateParkingConfirm.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      state.messageProcess = action.payload.result;
    });
    builder.addCase(updateParkingConfirm.rejected, (state) => {
      state.status = StatusRequest.FAILED;
    });
    // Update parking confirm
    builder.addCase(updateParkingReject.pending, (state) => {
      state.status = StatusRequest.PENDING;
    });
    builder.addCase(updateParkingReject.fulfilled, (state, action) => {
      state.status = StatusRequest.SUCCESS;
      state.messageProcess = action.payload.result;
    });
    builder.addCase(updateParkingReject.rejected, (state) => {
      state.status = StatusRequest.FAILED;
    });
  },
});
export const { resetParking, resetMessage } = parkingSlice.actions;
export default parkingSlice.reducer;
