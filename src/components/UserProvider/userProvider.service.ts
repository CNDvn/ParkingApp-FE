import { RestClient } from 'config/api';
import { LoginRequestPayload, LoginSuccessPayload } from './userProvider.type';

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
