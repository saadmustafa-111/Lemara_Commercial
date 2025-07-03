export * from './adminDashboardApis/agentsApi';
export * from './adminDashboardApis/clientsApi';
export * from './adminDashboardApis/contactsApi';
export * from './adminDashboardApis/loansApi';

// Common configurations and utilities
export const API_CONFIG = {
  BASE_URL: 'https://lemara-9829c937fd90.herokuapp.com',
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  TIMEOUT: 30000,
};

// Error handling utility
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: any): never => {
  if (error instanceof ApiError) {
    throw error;
  }
  
  if (error.response) {
    throw new ApiError(
      error.response.data?.message || 'API request failed',
      error.response.status,
      error.response.data?.code
    );
  }
  
  throw new ApiError(error.message || 'Unknown error occurred');
};
