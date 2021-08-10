import { ApiAxios, AuthAxios} from '../utils/Axios';

const host = process.env.REACT_APP_API_ULR_CIB;
const hostAuth = process.env.REACT_APP_API_ULR_IDM;

// function NOW() {

//     var date = new Date();
//     var aaaa = date.getFullYear();
//     var gg = date.getDate();
//     var mm = (date.getMonth() + 1);

//     if (gg < 10)
//         gg = "0" + gg;

//     if (mm < 10)
//         mm = "0" + mm;

//     var cur_day = aaaa + "-" + mm + "-" + gg;

//     var hours = date.getHours()
//     var minutes = date.getMinutes()
//     var seconds = date.getSeconds();

//     if (hours < 10)
//         hours = "0" + hours;

//     if (minutes < 10)
//         minutes = "0" + minutes;

//     if (seconds < 10)
//         seconds = "0" + seconds;

//     return cur_day + " " + hours + ":" + minutes + ":" + seconds;

// }

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    authUser(params) {
        const url = `${hostAuth}/Authenticate`
        // const url = `https://appsdev.cotemar.com.mx/IDMApi/api/Authenticate`;
        const method = 'POST';
        let data = {
            Username: params.Username,
            Password: params.Password,
            TypeCredential: params.TypeCredential,
            AppName: 'IDM',
            Grant_type: "password",
            AppNameSecurity: "IDM",
        }
        return this.makeRequest({ method, url, data });
    },
    //Login
    authUserApplicationName(params) {
        const url = `${hostAuth}/Security/Login`
        // const url = `https://appsdev.cotemar.com.mx/IDMApi/api/Security/Login`;
        const method = 'POST';
        const headers = {
            Authorization: `Bearer ${params.token}`
        };
        let data = {
            Username: params.Username,
            Password: params.Password,
            TypeCredential: params.TypeCredential,
            AppName: 'CIB',
            Grant_type: 'password'
        }
        return this.makeAuthorizedRequest({ method, url, data, headers });
    },
    //Screens for application
    getScreenByUser(params,token) {
        const queries = this.makeQueryParams('', params);
        const method = 'GET';
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const url = `${hostAuth}/Screens/GetScreenRetrieveByUserRol?${queries}`
        // const url = `https://appsdev.cotemar.com.mx/IDMApi/api/Screens/GetScreenRetrieveByUserRol?${queries}`
        return this.makeAuthorizedRequest({ method, url, headers });
    },
    // token of application
    getTokenApplication(params) {
        const url = `${hostAuth}/Authenticate`
        // const url = `https://appsdev.cotemar.com.mx/IDMApi/api/Authenticate`
        const method = 'POST';
        let data = {
            Username: params.Username,
            Password: params.Password,
            TypeCredential: params.TypeCredential,
            AppName: 'CIB',
            Grant_type: "password",
            AppNameSecurity: "CIB",
        }

        if (!params.isAuthFicha)
            delete data.FechaIngreso;

        return this.makeRequest({ method, url, data });
    },
    getRefreshTokenErapids(refresh) {
        const url = `${hostAuth}/Authenticate/refresh`
        // const url = `https://appsdev.cotemar.com.mx/IDMApi/api/Authenticate/refresh`
        const method = 'POST';
        const data = {
            RefreshToken: refresh
        }
        return this.makeRequest({ method, url, data });
    },
    async getNewToken(refresh_token) {
        const url = '/oauth/token...';
        const method = 'POST';
        const data = {
            grant_type: 'refresh_token',
            refresh_token
        };
        return this.makeRequest({ method, url, data });
    },

    async makeRequest(requestData = {}) {

        let res = await AuthAxios(requestData);
        return res.data;
    },

    async makeAuthorizedRequest(requestData = {}) {
        let res = await ApiAxios(requestData);
        return res.data;
    },
    makeQueryParams (obj ='', params) {
		let queries ='';
		for(var key in params){
			if(Array.isArray(params[key])){
				// eslint-disable-next-line no-loop-func
				params[key].map(item => queries += `${obj}${key}=${item}&`);
			} else queries += `${obj}${key}=${params[key]}&`;
		}
		return queries;
    },
};