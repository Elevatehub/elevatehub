import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const subscriberService = {
    async subscriberPostAktif(payload) {
        try {
            const response = await axios.get(`/Payment/User/All?isActive=true`, payload)
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
    async subscriberPostNonAktif(payload) {
        try {
            const response = await axios.get(`/Payment/User/All?isActive=false`, payload)
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
    async updatePostAktif(id, payload) {
        try {
            const response = await axios.put(`/Subscription/${id}`, payload)
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

    async postAktif(payload) {
        try {
            const response = await axios.post(`/Subscription`, payload)
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

    async deleteAktif(id) {
        try {
            const response = await axios.delete(`/Subscription/${id}`)
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
}
