// Helper function to extract data from both response formats
const extractData = (response) => {
  if (!response) return {};
  
  // If response has data property (nested format)
  if (response.data) {
    return response.data;
  }
  
  // If response is already the data (flat format)
  return response;
};

// Main selectors
export const selectDashboardStats = (state) => extractData(state.dashboard.stats);
export const selectDashboardLoading = (state) => state.dashboard.isLoading;
export const selectDashboardError = (state) => state.dashboard.error;
export const selectCurrentDashboard = (state) => extractData(state.dashboard.currentDashboard);
export const selectDashboardLastUpdated = (state) => state.dashboard.lastUpdated;

// Specific data selectors
export const selectTotalTasks = (state) => selectDashboardStats(state).totalTasks || 0;
export const selectCompletedTasks = (state) => selectDashboardStats(state).completedTasks || 0;
export const selectPendingTasks = (state) => selectDashboardStats(state).pendingTasks || 0;
export const selectInProgressTasks = (state) => selectDashboardStats(state).inProgressTasks || 0;
export const selectDelayedTasks = (state) => selectDashboardStats(state).delayedTasks || 0;
export const selectTeamMembers = (state) => selectDashboardStats(state).teamMembers || 0;
export const selectActiveCompanies = (state) => selectDashboardStats(state).activeCompanies || 0;
export const selectProductivity = (state) => selectDashboardStats(state).productivity || 0;
export const selectChartData = (state) => selectDashboardStats(state).chartData || [];
export const selectRecentActivities = (state) => selectDashboardStats(state).recentActivities || [];
export const selectRecentTasks = (state) => selectDashboardStats(state).recentTasks || [];
export const selectMyTasks = (state) => selectDashboardStats(state).myTasks || [];

// For role-based dashboards
export const selectAdminStats = (state) => extractData(state.dashboard.adminDashboard);
export const selectManagerStats = (state) => extractData(state.dashboard.managerDashboard);
export const selectUserStats = (state) => extractData(state.dashboard.userDashboard);

// Summary selectors
export const selectSummary = (state) => selectDashboardStats(state).summary || {};
export const selectCompletionRate = (state) => selectSummary(state).completionRate || 0;

// Additional selectors
export const selectCompaniesWithStats = (state) => selectAdminStats(state).companiesWithStats || [];

// Check if we have detailed data
export const selectHasDetailedData = (state) => {
  const stats = selectDashboardStats(state);
  return stats && (stats.chartData || stats.recentTasks || stats.recentActivities);
};