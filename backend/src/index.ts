import app from './server';
import config from '../config.json';

require('dotenv').config();

// Start the application by listening to specific port
const port = Number(process.env.PORT || config.PORT || 8080);
app.listen(port, () => {
  console.info('Express application started on port: ' + port);
});

