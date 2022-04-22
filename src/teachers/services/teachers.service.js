import http from '@/core/http-common'

class TeachersService {
    endpoint = '/teachers';
    user = JSON.parse(localStorage.getItem('user'));
    getAll(){
        return http.get(`directors/${this.user.id}${this.endpoint}`);
    }

    getById(id){
        return http.get(`${this.endpoint}/${id}`)
    }

    getAllCoursesById(id){
        return http.get(`${this.endpoint}/${id}/courses`)
    }
}

export default new TeachersService();