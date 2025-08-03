import { makeRequest } from './config.js'

export const authService = {
  register: async (userData) => {
    const response = await makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    
    // Guardar token si viene en la respuesta
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)
      localStorage.setItem('user', JSON.stringify(response.user))
    }
    
    return response
  },

  login: async (credentials) => {
    const response = await makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    
    // Guardar token si viene en la respuesta
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)
      localStorage.setItem('user', JSON.stringify(response.user))
    }
    
    return response
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    localStorage.removeItem('voyaj_user')
    localStorage.removeItem('voyaj_session')
  },

  getProfile: () => 
    makeRequest('/auth/profile'),

  searchUsers: (query) => 
    makeRequest(`/auth/search?q=${encodeURIComponent(query)}`),

  sendVerificationEmail: () => 
    makeRequest('/auth/send-verification', { method: 'POST' }),

  verifyEmail: (data) => 
    makeRequest('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  sendPasswordReset: (email) => 
    makeRequest('/auth/send-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email })
    }),

  resetPassword: (data) => 
    makeRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  uploadProfilePhoto: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return makeRequest('/auth/upload-profile-photo', {
      method: 'POST',
      headers: {},
      body: formData
    })
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem('access_token')
    return !!token
  },

  // Obtener el usuario desde localStorage
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    } catch {
      return null
    }
  }
}