import { StatusRequest } from 'constants/statusRequest';
import { User } from 'models/user';
import { RootState } from 'store/store';

export const selectStatusUser = (state: RootState): StatusRequest =>
  state.user.status;

export const selectMessageUser = (state: RootState): string | undefined =>
  state.user?.message;

export const selectUser = (state: RootState): Partial<User> => state.user?.user;

export const selectListUser = (state: RootState): User[] => state.user.listUser;

export const selectLastPage = (state: RootState): number | null =>
  state.user.lastPage;

export const selectCount = (state: RootState): number => state.user.count;
