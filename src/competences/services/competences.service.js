import http from '@/core/http-common'
class CompetencesService {
    endpoint = '/competences';
    getAll(){
        return http.get(this.endpoint);
    }
}

export default new CompetencesService();