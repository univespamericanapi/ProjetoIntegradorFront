import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

const AuthVerify = ({ logOut }) => {
	const location = useLocation();

	const checkAuth = useCallback(() => {
		const user = JSON.parse(localStorage.getItem('user'));

		if (user?.accessToken) {
			const decodedJwt = parseJwt(user.accessToken);

			if (decodedJwt?.exp * 1000 < Date.now()) {
				logOut();
			}
		}
	}, [logOut]);

	useEffect(() => {
		checkAuth();
	}, [checkAuth, location]);

	return <div></div>;
};

export default AuthVerify;
