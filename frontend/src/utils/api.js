const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

/**
 * Make an authenticated API request
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_URL}/api${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

/**
 * Register user
 */
export const registerUser = async (userData) => {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

/**
 * Get user profile
 */
export const getUserProfile = async () => {
  return apiRequest('/user/profile');
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userData) => {
  return apiRequest('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};

/**
 * Get all plans
 */
export const getPlans = async () => {
  return apiRequest('/plans');
};

/**
 * Create a new plan
 */
export const createPlan = async (planData) => {
  return apiRequest('/plans', {
    method: 'POST',
    body: JSON.stringify(planData),
  });
};
