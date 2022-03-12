import { Parking } from './../../models/parking';
import { RootState } from 'store/store';

export const selectListParking = (state: RootState): Parking[] =>
  state.parking.listParkingPagination.data;

export const selectMessageParking = (state: RootState): string | undefined =>
  state.parking?.message;

export const selectLastPage = (state: RootState): number | null =>
  state.parking.listParkingPagination.lastPage;

export const selectCount = (state: RootState): number =>
  state.parking.listParkingPagination.count;

export const selectCurrentPage = (state: RootState): number | undefined =>
  state.parking?.listParkingPagination.currentPage;

export const selectStatusDelete = (state: RootState): boolean | undefined =>
  state.parking?.isDelete;
  
  export const selectListParkingProcess = (state: RootState): Parking[] =>
  state.parking.listParkingPaginationProcess.data;