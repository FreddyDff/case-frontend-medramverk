import { useParams, useNavigate } from 'react-router-dom'
import { useBooking } from '../hooks/useBooking'

function BookingPage() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  
  console.log('BookingPage - movieId from params:', movieId)

  // Använd custom hook för all bokningslogik
  const {
    movie,
    shows,
    selectedShow,
    allSeats,
    bookedSeats,
    selectedSeats,
    ticketCount,
    email,
    loading,
    error,
    bookingComplete,
    bookingDetails,
    setTicketCount,
    setEmail,
    handleSeatClick,
    handleShowSelect,
    handleBooking
  } = useBooking(movieId)

  // Redirect om inget movieId finns
  if (!movieId) {
    console.log('No movieId found, redirecting to home')
    navigate('/')
    return null
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
              {selectedShow && allSeats.length > 0 ? (
                <>
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
                </>
              ) : (
                <div className="error-message">
                  <p>Inga platser tillgängliga för denna föreställning. Vänligen välj en annan föreställning.</p>
                </div>
              )}
              
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
        {!movie && !loading && (
          <div className="error-message">
            <p>{error || 'Ingen filmdata tillgänglig. Gå tillbaka till startsidan.'}</p>
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
