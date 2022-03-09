import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../feature/counter/counterSlice';
import logger from 'redux-logger';
import userReducer from 'components/UserProvider/userProvider.slice';
import parkingReducer from 'components/ParkingProvider/parkingProvider.slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    parking: parkingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
