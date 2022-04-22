import http from '@/core/http-common'
class ProfileService {
    firstEndpoint = '/directors';
    getAll(){
        return http.get(this.firstEndpoint);
    }

    getDirectorById(id){
        return http.get(`${this.firstEndpoint}/${id}`)
    }

    secondEndpoint = '/teachers';
    getTeacherById(id){
        return http.get(`${this.secondEndpoint}/${id}`)
    }
}

export default new ProfileService();