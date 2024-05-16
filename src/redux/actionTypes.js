// Define action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Define action creators
export const login = (userDetails) => ({ type: LOGIN, payload: userDetails });
export const logout = () => ({ type: LOGOUT });
