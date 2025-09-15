const API_BASE = 'https://cinema-api.henrybergstrom.com/api/v1'

export const fetchMovies = async () => {
  const response = await fetch(`${API_BASE}/movies`)
  return response.json()
}

export const fetchShows = async () => {
  const response = await fetch(`${API_BASE}/shows`)
  return response.json()
}

export const fetchShowsByMovie = async (movieId) => {
  const response = await fetch(`${API_BASE}/shows/movie/${movieId}`)
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
  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  })
  return response.json()
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