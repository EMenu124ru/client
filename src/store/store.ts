import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook, useDispatch, useSelector,
} from 'react-redux';
import { basketSlice } from '@store/basket/slice';
import { dishSlice } from '@store/dishes/slice';
import { authSlice } from './auth/slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    basket: basketSlice.reducer,
    dishes: dishSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
