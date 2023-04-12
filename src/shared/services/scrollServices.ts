import axios from "axios";

/**
 * @description Api url
 */
const baseUrl = 'http://localhost:3000'
/**
 * @returns all the users
 */
const getAllUsers = () => axios.get(`${baseUrl}/users`);
/**
 * @param id user id of which data is to be fetched
 * @returns individual project details of perticular id
 */
const getUserDetailsById = (id: string) => axios.get(`${baseUrl}/projects/${id}`);
/**
 * @description all services in the form of object and can be destructured where it is to be used
 */
const scrollServices = {
    getAllUsers,
    getUserDetailsById,
};
export default scrollServices;