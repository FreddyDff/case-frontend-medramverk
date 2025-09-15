function BookingConfirmation({ booking, onBackToMovies }) {
  return (
    <div className="booking-confirmation">
      <h2>Bokning bekräftad!</h2>
      <div className="booking-details">
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Film:</strong> {booking.movieTitle}</p>
        <p><strong>Datum:</strong> {booking.date}</p>
        <p><strong>Tid:</strong> {booking.time}</p>
        <p><strong>Plats:</strong> {booking.seatNumber}</p>
        <p><strong>Pris:</strong> {booking.price} SEK</p>
      </div>
      <button onClick={onBackToMovies}>
        Tillbaka till filmer
      </button>
    </div>
  )
}

export default BookingConfirmation
