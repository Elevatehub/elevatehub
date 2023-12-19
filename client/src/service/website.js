import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const websiteService = {
    async websiteLogin(payload) {
        try {
            const response = await axios.get(`/Landing`, payload)
            const filter = response.data.find((data) => data.position === payload)
            return filter
        } catch (error) {
            return Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    },
    async websiteEdit(id, payload) {
        try {
            const response = await axios.post(`/Landing/${id}`, payload)
            // console.log(id, payload)
            return response
        } catch (error) {
            return Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    },
    async websiteChildEdit(id, payload) {
        try {
            const response = await axios.post(`/Landing/Child/${id}/${payload.section}`, payload)
            return response
        } catch (error) {
            return Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    },

    async websiteanalyst(payload) {
        try {
            const response = await axios.post(`/Search/Web-Competitor-Quick`, payload)
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
    async websitetechup(payload) {
        try {
            const response = await axios.post(`/Search/Technology-Lookup-Information`, payload)
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
    async websitePost(payload) {
        try {
            const response = await axios.post(`/Website`, payload)
            return response
        } catch (error) {
            return Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    },
    async websiteGet() {
        try {
            const response = await axios.get('/Website')
            return response.data
        } catch (error) {
            if (error.response.status === 401) {
                // localStorage.clear()
                window.location.href = '/login'
            }
            return Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    },
}
