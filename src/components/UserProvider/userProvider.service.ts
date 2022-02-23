import { RestClient } from 'config/api';
import {
  FetchListUserRequest,
  FetchRequestLoginGoogle,
  FetchSuccessEmptyPayload,
  FetchSuccessPayload,
  LoginRequestPayload,
  LoginSuccessPayload,
  ProfileSuccessPayload,
  UpdateProfileRequest,
  UpdateProfileSuccessPayload,
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
    {headers: {Authorization: 'Bearer ' + token}}
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
  // eslint-disable-next-line no-unused-vars
  payload: FetchListUserRequest,
  token: string
): Promise<FetchSuccessPayload | FetchSuccessEmptyPayload> => {
  const { data: response } = await restClient.get<
    FetchSuccessPayload | FetchSuccessEmptyPayload
  >(
    'https://parking-app-project.herokuapp.com/api/v1/users?sizePage=5&currentPage=1&sort=ASC&field=firstName&status=no&role=no',
    {headers: {Authorization: 'Bearer ' + token}}
  );
  return response;
};

export const uploadAvatar = async (
  restClient: RestClient,
  data: FormData,
  token: string
): Promise<UploadAvatarPayload> => {
  const { data: response } = await 
  restClient.put<UploadAvatarPayload>(
    '/users/avatar',
    data,
    {headers: {Authorization: 'Bearer ' + token}}
  );

  return response;
};

export const updateProfile = async (
  restClient: RestClient,
  data: UpdateProfileRequest,
  token: string
): Promise<UpdateProfileSuccessPayload> => {
  const { data: response } = await 
  restClient.put<UpdateProfileSuccessPayload>(
    '/users/avatar',
    data,
    {headers: {Authorization: 'Bearer ' + token}}
  );

  return response;
};
