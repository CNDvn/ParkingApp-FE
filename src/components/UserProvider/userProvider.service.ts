import { RestClient } from 'config/api';
import {
  FetchListUserRequest,
  FetchSuccessEmptyPayload,
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
): Promise<FetchSuccessPayload | FetchSuccessEmptyPayload> => {
  const { data: response } = await restClient.get<
    FetchSuccessPayload | FetchSuccessEmptyPayload
  >(
    `/users/pagination?sizePage=${payload.sizePage}&numberPage=${payload.numberPage}&userName=${payload.userName}&roles=${payload.role}&sortBy=${payload.sort}`
  );
  return response;
};
