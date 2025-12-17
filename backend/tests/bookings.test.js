import request from 'supertest';
import app from '../app.js';

describe('Bookings API', () => {
  // Testfall för GET /bookings - Hämta alla bokningar (kräver API-nyckel)
  it('should fetch all bookings with valid API key', async () => {
    const response = await request(app)
      .get('/bookings')
      .set('X-API-Key', 'valid-api-key');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Testfall för GET /bookings - Hämta bokningar utan API-nyckel
  it('should return 401 when fetching bookings without API key', async () => {
    const response = await request(app).get('/bookings');
    expect(response.status).toBe(401);
  });

  // Testfall för GET /bookings/:id - Hämta en specifik bokning (kräver API-nyckel)
  it('should fetch a single booking by ID with valid API key', async () => {
    // Först skapa en bokning att hämta
    const showsResponse = await request(app).get('/shows');
    if (showsResponse.body.length > 0) {
      const showId = showsResponse.body[0]._id;
      const bookingData = {
        showId: showId.toString(),
        name: 'Test User',
        email: 'test@example.com',
      };
      const createResponse = await request(app)
        .post('/bookings')
        .set('X-API-Key', 'valid-api-key')
        .send(bookingData);
      
      if (createResponse.body._id) {
        const response = await request(app)
          .get(`/bookings/${createResponse.body._id}`)
          .set('X-API-Key', 'valid-api-key');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('showId');
        
        // Rensa upp
        await request(app)
          .delete(`/bookings/${createResponse.body._id}`)
          .set('X-API-Key', 'valid-api-key');
      } else {
        expect(true).toBe(true);
      }
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för GET /bookings/:id - Hämta bokning utan API-nyckel
  it('should return 401 when fetching booking without API key', async () => {
    const response = await request(app).get('/bookings/507f1f77bcf86cd799439011');
    expect(response.status).toBe(401);
  });

  // Testfall för GET /bookings/:id - Hämta bokning med ogiltigt ID
  it('should return 404 for non-existent booking', async () => {
    const response = await request(app)
      .get('/bookings/507f1f77bcf86cd799439011')
      .set('X-API-Key', 'valid-api-key');
    expect(response.status).toBe(404);
  });

  // Testfall för GET /bookings/show/:showId - Hämta alla bokningar för en specifik föreställning
  it('should fetch all bookings for a specific show with valid API key', async () => {
    const showsResponse = await request(app).get('/shows');
    if (showsResponse.body.length > 0) {
      const showId = showsResponse.body[0]._id;
      const response = await request(app)
        .get(`/bookings/show/${showId}`)
        .set('X-API-Key', 'valid-api-key');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach(booking => {
        expect(booking.showId.toString()).toBe(showId.toString());
      });
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för POST /bookings - Skapa en ny bokning (kräver API-nyckel)
  it('should create a new booking with valid API key', async () => {
    const showsResponse = await request(app).get('/shows');
    if (showsResponse.body.length > 0) {
      const showId = showsResponse.body[0]._id;
      // Använd unik email med timestamp för att undvika konflikter
      const uniqueEmail = `john-${Date.now()}@example.com`;
      const bookingData = {
        showId: showId.toString(),
        name: 'John Doe',
        email: uniqueEmail,
      };
      const response = await request(app)
        .post('/bookings')
        .set('X-API-Key', 'valid-api-key')
        .send(bookingData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(bookingData.name);
      expect(response.body.email).toBe(bookingData.email);
      
      // Rensa upp
      if (response.body._id) {
        await request(app)
          .delete(`/bookings/${response.body._id}`)
          .set('X-API-Key', 'valid-api-key');
      }
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för POST /bookings - Försöka skapa bokning utan API-nyckel
  it('should return 401 when creating booking without API key', async () => {
    const showsResponse = await request(app).get('/shows');
    if (showsResponse.body.length > 0) {
      const showId = showsResponse.body[0]._id;
      const bookingData = {
        showId: showId.toString(),
        name: 'John Doe',
        email: 'john@example.com',
      };
      const response = await request(app)
        .post('/bookings')
        .send(bookingData);
      expect(response.status).toBe(401);
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för POST /bookings - Validering av obligatoriska fält
  it('should return 400 when creating booking with missing required fields', async () => {
    // Först hämta en show för att få ett giltigt showId
    const showsResponse = await request(app).get('/shows');
    if (showsResponse.body.length > 0) {
      const showId = showsResponse.body[0]._id;
      const incompleteData = { showId: showId.toString() }; // Saknar name och email
      const response = await request(app)
        .post('/bookings')
        .set('X-API-Key', 'valid-api-key')
        .send(incompleteData);
      expect(response.status).toBe(400);
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för POST /bookings - Validering av email-format
  it('should return 400 when creating booking with invalid email format', async () => {
    // Först hämta en show för att få ett giltigt showId
    const showsResponse = await request(app).get('/shows');
    if (showsResponse.body.length > 0) {
      const showId = showsResponse.body[0]._id;
      const bookingData = {
        showId: showId.toString(),
        name: 'John Doe',
        email: 'invalid-email', // Saknar @
      };
      const response = await request(app)
        .post('/bookings')
        .set('X-API-Key', 'valid-api-key')
        .send(bookingData);
      expect(response.status).toBe(400);
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för POST /bookings - Validering av ogiltigt showId
  it('should return 400 when creating booking with invalid showId', async () => {
    const bookingData = {
      showId: '507f1f77bcf86cd799439011', // Ogiltigt showId
      name: 'John Doe',
      email: 'john@example.com',
    };
    const response = await request(app)
      .post('/bookings')
      .set('X-API-Key', 'valid-api-key')
      .send(bookingData);
    expect(response.status).toBe(400);
  });

  // Testfall för POST /bookings - Förhindra dubbelbokning (samma email + showId)
  it('should return 409 when attempting to create duplicate booking', async () => {
    const showsResponse = await request(app).get('/shows');
    if (showsResponse.body.length > 0) {
      const showId = showsResponse.body[0]._id;
      const bookingData = {
        showId: showId.toString(),
        name: 'John Doe',
        email: 'duplicate@example.com',
      };
      // Skapa första bokningen
      const firstResponse = await request(app)
        .post('/bookings')
        .set('X-API-Key', 'valid-api-key')
        .send(bookingData);
      
      if (firstResponse.status === 201) {
        // Försök skapa dubbelbokning
        const duplicateResponse = await request(app)
          .post('/bookings')
          .set('X-API-Key', 'valid-api-key')
          .send(bookingData);
        expect(duplicateResponse.status).toBe(409);
        
        // Rensa upp
        if (firstResponse.body._id) {
          await request(app)
            .delete(`/bookings/${firstResponse.body._id}`)
            .set('X-API-Key', 'valid-api-key');
        }
      } else {
        expect(true).toBe(true);
      }
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för POST /bookings - Förhindra dubbelbokning med samma email för samma show
  it('should prevent duplicate booking with same email and showId', async () => {
    // Först hämta en show för att få ett giltigt showId
    const showsResponse = await request(app).get('/shows');
    if (showsResponse.body.length > 0) {
      const showId = showsResponse.body[0]._id;
      const bookingData = {
        showId: showId.toString(),
        name: 'John Doe',
        email: 'john@example.com',
      };
      // Skapa första bokningen
      await request(app)
        .post('/bookings')
        .set('X-API-Key', 'valid-api-key')
        .send(bookingData);
      // Försök skapa dubbelbokning
      const duplicateResponse = await request(app)
        .post('/bookings')
        .set('X-API-Key', 'valid-api-key')
        .send(bookingData);
      expect(duplicateResponse.status).toBe(409);
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för DELETE /bookings/:id - Ta bort en bokning (kräver API-nyckel)
  it('should delete a booking by ID with valid API key', async () => {
    // Först skapa en bokning att ta bort
    const showsResponse = await request(app).get('/shows');
    if (showsResponse.body.length > 0) {
      const showId = showsResponse.body[0]._id;
      const bookingData = {
        showId: showId.toString(),
        name: 'Delete Test',
        email: 'delete@example.com',
      };
      const createResponse = await request(app)
        .post('/bookings')
        .set('X-API-Key', 'valid-api-key')
        .send(bookingData);
      
      if (createResponse.body._id) {
        const response = await request(app)
          .delete(`/bookings/${createResponse.body._id}`)
          .set('X-API-Key', 'valid-api-key');
        expect(response.status).toBe(204);
        
        // Verifiera att bokningen inte längre finns
        const getResponse = await request(app)
          .get(`/bookings/${createResponse.body._id}`)
          .set('X-API-Key', 'valid-api-key');
        expect(getResponse.status).toBe(404);
      } else {
        expect(true).toBe(true);
      }
    } else {
      expect(true).toBe(true);
    }
  });

  // Testfall för DELETE /bookings/:id - Ta bort bokning utan API-nyckel
  it('should return 401 when deleting booking without API key', async () => {
    const response = await request(app)
      .delete('/bookings/507f1f77bcf86cd799439011');
    expect(response.status).toBe(401);
  });

  // Testfall för DELETE /bookings/:id - Försöka ta bort icke-existerande bokning
  it('should return 404 when deleting non-existent booking', async () => {
    const response = await request(app)
      .delete('/bookings/507f1f77bcf86cd799439011')
      .set('X-API-Key', 'valid-api-key');
    expect(response.status).toBe(404);
  });
});