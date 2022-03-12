import {
  FetchSuccessListParkingPayload,
  FetchSuccessEmptyParkingPayload,
  DeleteParkingPayload,
} from './parkingProvider.type';
import { IParkingPagnigation } from './../../models/base';
import { RestClient } from 'config/api';

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

export const fetchListParkingProcess = async (restClient: RestClient,token: string): Promise<FetchSuccessListParkingPayload | FetchSuccessEmptyParkingPayload> => {
  const { data: response } = await restClient.get<
    FetchSuccessListParkingPayload | FetchSuccessEmptyParkingPayload
  >(
    'parkings/processing?sizePage=5&currentPage=1&sort=ASC',
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
