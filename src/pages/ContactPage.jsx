import { useNavigate } from 'react-router-dom'

function ContactPage() {
  const navigate = useNavigate()

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">🎬 Cinema Malmö</h1>
      </header>

      <div className="app-container">
        <div className="page-content">
          <h2 className="section-header">Kontakt</h2>
          
          <div className="contact-content">
            <div className="contact-section">
              <h3>Kontaktinformation</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Adress:</strong>
                  <p>Storgatan 123<br />123 45 Stockholm</p>
                </div>
                
                <div className="contact-item">
                  <strong>Telefon:</strong>
                  <p>08-123 456 78</p>
                </div>
                
                <div className="contact-item">
                  <strong>Email:</strong>
                  <p>info@cinemabooking.se</p>
                </div>
                
                <div className="contact-item">
                  <strong>Öppettider:</strong>
                  <p>
                    Mån-Fre: 10:00 - 22:00<br />
                    Lör-Sön: 09:00 - 23:00
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-section">
              <h3>Kontakta oss</h3>
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Namn:</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input"
                    placeholder="Ditt namn"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input"
                    placeholder="din@email.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Ämne:</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    className="form-input"
                    placeholder="Ämne för ditt meddelande"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Meddelande:</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5"
                    className="form-textarea"
                    placeholder="Ditt meddelande..."
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-button">
                  Skicka meddelande
                </button>
              </form>
            </div>
          </div>

          <div className="back-section">
            <button 
              onClick={() => navigate('/')}
              className="back-button"
            >
              ← Tillbaka till filmer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
