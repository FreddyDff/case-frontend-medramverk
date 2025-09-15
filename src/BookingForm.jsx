import { useState } from 'react'

function BookingForm({ show, onBookingComplete, bookTicket }) {
    const [email, setEmail] = useState('')
    const [selectedSeat, setSelectedSeat] = useState('')
    const [isBooking, setIsBooking] = useState(false)
    const [error, setError] = useState('')
  
    // Generera säteskarta (exempel: A1-A10, B1-B10, etc.)
    const generateSeats = () => {
      const seats = []
      const rows = ['A', 'B', 'C', 'D', 'E']
      rows.forEach(row => {
        for (let i = 1; i <= 10; i++) {
          seats.push(`${row}${i}`)
        }
      })
      return seats
    }
    
    const availableSeats = generateSeats()
    const [bookedSeats, setBookedSeats] = useState([]) // Här skulle du hämta från API
  
    const handleBooking = async () => {
      if (!email || !selectedSeat) {
        setError('Vänligen fyll i email och välj en plats')
        return
      }
      
      setIsBooking(true)
      setError('')
      
      try {
        const bookingData = {
          showId: show.id,
          seatNumber: selectedSeat,
          email: email,
          movieTitle: show.movie?.title || 'Okänd film',
          date: show.date,
          time: show.time,
          price: show.price || 150
        }
        
        const booking = await bookTicket(bookingData)
        onBookingComplete(booking)
      } catch (error) {
        setError('Bokningen misslyckades. Försök igen.')
        console.error('Booking error:', error)
      } finally {
        setIsBooking(false)
      }
    }
  
    return (
      <div>
        <div className="booking-header">
          <h2>Boka biljett för {show.movie?.title || 'Okänd film'}</h2>
        </div>
        
        <div className="booking-info">
          <p><strong>Datum:</strong> {show.date || 'Ej angivet'}</p>
          <p><strong>Tid:</strong> {show.time || 'Ej angivet'}</p>
          <p><strong>Pris:</strong> {show.price || 150} SEK</p>
        </div>
        
        <div className="email-input">
          <label htmlFor="email">Din email:</label>
          <input 
            id="email"
            type="email" 
            placeholder="din@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="seat-map-container">
          <h3 className="seat-map-title">Välj plats:</h3>
          <div className="seat-map">
            {availableSeats.map(seat => {
              const isBooked = bookedSeats.includes(seat)
              const isSelected = selectedSeat === seat
              return (
                <button 
                  key={seat}
                  onClick={() => !isBooked && setSelectedSeat(seat)}
                  disabled={isBooked}
                  className={`seat-button ${isBooked ? 'occupied' : isSelected ? 'selected' : 'available'}`}
                >
                  {seat}
                </button>
              )
            })}
          </div>
          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-color selected"></div>
              <span>Vald plats</span>
            </div>
            <div className="legend-item">
              <div className="legend-color occupied"></div>
              <span>Upptagen</span>
            </div>
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Ledig</span>
            </div>
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          onClick={handleBooking}
          disabled={isBooking || !email || !selectedSeat}
          className="booking-button"
        >
          {isBooking ? 'Bokar...' : 'Boka biljett'}
        </button>
      </div>
    )
  }

export default BookingForm