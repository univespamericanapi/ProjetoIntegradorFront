import api from './api';
import TokenService from './token';

class AuthService {
	async login(usuario_login, usuario_senha) {
		const response = await api.post('/auth/login', {
			usuario_login,
			usuario_senha,
		});
		if (response.data.accessToken) {
			TokenService.setUser(response.data);
		}
		return response.data;
	}

	logout() {
		TokenService.removeUser();
	}

	register(username, email, password) {
		return api.post('/auth/signup', {
			username,
			email,
			password,
		});
	}

	getCurrentUser() {
		return TokenService.getUser();
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
