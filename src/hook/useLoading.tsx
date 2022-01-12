/* eslint-disable no-unused-vars */
import { StatusRequest } from 'constants/statusRequest';
import { ReactText, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContent, ToastOptions } from 'react-toastify';

export interface LoadingToastParams {
  loading: boolean;
  successMessage: ToastContent;
  errorMessage: ToastContent;
  loadingMessage: ToastContent;
  status: StatusRequest | null;
  path: string;
}

export interface LoadingToastReturnValues {
  toastId: ReactText | null;
  showToast: ShowToastCallback;
}
export type ShowToastCallback = (options?: ToastOptions) => void;
export const useLoadingToast = ({
  loading,
  loadingMessage,
  successMessage,
  errorMessage,
  status,
  path,
}: LoadingToastParams): LoadingToastReturnValues => {
  const [toastId, setToastId] = useState<ReactText | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading || !status || !toastId) {
      return;
    }

    switch (status) {
      case StatusRequest.SUCCESS:
        toast.update(toastId, {
          render: successMessage,
          isLoading: false,
          type: 'success',
          autoClose: 3000,
          closeOnClick: true,
          icon: '👌',
        });
        if (path !== '') {
          navigate(path);
        }
        break;
      case StatusRequest.FAILED:
        toast.update(toastId, {
          render: errorMessage,
          isLoading: false,
          type: 'error',
          autoClose: 3000,
          closeOnClick: true,
        });
        break;
      default:
        break;
    }
    setToastId(null);
  }, [status]);

  const showToast = useCallback<ShowToastCallback>(
    (options) => {
      setToastId(toast.loading(loadingMessage, options));
    },
    [loadingMessage]
  );
  return {
    toastId,
    showToast,
  };
};
