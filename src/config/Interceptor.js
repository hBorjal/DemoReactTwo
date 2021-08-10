import { ApiAxios } from "../utils/Axios";
import { fetchErapidsRefreshToken } from '../actions/LoginActions';
import store from '../store/Store';

export default function interceptor(){
    const { dispatch } = store; // direct access to redux store.
    ApiAxios.interceptors.request.use(async (config)=> {
        if (store.getState().Auth.itemToken !== undefined) {
            var utcDate = store.getState().Auth.itemToken.issuedUtc;
            var dateInit = new Date(utcDate);
            dateInit.setSeconds(dateInit.getUTCSeconds() + store.getState().Auth.itemToken.expires_in);
            var utcDateString = new Date(new Date().toUTCString()).toISOString();
            var dateVigency= new Date(utcDateString);
            if (dateVigency > dateInit) {
              await dispatch(fetchErapidsRefreshToken(store.getState().Auth.itemToken.refresh_token));
                config.headers.Authorization = `Bearer ${store.getState().Auth.itemToken.access_token}`;
            }
            else {
                config.headers.Authorization = `Bearer ${store.getState().Auth.itemToken.access_token}`;
            }
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });    
    // Add a response interceptor
    ApiAxios.interceptors.response.use(function (response) {
        // console.log('response****************+');
        // Do something with response data
        return response;
    }, function (error) {
        // Do something with response error
        return Promise.reject(error);
    });
}