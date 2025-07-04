import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServiceVisit } from '../../types';

interface ServiceVisitsState {
  serviceVisits: ServiceVisit[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceVisitsState = {
  serviceVisits: [
    {
      id: 'SV001',
      deviceId: 'DEV001',
      facilityId: 'FAC001',
      engineerId: 'ENG001',
      engineerName: 'John Smith',
      visitDate: '2024-01-15',
      purpose: 'Preventive',
      status: 'Completed',
      notes: 'Routine maintenance completed successfully. All systems functioning normally.',
      photos: [
        { id: 'PH002', filename: 'maintenance-1.jpg', url: 'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg', uploadedAt: '2024-01-15T14:30:00Z', uploadedBy: 'John Smith', category: 'Maintenance' }
      ],
      attachments: [],
      duration: 120
    },
    {
      id: 'SV002',
      deviceId: 'DEV002',
      facilityId: 'FAC002',
      engineerId: 'ENG002',
      engineerName: 'Sarah Johnson',
      visitDate: '2024-01-20',
      purpose: 'Breakdown',
      status: 'In Progress',
      notes: 'Investigating display issues. Replacement parts ordered.',
      photos: [],
      attachments: [],
      duration: 90
    }
  ],
  loading: false,
  error: null,
};

const serviceVisitsSlice = createSlice({
  name: 'serviceVisits',
  initialState,
  reducers: {
    setServiceVisits: (state, action: PayloadAction<ServiceVisit[]>) => {
      state.serviceVisits = action.payload;
    },
    addServiceVisit: (state, action: PayloadAction<ServiceVisit>) => {
      state.serviceVisits.push(action.payload);
    },
    updateServiceVisit: (state, action: PayloadAction<ServiceVisit>) => {
      const index = state.serviceVisits.findIndex(visit => visit.id === action.payload.id);
      if (index !== -1) {
        state.serviceVisits[index] = action.payload;
      }
    },
    deleteServiceVisit: (state, action: PayloadAction<string>) => {
      state.serviceVisits = state.serviceVisits.filter(visit => visit.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setServiceVisits, addServiceVisit, updateServiceVisit, deleteServiceVisit, setLoading, setError } = serviceVisitsSlice.actions;
export default serviceVisitsSlice.reducer;