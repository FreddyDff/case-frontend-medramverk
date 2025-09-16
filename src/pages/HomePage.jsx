import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieList from '../components/MovieList'
import { fetchMovies } from '../api'

function HomePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const loadMovies = async () => {
    setLoading(true)
    setError(null)
    try {
      const moviesData = await fetchMovies()
      // Filtrera bort filmer med "string" värden och konvertera API-format till vårt format
      const validMovies = moviesData.filter(movie => 
        movie.title !== 'string' && 
        movie.description !== 'string' && 
        movie.genre !== 'string' && 
        movie.director !== 'string' &&
        movie.duration > 0
      )
      
      const formattedMovies = validMovies.map(movie => ({
        id: movie._id,
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        director: movie.director,
        duration: movie.duration,
        posterUrl: movie.posterUrl,
        price: 150 // Standardpris
      }))
      setMovies(formattedMovies)
    } catch (error) {
      console.error('Error loading movies:', error)
      setError('Kunde inte ladda filmer. Försök igen.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

  const handleMovieSelect = (movie) => {
    navigate(`/booking/${movie.id}`)
  }

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">🎬 Cinema Malmö</h1>
      </header>
      
      <div className="app-container">
        <h2 className="section-header">Välj Film</h2>
        {loading && <div className="loading-message">Laddar filmer...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && (
          <div className="movie-grid">
            <MovieList 
              movies={movies} 
              onMovieSelect={handleMovieSelect}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
