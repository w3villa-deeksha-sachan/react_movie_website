import axios, {AxiosResponse} from "axios";
import  {SignupRequest, SignupResponse} from "../../types/signupAuth";


//Api_url

const SIGNUP_API_URL = "https://reqres.in/api/register";

export const signup = async(data:SignupRequest): Promise<SignupResponse> =>{
    try{
        const response:AxiosResponse<SignupResponse> = await axios.post(SIGNUP_API_URL, data)
        return response.data;

    }catch(error:any){
        throw new Error(error.response?.data?.error || "Sign-up failed");
    }
};
