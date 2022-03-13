import { RestClient } from 'config/api';
import { KEYS } from 'config/key';
import { FetchSuccessPayloadRoles, FetchSuccessPayloadStatus } from './roleProvider.type';

export const fetchListRole = async (
  restClient: RestClient
): Promise<FetchSuccessPayloadRoles> => {
  const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
  const { data: response } = await restClient.get<FetchSuccessPayloadRoles>(
    '/roles',
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};

export const fetchListStatus = async (
  restClient: RestClient
): Promise<FetchSuccessPayloadStatus> => {
  const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
  const { data: response } = await restClient.get<FetchSuccessPayloadStatus>(
    '/status',
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};
