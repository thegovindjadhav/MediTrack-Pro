import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Installation } from '../../types';

interface InstallationsState {
  installations: Installation[];
  loading: boolean;
  error: string | null;
}

const initialState: InstallationsState = {
  installations: [
    {
      id: 'INST001',
      deviceId: 'DEV001',
      facilityId: 'FAC001',
      engineerId: 'ENG001',
      engineerName: 'John Smith',
      installationDate: '2024-01-25',
      status: 'In Progress',
      checklist: [
        { id: 'CL001', task: 'Device unboxing and inspection', completed: true, completedBy: 'John Smith', completedAt: '2024-01-25T09:00:00Z' },
        { id: 'CL002', task: 'Power connection and calibration', completed: true, completedBy: 'John Smith', completedAt: '2024-01-25T09:30:00Z' },
        { id: 'CL003', task: 'Network configuration', completed: false },
        { id: 'CL004', task: 'Staff training', completed: false },
        { id: 'CL005', task: 'Final testing and documentation', completed: false }
      ],
      photos: [
        { id: 'PH001', filename: 'unboxing-1.jpg', url: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg', uploadedAt: '2024-01-25T09:15:00Z', uploadedBy: 'John Smith', category: 'Unboxing' }
      ],
      trainingCompleted: false,
      notes: 'Installation proceeding smoothly. Network team scheduled for tomorrow.'
    }
  ],
  loading: false,
  error: null,
};

const installationsSlice = createSlice({
  name: 'installations',
  initialState,
  reducers: {
    setInstallations: (state, action: PayloadAction<Installation[]>) => {
      state.installations = action.payload;
    },
    addInstallation: (state, action: PayloadAction<Installation>) => {
      state.installations.push(action.payload);
    },
    updateInstallation: (state, action: PayloadAction<Installation>) => {
      const index = state.installations.findIndex(inst => inst.id === action.payload.id);
      if (index !== -1) {
        state.installations[index] = action.payload;
      }
    },
    deleteInstallation: (state, action: PayloadAction<string>) => {
      state.installations = state.installations.filter(inst => inst.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setInstallations, addInstallation, updateInstallation, deleteInstallation, setLoading, setError } = installationsSlice.actions;
export default installationsSlice.reducer;