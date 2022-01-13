import { StatusRequest } from 'constants/statusRequest';
import { User } from 'models/user';
import { RootState } from 'store/store';

export const selectStatusUser = (state: RootState): StatusRequest =>
  state.user.status;

export const selectMessageUser = (state: RootState): string | undefined =>
  state.user?.message;

export const selectUser = (state: RootState): Partial<User> => state.user?.user;
