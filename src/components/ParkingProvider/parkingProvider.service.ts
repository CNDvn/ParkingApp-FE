import {
  FetchSuccessListParkingPayload,
  FetchSuccessEmptyParkingPayload,
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
