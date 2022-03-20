import { StatusRequest } from 'constants/statusRequest';
import { User } from 'models/user';
import { RootState } from 'store/store';

export const selectStatusUser = (state: RootState): StatusRequest =>
  state.user.status;

export const selectStatusLoginUser = (state: RootState): StatusRequest =>
  state.user.statusLogin;

export const selectStatusUpdateProfile = (state: RootState): boolean =>
  state.user?.statusUploadProfile;

export const selectMessageUser = (state: RootState): string | undefined =>
  state.user?.message;
export const selectMessageListUser = (state: RootState): string | undefined =>
  state.user?.messageListUser;

export const selectMessageLogin = (state: RootState): string | undefined =>
  state.user?.messageLogin;

export const selectUser = (state: RootState): User => state.user.user;

export const selectListUser = (state: RootState): User[] =>
  state.user.listUserPagination.data;

export const selectLastPage = (state: RootState): number | null =>
  state.user.listUserPagination.lastPage;

export const selectCount = (state: RootState): number =>
  state.user.listUserPagination.count;

export const selectStatusAvatar = (state: RootState): boolean | undefined =>
  state.user?.isAvatar;

export const selectCurrentPage = (state: RootState): number | undefined =>
  state.user?.listUserPagination.currentPage;

export const selectStatusDelete = (state: RootState): boolean | undefined =>
  state.user?.isDelete;

export const selectStatusUpdate = (state: RootState): boolean | undefined =>
  state.user?.statusUpdateUser;

// export const selectStatusProfile = (state: RootState): boolean | undefined =>
//   state.user?.statusUploadProfile;
