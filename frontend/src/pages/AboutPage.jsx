import { useNavigate } from 'react-router-dom'

function AboutPage() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="app-container">
        <div className="page-content">
          <h2 className="section-header">Om oss</h2>
          
          <div className="about-content">
            <div className="about-section">
              <h3>Vår historia</h3>
              <p>
                Vi är en modern biograf som erbjuder en unik upplevelse för våra gäster. 
                Med vår avancerade bokningsplattform kan du enkelt välja filmer, 
                föreställningar och platser från bekvämligheten av ditt hem.
              </p>
            </div>

            <div className="about-section">
              <h3>Våra salonger</h3>
              <p>
                Vi har flera moderna salonger med bekväma stolar och avancerad ljud- 
                och bildteknik. Varje salong är designad för att ge dig den bästa 
                filmupplevelsen möjlig.
              </p>
            </div>

            <div className="about-section">
              <h3>Vårt team</h3>
              <p>
                Vårt passionerade team arbetar hårt för att säkerställa att varje besök 
                hos oss blir minnesvärt. Från vår personal i kassan till våra tekniker 
                - alla är dedikerade till att ge dig den bästa servicen.
              </p>
            </div>

            <div className="about-section">
              <h3>Framtiden</h3>
              <p>
                Vi fortsätter att utveckla vår plattform och lägga till nya funktioner 
                för att göra din biografupplevelse ännu bättre. Följ oss för att hålla 
                dig uppdaterad om våra senaste tillägg!
              </p>
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

export default AboutPage
