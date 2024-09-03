import axios from 'axios';

const API_URL = "http://localhost:4000/api/user/";

const postRequest = async (url: string, data: any) => {
    const response = await axios.post(url, data);
    return response.data;
};

const signup = async (userData: { username: string; email: string; password: string }) => {
    return postRequest(API_URL + "registration", userData);
};

const signin = async (credentials: { email: string; password: string }) => {
    return postRequest(API_URL + "login", credentials);
};

const authService = {
    signup,
    signin,
};

export default authService;

