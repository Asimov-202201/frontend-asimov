import http from '@/core/http-common'

class DashboardService {
    endpoint = '/announcements'
    getAll(id){
        return http.get(`directors/${id}${this.endpoint}`);
    }
}
export default new DashboardService();