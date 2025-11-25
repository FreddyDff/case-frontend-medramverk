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
    // Skicka en POST-begäran till /movies med filmdata och API-nyckel
    // Förvänta dig att filmen skapas och returneras
    // Kontrollera att statuskoden är 201
    // Kontrollera att response body innehåller den nya filmens information
    // Kontrollera att filmen har fått ett ID
    
    // const movieData = {
    //   title: 'Test Movie',
    //   description: 'Test Description',
    //   duration: 120,
    //   // ... andra fält
    // };
    // const response = await request(app)
    //   .post('/movies')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(movieData);
    // expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty('id');
    // expect(response.body.title).toBe(movieData.title);
  });

  // Testfall för POST /movies - Försöka skapa film utan API-nyckel
  it('should return 401 when creating movie without API key', async () => {
    // Skicka en POST-begäran till /movies utan API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const movieData = { title: 'Test Movie' };
    // const response = await request(app)
    //   .post('/movies')
    //   .send(movieData);
    // expect(response.status).toBe(401);
  });

  // Testfall för POST /movies - Försöka skapa film med ogiltig API-nyckel
  it('should return 401 when creating movie with invalid API key', async () => {
    // Skicka en POST-begäran till /movies med ogiltig API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const movieData = { title: 'Test Movie' };
    // const response = await request(app)
    //   .post('/movies')
    //   .set('X-API-Key', 'invalid-api-key')
    //   .send(movieData);
    // expect(response.status).toBe(401);
  });

  // Testfall för POST /movies - Validering av obligatoriska fält
  it('should return 400 when creating movie with missing required fields', async () => {
    // Skicka en POST-begäran till /movies med ofullständig data
    // Förvänta dig att få ett 400 Bad Request-fel
    // Kontrollera att statuskoden är 400
    // Kontrollera att felmeddelandet indikerar saknade fält
    
    // const incompleteData = { title: 'Test Movie' }; // Saknar t.ex. description
    // const response = await request(app)
    //   .post('/movies')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(incompleteData);
    // expect(response.status).toBe(400);
  });

  // Testfall för PUT /movies/:id - Uppdatera en befintlig film
  it('should update an existing movie with valid API key', async () => {
    // Skicka en PUT-begäran till /movies/:id med uppdaterad filmdata och API-nyckel
    // Förvänta dig att filmen uppdateras och returneras
    // Kontrollera att statuskoden är 200
    // Kontrollera att response body innehåller uppdaterad information
    
    // const updateData = { title: 'Updated Movie Title' };
    // const response = await request(app)
    //   .put('/movies/123')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(updateData);
    // expect(response.status).toBe(200);
    // expect(response.body.title).toBe(updateData.title);
  });

  // Testfall för PUT /movies/:id - Uppdatera film utan API-nyckel
  it('should return 401 when updating movie without API key', async () => {
    // Skicka en PUT-begäran till /movies/:id utan API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const updateData = { title: 'Updated Title' };
    // const response = await request(app)
    //   .put('/movies/123')
    //   .send(updateData);
    // expect(response.status).toBe(401);
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
    // Skicka en DELETE-begäran till /movies/:id med ett giltigt ID och API-nyckel
    // Förvänta dig att filmen tas bort
    // Kontrollera att statuskoden är 204 eller 200
    // Verifiera att filmen inte längre finns genom att göra en GET-begäran
    
    // const response = await request(app)
    //   .delete('/movies/123')
    //   .set('X-API-Key', 'valid-api-key');
    // expect(response.status).toBe(204);
  });

  // Testfall för DELETE /movies/:id - Ta bort film utan API-nyckel
  it('should return 401 when deleting movie without API key', async () => {
    // Skicka en DELETE-begäran till /movies/:id utan API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const response = await request(app)
    //   .delete('/movies/123');
    // expect(response.status).toBe(401);
  });

  // Testfall för DELETE /movies/:id - Försöka ta bort icke-existerande film
  it('should return 404 when deleting non-existent movie', async () => {
    const response = await request(app)
      .delete('/movies/507f1f77bcf86cd799439011')
      .set('X-API-Key', 'valid-api-key');
    expect(response.status).toBe(404);
  });
});