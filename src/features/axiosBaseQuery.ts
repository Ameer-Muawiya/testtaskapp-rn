import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { Alert } from 'react-native';
import { GENERAL_API_ERR_MSG } from '../common/constants';
import { store } from './store';

const excludedUrls: string[] = [];

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const token = '';

      console.info(
        '******** API CALL ********',
        '\nreq-method: ' + method,
        '\nreq-url: ' + baseUrl + url,
        // '\nreq-headers: ' + JSON.stringify(headers),
        '\nreq-token: ' + token,
        '\nreq-data: ' + JSON.stringify(data),
        '\nreq-params: ' + JSON.stringify(params),
      );
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...(token.length && {
            Authorization: `Bearer ${token}`,
          }),
          ...headers,
        },
      });
      console.log(
        '\nres-status: ' + result.status,
        '\nres-data: ' + JSON.stringify(result.data),
        '\n******** END ********\n',
      );
      if (!result.data?.success) {
        throw {response:result}
      }
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      console.error(
        '\nres-status: ' + err.response?.status,
        '\nres-data: ' + JSON.stringify(err.response?.data) || err.message,
        '\n******** END ********\n',
      );
      Alert.alert(
        'Error',
        // @ts-ignore
        err.response?.data?.message || err.message || GENERAL_API_ERR_MSG,
      );
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
