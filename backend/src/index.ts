import app from './server';
import config from '../config.json';

require('dotenv').config();
const env = process.env;

// Start the application by listening to specific port
const port = Number(env.PORT || config.PORT || 8080);
app.listen(port, () => {
  console.info('Express application started on port: ' + port);
});

