import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../axiosBaseQuery';
import { GetIpInfoArg, GetIpInfoRes } from './types';

export const ipApiSlice = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'ipApi',
  endpoints: build => ({
    getIpInfo: build.mutation<GetIpInfoRes, GetIpInfoArg>({
      query: arg => {
        return {
          url: `https://ipwho.is/${arg.ip}`,
          method:"GET",
        };
      },
    }),
  }),
});

export const { useGetIpInfoMutation } = ipApiSlice;
