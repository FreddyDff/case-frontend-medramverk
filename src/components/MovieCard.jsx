function MovieCard({ movie, onMovieSelect }) {
  const handleClick = () => {
    onMovieSelect(movie)
  }

  const handleImageError = (e) => {
    // Fallback to placeholder if image fails to load
    e.target.src = 'https://placehold.co/300x400/1a1a1a/ffffff?text=No+Image'
  }

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="movie-image-container">
        <img 
          src={movie.posterUrl || movie.poster || 'https://placehold.co/300x400'} 
          alt={movie.title}
          onError={handleImageError}
        />
      </div>
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p><strong>Genre:</strong> {movie.genre || 'Okänd'}</p>
        <p><strong>Regissör:</strong> {movie.director || 'Okänd'}</p>
        <p><strong>Längd:</strong> {movie.duration ? `${movie.duration} min` : 'Okänd'}</p>
        <p><strong>Beskrivning:</strong> {movie.description || 'Ingen beskrivning tillgänglig'}</p>
      </div>
    </div>
  )
}

export default MovieCard
