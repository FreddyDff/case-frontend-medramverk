const validateApiKey = (req, res, next) => {
    // Steg 1: Hämta API-nyckeln från headers
    const apiKey = req.headers['x-api-key'];
    // Läser X-API-Key från headers. I Express är headers lowercase, därav 'x-api-key'.

    // Steg 2: Kontrollera om API-nyckeln finns
    if (!apiKey) {
        return res.status(401).json({ error: 'API key required' });
    }
    
    // Steg 3: Hämta giltig API-nyckel från miljövariabler
    const validApiKey = process.env.API_KEY || 'valid-api-key'; // Fallback för utveckling
    
    // Steg 4: Kontrollera om API-nyckeln är giltig
    if (apiKey !== validApiKey) {
        return res.status(401).json({ error: 'Invalid API key' });
    }
    
// Steg 5: Om allt är OK, låt requesten fortsätta // Fortsätter till nästa middleware eller route-handler
next(); 
};

// Exportera funktionen
export { validateApiKey };