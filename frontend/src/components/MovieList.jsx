import MovieCard from './MovieCard'

function MovieList({ movies, onMovieSelect }) {
    return (
      <>
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onMovieSelect={onMovieSelect}
          />
        ))}
      </>
    )
  }

export default MovieList