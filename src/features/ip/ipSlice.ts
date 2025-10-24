import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CarouselImage, IpInfo } from './types';

interface IpSliceState {
  ipInfo?: IpInfo;
  carouselImage?: CarouselImage
}

export const ipSlice = createSlice({
  name: 'ip',
  initialState: {} as IpSliceState,
  reducers: {
    setIpInfo: (state, action: PayloadAction<IpSliceState['ipInfo']>) => {
      state.ipInfo = action.payload;
    },
    setCarouselImage: (state, action: PayloadAction<IpSliceState['carouselImage']>) => {
      state.carouselImage = action.payload;
    },
  },
});

export const { setIpInfo ,setCarouselImage} = ipSlice.actions;
