const API_BASE = 'https://cinema-api.henrybergstrom.com/api/v1'

export const fetchMovies = async () => {
  const response = await fetch(`${API_BASE}/movies`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export const fetchShows = async () => {
  const response = await fetch(`${API_BASE}/shows`)
  return response.json()
}

export const fetchShowsByMovie = async (movieId) => {
  const response = await fetch(`${API_BASE}/shows/movie/${movieId}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export const fetchShow = async (id) => {
  const response = await fetch(`${API_BASE}/shows/${id}`)
  return response.json()
}

export const fetchBookings = async () => {
  const response = await fetch(`${API_BASE}/bookings`)
  return response.json()
}

export const fetchBooking = async (id) => {
  const response = await fetch(`${API_BASE}/bookings/${id}`)
  return response.json()
}

export const createBooking = async (bookingData) => {
  console.log('Sending booking data to API:', bookingData)
  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(bookingData)
  })
  
  console.log('API response status:', response.status)
  console.log('API response headers:', response.headers)
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error('API error response:', errorText)
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
  }
  
  const result = await response.json()
  console.log('API response data:', result)
  return result
}

export const updateBooking = async (id, bookingData) => {
  const response = await fetch(`${API_BASE}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  })
  return response.json()
}

export const deleteBooking = async (id) => {
  const response = await fetch(`${API_BASE}/bookings/${id}`, {
    method: 'DELETE'
  })
  return response.json()
}

// Analytics endpoints (optional)
export const fetchPopularRoutes = async () => {
  const response = await fetch(`${API_BASE}/analytics/popular-routes`)
  return response.json()
}

export const fetchIpRequests = async () => {
  const response = await fetch(`${API_BASE}/analytics/ip-requests`)
  return response.json()
}

export const fetchRealTimeLogs = async () => {
  const response = await fetch(`${API_BASE}/analytics/real-time-logs`)
  return response.json()
}