import api from './api';

class UserService {
	getPublicContent() {
		return api.get('/all');
	}

	getUserBoard() {
		return api.get('/user');
	}

	getStaffBoard() {
		return api.get('/staff');
	}

	getAdminBoard() {
		return api.get('/admin');
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
