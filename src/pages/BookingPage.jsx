import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchMovies, fetchShowsByMovie, createBooking } from '../api'
// 
function BookingPage() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  
  console.log('BookingPage - movieId from params:', movieId)
  
  const [movie, setMovie] = useState(null)
  const [shows, setShows] = useState([])
  const [selectedShow, setSelectedShow] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [ticketCount, setTicketCount] = useState(2)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)

  // Generera säteskarta baserat på tillgängliga platser
  const generateSeats = () => {
    if (selectedShow && selectedShow.availableSeatsList) {
      // Använd bara platser som finns i API:et
      return selectedShow.availableSeatsList.concat(selectedShow.bookedSeats || [])
    }
    // Fallback till standard layout
    const seats = []
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    rows.forEach(row => {
      for (let i = 1; i <= 12; i++) {
        seats.push(`${row}${i}`)
      }
    })
    return seats
  }
  
  const allSeats = generateSeats()
  const [bookedSeats, setBookedSeats] = useState([]) // Upptagna platser från API

  useEffect(() => {
    if (movieId) {
      loadMovieData()
    } else {
      console.log('No movieId found, redirecting to home')
      navigate('/')
    }
  }, [movieId, navigate])

  const loadMovieData = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Loading movie data for ID:', movieId)
      
      const [moviesData, showsData] = await Promise.all([
        fetchMovies(),
        fetchShowsByMovie(movieId)
      ])
      
      console.log('Movies data:', moviesData)
      console.log('Shows data:', showsData)
      
      // Filtrera bort filmer med "string" värden
      const validMovies = moviesData.filter(movie => 
        movie.title !== 'string' && 
        movie.description !== 'string' && 
        movie.genre !== 'string' && 
        movie.director !== 'string' &&
        movie.duration > 0
      )
      
      // Hitta filmen baserat på ID (API använder _id)
      const movieData = validMovies.find(m => m._id === movieId)
      if (movieData) {
        // Konvertera API-format till vårt format
        const formattedMovie = {
          id: movieData._id,
          title: movieData.title,
          description: movieData.description,
          genre: movieData.genre,
          director: movieData.director,
          duration: movieData.duration,
          posterUrl: movieData.posterUrl,
          price: 150 // Standardpris
        }
        setMovie(formattedMovie)
        console.log('Found movie:', formattedMovie)
      } else {
        console.log('Movie not found for ID:', movieId)
        setError(`Film med ID ${movieId} hittades inte`)
      }
      
      // Konvertera shows-data
      const formattedShows = showsData.map(show => ({
        id: show._id,
        date: new Date(show.startTime).toLocaleDateString('sv-SE', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: new Date(show.startTime).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
        price: show.pricePerSeat,
        availableSeats: show.availableSeats.length,
        bookedSeats: show.bookedSeats,
        roomNumber: show.roomNumber,
        availableSeatsList: show.availableSeats // Spara tillgängliga platser
      }))
      
      setShows(formattedShows)
      if (formattedShows.length > 0) {
        setSelectedShow(formattedShows[0])
        // Uppdatera upptagna platser från första föreställningen
        setBookedSeats(formattedShows[0].bookedSeats || [])
      }
    } catch (error) {
      console.error('Error loading movie data:', error)
      console.log('Falling back to mock data...')
      
      // Fallback till mock-data om API:et inte fungerar
      // const mockMovies = [
        // { id: 1, title: 'Catch me if you can', posterUrl: 'https://placehold.co/300x400', price: 150, description: 'drama, thriller, romans', genre: 'Thriller', director: 'Steven Spielberg', duration: 141 },
        // { id: 2, title: 'Gladiator', posterUrl: 'https://placehold.co/300x400', price: 160, description: 'drama, action, romans', genre: 'Action', director: 'Ridley Scott', duration: 155 },
        // { id: 3, title: 'Starwars', posterUrl: 'https://placehold.co/300x400', price: 170, description: 'action, sci-fi, fantasy', genre: 'Sci-Fi', director: 'George Lucas', duration: 121 }
      // ]
      
      // const mockShows = [
        // { id: 1, date: '2024-01-15', time: '18:00', price: 150, availableSeats: 50 },
        // { id: 2, date: '2024-01-15', time: '20:30', price: 150, availableSeats: 30 },
        // { id: 3, date: '2024-01-16', time: '19:00', price: 150, availableSeats: 45 }
      // ]
      
      const movieData = mockMovies.find(m => m.id.toString() === movieId)
      if (movieData) {
        setMovie(movieData)
        setShows(mockShows)
        if (mockShows.length > 0) {
          setSelectedShow(mockShows[0])
        }
        console.log('Using mock data for movie:', movieData)
      } else {
        setError(`Film med ID ${movieId} hittades inte`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSeatClick = (seat) => {
    // Kontrollera om platsen är tillgänglig (inte upptagen)
    if (bookedSeats.includes(seat)) return
    
    // Kontrollera om platsen finns i tillgängliga platser för vald föreställning
    if (selectedShow && !selectedShow.availableSeatsList?.includes(seat)) return
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat))
    } else if (selectedSeats.length < ticketCount) {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  const handleShowSelect = (show) => {
    setSelectedShow(show)
    setBookedSeats(show.bookedSeats || [])
    setSelectedSeats([]) // Rensa valda platser när man byter föreställning
  }

  const handleBooking = async () => {
    if (!email || selectedSeats.length !== ticketCount) {
      setError('Vänligen fyll i email och välj rätt antal platser')
      return
    }

    setLoading(true)
    setError(null)
    try {
      console.log('Creating booking with data:', {
        email: email,
        show: selectedShow.id,
        seats: selectedSeats,
        totalPrice: (selectedShow.price || 150) * ticketCount
      })

      const bookingData = {
        email: email,
        show: selectedShow.id,
        seats: selectedSeats,
        totalPrice: (selectedShow.price || 150) * ticketCount
      }
      
      const booking = await createBooking(bookingData)
      console.log('Booking created successfully:', booking)
      
      setBookingDetails({
        ...booking,
        movieTitle: movie.title,
        date: selectedShow.date,
        time: selectedShow.time,
        seatNumbers: selectedSeats,
        ticketCount: ticketCount
      })
      setBookingComplete(true)
    } catch (error) {
      console.error('Booking error:', error)
      setError(`Bokningen misslyckades: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !movie) {
    return (
      <div className="app-container">
        <div className="loading-message">Laddar filmdata...</div>
      </div>
    )
  }

  if (bookingComplete) {
    return (
      <div className="app-container">
        <div className="confirmation-container">
          <div className="confirmation-header">
            <h2>🎉 Bokning bekräftad!</h2>
          </div>
          <div className="confirmation-details">
            <h3>Bokningsdetaljer:</h3>
            <p><strong>Email:</strong> {bookingDetails.email}</p>
            <p><strong>Film:</strong> {bookingDetails.movieTitle}</p>
            <p><strong>Datum:</strong> {bookingDetails.date}</p>
            <p><strong>Tid:</strong> {bookingDetails.time}</p>
            <p><strong>Platser:</strong> {bookingDetails.seatNumbers?.join(', ')}</p>
            <p><strong>Antal biljetter:</strong> {bookingDetails.ticketCount}</p>
            <p><strong>Pris:</strong> {bookingDetails.price * bookingDetails.ticketCount} SEK</p>
            {bookingDetails.id && <p><strong>Bokningsnummer:</strong> {bookingDetails.id}</p>}
          </div>
          <div>
            <button 
              onClick={() => navigate('/')}
              className="back-button"
            >
              Tillbaka till filmer
            </button>
          </div>
        </div>
      </div>
    )
  }

  console.log('BookingPage render - movie:', movie, 'loading:', loading, 'error:', error)

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">🎬 Malmö bokning</h1>
      </header>
      
      <div className="app-container">
        {loading && <div className="loading-message">Laddar bokningssida...</div>}
        {error && <div className="error-message">{error}</div>}
        {movie && (
          <div className="booking-page">
            {/* Film Info Header */}
            <div className="movie-header">
              <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-details">{movie.description}</p>
                <div className="show-info">
                  <p><strong>Datum:</strong> {selectedShow?.date || 'Välj föreställning'}</p>
                  <p><strong>Tid:</strong> {selectedShow?.time || 'Välj föreställning'}</p>
                  <p><strong>Pris:</strong> {selectedShow?.price || 150} SEK per biljett</p>
                </div>
              </div>
              <div className="movie-poster">
                <img src={movie.posterUrl || movie.poster || 'https://placehold.co/300x400'} alt={movie.title} />
              </div>
            </div>

            {/* Föreställningsval */}
            {shows.length > 0 && (
              <div className="show-selection">
                <h3>Välj föreställning:</h3>
                <div className="show-buttons">
                  {shows.map(show => (
                    <button
                      key={show.id}
                      className={`show-button ${selectedShow?.id === show.id ? 'selected' : ''}`}
                      onClick={() => handleShowSelect(show)}
                    >
                      {show.date} {show.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Biljettantal */}
            <div className="ticket-selection">
              <h3>Välj antal biljetter</h3>
              <div className="ticket-counter">
                <button 
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="counter-button"
                >
                  -
                </button>
                <span className="ticket-count">{ticketCount}</span>
                <button 
                  onClick={() => setTicketCount(Math.min(8, ticketCount + 1))}
                  className="counter-button"
                >
                  +
                </button>
              </div>
            </div>

            {/* Säteskarta */}
            <div className="seat-selection">
              <h3>Välj platser</h3>
              <p className="seat-instruction">
                Vi har förvalt de bästa platserna. Klicka för att välja platser.
              </p>
              
                  <div className="cinema-screen">
                    <div className="screen">FILMDUK</div>
                  </div>
              
              <div className="seat-map">
                {allSeats.map(seat => {
                  const isBooked = bookedSeats.includes(seat)
                  const isSelected = selectedSeats.includes(seat)
                  const isAvailable = selectedShow?.availableSeatsList?.includes(seat)
                  return (
                    <button
                      key={seat}
                      className={`seat ${isBooked ? 'occupied' : isSelected ? 'selected' : isAvailable ? 'available' : 'unavailable'}`}
                      onClick={() => handleSeatClick(seat)}
                      disabled={isBooked || !isAvailable}
                    >
                      {seat}
                    </button>
                  )
                })}
              </div>
              
              <div className="seat-legend">
                <div className="legend-item">
                  <div className="legend-color selected"></div>
                  <span>Ditt val</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color available"></div>
                  <span>Ledig</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color occupied"></div>
                  <span>Upptagen</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color unavailable"></div>
                  <span>Ej tillgänglig</span>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="email-section">
              <h3>Biljettleverans</h3>
              <p>För biljetter och bokningsbekräftelse.</p>
              <input
                type="email"
                placeholder="Fyll i din e-postadress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
              />
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Booking Button */}
            <div className="booking-section">
              <button
                onClick={handleBooking}
                disabled={loading || !email || selectedSeats.length !== ticketCount}
                className="booking-button"
              >
                {loading ? 'Bokar...' : `Fortsätt till betalning (${selectedSeats.length}/${ticketCount})`}
              </button>
              <p className="terms-text">
                Genom att fortsätta godkänner du våra köpvillkor.
              </p>
            </div>
          </div>
        )}
        {!movie && !loading && !error && (
          <div className="error-message">
            <p>Ingen filmdata tillgänglig. Gå tillbaka till startsidan.</p>
            <button onClick={() => navigate('/')} className="back-button">
              Tillbaka till filmer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingPage
