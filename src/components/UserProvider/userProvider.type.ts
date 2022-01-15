import { Error } from 'models/error';
import { User } from 'models/user';
export interface PagnigationData<T> {
  count: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
  result: T;
}
export interface FetchEmptyListUser {
  message: string;
}
export interface BaseResponse<T> {
  message: string;
  data: T;
  statusCode: number;
}
export interface LoginRequestPayload {
  username: string;
  password: string;
}
export interface FetchListUserRequest {
  numberPage: number;
  sizePage: number;
  userName: string;
  sort: string;
  role: string;
}

export type LoginSuccessPayload = BaseResponse<string>;
export type LoginFailPayload = Error<string>;

export type ProfileSuccessPayload = BaseResponse<User>;
export type ProfileFailPayload = BaseResponse<string>;

export type FetchSuccessPayload = BaseResponse<PagnigationData<User[]>>;
export type FetchSuccessEmptyPayload = BaseResponse<FetchEmptyListUser>;

export function instanceOfPagnigationData(
  data: PagnigationData<User[]>
): data is PagnigationData<User[]> {
  return 'count' in data;
}

export function instanceOfFetchEmptyListUser(
  data: FetchEmptyListUser
): data is FetchEmptyListUser {
  return 'message' in data;
}
