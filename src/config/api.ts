import axios, { AxiosInstance } from 'axios';
import * as URL from './url';
import {KEYS} from '/Users/tranbao/Desktop/ParkingApp-FE/src/config/key';
export const restAPI: AxiosInstance = axios.create({
  baseURL: `${URL.API_PARKING}/api/v1`,
});

restAPI.interceptors.response.use((res)=>{  
  console.log(res.data);
  return res;
},async (err)=>{
   const originalConfig = err.config;
   if (originalConfig.url !== '/auths/login' && err.response) {
    // Access Token was expired
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const refreshToken = await localStorage.getItem(KEYS.refresh_token);
      try {
       if (refreshToken) {
        const rs = await restAPI.post('/auths/refreshToken', {
          token: JSON.parse(refreshToken),
        });
        const { access_token } = rs.data.result;
        localStorage.setItem(KEYS.token, JSON.stringify(access_token));
        return restAPI(originalConfig);
       }
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(err);
});
export type RestClient = typeof restAPI;

export interface APIResponse<TData> {
  message: string;
  data: TData;
  statusCode: number;
}
