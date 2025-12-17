import { useState, useEffect, useCallback } from 'react'
import { fetchMovies, fetchShowsByMovie, createBooking } from '../api'

export function useBooking(movieId) {
  // State för film och föreställningar
  const [movie, setMovie] = useState(null)
  const [shows, setShows] = useState([])
  const [selectedShow, setSelectedShow] = useState(null)
  const [bookedSeats, setBookedSeats] = useState([])
  
  // State för bokning
  const [selectedSeats, setSelectedSeats] = useState([])
  const [ticketCount, setTicketCount] = useState(2)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  
  // State för loading och fel
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // State för bokningsbekräftelse
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)

  // Generera säteskarta baserat på tillgängliga platser från API:et
  const generateSeats = () => {
    if (selectedShow && selectedShow.availableSeatsList) {
      // Använd bara platser som finns i API:et
      return selectedShow.availableSeatsList.concat(selectedShow.bookedSeats || [])
    }
    // Om ingen data finns från API:et, returnera tom array
    return []
  }
  
  const allSeats = generateSeats()

  // Ladda filmdata från API:et
  const loadMovieData = useCallback(async () => {
    if (!movieId) return
    
    setLoading(true)
    setError(null)
    
    try {
      console.log('Loading movie data for ID:', movieId)
      
      const [moviesData, showsData] = await Promise.all([
        fetchMovies(),
        fetchShowsByMovie(movieId)
      ])
      
      console.log('Movies data:', moviesData)
      console.log('Shows data:', showsData)
      
      // Filtrera bort filmer med "string" värden
      const validMovies = moviesData.filter(movie => 
        movie.title !== 'string' && 
        movie.description !== 'string' && 
        movie.genre !== 'string' && 
        movie.director !== 'string' &&
        movie.duration > 0
      )
      
      // Hitta filmen baserat på ID (API använder _id)
      const movieData = validMovies.find(m => m._id === movieId)
      if (!movieData) {
        console.log('Movie not found for ID:', movieId)
        setError(`Film med ID ${movieId} hittades inte. Vänligen gå tillbaka och välj en annan film.`)
        setLoading(false)
        return
      }
      
      // Konvertera API-format till vårt format
      const formattedMovie = {
        id: movieData._id,
        title: movieData.title,
        description: movieData.description,
        genre: movieData.genre,
        director: movieData.director,
        duration: movieData.duration,
        posterUrl: movieData.posterUrl,
        price: 150 // Standardpris
      }
      setMovie(formattedMovie)
      console.log('Found movie:', formattedMovie)
      
      // Konvertera shows-data
      const formattedShows = showsData.map(show => ({
        id: show._id,
        date: new Date(show.startTime).toLocaleDateString('sv-SE', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: new Date(show.startTime).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
        price: show.pricePerSeat,
        availableSeats: show.availableSeats.length,
        bookedSeats: show.bookedSeats,
        roomNumber: show.roomNumber,
        availableSeatsList: show.availableSeats // Spara tillgängliga platser
      }))
      
      if (formattedShows.length === 0) {
        setError('Inga föreställningar hittades för denna film. Vänligen försök igen senare.')
        setShows([])
      } else {
        setShows(formattedShows)
        setSelectedShow(formattedShows[0])
        // Uppdatera upptagna platser från första föreställningen
        setBookedSeats(formattedShows[0].bookedSeats || [])
      }
    } catch (error) {
      console.error('Error loading movie data:', error)
      setError(`Kunde inte ladda filmdata. Vänligen kontrollera din internetanslutning och försök igen. Fel: ${error.message}`)
      setMovie(null)
      setShows([])
    } finally {
      setLoading(false)
    }
  }, [movieId])

  // Ladda data när movieId ändras
  useEffect(() => {
    if (movieId) {
      loadMovieData()
    }
  }, [movieId, loadMovieData])

  // Hantera klick på plats
  const handleSeatClick = (seat) => {
    // Kontrollera om platsen är tillgänglig (inte upptagen)
    if (bookedSeats.includes(seat)) return
    
    // Kontrollera om platsen finns i tillgängliga platser för vald föreställning
    if (selectedShow && !selectedShow.availableSeatsList?.includes(seat)) return
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat))
    } else if (selectedSeats.length < ticketCount) {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  // Hantera val av föreställning
  const handleShowSelect = (show) => {
    setSelectedShow(show)
    setBookedSeats(show.bookedSeats || [])
    setSelectedSeats([]) // Rensa valda platser när man byter föreställning
  }

  // Hantera bokning
  const handleBooking = async () => {
    // Validera att allt är korrekt innan bokning
    if (!name || !email) {
      setError('Vänligen fyll i både namn och email')
      return
    }
    
    if (!selectedShow || !selectedShow.id) {
      setError('Vänligen välj en föreställning')
      return
    }
    
    if (selectedSeats.length !== ticketCount) {
      setError(`Vänligen välj ${ticketCount} platser (du har valt ${selectedSeats.length})`)
      return
    }

    setLoading(true)
    setError(null)
    try {
      console.log('Creating booking with data:', {
        name: name,
        email: email,
        showId: selectedShow.id
      })

      // Backend förväntar sig: { name, email, showId }
      const bookingData = {
        name: name,
        email: email,
        showId: selectedShow.id  // Backend förväntar sig showId, inte show
      }
      
      const booking = await createBooking(bookingData)
      console.log('Booking created successfully:', booking)
      
      // Sätt bookingDetails FÖRE setBookingComplete för att säkerställa att data finns
      const details = {
        ...booking,
        name: name,  // Säkerställ att name finns
        email: email,  // Säkerställ att email finns
        movieTitle: movie?.title || 'Okänd film',
        date: selectedShow?.date || 'Ej angivet',
        time: selectedShow?.time || 'Ej angivet',
        seatNumbers: selectedSeats,
        ticketCount: ticketCount
      }
      
      setBookingDetails(details)
      setBookingComplete(true)
      setLoading(false)  // Sätt loading till false när bokning är klar
    } catch (error) {
      console.error('Booking error:', error)
      setError(`Bokningen misslyckades: ${error.message}`)
    } finally {
      setLoading(false)  // Säkerställ att loading alltid sätts till false
    }
  }

  return {
    // Data
    movie,
    shows,
    selectedShow,
    allSeats,
    bookedSeats,
    selectedSeats,
    ticketCount,
    email,
    name,
    loading,
    error,
    bookingComplete,
    bookingDetails,
    
    // Actions
    setTicketCount,
    setEmail,
    setName,
    handleSeatClick,
    handleShowSelect,
    handleBooking
  }
}

