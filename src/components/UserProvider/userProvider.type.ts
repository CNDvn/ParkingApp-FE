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
  result: T;
  statusCode: number;
}
export interface LoginRequestPayload {
  username: string;
  password: string;
  role: string;
}
export interface FetchListUserRequest {
  numberPage: number;
  sizePage: number;
  userName: string;
  sort: string;
  role: string;
}
export interface FetchRequestLoginGoogle{
  token: string;
}
export interface LoginSuccessfulPayload {
  access_token:  string;
  refresh_token: string;
  message:       string;
}


export type LoginSuccessPayload = BaseResponse<LoginSuccessfulPayload>;
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
