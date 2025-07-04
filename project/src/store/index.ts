import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './slices/devicesSlice';
import installationsReducer from './slices/installationsSlice';
import serviceVisitsReducer from './slices/serviceVisitsSlice';
import contractsReducer from './slices/contractsSlice';
import alertsReducer from './slices/alertsSlice';
import facilitiesReducer from './slices/facilitiesSlice';
import engineersReducer from './slices/engineersSlice';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    installations: installationsReducer,
    serviceVisits: serviceVisitsReducer,
    contracts: contractsReducer,
    alerts: alertsReducer,
    facilities: facilitiesReducer,
    engineers: engineersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;