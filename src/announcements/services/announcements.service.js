import http from '@/core/http-common'
class AnnouncementsService {
    endpoint = '/announcements';
    getAllByID(id){
        return http.get(`directors/${id}${this.endpoint}`);
    }

    create(createAnnouncementDto){
        return http.post(`${this.endpoint}`, createAnnouncementDto);
    }

    delete(id){
        return http.delete(`${this.endpoint}/${id}`);
    }
}

export default new AnnouncementsService();