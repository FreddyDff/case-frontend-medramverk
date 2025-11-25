import request from 'supertest';
import app from '../app.js';

describe('Shows API', () => {
  // Testfall för GET /shows - Hämta alla föreställningar
  it('should fetch all shows', async () => {
    const response = await request(app).get('/shows');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Testfall för GET /shows/:id - Hämta en specifik föreställning
  it('should fetch a single show by ID', async () => {
    // Först hämta alla föreställningar för att få ett giltigt ID
    const allShowsResponse = await request(app).get('/shows');
    if (allShowsResponse.body.length > 0) {
      const showId = allShowsResponse.body[0]._id;
      const response = await request(app).get(`/shows/${showId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('movieId');
      expect(response.body).toHaveProperty('startTime');
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för GET /shows/:id - Hämta föreställning med ogiltigt ID
  it('should return 404 for non-existent show', async () => {
    const response = await request(app).get('/shows/507f1f77bcf86cd799439011');
    expect(response.status).toBe(404);
  });

  // Testfall för GET /shows/movie/:movieId - Hämta alla föreställningar för en specifik film
  it('should fetch all shows for a specific movie', async () => {
    // Först hämta alla filmer för att få ett giltigt movieId
    const moviesResponse = await request(app).get('/movies');
    if (moviesResponse.body.length > 0) {
      const movieId = moviesResponse.body[0]._id;
      const response = await request(app).get(`/shows/movie/${movieId}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      // Kontrollera att alla föreställningar tillhör den specifika filmen
      response.body.forEach(show => {
        expect(show.movieId.toString()).toBe(movieId.toString());
      });
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för GET /shows/movie/:movieId - Hämta föreställningar för icke-existerande film
  it('should return empty array or 404 for non-existent movie shows', async () => {
    // Skicka en GET-begäran till /shows/movie/:movieId med ogiltigt movieId
    // Förvänta dig antingen en tom array eller 404
    // Kontrollera att statuskoden är 200 (tom array) eller 404
    
    // const response = await request(app).get('/shows/movie/invalid-id');
    // expect([200, 404]).toContain(response.status);
  });

  // Testfall för POST /shows - Skapa en ny föreställning (kräver API-nyckel)
  it('should create a new show with valid API key', async () => {
    // Skicka en POST-begäran till /shows med föreställningsdata och API-nyckel
    // Förvänta dig att föreställningen skapas och returneras
    // Kontrollera att statuskoden är 201
    // Kontrollera att response body innehåller den nya föreställningens information
    // Kontrollera att föreställningen har fått ett ID
    
    // const showData = {
    //   movieId: '123',
    //   startTime: '2024-12-01T18:00:00Z',
    //   availableSeats: 100,
    //   // ... andra fält
    // };
    // const response = await request(app)
    //   .post('/shows')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(showData);
    // expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty('id');
    // expect(response.body.movieId).toBe(showData.movieId);
  });

  // Testfall för POST /shows - Försöka skapa föreställning utan API-nyckel
  it('should return 401 when creating show without API key', async () => {
    // Skicka en POST-begäran till /shows utan API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const showData = { movieId: '123', startTime: '2024-12-01T18:00:00Z' };
    // const response = await request(app)
    //   .post('/shows')
    //   .send(showData);
    // expect(response.status).toBe(401);
  });

  // Testfall för POST /shows - Validering av obligatoriska fält
  it('should return 400 when creating show with missing required fields', async () => {
    // Skicka en POST-begäran till /shows med ofullständig data
    // Förvänta dig att få ett 400 Bad Request-fel
    // Kontrollera att statuskoden är 400
    // Kontrollera att felmeddelandet indikerar saknade fält
    
    // const incompleteData = { movieId: '123' }; // Saknar t.ex. startTime
    // const response = await request(app)
    //   .post('/shows')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(incompleteData);
    // expect(response.status).toBe(400);
  });

  // Testfall för POST /shows - Validering av ogiltigt movieId
  it('should return 400 when creating show with invalid movieId', async () => {
    // Skicka en POST-begäran till /shows med ogiltigt movieId
    // Förvänta dig att få ett 400 Bad Request-fel
    // Kontrollera att statuskoden är 400
    
    // const showData = {
    //   movieId: 'non-existent-movie',
    //   startTime: '2024-12-01T18:00:00Z',
    // };
    // const response = await request(app)
    //   .post('/shows')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(showData);
    // expect(response.status).toBe(400);
  });

  // Testfall för PUT /shows/:id - Uppdatera en befintlig föreställning
  it('should update an existing show with valid API key', async () => {
    // Skicka en PUT-begäran till /shows/:id med uppdaterad föreställningsdata och API-nyckel
    // Förvänta dig att föreställningen uppdateras och returneras
    // Kontrollera att statuskoden är 200
    // Kontrollera att response body innehåller uppdaterad information
    
    // const updateData = { startTime: '2024-12-01T20:00:00Z' };
    // const response = await request(app)
    //   .put('/shows/123')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(updateData);
    // expect(response.status).toBe(200);
    // expect(response.body.startTime).toBe(updateData.startTime);
  });

  // Testfall för PUT /shows/:id - Uppdatera föreställning utan API-nyckel
  it('should return 401 when updating show without API key', async () => {
    // Skicka en PUT-begäran till /shows/:id utan API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const updateData = { startTime: '2024-12-01T20:00:00Z' };
    // const response = await request(app)
    //   .put('/shows/123')
    //   .send(updateData);
    // expect(response.status).toBe(401);
  });

  // Testfall för PUT /shows/:id - Försöka uppdatera icke-existerande föreställning
  it('should return 404 when updating non-existent show', async () => {
    const updateData = { startTime: '2024-12-01T20:00:00Z' };
    const response = await request(app)
      .put('/shows/507f1f77bcf86cd799439011')
      .set('X-API-Key', 'valid-api-key')
      .send(updateData);
    expect(response.status).toBe(404);
  });

  // Testfall för DELETE /shows/:id - Ta bort en föreställning
  it('should delete a show by ID with valid API key', async () => {
    // Skicka en DELETE-begäran till /shows/:id med ett giltigt ID och API-nyckel
    // Förvänta dig att föreställningen tas bort
    // Kontrollera att statuskoden är 204 eller 200
    // Verifiera att föreställningen inte längre finns genom att göra en GET-begäran
    
    // const response = await request(app)
    //   .delete('/shows/123')
    //   .set('X-API-Key', 'valid-api-key');
    // expect(response.status).toBe(204);
  });

  // Testfall för DELETE /shows/:id - Ta bort föreställning utan API-nyckel
  it('should return 401 when deleting show without API key', async () => {
    // Skicka en DELETE-begäran till /shows/:id utan API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const response = await request(app)
    //   .delete('/shows/123');
    // expect(response.status).toBe(401);
  });

  // Testfall för DELETE /shows/:id - Försöka ta bort icke-existerande föreställning
  it('should return 404 when deleting non-existent show', async () => {
    const response = await request(app)
      .delete('/shows/507f1f77bcf86cd799439011')
      .set('X-API-Key', 'valid-api-key');
    expect(response.status).toBe(404);
  });
});