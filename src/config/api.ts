import axios, { AxiosInstance } from 'axios';
import * as URL from './url';

export const restAPI: AxiosInstance = axios.create({
  baseURL: `${URL.API_PARKING}/v1`,
});

export type RestClient = typeof restAPI;

export interface APIResponse<TData> {
  message: string;
  data: TData;
  statusCode: number;
}
