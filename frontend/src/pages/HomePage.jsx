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
        let description = movie.description
        
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
        
        // Översätt beskrivningar till svenska
        if (description && description !== 'string') {
          switch (movie.title) {
            case 'Inception':
              description = 'En tjuv som tränger in i andras drömmar för att stjäla hemligheter från deras undermedvetna. En komplex berättelse om drömmar inom drömmar.'
              break
            case 'The Godfather':
              description = 'Den åldrande patriarken i en organiserad brottslig dynasti överför kontrollen av sitt hemliga imperium till sin motvillige son.'
              break
            case 'The Shawshank Redemption':
              description = 'Två fångar skapar ett band över flera år och finner tröst och slutlig förlossning genom handlingar av vanlig anständighet.'
              break
            case 'The Dark Knight':
              description = 'När hotet som kallas Jokern skapar kaos och förödelse i Gotham, måste Batman acceptera ett av de största psykologiska och fysiska testerna av sin förmåga att bekämpa orättvisa.'
              break
            case 'Pulp Fiction':
              description = 'Livet för två maffia-mördare, en boxare, en gangster och hans fru, och ett par restaurangrånare sammanflätas i fyra berättelser om våld och förlossning.'
              break
            default:
              // Behåll originalbeskrivningen om den inte är 'string'
              break
          }
        } else {
          description = 'Ingen beskrivning tillgänglig'
        }
        
        return {
          id: movie._id,
          title: movie.title,
          description: description,
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
