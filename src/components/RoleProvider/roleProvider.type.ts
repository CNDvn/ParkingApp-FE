import { BaseResponse } from 'components/UserProvider/userProvider.type';
import { Role } from 'models/user';

export type FetchSuccessPayloadRoles = BaseResponse<Role[]>