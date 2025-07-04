import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contract } from '../../types';

interface ContractsState {
  contracts: Contract[];
  loading: boolean;
  error: string | null;
}

const initialState: ContractsState = {
  contracts: [
    {
      id: 'AMC001',
      deviceId: 'DEV001',
      type: 'AMC',
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      status: 'Active',
      cost: 50000,
      vendor: 'MediTech Solutions',
      terms: 'Annual maintenance contract covering all preventive and corrective maintenance.'
    },
    {
      id: 'CMC001',
      deviceId: 'DEV002',
      type: 'CMC',
      startDate: '2023-08-15',
      endDate: '2024-03-15',
      status: 'Expiring Soon',
      cost: 25000,
      vendor: 'CardioTech Services',
      terms: 'Comprehensive maintenance contract with 24/7 support.'
    }
  ],
  loading: false,
  error: null,
};

const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setContracts: (state, action: PayloadAction<Contract[]>) => {
      state.contracts = action.payload;
    },
    addContract: (state, action: PayloadAction<Contract>) => {
      state.contracts.push(action.payload);
    },
    updateContract: (state, action: PayloadAction<Contract>) => {
      const index = state.contracts.findIndex(contract => contract.id === action.payload.id);
      if (index !== -1) {
        state.contracts[index] = action.payload;
      }
    },
    deleteContract: (state, action: PayloadAction<string>) => {
      state.contracts = state.contracts.filter(contract => contract.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setContracts, addContract, updateContract, deleteContract, setLoading, setError } = contractsSlice.actions;
export default contractsSlice.reducer;