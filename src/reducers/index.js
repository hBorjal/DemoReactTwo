import { combineReducers } from 'redux';
import Auth, * as fromAuthenticate from './LoginReducer.js';
import { CLEAR_ALL_STATES } from '../actions/LoginActions';

const appReducer = combineReducers({
    Auth
});

const rootReducer = (state, action) => {
    // Clear all data in redux store to initial.
    if (action.type === CLEAR_ALL_STATES)
        state = undefined;

    return appReducer(state, action);
};

//Auth

export const authIsLoading = state =>
    fromAuthenticate.authIsLoading(state.Auth);
export const authError = state =>
    fromAuthenticate.authError(state.Auth);
export const auth = state =>
    fromAuthenticate.auth(state.Auth);

export const IDMScreenIsLoading = state =>
    fromAuthenticate.IDMScreenIsLoading(state.Auth);
export const IDMScreenError = state =>
    fromAuthenticate.IDMScreenError(state.Auth);
export const IDMScreen = state =>
    fromAuthenticate.IDMScreen(state.Auth);

export const erapidsTokenIsLoading = state =>
    fromAuthenticate.erapidsTokenIsLoading(state.Auth);
export const erapidsTokenError = state =>
    fromAuthenticate.erapidsTokenError(state.Auth);
export const erapidsToken = state =>
    fromAuthenticate.erapidsToken(state.Auth);

export const erapidsRefreshTokenIsLoading = state =>
    fromAuthenticate.erapidsRefreshTokenIsLoading(state.Auth);
export const erapidsRefreshTokenError = state =>
    fromAuthenticate.erapidsRefreshTokenError(state.Auth);
export const erapidsRefreshToken = state =>
    fromAuthenticate.erapidsRefreshToken(state.Auth);

export const employeeByIdIsLoading = state =>
    fromAuthenticate.employeeByIdIsLoading(state.Auth);
export const employeeById = state =>
    fromAuthenticate.employeeById(state.Auth);

export default rootReducer;