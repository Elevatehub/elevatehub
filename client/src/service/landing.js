import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const landingService = {
  async getData() {
    try {
      const response = await axios.get('/Landing')
      return response.data
    } catch (error) {
      return error
    }
  }
}
