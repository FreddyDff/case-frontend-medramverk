// Sätt NODE_ENV till 'test' så att servern inte startar när testerna körs
process.env.NODE_ENV = 'test';

// Sätt API_KEY för tester (samma som fallback i auth.js)
process.env.API_KEY = process.env.API_KEY || 'valid-api-key';
