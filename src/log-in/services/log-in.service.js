import axios from 'axios';
const API_URL = 'https://localhost:5001/auth/';

class AuthService {
    login(user, typeU) {
        return axios.post(API_URL + 'sign-in/' + typeU, {
            email: user.email,
            password: user.password
        })
    }
}
export default new AuthService();