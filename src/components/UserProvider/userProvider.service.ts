import { KEYS } from 'config/key';
import { RestClient } from 'config/api';
import { IUserPagnigation } from 'models/base';
import {
  DeleteUserPayload,
  FetchRequestLoginGoogle,
  FetchSuccessEmptyPayload,
  FetchSuccessPayload,
  LoginRequestPayload,
  LoginSuccessPayload,
  LogoutSuccessPayload,
  PayloadUpdateBanUser,
  ProfileSuccessPayload,
  UpdateProfileRequest,
  UpdateProfileSuccessPayload,
  UpdateUserRequest,
  UpdateUserSuccessPayload,
  UploadAvatarPayload,
} from './userProvider.type';

export const fetchUserLogin = async (
  payload: LoginRequestPayload,
  restClient: RestClient
): Promise<LoginSuccessPayload> => {
  const { data: response } = await restClient.post<LoginSuccessPayload>(
    '/auths/login',
    payload
  );
  return response;
};

export const fetchProfileUser = async (
  restClient: RestClient,
  token: string
): Promise<ProfileSuccessPayload> => {
  const { data: response } = await restClient.get<ProfileSuccessPayload>(
    '/users/me',
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};

export const fetchLoginGoogleUser = async (
  restClient: RestClient,
  payload: FetchRequestLoginGoogle
): Promise<LoginSuccessPayload> => {
  const { data: response } = await restClient.post<LoginSuccessPayload>(
    '/auths/loginGoogle',
    payload
  );
  return response;
};

export const fetchListUser = async (
  restClient: RestClient,
  payload: IUserPagnigation & { search: string },
  token: string
): Promise<FetchSuccessPayload | FetchSuccessEmptyPayload> => {
  const { data: response } = await restClient.get<
    FetchSuccessPayload | FetchSuccessEmptyPayload
  >(
    `/users?sizePage=${payload.sizePage}&currentPage=${payload.currentPage}&sort=${payload.sort}&field=${payload.field}&status=${payload.status}&role=${payload.role}&search=${payload.search}`,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};

export const uploadAvatar = async (
  restClient: RestClient,
  data: FormData,
  token: string
): Promise<UploadAvatarPayload> => {
  const { data: response } = await restClient.put<UploadAvatarPayload>(
    '/users/avatar',
    data,
    { headers: { Authorization: 'Bearer ' + token } }
  );

  return response;
};

export const updateProfile = async (
  restClient: RestClient,
  data: UpdateProfileRequest,
  token: string
): Promise<UpdateProfileSuccessPayload> => {
  const { data: response } = await restClient.put<UpdateProfileSuccessPayload>(
    '/users/profile',
    data,
    { headers: { Authorization: 'Bearer ' + token } }
  );

  return response;
};

export const updateUser = async (
  restClient: RestClient,
  data: Omit<UpdateUserRequest, 'id'>,
  id: string,
  token: string
): Promise<UpdateUserSuccessPayload> => {
  const { data: response } = await restClient.put<UpdateUserSuccessPayload>(
    `/users/${id}`,
    data,
    { headers: { Authorization: 'Bearer ' + token } }
  );

  return response;
};

export const deleteUser = async (
  restClient: RestClient,
  id: string,
  token: string
): Promise<DeleteUserPayload> => {
  const { data: response } = await restClient.delete<DeleteUserPayload>(
    `/users/${id}`,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};

export const updateBanUser = async (
  restClient: RestClient,
  payload: PayloadUpdateBanUser,
  token: string
): Promise<DeleteUserPayload> => {
  const { data: response } = await restClient.put<DeleteUserPayload>(
    `/users/${payload.id}/status?status=${payload.status}`,
    null,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};

export const logout = async (
  restClient: RestClient
): Promise<LogoutSuccessPayload> => {
  const token = JSON.parse(localStorage.getItem(KEYS.token) as string);
  const { data: response } = await restClient.post<LogoutSuccessPayload>(
    '/auths/logout',
    null,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};
