function ShowCard({ show, onShowSelect }) {
  const handleClick = () => {
    onShowSelect(show)
  }

  return (
    <div className="show-card" onClick={handleClick}>
      <h3>Föreställning {show.id}</h3>
      <p><strong>Datum:</strong> {show.date || 'Ej angivet'}</p>
      <p><strong>Tid:</strong> {show.time || 'Ej angivet'}</p>
      <p><strong>Lediga platser:</strong> {show.availableSeats || 'Ej angivet'}</p>
      <p><strong>Pris:</strong> {show.price || 'Ej angivet'} SEK</p>
    </div>
  )
}

export default ShowCard
