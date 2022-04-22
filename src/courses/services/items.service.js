import http from '@/core/http-common'
class ItemsService {
    endpoint = '/items';

    update(id, updateItemDto){
        return http.put(`${this.endpoint}/${id}`, updateItemDto);
    }
}

export default new ItemsService();