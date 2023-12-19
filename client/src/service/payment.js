import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const paymentService = {
  async membership() {
    try {
      const response = await axios.get('/Payment/User/Active')
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        // localStorage.clear()
        // window.location.reload()
        // window.location.href = '/login'
      }
      return error
    }
  },
  async subscription() {
    try {
      const response = await axios.get('/Subscription')
      return response.data
    } catch (error) {
      return error
    }
  },
  async getPaymentMethod() {
    try {
      const response = await axios.get('/Payment/method')
      return response.data
    } catch (error) {
      return error
    }
  },
  async getPaymentAllUser() {
    try {
      const response = await axios.get('/Payment/User/All?isActive=true')
      return response.data
    } catch (error) {
      return error
    }
  },
  
  async pushsubscription(payload) {
    try {
      const response = await axios.post('/Payment', payload)
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

  async disableUser(payload) {
    try {
      const response = await axios.put('/Payment/User/Disable/'+payload)
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

  async paymentOrder(payload) {
    try {
      const response = await axios.post('/Payment/order', payload)
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
