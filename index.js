const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dbConnection = require('./database/config');

const app = express();

dbConnection()

app.use(cors());

// Public folder
app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/events.routes'));

app.listen(process.env.PORT, () => console.log(`||SERVER||http://localhost:${process.env.PORT}||`));