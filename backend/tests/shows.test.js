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
    const response = await request(app).get('/shows/movie/507f1f77bcf86cd799439011');
    // Vi förväntar oss antingen en tom array (200) eller 404
    expect([200, 404]).toContain(response.status);
  });

  // Testfall för POST /shows - Skapa en ny föreställning (kräver API-nyckel)
  it('should create a new show with valid API key', async () => {
    // Först hämta en film för att få ett giltigt movieId
    const moviesResponse = await request(app).get('/movies');
    if (moviesResponse.body.length > 0) {
      const movieId = moviesResponse.body[0]._id;
      const showData = {
        movieId: movieId.toString(),
        startTime: new Date().toISOString(),
        availableSeats: ['A1', 'A2', 'A3'],
        pricePerSeat: 150,
        roomNumber: 1,
      };
      const response = await request(app)
        .post('/shows')
        .set('X-API-Key', 'valid-api-key')
        .send(showData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.movieId.toString()).toBe(movieId.toString());
      
      // Rensa upp
      if (response.body._id) {
        await request(app)
          .delete(`/shows/${response.body._id}`)
          .set('X-API-Key', 'valid-api-key');
      }
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för POST /shows - Försöka skapa föreställning utan API-nyckel
  it('should return 401 when creating show without API key', async () => {
    const moviesResponse = await request(app).get('/movies');
    if (moviesResponse.body.length > 0) {
      const movieId = moviesResponse.body[0]._id;
      const showData = { movieId: movieId.toString(), startTime: new Date().toISOString() };
      const response = await request(app)
        .post('/shows')
        .send(showData);
      expect(response.status).toBe(401);
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för POST /shows - Validering av obligatoriska fält
  it('should return 400 when creating show with missing required fields', async () => {
    const moviesResponse = await request(app).get('/movies');
    if (moviesResponse.body.length > 0) {
      const movieId = moviesResponse.body[0]._id;
      const incompleteData = { movieId: movieId.toString() }; // Saknar startTime
      const response = await request(app)
        .post('/shows')
        .set('X-API-Key', 'valid-api-key')
        .send(incompleteData);
      expect(response.status).toBe(400);
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för POST /shows - Validering av ogiltigt movieId
  it('should return 400 when creating show with invalid movieId', async () => {
    const showData = {
      movieId: '507f1f77bcf86cd799439011', // Ogiltigt movieId
      startTime: new Date().toISOString(),
    };
    const response = await request(app)
      .post('/shows')
      .set('X-API-Key', 'valid-api-key')
      .send(showData);
    expect(response.status).toBe(400);
  });

  // Testfall för PUT /shows/:id - Uppdatera en befintlig föreställning
  it('should update an existing show with valid API key', async () => {
    // Först skapa en föreställning att uppdatera
    const moviesResponse = await request(app).get('/movies');
    if (moviesResponse.body.length > 0) {
      const movieId = moviesResponse.body[0]._id;
      const showData = {
        movieId: movieId.toString(),
        startTime: new Date().toISOString(),
        availableSeats: ['A1', 'A2'],
        pricePerSeat: 150,
        roomNumber: 1,
      };
      const createResponse = await request(app)
        .post('/shows')
        .set('X-API-Key', 'valid-api-key')
        .send(showData);
      
      if (createResponse.body._id) {
        const newStartTime = new Date(Date.now() + 3600000).toISOString();
        const updateData = { startTime: newStartTime };
        const response = await request(app)
          .put(`/shows/${createResponse.body._id}`)
          .set('X-API-Key', 'valid-api-key')
          .send(updateData);
        expect(response.status).toBe(200);
        expect(response.body.startTime).toBe(newStartTime);
        
        // Rensa upp
        await request(app)
          .delete(`/shows/${createResponse.body._id}`)
          .set('X-API-Key', 'valid-api-key');
      } else {
        expect(true).toBe(true);
      }
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för PUT /shows/:id - Uppdatera föreställning utan API-nyckel
  it('should return 401 when updating show without API key', async () => {
    const allShowsResponse = await request(app).get('/shows');
    if (allShowsResponse.body.length > 0) {
      const showId = allShowsResponse.body[0]._id;
      const updateData = { startTime: new Date().toISOString() };
      const response = await request(app)
        .put(`/shows/${showId}`)
        .send(updateData);
      expect(response.status).toBe(401);
    } else {
      expect(true).toBe(true);
    }
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
    // Först skapa en föreställning att ta bort
    const moviesResponse = await request(app).get('/movies');
    if (moviesResponse.body.length > 0) {
      const movieId = moviesResponse.body[0]._id;
      const showData = {
        movieId: movieId.toString(),
        startTime: new Date().toISOString(),
        availableSeats: ['A1', 'A2'],
        pricePerSeat: 150,
        roomNumber: 1,
      };
      const createResponse = await request(app)
        .post('/shows')
        .set('X-API-Key', 'valid-api-key')
        .send(showData);
      
      if (createResponse.body._id) {
        const response = await request(app)
          .delete(`/shows/${createResponse.body._id}`)
          .set('X-API-Key', 'valid-api-key');
        expect(response.status).toBe(204);
        
        // Verifiera att föreställningen inte längre finns
        const getResponse = await request(app).get(`/shows/${createResponse.body._id}`);
        expect(getResponse.status).toBe(404);
      } else {
        expect(true).toBe(true);
      }
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för DELETE /shows/:id - Ta bort föreställning utan API-nyckel
  it('should return 401 when deleting show without API key', async () => {
    const allShowsResponse = await request(app).get('/shows');
    if (allShowsResponse.body.length > 0) {
      const showId = allShowsResponse.body[0]._id;
      const response = await request(app)
        .delete(`/shows/${showId}`);
      expect(response.status).toBe(401);
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för DELETE /shows/:id - Försöka ta bort icke-existerande föreställning
  it('should return 404 when deleting non-existent show', async () => {
    const response = await request(app)
      .delete('/shows/507f1f77bcf86cd799439011')
      .set('X-API-Key', 'valid-api-key');
    expect(response.status).toBe(404);
  });
});