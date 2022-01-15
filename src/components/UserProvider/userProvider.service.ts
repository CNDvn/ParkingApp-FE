import { RestClient } from 'config/api';
import { LoginRequestPayload, LoginSuccessPayload, ProfileSuccessPayload } from './userProvider.type';

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
