import axios from 'axios';
const API_URL = 'https://asimov-api-202201.azurewebsites.net/auth/';
import http from '@/core/http-common'

class AuthService {
    register(user, typeU) {
        if(typeU == 'teacher'){
            return axios.post(API_URL + 'sign-up/' + typeU, {
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                email: user.email,
                password: user.password,
                phone: user.phone,
                directorId: user.directorId
            });
        }else{
            return axios.post(API_URL + 'sign-up/' + typeU, {
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                email: user.email,
                password: user.password,
                phone: user.phone,
            });
        }
    }

    getAllDirectors(){
        return http.get('directors');
    }

}
export default new AuthService();