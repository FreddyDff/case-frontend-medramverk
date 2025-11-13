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
        <p><strong>Platser:</strong> {booking.seatNumbers?.join(', ') || booking.seats?.join(', ')}</p>
        <p><strong>Antal biljetter:</strong> {booking.ticketCount || booking.seats?.length}</p>
        <p><strong>Totalt pris:</strong> {booking.totalPrice} SEK</p>
        {booking._id && <p><strong>Bokningsnummer:</strong> {booking._id}</p>}
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
