import axios from 'axios';
import TokenService from './token';

import {
	API_URL,
	LOGIN_URL,
	REFRESH_TOKEN_URL,
	CONTENT_TYPE,
} from '../config/config';

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': CONTENT_TYPE,
	},
});

// Interceptor de requisição
instance.interceptors.request.use(
	(config) => {
		const token = TokenService.getLocalAccessToken();
		if (token) {
			config.headers['x-access-token'] = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Interceptor de resposta
instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalConfig = error.config;

		// Trata o token expirado
		if (originalConfig.url !== LOGIN_URL && error.response) {
			if (error.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;

				try {
					const response = await instance.post(REFRESH_TOKEN_URL, {
						refreshToken: TokenService.getLocalRefreshToken(),
					});

					const { accessToken } = response.data;
					TokenService.updateLocalAccessToken(accessToken);

					return instance(originalConfig);
				} catch (_error) {
					return Promise.reject(_error);
				}
			}
		}

		return Promise.reject(error);
	}
);

export default instance;
