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
            case 'Tron':
              posterUrl = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e542ca9d-2008-4830-9ef1-5fcfa93e376c/dkp7uyk-94b24244-3fc9-45bc-ba99-210ae46690d6.png/v1/fit/w_750,h_1008,q_70,strp/tron__ascension__2014__by_captainclarke19_dkp7uyk-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTEyNSIsInBhdGgiOiIvZi9lNTQyY2E5ZC0yMDA4LTQ4MzAtOWVmMS01ZmNmYTkzZTM3NmMvZGtwN3V5ay05NGIyNDI0NC0zZmM5LTQ1YmMtYmE5OS0yMTBhZTQ2NjkwZDYucG5nIiwid2lkdGgiOiI8PTgzNyJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.vKTwVv3jTXRv0C6q4m1XgezYWEhIIcMQBCGfG-xrYlo'
              break
            case 'The Dark Knight':
              posterUrl = 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
              break
            case 'Blade Runner':
              posterUrl = 'https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png'
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
            case 'Tron':
              description = 'En dataprogrammerare blir transporterad in i den digitala världen där han måste kämpa för sin överlevnad i ett cyberspace-spel.'
              break
            case 'The Dark Knight':
              description = 'När hotet som kallas Jokern skapar kaos och förödelse i Gotham, måste Batman acceptera ett av de största psykologiska och fysiska testerna av sin förmåga att bekämpa orättvisa.'
              break
            case 'Blade Runner':
              description = 'En pensionerad polis jagar genetiskt modifierade replikanter i en dystopisk framtid i Los Angeles.'
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
