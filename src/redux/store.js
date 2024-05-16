// Import necessary Redux dependencies
import { createStore } from 'redux';
import authReducer from './reducer';

// Create Redux store
export const store = createStore(authReducer);