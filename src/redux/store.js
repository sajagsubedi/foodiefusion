import { configureStore } from '@reduxjs/toolkit';
import sortSlice from '@/redux/slices/sortSlice';
import fetchSlice from '@/redux/slices/fetchSlice';

const store = configureStore({
  reducer: {
    sortfilter:sortSlice,
    recipes:fetchSlice,
  },
});

export default store;