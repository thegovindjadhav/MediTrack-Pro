import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Engineer } from '../../types';

interface EngineersState {
  engineers: Engineer[];
  loading: boolean;
  error: string | null;
}

const initialState: EngineersState = {
  engineers: [
    {
      id: 'ENG001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+91 98765 11111',
      specialization: ['Ventilators', 'Patient Monitors'],
      activeAssignments: 3,
      rating: 4.8
    },
    {
      id: 'ENG002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+91 98765 22222',
      specialization: ['Patient Monitors', 'Infusion Pumps'],
      activeAssignments: 2,
      rating: 4.9
    },
    {
      id: 'ENG003',
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      phone: '+91 98765 33333',
      specialization: ['Infusion Pumps', 'Defibrillators'],
      activeAssignments: 1,
      rating: 4.7
    },
    {
      id: 'ENG004',
      name: 'Lisa Chen',
      email: 'lisa.chen@company.com',
      phone: '+91 98765 44444',
      specialization: ['Defibrillators', 'Ventilators'],
      activeAssignments: 2,
      rating: 4.6
    }
  ],
  loading: false,
  error: null,
};

const engineersSlice = createSlice({
  name: 'engineers',
  initialState,
  reducers: {
    setEngineers: (state, action: PayloadAction<Engineer[]>) => {
      state.engineers = action.payload;
    },
    addEngineer: (state, action: PayloadAction<Engineer>) => {
      state.engineers.push(action.payload);
    },
    updateEngineer: (state, action: PayloadAction<Engineer>) => {
      const index = state.engineers.findIndex(engineer => engineer.id === action.payload.id);
      if (index !== -1) {
        state.engineers[index] = action.payload;
      }
    },
    deleteEngineer: (state, action: PayloadAction<string>) => {
      state.engineers = state.engineers.filter(engineer => engineer.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setEngineers, addEngineer, updateEngineer, deleteEngineer, setLoading, setError } = engineersSlice.actions;
export default engineersSlice.reducer;