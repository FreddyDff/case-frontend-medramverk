import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'
import ShowList from './assets/ShowList'
import BookingForm from './BookingForm'
import BookingConfirmation from './BookingConfirmation'
import { fetchMovies, fetchShowsByMovie, createBooking } from './api'

function App() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [shows, setShows] = useState([])
  const [selectedShow, setSelectedShow] = useState(null)
  const [bookings, setBookings] = useState([])
  const [currentView, setCurrentView] = useState('movies')
  const [bookingDetails, setBookingDetails] = useState(null)

  // API calls
  const loadMovies = async () => {
    try {
      const moviesData = await fetchMovies()
      setMovies(moviesData)
    } catch (error) {
      console.error('Error loading movies:', error)
    }
  }

  // Ladda filmer när komponenten mountas
  useEffect(() => {
    loadMovies()
  }, [])

  const loadShows = async (movieId) => {
    try {
      const showsData = await fetchShowsByMovie(movieId)
      setShows(showsData)
    } catch (error) {
      console.error('Error loading shows:', error)
    }
  }

  const bookTicket = async (bookingData) => {
    try {
      const booking = await createBooking(bookingData)
      setBookingDetails(booking)
      return booking
    } catch (error) {
      console.error('Error booking ticket:', error)
      throw error
    }
  }

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">🎬 Cinema Booking</h1>
      </header>
      
      <div className="app-container">
        {currentView === 'movies' && (
          <div>
            <h2 className="section-header">Välj Film</h2>
            <div className="movie-grid">
              <MovieList 
                movies={movies} 
                onMovieSelect={(movie) => {
                  setSelectedMovie(movie)
                  loadShows(movie.id)
                  setCurrentView('shows')
                }}
              />
            </div>
          </div>
        )}
        
        {currentView === 'shows' && selectedMovie && (
          <div>
            <h2 className="section-header">Föreställningar för {selectedMovie.title}</h2>
            <div className="show-grid">
              <ShowList 
                shows={shows}
                onShowSelect={(show) => {
                  setSelectedShow(show)
                  setCurrentView('booking')
                }}
              />
            </div>
          </div>
        )}
        
        {currentView === 'booking' && selectedShow && (
          <div className="booking-container">
            <BookingForm 
              show={selectedShow}
              onBookingComplete={(booking) => {
                setBookingDetails(booking)
                setCurrentView('confirmation')
              }}
              bookTicket={bookTicket}
            />
          </div>
        )}
        
        {currentView === 'confirmation' && bookingDetails && (
          <BookingConfirmation 
            booking={bookingDetails}
            onBackToMovies={() => setCurrentView('movies')}
          />
        )}
      </div>
    </div>
  )
}

export default App
