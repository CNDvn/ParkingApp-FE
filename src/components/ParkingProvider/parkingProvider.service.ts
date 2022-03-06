import { RestClient } from 'config/api';
import { FetchSuccessPayloadParkingDetail } from './parkingProvider.type';


export const fetchParkingDetail = async (
    restClient: RestClient,
    id: string
  ): Promise<FetchSuccessPayloadParkingDetail> => {
    const { data: response } = await restClient.get<FetchSuccessPayloadParkingDetail>(
      `/parkings/${id}`
    );
    return response;
  };
  