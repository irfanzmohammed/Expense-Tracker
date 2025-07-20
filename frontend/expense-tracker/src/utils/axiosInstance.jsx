import axios from 'axios'
import { navigateToLogin } from './navigateToLogin';
const axiosInstance =axios.create(
    {
        baseURL:"https://expensetracker-tau-jet.vercel.app/api/v1/",
        timeout:5000,
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true,
    });

//request axios

axiosInstance.interceptors.request.use(
 (config)=>{
    return config;
 },
 (error)=>{
    return Promise.reject(error);
 }
);

//response axios
axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },

    (error)=>{
        if(error.response && error.response.status==401){
            console.error("Unauthorized");
            navigateToLogin()
        }
        return Promise.reject(error);
    }
)

export default axiosInstance