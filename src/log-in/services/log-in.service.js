import axios from 'axios';
const API_URL = 'https://asimov-api-202201.azurewebsites.net/auth/';

class AuthService {
    login(user, typeU) {
        return axios.post(API_URL + 'sign-in/' + typeU, {
            email: user.email,
            password: user.password
        })
    }
}
export default new AuthService();