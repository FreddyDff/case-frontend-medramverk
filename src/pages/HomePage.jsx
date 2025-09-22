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
      
      const formattedMovies = validMovies.map(movie => {
        // Fallback images for specific movies
        let posterUrl = movie.posterUrl
        if (!posterUrl || posterUrl === 'string') {
          switch (movie.title) {
            case 'Inception':
              posterUrl = 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
              break
            case 'The Godfather':
              posterUrl = 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
              break
            case 'The Shawshank Redemption':
              posterUrl = 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
              break
            case 'The Dark Knight':
              posterUrl = 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
              break
            case 'Pulp Fiction':
              posterUrl = 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
              break
            default:
              posterUrl = 'https://placehold.co/300x400/1a1a1a/ffffff?text=No+Image'
          }
        }
        
        return {
          id: movie._id,
          title: movie.title,
          description: movie.description,
          genre: movie.genre,
          director: movie.director,
          duration: movie.duration,
          posterUrl: posterUrl,
          price: 150 // Standardpris
        }
      })
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
