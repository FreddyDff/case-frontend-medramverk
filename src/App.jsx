import { useState, useEffect } from 'react'
import MovieList from './MovieList'
import ShowList from './assets/ShowList'
import BookingForm from './BookingForm'
import BookingConfirmation from './BookingConfirmation'

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
    // Hämta filmer från API
  }

  const loadShows = async (movieId) => {
    // Hämta föreställningar för vald film
  }

  const bookTicket = async (showId, seatNumber, email) => {
    // Boka biljett
  }

  return (
    <div>
      {currentView === 'movies' && (
        <MovieList 
          movies={movies} 
          onMovieSelect={setSelectedMovie}
          onNextView={() => setCurrentView('shows')}
        />
      )}
      
      {currentView === 'shows' && selectedMovie && (
        <ShowList 
          movie={selectedMovie}
          shows={shows}
          onShowSelect={setSelectedShow}
          onNextView={() => setCurrentView('booking')}
        />
      )}
      
      {currentView === 'booking' && selectedShow && (
        <BookingForm 
          show={selectedShow}
          onBookingComplete={setBookingDetails}
          onNextView={() => setCurrentView('confirmation')}
        />
      )}
      
      {currentView === 'confirmation' && bookingDetails && (
        <BookingConfirmation 
          booking={bookingDetails}
          onBackToMovies={() => setCurrentView('movies')}
        />
      )}
    </div>
  )
}

export default App
