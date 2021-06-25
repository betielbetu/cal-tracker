import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthDataContext } from './authWrapper';

const AuthRouter = ({ component: Component, roles, ...rest }) => {
	const authContext = useContext(AuthDataContext);
	const { loading } = authContext;
	if (loading) {
		return (
			<Route
				{...rest}
				render={() => {
					return <p>Loading...</p>;
				}}
			/>
		);
	}
	return (
		<Route
			{...rest}
			render={(routeProps) => {
				const currentUser = authContext.user;
				if (!currentUser){
					return <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />
				}
				//authContext.user ? <Component {...routeProps} /> : <Redirect to="/Login"/>
				return <Component {...routeProps} />
			}}
		/>

	);
	/*  we are spreading routeProps to be able to access this routeProps in the component. */
};

export default AuthRouter;
