import axios from "axios";
import authHeader from '@/services/auth-header'

export default axios.create({
    baseURL: 'https://localhost:5001/api/v1',
    headers: authHeader()
})