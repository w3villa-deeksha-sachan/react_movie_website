import axios, {AxiosResponse} from "axios";
import { LoginRequest, AuthResponse } from "../../types/loginAuth";


const API_URL="https://reqres.in/api/login";

export const login = async(data:LoginRequest):Promise<AuthResponse> =>{
    try{
        const response:AxiosResponse<AuthResponse> = await axios.post(API_URL, data);
        return response.data;

    }catch(error:any){
        throw new Error(error.response?.data?.errpr||"Login failed");
    }
};

