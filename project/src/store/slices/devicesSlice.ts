import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '../../types';

interface DevicesState {
  devices: Device[];
  loading: boolean;
  error: string | null;
  filters: {
    status: string;
    facility: string;
    type: string;
  };
}

const initialState: DevicesState = {
  devices: [
    {
      id: 'DEV001',
      type: 'Ventilator',
      model: 'MediVent Pro 3000',
      serialNumber: 'MV3000-001',
      facilityId: 'FAC001',
      facilityName: 'City General Hospital',
      status: 'Online',
      batteryLevel: 85,
      lastServiceDate: '2024-01-15',
      installationDate: '2023-06-01',
      amcStatus: 'Active',
      cmcStatus: 'Active',
      location: 'ICU Ward 2',
      engineer: 'John Smith'
    },
    {
      id: 'DEV002',
      type: 'Patient Monitor',
      model: 'CardioWatch 500',
      serialNumber: 'CW500-045',
      facilityId: 'FAC002',
      facilityName: 'Metro Medical Center',
      status: 'Maintenance',
      batteryLevel: 45,
      lastServiceDate: '2024-01-10',
      installationDate: '2023-08-15',
      amcStatus: 'Expiring Soon',
      cmcStatus: 'Active',
      location: 'Emergency Room',
      engineer: 'Sarah Johnson'
    },
    {
      id: 'DEV003',
      type: 'Infusion Pump',
      model: 'FlowMaster 200',
      serialNumber: 'FM200-078',
      facilityId: 'FAC001',
      facilityName: 'City General Hospital',
      status: 'Online',
      batteryLevel: 92,
      lastServiceDate: '2024-01-20',
      installationDate: '2023-09-10',
      amcStatus: 'Active',
      cmcStatus: 'Expired',
      location: 'General Ward 1',
      engineer: 'Mike Davis'
    },
    {
      id: 'DEV004',
      type: 'Defibrillator',
      model: 'LifeSaver AED',
      serialNumber: 'LS-AED-023',
      facilityId: 'FAC003',
      facilityName: 'Community Health Clinic',
      status: 'Offline',
      batteryLevel: 15,
      lastServiceDate: '2023-12-30',
      installationDate: '2023-07-20',
      amcStatus: 'Active',
      cmcStatus: 'Active',
      location: 'Emergency Station',
      engineer: 'Lisa Chen'
    }
  ],
  loading: false,
  error: null,
  filters: {
    status: '',
    facility: '',
    type: '',
  },
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
    },
    addDevice: (state, action: PayloadAction<Device>) => {
      state.devices.push(action.payload);
    },
    updateDevice: (state, action: PayloadAction<Device>) => {
      const index = state.devices.findIndex(device => device.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
    },
    deleteDevice: (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter(device => device.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<DevicesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setDevices, addDevice, updateDevice, deleteDevice, setFilters, setLoading, setError } = devicesSlice.actions;
export default devicesSlice.reducer;