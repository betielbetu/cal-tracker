import React, { createContext, useState, useEffect } from "react";
import userService from '../api/user.service'

export const AuthDataContext = createContext(null);

const initialAuthData = {
	loading: true,
	user: null,
};

const AuthWrapper = props => {
	const [authData, setAuthData] = useState(initialAuthData);
	useEffect(() => {
		const currentAuthData = userService.getCurrentUser();
		if (currentAuthData) {
			setAuthData({loading: false, user: currentAuthData});
		}else{
			setAuthData({loading: false, user: null});
		}
	}, []);
	const onLogout = () => {
		userService.logout();
		setAuthData({loading: false, user: null})
	};
	const onLogin = (newAuthData) => {
		setAuthData({loading: false, user: newAuthData});
	}
	return <AuthDataContext.Provider value={{ ...authData, onLogin, onLogout } } {...props} />;
};
export default AuthWrapper;
