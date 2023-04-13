import axios from "axios";

/**
 * @description Api url
 */
const baseUrl = 'http://localhost:3000'
/**
 * @returns all the users
 */
const getUsers = () => axios.get(`${baseUrl}/users?_page=1&_limit=30`);

const getNewUsers = (page: number) => axios.get(`${baseUrl}/users?_page=${page}&_limit=30`)
/**
 * @param id user id of which data is to be fetched
 * @returns individual project details of perticular id
 */
const getUserDetailsById = (id: string) => axios.get(`${baseUrl}/projects/${id}`);
/**
 * @description all services in the form of object and can be destructured where it is to be used
 */
const scrollServices = {
    getUsers,
    getNewUsers,
    getUserDetailsById,
};
export default scrollServices;