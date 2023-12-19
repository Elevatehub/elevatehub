import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const topicService = {
  async topicPost(payload) {
    try {
      const response = await axios.post(`/Topic`, payload)
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
  async topicGet() {
    try {
      const response = await axios.get('/Topic')
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

  async topicAllKeyword() {
    try {
      const response = await axios.get('/Topic/AllKeyword')
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

  async topicAllEntity() {
    try {
      const response = await axios.get('/Topic/AllEntity')
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

  async topicGetId(id) {
    try {
      const response = await axios.get(`/Topic/${id}`)
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
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

  async deleteId(id) {
    try {
      const response = await axios.delete(`/Topic/${id}`)
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
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

  async topicUpdateId(id, payload) {
    try {
      const response = await axios.put(`/Topic/${id}`, payload)
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
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

  async startEngine(payload) {
    try {
      // await axios.post(`/Search/Google-News`, payload)
      // await axios.post(`/Search/Tiktok`, payload)
      // await axios.post(`/Search/Instagram`, payload)
      await axios.post(`/Search/StartEngine`, payload)
      // await axios.post(`/Search/Facebook`, payload)
      window.location.reload()
      return "Berhasil"
    } catch (error) {
      if (error.response.status === 401) {
        window.location.href = '/login'
      }
      return Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
}
