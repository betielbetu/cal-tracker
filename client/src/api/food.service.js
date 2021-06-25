import axios from "axios";
import authHeader from "../auth/authHeader";

const API_URL = "/api/food/";

const getFood = () => {
	return axios.get(API_URL, {headers: authHeader()});
}

const getFoodById = (foodId) => {
	return axios.get(`${API_URL}${foodId}`, {headers: authHeader()});
}

const addFood = (food) => {
	return axios.post(API_URL,food ,{headers: authHeader()});
}

const deleteFood = (foodId) => {
	return axios.delete(`${API_URL}${foodId}`, {headers: authHeader()});
}

const foodApi =  {
	getFood,
	getFoodById,
	addFood,
	deleteFood,
};

export default foodApi;
