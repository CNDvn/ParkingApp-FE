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
  newPage: number;
}

export type LoginSuccessPayload = BaseResponse<string>;
export type LoginFailPayload = Error<string>;

export type ProfileSuccessPayload = BaseResponse<User>;
export type ProfileFailPayload = BaseResponse<string>;

export type FetchSuccessPayload = BaseResponse<PagnigationData<User[]>>;
