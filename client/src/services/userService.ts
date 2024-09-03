import axios from 'axios';

const API_URL = 'http://localhost:4000/api/user';

const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const deleteUser = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};




export const userService = {
    getUsers, deleteUser
}
