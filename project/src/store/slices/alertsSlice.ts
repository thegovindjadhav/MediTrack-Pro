import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from '../../types';

interface AlertsState {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
}

const initialState: AlertsState = {
  alerts: [
    {
      id: 'ALT001',
      type: 'Battery Low',
      severity: 'High',
      deviceId: 'DEV004',
      facilityId: 'FAC003',
      message: 'Defibrillator battery level critically low (15%)',
      createdAt: '2024-01-25T08:00:00Z',
      resolved: false
    },
    {
      id: 'ALT002',
      type: 'Contract Expiring',
      severity: 'Medium',
      deviceId: 'DEV002',
      facilityId: 'FAC002',
      message: 'CMC contract expires in 30 days',
      createdAt: '2024-01-24T10:30:00Z',
      resolved: false
    },
    {
      id: 'ALT003',
      type: 'Service Due',
      severity: 'Medium',
      deviceId: 'DEV003',
      facilityId: 'FAC001',
      message: 'Scheduled preventive maintenance due',
      createdAt: '2024-01-23T14:15:00Z',
      resolved: true,
      resolvedAt: '2024-01-25T09:00:00Z',
      resolvedBy: 'Mike Davis'
    }
  ],
  loading: false,
  error: null,
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlerts: (state, action: PayloadAction<Alert[]>) => {
      state.alerts = action.payload;
    },
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.push(action.payload);
    },
    updateAlert: (state, action: PayloadAction<Alert>) => {
      const index = state.alerts.findIndex(alert => alert.id === action.payload.id);
      if (index !== -1) {
        state.alerts[index] = action.payload;
      }
    },
    resolveAlert: (state, action: PayloadAction<{ id: string; resolvedBy: string }>) => {
      const index = state.alerts.findIndex(alert => alert.id === action.payload.id);
      if (index !== -1) {
        state.alerts[index].resolved = true;
        state.alerts[index].resolvedAt = new Date().toISOString();
        state.alerts[index].resolvedBy = action.payload.resolvedBy;
      }
    },
    deleteAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAlerts, addAlert, updateAlert, resolveAlert, deleteAlert, setLoading, setError } = alertsSlice.actions;
export default alertsSlice.reducer;