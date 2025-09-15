function BookingConfirmation({ booking, onBackToMovies }) {
  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <h2>🎉 Bokning bekräftad!</h2>
      </div>
      <div className="confirmation-details">
        <h3>Bokningsdetaljer:</h3>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Film:</strong> {booking.movieTitle}</p>
        <p><strong>Datum:</strong> {booking.date}</p>
        <p><strong>Tid:</strong> {booking.time}</p>
        <p><strong>Plats:</strong> {booking.seatNumber}</p>
        <p><strong>Pris:</strong> {booking.price} SEK</p>
        {booking.id && <p><strong>Bokningsnummer:</strong> {booking.id}</p>}
      </div>
      <div>
        <button 
          onClick={onBackToMovies}
          className="back-button"
        >
          Tillbaka till filmer
        </button>
      </div>
    </div>
  )
}

export default BookingConfirmation
