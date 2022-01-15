import { RestClient } from 'config/api';
import {
  FetchListUserRequest,
  FetchSuccessPayload,
  LoginRequestPayload,
  LoginSuccessPayload,
  ProfileSuccessPayload,
} from './userProvider.type';

export const fetchUserLogin = async (
  payload: LoginRequestPayload,
  restClient: RestClient
): Promise<LoginSuccessPayload> => {
  const { data: response } = await restClient.post<LoginSuccessPayload>(
    '/auth/login',
    payload
  );
  return response;
};

export const fetchProfileUser = async (
  restClient: RestClient
): Promise<ProfileSuccessPayload> => {
  const { data: response } = await restClient.get<ProfileSuccessPayload>(
    '/auth/profile'
  );
  return response;
};

export const fetchListUser = async (
  restClient: RestClient,
  payload: FetchListUserRequest
): Promise<FetchSuccessPayload> => {
  const { data: response } = await restClient.get<FetchSuccessPayload>(
    `/users/pagination?sizePage=5&numberPage=${payload.newPage}&roles=NO&sortBy=ASC`
  );
  return response;
};
