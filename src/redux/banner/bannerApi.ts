import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppEnvConst } from '../../constants';
import type { RootStateType } from '../Store';

export interface BANNER {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  action_type: string;
  action_value: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface BannerListResponse {
  data: BANNER[];
}

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AppEnvConst.apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootStateType).auth?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Banner'],
  endpoints: (builder) => ({
    getBanners: builder.query<BANNER[], void>({
      query: () => '/api/v1/banners/',
      transformResponse: (response: BannerListResponse) => {
        return (response.data || [])
          .filter((banner) => banner.is_active)
          .sort((a, b) => a.sort_order - b.sort_order);
      },
      providesTags: ['Banner']
    })
  })
});

export const { useGetBannersQuery } = bannerApi;
