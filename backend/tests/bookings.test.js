import request from 'supertest';

// TODO: Importera din Express app här
// import app from '../backend/app.js';
const app = null; // Placeholder tills appen är implementerad

describe('Bookings API', () => {
  // Testfall för GET /bookings - Hämta alla bokningar (kräver API-nyckel)
  it('should fetch all bookings with valid API key', async () => {
    // Skicka en GET-begäran till /bookings med API-nyckel
    // Förvänta dig att få en lista med bokningar
    // Kontrollera att statuskoden är 200
    // Kontrollera att response body är en array
    // Kontrollera att varje bokning har nödvändiga fält (t.ex. name, email, showId, id)
    
    // const response = await request(app)
    //   .get('/bookings')
    //   .set('X-API-Key', 'valid-api-key');
    // expect(response.status).toBe(200);
    // expect(Array.isArray(response.body)).toBe(true);
  });

  // Testfall för GET /bookings - Hämta bokningar utan API-nyckel
  it('should return 401 when fetching bookings without API key', async () => {
    // Skicka en GET-begäran till /bookings utan API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const response = await request(app).get('/bookings');
    // expect(response.status).toBe(401);
  });

  // Testfall för GET /bookings/:id - Hämta en specifik bokning (kräver API-nyckel)
  it('should fetch a single booking by ID with valid API key', async () => {
    // Skicka en GET-begäran till /bookings/:id med ett giltigt ID och API-nyckel
    // Förvänta dig att få detaljer om en specifik bokning
    // Kontrollera att statuskoden är 200
    // Kontrollera att response body innehåller bokningens information
    
    // const response = await request(app)
    //   .get('/bookings/123')
    //   .set('X-API-Key', 'valid-api-key');
    // expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty('id');
    // expect(response.body).toHaveProperty('name');
    // expect(response.body).toHaveProperty('email');
    // expect(response.body).toHaveProperty('showId');
  });

  // Testfall för GET /bookings/:id - Hämta bokning utan API-nyckel
  it('should return 401 when fetching booking without API key', async () => {
    // Skicka en GET-begäran till /bookings/:id utan API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const response = await request(app).get('/bookings/123');
    // expect(response.status).toBe(401);
  });

  // Testfall för GET /bookings/:id - Hämta bokning med ogiltigt ID
  it('should return 404 for non-existent booking', async () => {
    // Skicka en GET-begäran till /bookings/:id med ett ogiltigt ID och API-nyckel
    // Förvänta dig att få ett 404-fel
    // Kontrollera att statuskoden är 404
    
    // const response = await request(app)
    //   .get('/bookings/invalid-id')
    //   .set('X-API-Key', 'valid-api-key');
    // expect(response.status).toBe(404);
  });

  // Testfall för GET /bookings/show/:showId - Hämta alla bokningar för en specifik föreställning
  it('should fetch all bookings for a specific show with valid API key', async () => {
    // Skicka en GET-begäran till /bookings/show/:showId med API-nyckel
    // Förvänta dig att få en lista med bokningar för den specifika föreställningen
    // Kontrollera att statuskoden är 200
    // Kontrollera att response body är en array
    // Kontrollera att alla bokningar tillhör den specifika föreställningen (showId matchar)
    
    // const response = await request(app)
    //   .get('/bookings/show/123')
    //   .set('X-API-Key', 'valid-api-key');
    // expect(response.status).toBe(200);
    // expect(Array.isArray(response.body)).toBe(true);
    // response.body.forEach(booking => {
    //   expect(booking.showId).toBe('123');
    // });
  });

  // Testfall för POST /bookings - Skapa en ny bokning (kräver API-nyckel)
  it('should create a new booking with valid API key', async () => {
    // Skicka en POST-begäran till /bookings med bokningsdata och API-nyckel
    // Förvänta dig att bokningen skapas och returneras
    // Kontrollera att statuskoden är 201
    // Kontrollera att response body innehåller den nya bokningens information
    // Kontrollera att bokningen har fått ett ID
    // Kontrollera att namn och email är korrekt sparade
    
    // const bookingData = {
    //   showId: '123',
    //   name: 'John Doe',
    //   email: 'john@example.com',
    //   // ... andra fält
    // };
    // const response = await request(app)
    //   .post('/bookings')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(bookingData);
    // expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty('id');
    // expect(response.body.name).toBe(bookingData.name);
    // expect(response.body.email).toBe(bookingData.email);
  });

  // Testfall för POST /bookings - Försöka skapa bokning utan API-nyckel
  it('should return 401 when creating booking without API key', async () => {
    // Skicka en POST-begäran till /bookings utan API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const bookingData = {
    //   showId: '123',
    //   name: 'John Doe',
    //   email: 'john@example.com',
    // };
    // const response = await request(app)
    //   .post('/bookings')
    //   .send(bookingData);
    // expect(response.status).toBe(401);
  });

  // Testfall för POST /bookings - Validering av obligatoriska fält
  it('should return 400 when creating booking with missing required fields', async () => {
    // Skicka en POST-begäran till /bookings med ofullständig data (saknar t.ex. name eller email)
    // Förvänta dig att få ett 400 Bad Request-fel
    // Kontrollera att statuskoden är 400
    // Kontrollera att felmeddelandet indikerar saknade fält
    
    // const incompleteData = { showId: '123' }; // Saknar name och email
    // const response = await request(app)
    //   .post('/bookings')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(incompleteData);
    // expect(response.status).toBe(400);
  });

  // Testfall för POST /bookings - Validering av email-format
  it('should return 400 when creating booking with invalid email format', async () => {
    // Skicka en POST-begäran till /bookings med ogiltigt email-format
    // Förvänta dig att få ett 400 Bad Request-fel
    // Kontrollera att statuskoden är 400
    
    // const bookingData = {
    //   showId: '123',
    //   name: 'John Doe',
    //   email: 'invalid-email',
    // };
    // const response = await request(app)
    //   .post('/bookings')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(bookingData);
    // expect(response.status).toBe(400);
  });

  // Testfall för POST /bookings - Validering av ogiltigt showId
  it('should return 400 when creating booking with invalid showId', async () => {
    // Skicka en POST-begäran till /bookings med ogiltigt showId
    // Förvänta dig att få ett 400 Bad Request-fel
    // Kontrollera att statuskoden är 400
    
    // const bookingData = {
    //   showId: 'non-existent-show',
    //   name: 'John Doe',
    //   email: 'john@example.com',
    // };
    // const response = await request(app)
    //   .post('/bookings')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(bookingData);
    // expect(response.status).toBe(400);
  });

  // Testfall för POST /bookings - Förhindra dubbelbokning (samma email + showId)
  it('should return 409 when attempting to create duplicate booking', async () => {
    // Skicka en POST-begäran till /bookings med en kombination av email och showId som redan finns
    // Förvänta dig att få ett 409 Conflict-fel
    // Kontrollera att statuskoden är 409
    // Kontrollera att felmeddelandet indikerar dubbelbokning
    
    // const bookingData = {
    //   showId: '123',
    //   name: 'John Doe',
    //   email: 'existing@example.com', // Denna kombination finns redan
    // };
    // const response = await request(app)
    //   .post('/bookings')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(bookingData);
    // expect(response.status).toBe(409);
  });

  // Testfall för POST /bookings - Förhindra dubbelbokning med samma email för samma show
  it('should prevent duplicate booking with same email and showId', async () => {
    // Skapa en första bokning
    // Försök skapa en andra bokning med samma email och showId
    // Förvänta dig att den andra bokningen nekas med 409 Conflict
    // Kontrollera att endast en bokning finns i systemet
    
    // const bookingData = {
    //   showId: '123',
    //   name: 'John Doe',
    //   email: 'john@example.com',
    // };
    // // Skapa första bokningen
    // await request(app)
    //   .post('/bookings')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(bookingData);
    // // Försök skapa dubbelbokning
    // const duplicateResponse = await request(app)
    //   .post('/bookings')
    //   .set('X-API-Key', 'valid-api-key')
    //   .send(bookingData);
    // expect(duplicateResponse.status).toBe(409);
  });

  // Testfall för DELETE /bookings/:id - Ta bort en bokning (kräver API-nyckel)
  it('should delete a booking by ID with valid API key', async () => {
    // Skicka en DELETE-begäran till /bookings/:id med ett giltigt ID och API-nyckel
    // Förvänta dig att bokningen tas bort
    // Kontrollera att statuskoden är 204 eller 200
    // Verifiera att bokningen inte längre finns genom att göra en GET-begäran
    
    // const response = await request(app)
    //   .delete('/bookings/123')
    //   .set('X-API-Key', 'valid-api-key');
    // expect(response.status).toBe(204);
  });

  // Testfall för DELETE /bookings/:id - Ta bort bokning utan API-nyckel
  it('should return 401 when deleting booking without API key', async () => {
    // Skicka en DELETE-begäran till /bookings/:id utan API-nyckel
    // Förvänta dig att få ett 401 Unauthorized-fel
    // Kontrollera att statuskoden är 401
    
    // const response = await request(app)
    //   .delete('/bookings/123');
    // expect(response.status).toBe(401);
  });

  // Testfall för DELETE /bookings/:id - Försöka ta bort icke-existerande bokning
  it('should return 404 when deleting non-existent booking', async () => {
    // Skicka en DELETE-begäran till /bookings/:id med ogiltigt ID
    // Förvänta dig att få ett 404 Not Found-fel
    // Kontrollera att statuskoden är 404
    
    // const response = await request(app)
    //   .delete('/bookings/non-existent-id')
    //   .set('X-API-Key', 'valid-api-key');
    // expect(response.status).toBe(404);
  });
});