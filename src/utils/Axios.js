import axios from 'axios';

const ApiAxios = axios.create();
const AuthAxios = axios.create();

ApiAxios.defaults.headers.common['Content-Type'] = 'application/json';
AuthAxios.defaults.headers.common['Content-Type'] = 'application/json';
//Allow the use of array parameter with key value
//ApiAxios.defaults.headers.common['WWW-Authenticate'] = 'jasdfjklasdfjklsdfjklsdfjklsdfjklsdf';


export { ApiAxios, AuthAxios };
