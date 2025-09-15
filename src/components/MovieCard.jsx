function MovieCard({ movie, onMovieSelect }) {
  const handleClick = () => {
    onMovieSelect(movie)
  }

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={movie.posterUrl || movie.poster || 'https://placehold.co/300x400'} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p><strong>Genre:</strong> {movie.genre || 'Okänd'}</p>
      <p><strong>Regissör:</strong> {movie.director || 'Okänd'}</p>
      <p><strong>Längd:</strong> {movie.duration ? `${movie.duration} min` : 'Okänd'}</p>
      <p><strong>Beskrivning:</strong> {movie.description || 'Ingen beskrivning tillgänglig'}</p>
    </div>
  )
}

export default MovieCard
