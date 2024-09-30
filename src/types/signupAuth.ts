export interface SignupRequest{
    email:string;
    password:string;
}

export interface SignupResponse {
    token:string;
}