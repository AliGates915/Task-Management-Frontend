import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardService } from '../../services/dashboard';

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (role, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const userRole = role || state.auth.user?.role;
      
      const response = await dashboardService.getRoleBasedDashboard(userRole);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard data'
      );
    }
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardService.getDashboardStats();
      // console.log("Dashboard Stats Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard stats'
      );
    }
  }
);

const initialState = {
  stats: null,
  userDashboard: null,
  managerDashboard: null,
  adminDashboard: null,
  currentDashboard: null,
  isLoading: false,
  error: null,
  lastUpdated: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.stats = null;
      state.userDashboard = null;
      state.managerDashboard = null;
      state.adminDashboard = null;
      state.currentDashboard = null;
      state.error = null;
    },
    setDashboardLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearDashboardError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchDashboardData
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDashboard = action.payload;
        state.lastUpdated = new Date().toISOString();
        
        // Store data based on role if available in payload
        const payloadData = action.payload.data || action.payload;
        
        if (payloadData.role === 'admin') {
          state.adminDashboard = action.payload;
        } else if (payloadData.role === 'manager') {
          state.managerDashboard = action.payload;
        } else {
          state.userDashboard = action.payload;
        }
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Handle fetchDashboardStats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearDashboardData, setDashboardLoading, clearDashboardError } = dashboardSlice.actions;

export default dashboardSlice.reducer;