import { Error } from 'models/error';
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

export type LoginSuccessPayload = BaseResponse<string>;
export type LoginFailPayload = Error<string>;

export type ProfileSuccessPayload = BaseResponse<User>;
export type ProfileFailPayload = BaseResponse<string>;
