import authService from '@src/features/auth/auth.service';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import {API_ENDPOINT} from '@env';

import {getAccessToken} from './token.util';

interface IHttpRequest {
  url: string;
  method: Method;
  data?: any;
  params?: any;
  contentType?: string;
}

class HttpUtil {
  private readonly http: AxiosInstance;
  private readonly httpUploadImg: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 30000,
    });

    this.httpUploadImg = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 30000,
    });

    this.http.interceptors.request.use(
      config => {
        const headers: any = config.headers;
        const accessToken = getAccessToken();

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        return {...config, headers: config.headers};
      },
      error => {
        return Promise.reject(error);
      },
    );

    this.http.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const accessToken = getAccessToken();

        if (!accessToken) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401) {
          const success = await authService.refreshToken();

          if (success) {
            return this.http(error.config as AxiosRequestConfig);
          } else {
            await authService.logout();
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async request<T>({
    url,
    params,
    data,
    method,
    contentType,
  }: IHttpRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      headers: {
        'Content-Type': contentType || 'application/json',
      },
    };

    const response = await this.http.request(config);

    return response.data as T;
  }

  async uploadListImage({files}: {files: any[]}): Promise<any> {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('image', file);
    });

    const config: AxiosRequestConfig = {
      url: '/api/image/upload',
      method: 'POST',
      data: formData,
      baseURL: API_ENDPOINT,
    };

    const response = await this.http.request(config);

    return response.data;
  }
}

const httpUtil = new HttpUtil();

export default httpUtil;