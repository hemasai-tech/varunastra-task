import { LOGIN, LOGOUT } from "./actionTypes";

// Define initial state
const initialState = {
  isLoggedIn: false,
  user: null, // Initialize user as null
};

// Define reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, user: action.payload };
    case LOGOUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
