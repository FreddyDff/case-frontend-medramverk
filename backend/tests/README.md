# Tests

Detta är testmappen för Cinema API.

## Installation

För att installera alla dependencies, kör:

```bash
npm install
```

## Kör tester

För att köra alla tester:

```bash
npm test
```

För att köra tester i watch-läge:

```bash
npm run test:watch
```

För att generera coverage-rapport:

```bash
npm run test:coverage
```

## Teststruktur

Tests är uppdelade i följande filer:

- `movies.test.js` - Tester för Movies API endpoints
- `shows.test.js` - Tester för Shows API endpoints
- `bookings.test.js` - Tester för Bookings API endpoints
- `apikeys.test.js` - Tester för ApiKeys API endpoints

## Anmärkningar

Alla tester är för närvarande kommenterade och innehåller bara teststruktur. För att aktivera testerna:

1. Importera din Express app i varje testfil (använd ES6 `import` syntax)
2. Avkommentera testkoden
3. Uppdatera vägar och förväntningar baserat på din faktiska API-implementation

## ES6 Moduler

Projektet använder ES6-moduler (`import`/`export`). Se till att din backend också exporterar appen med ES6-moduler för att testerna ska fungera korrekt.

## Dependencies

- `jest` - Testramverk
- `supertest` - HTTP assertions för att testa Express endpoints