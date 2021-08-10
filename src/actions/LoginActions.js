// Declare action names as constants with uppercase string
/* eslint-disable no-throw-literal */
import ApiService from '../services/ApiServices';

export const IDM_BEGIN = 'ERAPIDS_BEGIN';
export const IDM_SUCCESS = 'ERAPIDS_SUCCESS';
export const IDM_FAILURE = 'ERAPIDS_FAILURE';

export const IDM_SCREEN_BEGIN = 'ERAPIDS_SCREEN_BEGIN';
export const IDM_SCREEN_SUCCESS = 'ERAPIDS_SCREEN_SUCCESS';
export const IDM_SCREEN_FAILURE = 'ERAPIDS_SCREEN_FAILURE';

export const ERAPIDS_TOKEN_BEGIN = 'ERAPIDS_TOKEN_BEGIN';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const ERAPIDS_TOKEN_FAILURE = 'ERAPIDS_TOKEN_FAILURE';

export const ERAPIDS_REFRESHTOKEN_BEGIN = 'ERAPIDS_REFRESHTOKEN_BEGIN';
export const ERAPIDS_REFRESHTOKEN_SUCCESS = 'ERAPIDS_REFRESHTOKEN_SUCCESS';
export const ERAPIDS_REFRESHTOKEN_FAILURE = 'ERAPIDS_REFRESHTOKEN_FAILURE';

export const EMPLOYEE_BY_ID_BEGIN = 'EMPLOYEE_BY_ID_BEGIN';
export const EMPLOYEE_BY_ID_SUCCESS = 'EMPLOYEE_BY_ID_SUCCESS';
export const EMPLOYEE_BY_ID_FAILURE = 'EMPLOYEE_BY_ID_FAILURE';

export const DESTROY_SESSION = 'DESTROY_SESSION';
export const CLEAR_ALL_STATES = 'CLEAR_ALL_STATES';

export function fetchIDM(data, props) {
    return async dispatch => {
        dispatch(IDMBegin());
        await ApiService.authUserApplicationName(data)
            .then(
                resultAuth => {
                    if (resultAuth.IsAuthenticated) {
                        IDMScreenBegin();
                        ApiService.getScreenByUser(
                            {
                                ApplicationId: resultAuth.ApplicationId,
                                UserId: resultAuth.UserId
                            }, data.token).then(
                                resultScreen => {
                                    ApiService.getTokenApplication(data)
                                        .then(
                                            result => {
                                                dispatch(TokenSuccess(result));
                                                dispatch(IDMScreenSuccess(resultScreen));
                                                dispatch(IDMSuccess(resultAuth));
                                                props.login(() => {
                                                    props.history.push({
                                                        pathname: resultScreen[0].ActionUrl,
                                                        state: 'MI DATA de Login',
                                                        isAuth: resultAuth.IsAuthenticated
                                                    })
                                                }, true);
                                            },
                                            error => {
                                                dispatch(ErapidsTokenFailure());
                                                throw ({ error: error, message: 'Ops! user authentication failed' });
                                            }
                                        )
                                },
                                error => {
                                    dispatch(IDMScreenFailure());
                                    throw ({ error: error, message: 'Ops! user authentication failed' });
                                }
                            );
                    } else {
                        console.log("Usuario y/o contrase" + String.fromCharCode(241) + "a incorrectos");
                    }
                },
                error => {
                    dispatch(IDMFailure());
                    throw ({ error: error, message: 'Ops! user authentication failed' });
                }
            )
    };
}

export function fetchErapidsRefreshToken(data) {
    return async dispatch => {
        dispatch(ErapidsRefreshTokenBegin());
        await ApiService.getRefreshTokenErapids(data)
            .then(
                result => {
                    dispatch(ErapidsRefreshTokenSuccess(result));
                },
                error => {
                    dispatch(ErapidsRefreshTokenFailure(error));
                    // throw ({ error: error, message: 'Ops! user authentication failed' });
                }
            )
    };
}

export function fetchEmployeeById(id) {
    return async dispatch => {
        dispatch(EmployeeByIdBegin());
        await ApiService.getEmployeeById(id)
            .then(
                result => {
                    dispatch(EmployeeByIdSuccess(result));
                },
                error => {
                    dispatch(EmployeeByIdFailure());
                    throw ({ error: error, message: 'Ops! user authentication failed' });
                }
            )
    };
}



// Action: Function that returns an object with action data for reducer
export const IDMBegin = () => ({
    type: IDM_BEGIN
});
export const IDMSuccess = data => ({
    type: IDM_SUCCESS,
    payload: { data }
});
export const IDMFailure = error => ({
    type: IDM_FAILURE,
    payload: { error }
});


export const IDMScreenBegin = () => ({
    type: IDM_SCREEN_BEGIN
});
export const IDMScreenSuccess = data => ({
    type: IDM_SCREEN_SUCCESS,
    payload: { data }
});
export const IDMScreenFailure = error => ({
    type: IDM_SCREEN_FAILURE,
    payload: { error }
});
export const TokenBegin = () => ({
    type: ERAPIDS_TOKEN_BEGIN
});
export const TokenSuccess = data => ({
    type: TOKEN_SUCCESS,
    payload: { data }
});
export const ErapidsTokenFailure = error => ({
    type: ERAPIDS_TOKEN_FAILURE,
    payload: { error }
});

export const ErapidsRefreshTokenBegin = () => ({
    type: ERAPIDS_REFRESHTOKEN_BEGIN
});
export const ErapidsRefreshTokenSuccess = data => ({
    type: ERAPIDS_REFRESHTOKEN_SUCCESS,
    payload: { data }
});
export const ErapidsRefreshTokenFailure = error => ({
    type: ERAPIDS_REFRESHTOKEN_FAILURE,
    payload: { error }
});

export const EmployeeByIdBegin = () => ({
    type: EMPLOYEE_BY_ID_BEGIN
});
export const EmployeeByIdSuccess = data => ({
    type: EMPLOYEE_BY_ID_SUCCESS,
    payload: { data }
});
export const EmployeeByIdFailure = error => ({
    type: EMPLOYEE_BY_ID_FAILURE,
    payload: { error }
});

export const logout = () => ({
    type: DESTROY_SESSION
})

export const clearAllStates = () => ({
    type: CLEAR_ALL_STATES
})