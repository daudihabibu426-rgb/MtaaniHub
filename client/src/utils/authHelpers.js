// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token') && !!localStorage.getItem('user');
};

// Get stored user
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Get stored token
export const getStoredToken = () => {
  return localStorage.getItem('token');
};

// Check if user has role
export const hasRole = (requiredRole) => {
  const user = getStoredUser();
  return user && user.role === requiredRole;
};

// Check if user has any of the roles
export const hasAnyRole = (roles) => {
  const user = getStoredUser();
  return user && roles.includes(user.role);
};

// Check if user is seller
export const isSeller = () => {
  return hasRole('seller');
};

// Check if user is admin
export const isAdmin = () => {
  return hasRole('admin');
};

// Check if user is customer
export const isCustomer = () => {
  return hasRole('customer');
};
