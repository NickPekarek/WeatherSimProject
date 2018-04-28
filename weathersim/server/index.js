// API key 337a61b391cf917f


const locationDB = require('./controllers/controller.js')
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use( bodyParser.json() );

const baseURL = '/api/places/';
app.get(baseURL,locationDB.read) 
app.post(baseURL,locationDB.create)



const port = 3001;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );

