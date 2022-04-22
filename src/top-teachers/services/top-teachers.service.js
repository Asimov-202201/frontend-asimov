import http from '@/core/http-common'
class TopTeachersService {
    endpoint = '/teachers';
    user = JSON.parse(localStorage.getItem('user'));
    getAll(){
        return http.get(`directors/${this.user.id}${this.endpoint}`);
    }
}

export default new TopTeachersService();