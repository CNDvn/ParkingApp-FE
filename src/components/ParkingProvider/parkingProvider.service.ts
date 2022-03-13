import {
  FetchSuccessPayloadParkingDetail,
  UpdateStatusParking,
} from './parkingProvider.type';
import {
  FetchSuccessListParkingPayload,
  FetchSuccessEmptyParkingPayload,
  DeleteParkingPayload,
} from './parkingProvider.type';
import { IParkingNotify, IParkingPagnigation } from './../../models/base';
import { RestClient } from 'config/api';


export const fetchParkingDetail = async (
  restClient: RestClient,
  id: string
): Promise<FetchSuccessPayloadParkingDetail> => {
  const { data: response } =
    await restClient.get<FetchSuccessPayloadParkingDetail>(`/parkings/${id}`);
  return response;
};

export const fetchListParking = async (
  restClient: RestClient,
  payload: IParkingPagnigation & { search: string }
): Promise<
  FetchSuccessListParkingPayload | FetchSuccessEmptyParkingPayload
> => {
  const { data: response } = await restClient.get<
    FetchSuccessListParkingPayload | FetchSuccessEmptyParkingPayload
  >(
    `/parkings?sizePage=${payload.sizePage}&currentPage=${payload.currentPage}&sort=${payload.sort}&field=${payload.field}&name=${payload.search}&address=${payload.search}`
  );
  return response;
};

export const fetchListParkingProcess = async (
  restClient: RestClient,
  token: string,
  payload: IParkingNotify
): Promise<
  FetchSuccessListParkingPayload | FetchSuccessEmptyParkingPayload
> => {
  const { data: response } = await restClient.get<
    FetchSuccessListParkingPayload | FetchSuccessEmptyParkingPayload
  >(
    `parkings/admin?sizePage=${payload.sizePage}&currentPage=${payload.currentPage}&sort=${payload.sort}&statusParking=${payload.status}`,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};

export const deleteParking = async (
  restClient: RestClient,
  id: string,
  token: string
): Promise<DeleteParkingPayload> => {
  const { data: response } = await restClient.delete<DeleteParkingPayload>(
    `/parkings/${id}`,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};

export const updateParkingConfirmService = async (
  restClient: RestClient,
  id: string,
  token: string
): Promise<UpdateStatusParking> => {
  const { data: response } = await restClient.put<UpdateStatusParking>(
    `/parkings/${id}/confirm`,
    null,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};

export const updateParkingRejectService = async (
  restClient: RestClient,
  id: string,
  token: string
): Promise<UpdateStatusParking> => {
  const { data: response } = await restClient.put<UpdateStatusParking>(
    `/parkings/${id}/reject`,
    null,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return response;
};
