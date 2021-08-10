// // Action names should be imported from their respective action modules
import { PURGE } from 'redux-persist'
import {
    IDM_BEGIN,
    IDM_SUCCESS,
    IDM_FAILURE,
    IDM_SCREEN_BEGIN,
    IDM_SCREEN_SUCCESS,
    IDM_SCREEN_FAILURE,
    ERAPIDS_TOKEN_BEGIN,
    TOKEN_SUCCESS,
    ERAPIDS_TOKEN_FAILURE,
    ERAPIDS_REFRESHTOKEN_BEGIN,
    ERAPIDS_REFRESHTOKEN_SUCCESS,
    ERAPIDS_REFRESHTOKEN_FAILURE,
    EMPLOYEE_BY_ID_BEGIN,
    EMPLOYEE_BY_ID_SUCCESS,
    EMPLOYEE_BY_ID_FAILURE,
    CLEAR_ALL_STATES
} from '../actions/LoginActions';

// Example initial state
const initialState = {
    item: {},
    isLoading: false,
    error: '',
    itemToken: {},
    itemRefreshToken: {},
    screen: {},
    employeeById:{}
};

// Return a new state object with updated attributes
export default function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case IDM_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case IDM_SUCCESS:
            return {
                ...state,
                item: action.payload.data,
                isLoading: false,
                error: ''
            }
        case IDM_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false
            }
        case PURGE:
            return {
                item: {},
                isLoading: false,
                error: '',
                screen: {}
            }
        case IDM_SCREEN_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case IDM_SCREEN_SUCCESS:
            return {
                ...state,
                screen: action.payload.data,
                isLoading: false,
                error: ''
            }
        case IDM_SCREEN_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false
            }
        case ERAPIDS_TOKEN_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case TOKEN_SUCCESS:
            return {
                ...state,
                itemToken: action.payload.data,
                isLoading: false,
                error: ''
            }
        case ERAPIDS_TOKEN_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false
            }
         case ERAPIDS_REFRESHTOKEN_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case ERAPIDS_REFRESHTOKEN_SUCCESS:
            return {
                ...state,
                itemToken: action.payload.data,
                isLoading: false,
                error: ''
            }
        case ERAPIDS_REFRESHTOKEN_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false
            }
        case EMPLOYEE_BY_ID_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case EMPLOYEE_BY_ID_SUCCESS:
            return {
                ...state,
                employeeById: action.payload.data,
                isLoading: false,
                error: ''
            }
        case EMPLOYEE_BY_ID_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false
            }
        default:
            return state;
    }
};


export const authError = state => {
    return state.error;
}

export const authIsLoading = state => {
    return state.isLoading;
}

export const auth = state => {
    return state.item;
}

export const IDMScreenError = state => {
    return state.error;
}

export const IDMScreenIsLoading = state => {
    return state.isLoading;
}

export const IDMScreen = state => {
    return state.screen;
}

export const erapidsTokenError = state => {
    return state.error;
}

export const erapidsTokenIsLoading = state => {
    return state.isLoading;
}

export const erapidsToken = state => {
    return state.itemToken;
}

export const erapidsRefreshTokenError = state => {
    return state.error;
}

export const erapidsRefreshTokenIsLoading = state => {
    return state.isLoading;
}

export const erapidsRefreshToken = state => {
    return state.itemToken;
}

export const employeeByIdIsLoading = state => {
    return state.isLoading;
}

export const employeeById = state => {
    return state.employeeById;
}