import axios from "axios";

const API_URL = "/api/users/";

const register = (username, email, password) => {
	return axios.post(API_URL, {
		username,
		email,
		password,
	});
};

const login = (email, password) => {
	return axios
		.post(`${API_URL}login`, {
			email,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}

			return response.data;
		});
};

const logout = () => {
	localStorage.removeItem("user");;
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const userApi = {
	register,
	login,
	logout,
	getCurrentUser,
};

export default userApi;
