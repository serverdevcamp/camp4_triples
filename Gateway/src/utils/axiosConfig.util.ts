import { AxiosRequestConfig, Method } from 'axios';
import { RequestWithFiles } from '../interface/requestWithToken';

export const axiosConfig = function(method: Method, req: RequestWithFiles, URL: string, params?: string): AxiosRequestConfig {
  return {
    method,
    url: URL,
    withCredentials: true,
    data: req.body
  };
};
