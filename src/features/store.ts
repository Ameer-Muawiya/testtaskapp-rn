import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Action,
  combineSlices,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { ipApiSlice } from './ip/ipApiSlice';
import { ipSlice } from './ip/ipSlice';

const rootReducer = combineSlices(ipApiSlice, ipSlice);

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
  },
  (state, action) => {
    if (action.type === 'CLEAR_STORE') {
      state = undefined; // Reset Redux state
    }
    // @ts-ignore
    return rootReducer(state, action);
  },
);

export const store = configureStore({
  reducer: persistedReducer as unknown as typeof rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(ipApiSlice.middleware),
});

// required for `refetchOnFocus`/`refetchOnReconnect` behaviors
setupListeners(store.dispatch);

export const persistor = persistStore(store);

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
