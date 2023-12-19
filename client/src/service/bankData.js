import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const bankService = {
  async bankPost(payload) {
    try {
      const response = await axios.post(`/BankData`, payload)
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
  async hashtagPost(payload) {
    try {
      const response = await axios.post(`/BankData/HashTag`, payload)
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
