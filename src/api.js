const API_BASE = 'https://cinema-api.henrybergstrom.com/#/'

export const fetchMovies = async () => {
  const response = await fetch(`${API_BASE}/movies`)
  return response.json()
}

export const fetchShows = async (movieId) => {
  const response = await fetch(`${API_BASE}/movies/${movieId}/shows`)
  return response.json()
}

export const bookTicket = async (showId, seatNumber, email) => {
  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ showId, seatNumber, email })
  })
  return response.json()
}