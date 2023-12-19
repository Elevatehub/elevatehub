import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const userService = {
    async userLogin(payload) {
        try {
            const response = await axios.get(`/user`, payload)
            return response.data
        } catch (error) {
            return Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    },
    async disableUser(id, payload) {
        try {
            const response = await axios.put(`/user/${id}`, payload)
            return response.data
        } catch (error) {
            return Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    },
    async userProfile() {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get(`/user`, token)
            return response.data
        } catch (error) {
            return Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }
}
