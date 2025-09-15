import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import BookingPage from './pages/BookingPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking/:movieId" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

