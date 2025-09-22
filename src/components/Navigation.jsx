import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎬 Cinema Booking
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Filmer
          </Link>
          <Link 
            to="/om-oss" 
            className={`nav-link ${location.pathname === '/om-oss' ? 'active' : ''}`}
          >
            Om oss
          </Link>
          <Link 
            to="/kontakt" 
            className={`nav-link ${location.pathname === '/kontakt' ? 'active' : ''}`}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation