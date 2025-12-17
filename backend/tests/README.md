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

Testerna är aktiva och testar alla CRUD-operationer för Movies, Shows och Bookings API:er. Testerna importerar Express-appen från `../app.js` och kör faktiska HTTP-requests mot API:et.

## ES6 Moduler

Projektet använder ES6-moduler (`import`/`export`). Se till att din backend också exporterar appen med ES6-moduler för att testerna ska fungera korrekt.

## Dependencies

- `jest` - Testramverk
- `supertest` - HTTP assertions för att testa Express endpoints