import { Parking } from './../../models/parking';
import { Error } from 'models/error';
export interface PagnigationData<T> {
  count: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
  data: T;
}
export interface FetchEmptyListParking {
  message: string;
}
export interface BaseResponse<T> {
  result: T;
  statusCode: number;
}

export type DeleteParkingPayload = BaseResponse<string>;

export type FetchSuccessListParkingPayload = BaseResponse<
  PagnigationData<Parking[]>
>;
export type FetchSuccessEmptyParkingPayload =
  BaseResponse<FetchEmptyListParking>;

export type UpdateUserFailPayLoad = Error<string>;

export function instanceOfPagnigationData(
  data: PagnigationData<Parking[]>
): data is PagnigationData<Parking[]> {
  return 'count' in data;
}

export function instanceOfFetchEmptyListParking(
  data: FetchEmptyListParking
): data is FetchEmptyListParking {
  return 'message' in data;
}
