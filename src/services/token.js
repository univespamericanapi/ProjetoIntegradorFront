import { USER_KEY } from '../config/config';

class TokenService {
	getLocalRefreshToken() {
		try {
			const user = JSON.parse(localStorage.getItem(USER_KEY));
			return user?.refreshToken || null;
		} catch (error) {
			console.error(
				'Error getting local refresh token from localStorage',
				error
			);
			return null;
		}
	}

	getLocalAccessToken() {
		try {
			const user = JSON.parse(localStorage.getItem(USER_KEY));
			return user?.accessToken || null;
		} catch (error) {
			console.error(
				'Error getting local access token from localStorage',
				error
			);
			return null;
		}
	}

	updateLocalAccessToken(token) {
		try {
			const user = JSON.parse(localStorage.getItem(USER_KEY));
			if (user) {
				user.accessToken = token;
				localStorage.setItem(USER_KEY, JSON.stringify(user));
			}
		} catch (error) {
			console.error('Error updating local access token in localStorage', error);
		}
	}

	getUser() {
		try {
			const user = JSON.parse(localStorage.getItem(USER_KEY));
			return user || null;
		} catch (error) {
			console.error('Error getting user from localStorage', error);
			return null;
		}
	}

	setUser(user) {
		try {
			localStorage.setItem(USER_KEY, JSON.stringify(user));
		} catch (error) {
			console.error('Error setting user in localStorage', error);
		}
	}

	removeUser() {
		try {
			localStorage.removeItem(USER_KEY);
		} catch (error) {
			console.error('Error removing user from localStorage', error);
		}
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TokenService();
