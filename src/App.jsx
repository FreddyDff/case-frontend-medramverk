import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import BookingPage from './pages/BookingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking/:movieId" element={<BookingPage />} />
          <Route path="/om-oss" element={<AboutPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

