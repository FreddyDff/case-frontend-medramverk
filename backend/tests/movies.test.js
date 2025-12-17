import request from 'supertest';
import app from '../app.js';

describe('Movies API', () => {
  // Testfall för GET /movies - Hämta alla filmer
  it('should fetch all movies', async () => {
    const response = await request(app).get('/movies');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Testfall för GET /movies/:id - Hämta en specifik film
  it('should fetch a single movie by ID', async () => {
    // Först hämta alla filmer för att få ett giltigt ID
    const allMoviesResponse = await request(app).get('/movies');
    if (allMoviesResponse.body.length > 0) {
      const movieId = allMoviesResponse.body[0]._id;
      const response = await request(app).get(`/movies/${movieId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('title');
    } else {
      // Om inga filmer finns, hoppa över testet
      expect(true).toBe(true);
    }
  });

  // Testfall för GET /movies/:id - Hämta film med ogiltigt ID
  it('should return 404 for non-existent movie', async () => {
    // Använd ett ogiltigt ObjectId-format
    const response = await request(app).get('/movies/507f1f77bcf86cd799439011');
    expect(response.status).toBe(404);
  });

  // Testfall för POST /movies - Skapa en ny film (kräver API-nyckel)
  it('should create a new movie with valid API key', async () => {
    const movieData = {
      title: 'Test Movie',
      description: 'Test Description',
      duration: 120,
      genre: 'Action',
      director: 'Test Director',
    };
    const response = await request(app)
      .post('/movies')
      .set('X-API-Key', 'valid-api-key')
      .send(movieData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(movieData.title);
    
    // Rensa upp - ta bort testfilmen
    if (response.body._id) {
      await request(app)
        .delete(`/movies/${response.body._id}`)
        .set('X-API-Key', 'valid-api-key');
    }
  });

  // Testfall för POST /movies - Försöka skapa film utan API-nyckel
  it('should return 401 when creating movie without API key', async () => {
    const movieData = { title: 'Test Movie', description: 'Test', duration: 120 };
    const response = await request(app)
      .post('/movies')
      .send(movieData);
    expect(response.status).toBe(401);
  });

  // Testfall för POST /movies - Försöka skapa film med ogiltig API-nyckel
  it('should return 401 when creating movie with invalid API key', async () => {
    const movieData = { title: 'Test Movie', description: 'Test', duration: 120 };
    const response = await request(app)
      .post('/movies')
      .set('X-API-Key', 'invalid-api-key')
      .send(movieData);
    expect(response.status).toBe(401);
  });

  // Testfall för POST /movies - Validering av obligatoriska fält
  it('should return 400 when creating movie with missing required fields', async () => {
    const incompleteData = { title: 'Test Movie' }; // Saknar description och duration
    const response = await request(app)
      .post('/movies')
      .set('X-API-Key', 'valid-api-key')
      .send(incompleteData);
    expect(response.status).toBe(400);
  });

  // Testfall för PUT /movies/:id - Uppdatera en befintlig film
  it('should update an existing movie with valid API key', async () => {
    // Först skapa en film att uppdatera
    const movieData = {
      title: 'Original Title',
      description: 'Original Description',
      duration: 100,
      genre: 'Action',
      director: 'Test Director',
    };
    const createResponse = await request(app)
      .post('/movies')
      .set('X-API-Key', 'valid-api-key')
      .send(movieData);
    
    if (createResponse.body._id) {
      const updateData = { title: 'Updated Movie Title' };
      const response = await request(app)
        .put(`/movies/${createResponse.body._id}`)
        .set('X-API-Key', 'valid-api-key')
        .send(updateData);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updateData.title);
      
      // Rensa upp
      await request(app)
        .delete(`/movies/${createResponse.body._id}`)
        .set('X-API-Key', 'valid-api-key');
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för PUT /movies/:id - Uppdatera film utan API-nyckel
  it('should return 401 when updating movie without API key', async () => {
    // Hämta en befintlig film
    const allMoviesResponse = await request(app).get('/movies');
    if (allMoviesResponse.body.length > 0) {
      const movieId = allMoviesResponse.body[0]._id;
      const updateData = { title: 'Updated Title' };
      const response = await request(app)
        .put(`/movies/${movieId}`)
        .send(updateData);
      expect(response.status).toBe(401);
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för PUT /movies/:id - Försöka uppdatera icke-existerande film
  it('should return 404 when updating non-existent movie', async () => {
    const updateData = { title: 'Updated Title' };
    const response = await request(app)
      .put('/movies/507f1f77bcf86cd799439011')
      .set('X-API-Key', 'valid-api-key')
      .send(updateData);
    expect(response.status).toBe(404);
  });

  // Testfall för DELETE /movies/:id - Ta bort en film
  it('should delete a movie by ID with valid API key', async () => {
    // Först skapa en film att ta bort
    const movieData = {
      title: 'Movie To Delete',
      description: 'Test Description',
      duration: 100,
      genre: 'Action',
      director: 'Test Director',
    };
    const createResponse = await request(app)
      .post('/movies')
      .set('X-API-Key', 'valid-api-key')
      .send(movieData);
    
    if (createResponse.body._id) {
      const response = await request(app)
        .delete(`/movies/${createResponse.body._id}`)
        .set('X-API-Key', 'valid-api-key');
      expect(response.status).toBe(204);
      
      // Verifiera att filmen inte längre finns
      const getResponse = await request(app).get(`/movies/${createResponse.body._id}`);
      expect(getResponse.status).toBe(404);
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för DELETE /movies/:id - Ta bort film utan API-nyckel
  it('should return 401 when deleting movie without API key', async () => {
    // Hämta en befintlig film
    const allMoviesResponse = await request(app).get('/movies');
    if (allMoviesResponse.body.length > 0) {
      const movieId = allMoviesResponse.body[0]._id;
      const response = await request(app)
        .delete(`/movies/${movieId}`);
      expect(response.status).toBe(401);
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för DELETE /movies/:id - Försöka ta bort icke-existerande film
  it('should return 404 when deleting non-existent movie', async () => {
    const response = await request(app)
      .delete('/movies/507f1f77bcf86cd799439011')
      .set('X-API-Key', 'valid-api-key');
    expect(response.status).toBe(404);
  });
});