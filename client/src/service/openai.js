import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const openaiService = {
  async openaiGet(payload) {
    try {
      const response = await axios.get(`/OpenAI/Find/${payload}`)
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
