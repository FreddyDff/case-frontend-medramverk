// Denna fil startar servern
// ↑ Importerar app från app.js och startar servern

import { connectDB } from './config/database.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

// anslut till databasen vid start
connectDB();

// Starta server
app.listen(PORT, () => {
    console.log(`Server körs på port ${PORT}`);
});