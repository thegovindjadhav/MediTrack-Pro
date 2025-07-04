import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Facility } from '../../types';

interface FacilitiesState {
  facilities: Facility[];
  loading: boolean;
  error: string | null;
}

const initialState: FacilitiesState = {
  facilities: [
    {
      id: 'FAC001',
      name: 'City General Hospital',
      address: '123 Healthcare Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      contactPerson: 'Dr. Rajesh Sharma',
      contactPhone: '+91 98765 43210',
      contactEmail: 'rajesh.sharma@citygeneral.com',
      deviceCount: 2
    },
    {
      id: 'FAC002',
      name: 'Metro Medical Center',
      address: '456 Medical Plaza',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      contactPerson: 'Dr. Priya Patel',
      contactPhone: '+91 98765 43211',
      contactEmail: 'priya.patel@metromedical.com',
      deviceCount: 1
    },
    {
      id: 'FAC003',
      name: 'Community Health Clinic',
      address: '789 Wellness Street',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      contactPerson: 'Dr. Anil Kumar',
      contactPhone: '+91 98765 43212',
      contactEmail: 'anil.kumar@communityclinic.com',
      deviceCount: 1
    }
  ],
  loading: false,
  error: null,
};

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {
    setFacilities: (state, action: PayloadAction<Facility[]>) => {
      state.facilities = action.payload;
    },
    addFacility: (state, action: PayloadAction<Facility>) => {
      state.facilities.push(action.payload);
    },
    updateFacility: (state, action: PayloadAction<Facility>) => {
      const index = state.facilities.findIndex(facility => facility.id === action.payload.id);
      if (index !== -1) {
        state.facilities[index] = action.payload;
      }
    },
    deleteFacility: (state, action: PayloadAction<string>) => {
      state.facilities = state.facilities.filter(facility => facility.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setFacilities, addFacility, updateFacility, deleteFacility, setLoading, setError } = facilitiesSlice.actions;
export default facilitiesSlice.reducer;