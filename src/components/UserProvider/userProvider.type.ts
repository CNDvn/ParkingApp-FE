import { User } from 'models/user';

export interface BaseResponse<T> {
  message: string;
  data: T;
  statusCode: number;
}
export interface LoginRequestPayload {
  username: string;
  password: string;
}
export interface ErrorBase<T> {
  statusCode: number;
  name: string;
  message: T;
  timestamp: Date;
  path: string;
}
export interface Error<T> {
  response: {
    data: ErrorBase<T>;
  };
}

export type LoginSuccessPayload = BaseResponse<string>;
export type LoginFailPayload = Error<string>;

export type ProfileSuccessPayload = BaseResponse<User>;
export type ProfileFailPayload = BaseResponse<string>;
