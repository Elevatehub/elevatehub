import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const authService = {
  async authLogin(payload) {
    try {
      const response = await axios.post(`/auth/login`, payload)
      if (response.status == 201) {
        localStorage.setItem('access_token', JSON.stringify(response.data['access_token']))
        localStorage.setItem('username', JSON.stringify(response.data['username']))
        localStorage.setItem('role', JSON.stringify(response.data['role']))
      }
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

  async authRegister(payload) {
    try {
      const response = await axios.post(`/auth/register`, payload)
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

  async authVerifySession() {
    const token = localStorage.getItem('access_token');

    if (!token) {
      // Token is missing, redirect to login
      this.redirectToLogin();
      return;
    }

    try {
      const response = await axios.get(`/auth/verifySession`);
      return response.data
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.handleUnauthorizedAccess();
      } else {
        // Handle other errors
        this.handleError(error);
      }
    }
  },
  redirectToLogin() {
    this.$router.push('/login');
  },
  handleUnauthorizedAccess() {
    localStorage.removeItem('access_token');
    this.redirectToLogin();
  },
  handleError(error) {
    Swal.fire({
      title: 'Error!',
      text: error.response ? error.response.data.message : 'An error occurred',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  },
}
