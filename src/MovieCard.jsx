function MovieCard({ movie, onMovieSelect }) {
  const handleClick = () => {
    onMovieSelect(movie)
  }

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p><strong>Pris:</strong> {movie.price} SEK</p>
      <p><strong>Beskrivning:</strong> {movie.description}</p>
    </div>
  )
}

export default MovieCard
